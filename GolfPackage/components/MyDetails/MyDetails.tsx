/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormHeader,
  FormBody,
  isRequired,
  Field,
  FormFooter,
  RadioButtonGroup
} from '@exo/frontend-components-forms';
import { useIsAuthenticated } from '@azure/msal-react';
import mapValues from 'lodash/mapValues';
import * as S from './MyDetails.styles';
import { GolfPackageContext } from '../../context/GolfPackageContext';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { GolferDetails } from '../GolferDetails/GolferDetails';
import { scrollToElement } from '../../utils';

const schema = yup
  .object()
  .shape({
    my_firstName: yup.string().required('Please enter your first name'),
    my_lastName: yup.string().required('Please enter your last name'),
    my_email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter a valid email address'),
    my_phoneNumber: yup
      .string()
      .matches(/^(\+|00)[0-9][0-9 \-().]{4,32}$/, 'Please enter a valid format')
      .required('Please enter your phone number'),
    my_country: yup.string().required('Please select your country'),
    my_address: yup.string().notRequired(),
    isLeadGolfer: yup.string().required('Please specify your tee time request'),
    leadGolfer_firstName: yup.string().when('isLeadGolfer', {
      is: 'false',
      then: yup.string().required('Please enter lead golfer first name'),
      otherwise: yup.string().notRequired()
    }),
    leadGolfer_lastName: yup.string().when('isLeadGolfer', {
      is: 'false',
      then: yup.string().required('Please enter lead golfer last name'),
      otherwise: yup.string().notRequired()
    }),
    leadGolfer_email: yup.string().when('isLeadGolfer', {
      is: 'false',
      then: yup
        .string()
        .notRequired(),
      otherwise: yup.string().notRequired()
    }),
    leadGolfer_homeGolfClub: yup.string().when('isLeadGolfer', {
      is: 'false',
      then: yup.string().notRequired(),
      otherwise: yup.string().notRequired()
    }),
    leadGolfer_handicap: yup.string().notRequired()
  })
  .required();
const otherSchema = yup.lazy((obj) =>
  yup.object(
    // @ts-ignore
    mapValues(obj, (val, key) => {
      if (key.toString().startsWith('golfer_')) {
        return yup.string().notRequired();
      } else return schema[key];
    })
  )
);

export const MyDetails = React.forwardRef<HTMLFormElement>(({ idPrefix = 'myDetails' }, ref) => {

  const pageRef = useRef(null);

  const {
    onNextStep,
    steps,
    currentStep,
    goToReview,
    myDetails,
    setMyDetails,
    isLeadGolfer, setIsLeadGolfer,
    leadGolfer, setLeadGolfer,
    otherGolfers, setOtherGolfers,
    onStepBack,
    packageDetails,
    goToReviewPage,
    hasTeeTime
  } = useContext(GolfPackageContext);
  const createTeeFieldNames = (
    id = 0,
    firstName = '',
    lastName = '',
    email = '',
    homeGolfClub = '',
    handicap = ''
  ) => ({
    [`firstName_${id}`]: firstName,
    [`lastName_${id}`]: lastName,
    [`email_${id}`]: email,
    [`homeGolfClub_${id}`]: homeGolfClub,
    [`handicap_${id}`]: handicap
  });
  const isAuthenticated = useIsAuthenticated();
  const detailsForAuthUser = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: ''
  };

  if(isAuthenticated) {
    if (typeof window !== 'undefined') {
      const userInfo = window.sessionStorage.profileData ? JSON.parse(window.sessionStorage.profileData) : '';
      if(userInfo) {
        detailsForAuthUser.firstName =  userInfo.firstname;
        detailsForAuthUser.lastName =  userInfo.lastname;
        detailsForAuthUser.email =  userInfo.email;
        detailsForAuthUser.address =  userInfo.address;
        detailsForAuthUser.country =  userInfo.country;
      }
    }
  }
  const { register, handleSubmit, formState, control, watch, reset, getValues, setValue } = useForm(
    {
      mode: 'all',
      defaultValues:
      {
        my_firstName: detailsForAuthUser.firstName,
        my_lastName: detailsForAuthUser.lastName,
        my_email: detailsForAuthUser.email,
        my_phoneNumber: myDetails?.phoneNumber,
        my_country: detailsForAuthUser.country,
        my_address: detailsForAuthUser.address,
        isLeadGolfer: isLeadGolfer?.valueOf().toString(),
        leadGolfer_firstName: leadGolfer?.firstName,
        leadGolfer_lastName: leadGolfer?.lastName,
        leadGolfer_email: leadGolfer?.email,
        leadGolfer_homeGolfClub: leadGolfer?.homeGolfClub,
        ...Object.assign({}, ...otherGolfers.map((item, id) => (
          createTeeFieldNames(
            id,
            item.firstName,
            item.lastName,
            item.email,
            item.homeGolfClub,
            item.handicap
          )
        )))
      },
      resolver: yupResolver(otherSchema)
    }
  );
  const { isValid } = formState;
  const showContinueButton = isValid;
  const watchLeadGolfer = watch('isLeadGolfer', String(isLeadGolfer));

  const onError = (err) => {
    throw new Error(err);
  };

  const getGolferObject = (
    firstName = '',
    lastName = '',
    email = '',
    homeGolfClub = '',
    handicap = ''
  ) => ({
    firstName,
    lastName,
    email,
    homeGolfClub,
    handicap
  });
  const onSubmit = (formData) => {
    const myDetailsForm = myDetails;
    const { isLeadGolfer: leadForm } = formData;
    Object.entries(formData).forEach(([key, value]) => {
      if (key.startsWith('my_')) {
        myDetailsForm[key.split('my_')[1]] = value;
      }
    });

    const golfers = Array.from(
      { length: Number(packageDetails.adultGolfers) + Number(packageDetails.under16Golfers) - 1 },
      (_, i) =>
        getGolferObject(
          formData[`golfer_${i + 1}_firstName`],
          formData[`golfer_${i + 1}_lastName`],
          formData[`golfer_${i + 1}_email`],
          formData[`golfer_${i + 1}_homeGolfClub`],
          formData[`golfer_${i + 1}_handicap`]
        )
    );

    setMyDetails({ ...myDetailsForm });
    setLeadGolfer({
      firstName: leadForm === 'true' ? formData.my_firstName : formData.leadGolfer_firstName,
      lastName: leadForm === 'true' ? formData.my_lastName : formData.leadGolfer_lastName,
      email: leadForm === 'true' ? formData.my_email : formData.leadGolfer_email,
      handicap: formData.leadGolfer_handicap,
      homeGolfClub: formData.leadGolfer_homeGolfClub
    });
    setIsLeadGolfer(leadForm === 'true');
    setOtherGolfers(golfers);

    if (goToReview) {
      goToReviewPage();
    } else {
      onNextStep();
    }
  };
  const renderGolfers = (length) => {
    const GolfersArray: Array<JSX.Element> = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= length; i++) {
      GolfersArray.push(
        <GolferDetails
          id={`${idPrefix}_golfer_${i}`}
          // eslint-disable-next-line react/no-array-index-key
          key={`golfer_${i}`}
          idPrefix={`golfer_${i}`}
          control={control}
          formState={formState}
          register={register}
          schema={otherSchema}
          golfersDetails={otherGolfers[length - 1]}
          title={`Golfer ${i + 1}`}
        />
      );
    }
    return GolfersArray.map((item) => item);
  };
  const setLeaderData = (
    firstName = '',
    lastName = '',
    email = '',
    homeGolfClub = '',
    handicap = ''
  ) => {
    setValue('leadGolfer_firstName', firstName, { shouldValidate: true });
    setValue('leadGolfer_lastName', lastName, { shouldValidate: true });
    setValue('leadGolfer_email', email, { shouldValidate: true });
    setValue('leadGolfer_homeGolfClub', homeGolfClub, { shouldDirty: true, shouldValidate: true });
    setValue('leadGolfer_handicap', handicap, { shouldDirty: true, shouldValidate: true });
  };
  useEffect(() => {
    scrollToElement(pageRef);

  }, []);

  useEffect(() => {
    if (watchLeadGolfer === 'true') {
      setLeaderData(
        getValues('my_firstName'),
        getValues('my_lastName'),
        getValues('my_email'),
        leadGolfer?.homeGolfClub,
        leadGolfer?.handicap
      );
    }

    if (watchLeadGolfer === 'false') {
      setLeaderData(
        leadGolfer?.firstName,
        leadGolfer?.lastName,
        leadGolfer?.email,
        leadGolfer?.homeGolfClub,
        leadGolfer?.handicap
      );
    }
  }, [watchLeadGolfer]);

  return (
    <S.MyDetails
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      onError={onError}
      data={{
        my_firstName: myDetails?.firstName,
        my_lastName: myDetails?.lastName,
        my_email: myDetails?.email,
        my_phoneNumber: myDetails?.phoneNumber,
        my_country: myDetails?.country,
        my_address: myDetails?.address,
        isLeadGolfer: isLeadGolfer?.valueOf().toString(),
        leadGolfer_firstName: leadGolfer?.firstName,
        leadGolfer_lastName: leadGolfer?.lastName,
        leadGolfer_email: leadGolfer?.email,
        leadGolfer_homeGolfClub: leadGolfer?.homeGolfClub,
        ...Object.assign({}, ...otherGolfers.map((item, id) => (
          createTeeFieldNames(
            id,
            item.firstName,
            item.lastName,
            item.email,
            item.homeGolfClub,
            item.handicap
          )
        )))
      }}
      form={{ reset, handleSubmit, formState }}
      ref={ref}
    >
      <FormHeader>
        <S.Heading ref={pageRef}>My Details</S.Heading>
      </FormHeader>

      <FormBody>
        <GolferDetails
          id={idPrefix}
          // eslint-disable-next-line react/no-array-index-key
          key="my_details"
          idPrefix="my"
          control={control}
          formState={formState}
          register={register}
          schema={otherSchema}
          golfersDetails={myDetails}
          title=""
        />
        <Field>
          <RadioButtonGroup
            id={`${idPrefix}_isLeadGolfer`}
            {...register('isLeadGolfer')}
            isRequired={isRequired(schema, 'isLeadGolfer', true)}
            control={control}
            value={String(
              isLeadGolfer !== undefined ? isLeadGolfer : true
            )}
            name="isLeadGolfer"
            labelText="Please specify your tee time request"
            errorText={formState.errors.isLeadGolfer?.message}
            items={[
              { value: 'true', name: 'I am requesting to book as lead golfer' },
              {
                value: 'false',
                name: 'I am requesting to book on behalf of someone else (this includes commercial operators)'
              }
            ]}
          />
        </Field>

        <GolferDetails
          id={'leadGolfer'}
          // eslint-disable-next-line react/no-array-index-key
          key="leadGolfer"
          idPrefix="leadGolfer"
          control={control}
          formState={formState}
          register={register}
          schema={otherSchema}
          golfersDetails={
            watchLeadGolfer === 'true'
              ? { ...myDetails }
              : { ...leadGolfer }
          }
          isLeadGolfer={watchLeadGolfer === 'true'}
          title="Lead Golfer"
        />

        {renderGolfers(Number(packageDetails.adultGolfers) + Number(packageDetails.under16Golfers) - 1)}
      </FormBody>

      <FormFooter>
        <ButtonWrapper variation={showContinueButton ? 'space-between' : 'right'}>
          <>
            {showContinueButton && (
              <ButtonUI
                variant="primary"
                type="submit"
                key="go-to-golfer-details-button"
                icon="ArrowRight16"
                label={`Continue to ${goToReview ? steps[3]?.title : steps[currentStep + 1]?.title}`}
              />
            )}
            <S.BackButton
              variant="ghost"
              type="button"
              key="go-back-button"
              onClick={onStepBack}
              label={
                hasTeeTime
                  ? `Back to ${steps[currentStep - 1]?.title}`
                  : `Back to ${steps[currentStep - 2]?.title}`
              }

            />
          </>
        </ButtonWrapper>
      </FormFooter>
    </S.MyDetails>
  );
});
