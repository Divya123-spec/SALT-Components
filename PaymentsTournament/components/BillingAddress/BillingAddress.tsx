/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
    Checkbox,
    isRequired,
    TextInput
} from '@exo/frontend-components-forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';
import { Loading } from 'carbon-components-react';
import { useCountries } from '../../hooks/useCountries';
import { TournamentPayment } from '../TournamentPayment/TournamentPayment';
import * as S from './BillingAddress.styles';
import { useGetUserDetails } from '../../../Profile/hooks/useGetUserDetails';

const schema = yup
    .object()
    .shape({
        firstName: yup.string().required('Please Enter value'),
        lastName: yup.string().required('Please Enter value'),
        emailID: yup.string().required('Please Enter value'),
        countryPhoneCode: yup.string().required('Please Enter value'),
        phoneNumber: yup.string().required('Please Enter value')
            .test('phoneNumber-validator', 'Phone number should be in numbers', (value) => {
                const enteredPhoneNumber = value;
                if ((enteredPhoneNumber && enteredPhoneNumber.match(/^[0-9]+$/)) || enteredPhoneNumber === '') {

                    return true;
                }
                return false;
            }),
        address1: yup.string().required('Please Enter value'),
        address2: yup.string(),
        address3: yup.string(),
        city: yup.string().required('Please Enter value'),
        country: yup.string().required('Please Enter value'),
        postCode: yup.string().required('Please Enter value'),
        termsAndConditionsCheckbox: yup.boolean().required()
    });


const addressDetails: any = {};

export type countryDetails = {
    isoCode: string;
    name: string;
    phonePrefix: string;
    numericCode: string;
};

export const BillingAddressTournament = () => {
    const idPrefix = 'Tournament_Payment';
    const history = useHistory();
    const { state } = history.location;
    const tournamentEntrantId = (state as any)?.id;
    const tournamentName = (state as any)?.tournamentName;
    const amount = (state as any)?.amount;
    const phoneNumberValue = (state as any)?.phoneNumber;
    const fetchPhoneCode: string = phoneNumberValue?.split(' ')[0];
    const fetchPhoneNumber: string = phoneNumberValue?.split(' ')[1];
    const isAuthenticated = useIsAuthenticated();

    if (!isAuthenticated) {
        history.push({ pathname: '/login' });
    }
    else if (!tournamentEntrantId && !amount) {
        history.push({ pathname: '/homepage' });
    }

    const [email, setEmail] = useState<string>();
    let emailId = '';
    if(typeof window !== 'undefined' && isAuthenticated){
        const sessionUserDetails = window.sessionStorage.getItem('userDetails') ? JSON.parse(window.sessionStorage.getItem('userDetails') as any) : '';
        const userInfo = sessionUserDetails ? sessionUserDetails.idTokenClaims : '';
        if(sessionUserDetails && userInfo){
            emailId = userInfo && userInfo.email ? userInfo.email : userInfo.emails[0];
        }
        if (email === undefined) {
            setEmail(emailId);
        }
    }

    const { loading, error, userDetails } = useGetUserDetails(email!);
    const { loading: countryLoading, dataCountryCodes } = useCountries();

    const currency: string = 'GBP';

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const data = {
        firstName: '',
        lastName: '',
        emailID: '',
        countryPhoneCode: '+44',
        phoneNumber: '',
        address1: '',
        address2: '',
        address3: '',
        city: '',
        country: 'United Kingdom',
        postCode: '',
        termsAndConditionsCheckbox: false
    };

    const [isDisabled, setDisabled] = useState(true);
    const [paymentpage, setPaymentPage] = useState(false);

    const { register, handleSubmit, formState, control, reset } = useForm({
        mode: 'all',
        defaultValues: {
            firstName: '',
            lastName: '',
            emailID: '',
            countryPhoneCode: fetchPhoneCode ?? '+44',
            phoneNumber: fetchPhoneNumber ?? '',
            address1: '',
            address2: '',
            address3: '',
            city: '',
            country: 'United Kingdom',
            postCode: '',
            termsAndConditionsCheckbox: false
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (!loading) {
            reset({
                firstName: userDetails?.firstname ?? '',
                lastName: userDetails?.lastname ?? '',
                emailID: userDetails?.email ?? emailId, 
                countryPhoneCode: fetchPhoneCode ?? '+44',
                phoneNumber: fetchPhoneNumber ?? '',
                address1: userDetails?.address ?? '',
                address2: '',
                address3: '',
                city: userDetails?.city ?? '',
                country: userDetails?.country ?? 'United Kingdom',
                postCode: userDetails?.postalcode ?? '',
                termsAndConditionsCheckbox: false
            });
        }
    }, [loading, userDetails]);

    const onSubmit = (formdata) => {
        let countryNumericCode: string = '';
        let filteredCountry: countryDetails[] = [];
        if(dataCountryCodes !== undefined) {
            filteredCountry = dataCountryCodes?.filter(item => item.name === formdata.country)!;
        }        
        countryNumericCode = filteredCountry[0]?.numericCode || '826';
        const formattedPhoneNumber = `${formdata.countryPhoneCode  } ${  formdata.phoneNumber}`;
        addressDetails.firstName = formdata.firstName;
        addressDetails.lastName = formdata.lastName;
        addressDetails.email = formdata.emailID;
        addressDetails.address1 = formdata.address1;
        addressDetails.address2 = formdata.address2;
        addressDetails.address3 = formdata.address3;
        addressDetails.city = formdata.city;
        addressDetails.country = countryNumericCode;
        addressDetails.zip = formdata.postCode;
        // addressDetails.countryPhoneCode = formdata.countryPhoneCode;   Might use later
        addressDetails.formattedPhoneNumber = formattedPhoneNumber;
        setPaymentPage(true);

    };


    const handleChange = () => {
        setDisabled(!isDisabled);
    };

    const onError = (err) => {
        throw new Error(err);
    };

    if (!loading && error) {
        return (
            <>
                <h4>Please try again or contact support team!!!</h4>
            </>
        );
    }

    return (<>
        {(loading || countryLoading) && <Loading/>}
        {!paymentpage && (!loading && !countryLoading) &&
            <S.FormWrapper>
                <S.FormHeading>Billing Address</S.FormHeading>
                <S.MyDetailsForm
                    onSubmit={(event) => handleSubmit(onSubmit)(event)}
                    onError={onError}
                    data={data}
                    form={{ reset, handleSubmit, formState }}
                >
                    <S.FormContainer>
                        <S.StyledInputWrapper>
                            <S.TextWrapper>
                                <TextInput
                                    id={`${idPrefix}firstName`}
                                    {...register('firstName')}
                                    control={control}
                                    errorText={formState.errors.firstName?.message}
                                    value={data.firstName}
                                    labelText="First Name*"
                                    placeholderText="Enter first name here"
                                    isRequired={isRequired(schema, 'firstName', true)}
                                    autocomplete='off'
                                />
                            </S.TextWrapper>
                            <S.TextWrapper>
                                <TextInput
                                    id={`${idPrefix}lastName`}
                                    {...register('lastName')}
                                    control={control}
                                    errorText={formState.errors.lastName?.message}
                                    value={data.lastName}
                                    labelText="Last Name*"
                                    placeholderText="Enter last name here"
                                    isRequired={isRequired(schema, 'lastName', true)}
                                    autocomplete='off'
                                />
                            </S.TextWrapper>
                        </S.StyledInputWrapper>
                        <S.BigTextWrapper>
                            <TextInput
                                id={`${idPrefix}emailID`}
                                {...register('emailID')}
                                control={control}                                
                                errorText={formState.errors.emailID?.message}
                                value={data.emailID}
                                labelText="Email ID*"
                                placeholderText="Enter Email ID here"
                                isRequired={isRequired(schema, 'emailID', true)}
                                autocomplete='off'
                            />
                        </S.BigTextWrapper>
                        <S.PhoneWrapper>
                            <S.FirstTextWrapper>
                                <S.StyledDropdown
                                    id={`${idPrefix}countryPhoneCode`}
                                    {...register('countryPhoneCode')}
                                    control={control}
                                    errorText={formState.errors.country?.message}
                                    value={data.countryPhoneCode}
                                    placeholderText="Choose an option"
                                    labelText="Phone Code*"
                                    isRequired={isRequired(schema, 'countryPhoneCode', true)}
                                    items={dataCountryCodes?.map(item => ({
                                        value: item.phonePrefix,
                                        name: (`${item.name  }(${  item.phonePrefix  })`)
                                    }))}
                                    autocomplete='off'
                                />
                            </S.FirstTextWrapper>
                            <S.SecondTextWrapper>
                                <TextInput
                                    id={`${idPrefix}phoneNumber`}
                                    {...register('phoneNumber')}
                                    control={control}
                                    errorText={formState.errors.phoneNumber?.message}
                                    value={data.phoneNumber}
                                    labelText="Phone Number*"
                                    placeholderText="Enter Phone Number here"
                                    isRequired={isRequired(schema, 'phoneNumber', true)}
                                    autocomplete='off'
                                />
                            </S.SecondTextWrapper>
                        </S.PhoneWrapper>
                        <S.AllAddressWrapper>
                            <S.AddressInputWrapper>
                                <TextInput
                                    id={`${idPrefix}address1`}
                                    {...register('address1')}
                                    control={control}
                                    errorText={formState.errors.address1?.message}
                                    value={data.address1}
                                    labelText="Address 1*"
                                    placeholderText="Enter address1 here"
                                    isRequired={isRequired(schema, 'address1', true)}
                                    autocomplete='off'
                                />
                            </S.AddressInputWrapper>
                            <S.AddressInputWrapper>
                                <TextInput
                                    id={`${idPrefix}address2`}
                                    {...register('address2')}
                                    control={control}
                                    errorText={formState.errors.address2?.message}
                                    value={data.address2}
                                    labelText="Address 2*"
                                    placeholderText="Enter address2 here"
                                    autocomplete='off'
                                />
                            </S.AddressInputWrapper>
                            <S.AddressInputWrapper>
                                <TextInput
                                    id={`${idPrefix}address3`}
                                    {...register('address3')}
                                    control={control}
                                    errorText={formState.errors.address1?.message}
                                    value={data.address1}
                                    labelText="Address 3"
                                    placeholderText="Enter address3 here"
                                    autocomplete='off'
                                />
                            </S.AddressInputWrapper>
                        </S.AllAddressWrapper>
                        <S.CountryWrapper>
                            <S.CountryCityWrapper>
                                <TextInput
                                    id={`${idPrefix}city`}
                                    {...register('city')}
                                    control={control}
                                    errorText={formState.errors.city?.message}
                                    value={data.city}
                                    labelText="City*"
                                    placeholderText="Enter city here"
                                    isRequired={isRequired(schema, 'city', true)}
                                    autocomplete='off'
                                />
                            </S.CountryCityWrapper>
                            <S.CountryCountryWrapper>
                                <S.StyledDropdown
                                    id={`${idPrefix}_country`}
                                    {...register('country')}
                                    control={control}
                                    errorText={formState.errors.country?.message}
                                    value={data.country}
                                    placeholderText="Choose an option"
                                    labelText="Country*"
                                    isRequired={isRequired(schema, '_country', true)}
                                    items={dataCountryCodes?.map(item => ({
                                        value: item.name,
                                        name: item.name
                                    }))}
                                />
                            </S.CountryCountryWrapper>
                        </S.CountryWrapper>
                        <S.PostCodeWrapper>
                            <TextInput
                                id={`${idPrefix}postCode`}
                                {...register('postCode')}
                                control={control}
                                errorText={formState.errors.postCode?.message}
                                value={data.postCode}
                                labelText="Post Code*"
                                placeholderText="Enter post code here"
                                isRequired={isRequired(schema, 'postCode', true)}
                                autocomplete='off'
                            />
                        </S.PostCodeWrapper>
                        <S.ConditionSpan>By accepting the Terms & Conditions I confirm that the card I am using to make payment is registered to me, or a legal guardian, and does not belong to any other third party</S.ConditionSpan>
                        <S.CheckboxWrapper>
                            <Checkbox
                                id={`${idPrefix}_termsAndConditionsCheckbox`}
                                {...register('termsAndConditionsCheckbox')}
                                control={control}
                                value={false}
                                errorText={formState.errors.termsAndConditionsCheckbox?.message}
                                labelText="By ticking the box I agree to the terms and conditions."
                                isRequired={true}
                                onChange={handleChange}
                            />
                        </S.CheckboxWrapper>
                        <S.ButtonWrapper>
                            <S.styledButton
                                variant="primary"
                                type="submit"
                                label="Pay for Tournament"
                                icon="ArrowRight32"
                                disabled={isDisabled}
                            />
                        </S.ButtonWrapper>
                    </S.FormContainer>
                </S.MyDetailsForm>
            </S.FormWrapper>
        }
        {paymentpage && <TournamentPayment tournamentEntrantId={tournamentEntrantId} amount={amount} currency={currency} addressDetails={addressDetails} tournamentName={tournamentName} />}
    </>
    );
};