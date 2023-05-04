/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
    Field,
    FormHeader,
    TextInput,
    FormBody
} from '@exo/frontend-components-forms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { ButtonUI, ButtonWrapper } from '../../../../index';
import * as S from './EditGolferDetails.styles';
import { useGolferDetailsSubmit } from '../../hooks/useGolferDetailsSubmit';

const schema = yup
    .object()
    .shape({
        handicap: yup
            .string()
            .test('handicap-validator', 'Your handicap must be less than or equal to 36', (value) => {
                const handicapIndex = value;
                if ((handicapIndex && handicapIndex.match(/^[^a-zA-Z]+$/)) || handicapIndex === '') {
                    if(handicapIndex === '')
                    {
                        return true;
                    }
                    const signRegex = /^[+-]/;
                    let sign = '';
                    let stringIndex = handicapIndex;
                    if (signRegex.test(handicapIndex)) {
                        sign = handicapIndex.charAt(0);
                        stringIndex = handicapIndex.substring(1);
                    }
                    const handicapResult = parseFloat(stringIndex);
                    if (!Number.isNaN(handicapResult)) {
                        switch (sign) {
                            case '+':
                                if (handicapResult <= 7) {
                                    return true;
                                }
                                return false;
                            default:
                                // both default and - cases where the same in this situation
                                if (handicapResult <= 36 ) {
                                    return true;
                                }
                                return false;
                        }
                    }
                }
                return false;
            }),
        preferredCourse: yup.string(),
        leftOrRightHanded: yup.string(),
        homeGolfClub: yup.string()
    });

export const EditGolferDetails = ({ golferDetails, courseDetails, handleEditSubmit, golferStateInfo }) => {
    
    const { submitGolferDetails } = useGolferDetailsSubmit();

    const sessionDetails = sessionStorage.getItem('userDetails') ? JSON.parse(sessionStorage.getItem('userDetails') as any) : '';
    let emailNew = '';
    if(sessionDetails && sessionDetails.idTokenClaims){
        emailNew =sessionDetails &&  sessionDetails.idTokenClaims.email ? sessionDetails.idTokenClaims.email : sessionDetails.idTokenClaims.emails[0];
    }
    const emailID = emailNew || '';

    const idPrefix = 'golfer_details';

    const { register, handleSubmit, formState, control, reset } = useForm({
        mode: 'all',
        defaultValues: {
            handicap: golferStateInfo.handicap?golferStateInfo.handicap:golferDetails.handicap,
            preferredCourse: golferStateInfo.preferredCourse?golferStateInfo.preferredCourse:golferDetails.preferredCourse,
            leftOrRightHanded:golferStateInfo.leftorRightHanded?golferStateInfo.leftorRightHanded: golferDetails.leftorRightHanded,
            homeGolfClub: golferStateInfo.homeGolfClub?golferStateInfo.homeGolfClub:golferDetails.homeGolfClub
        },
        resolver: yupResolver(schema)
    });

    const onError = (err) => {
        throw new Error(err);
    };

    const onSubmit = (formData) => {
        golferStateInfo.handicap =formData.handicap;// eslint-disable-line no-param-reassign
        golferStateInfo.homeGolfClub =formData.homeGolfClub;// eslint-disable-line no-param-reassign
        golferStateInfo.leftorRightHanded =formData.leftOrRightHanded;// eslint-disable-line no-param-reassign
        golferStateInfo.preferredCourse =formData.preferredCourse;// eslint-disable-line no-param-reassign
        golferDetails.handicap = formData.handicap;// eslint-disable-line no-param-reassign
        golferDetails.homeGolfClub = formData.homeGolfClub;// eslint-disable-line no-param-reassign
        golferDetails.leftorRightHanded = formData.leftOrRightHanded;// eslint-disable-line no-param-reassign
        golferDetails.preferredCourse = formData.preferredCourse;// eslint-disable-line no-param-reassign

        formData.leftOrRightHanded = formData.leftOrRightHanded === '' ? null : formData.leftOrRightHanded;// eslint-disable-line no-param-reassign
        if (formData.leftOrRightHanded !== null) {
            if (formData.leftOrRightHanded === 'Right Handed')
                formData.leftOrRightHanded = true;// eslint-disable-line no-param-reassign
            else
                formData.leftOrRightHanded = false;// eslint-disable-line no-param-reassign    
        }
        const selectedCourse = courseDetails.filter((item) => item?.courseName === formData.preferredCourse);
        formData.preferredCourse = formData.preferredCourse === '' ? null : selectedCourse?.[0].id;// eslint-disable-line no-param-reassign
        formData.handicap = formData.handicap === '' ? null : formData.handicap;// eslint-disable-line no-param-reassign
        formData.homeGolfClub = formData.homeGolfClub === '' ? null : formData.homeGolfClub;// eslint-disable-line no-param-reassign
        
        submitGolferDetails({
            variables: {
                email: emailID,
                handicap: formData.handicap,
                leftrighthanded: formData.leftOrRightHanded,
                preferredcourse: formData.preferredCourse,
                homeclub: formData.homeGolfClub
            },
            errorPolicy: 'all'
        });
        // setGolferInfoEdited(true);
        handleEditSubmit();

    };

    const courses = courseDetails.map((item) => item.courseName);

    const leftOrRightHanded: Array<string> = ['Left Handed', 'Right Handed'];

    return (
        <S.MyDetailsForm
            onSubmit={(event) => handleSubmit(onSubmit)(event)}
            onError={onError}
            data={golferDetails}
            form={{ reset, handleSubmit, formState }}
        >
            <FormHeader>
                <S.Heading>Golfer Information</S.Heading>
            </FormHeader>

            <S.FormContainer>
                <FormBody>
                    <S.DetailsFieldRow widths={['50%', '50%']}>
                        <div>
                            <S.Styledlabel>Handicap</S.Styledlabel>
                            <S.TextInputWrapper>
                                <TextInput
                                    id={`${idPrefix}_handicap`}
                                    {...register('handicap')}
                                    control={control}
                                    errorText={formState.errors.handicap?.message}
                                    value={golferStateInfo.handicap?golferStateInfo.handicap:golferDetails.handicap}
                                    placeholderText="Enter Handicap"
                                />
                            </S.TextInputWrapper>
                        </div>
                        <Field className="golf_dropdown">
                            <div>
                                <S.Styledlabel>Preferred Course</S.Styledlabel>
                                <S.TextInputWrapper>
                                    <S.StyledDropdown
                                        id={`${idPrefix}_preferredCourse`}
                                        {...register('preferredCourse')}
                                        control={control}
                                        value={golferStateInfo.preferredCourse?golferStateInfo.preferredCourse:golferDetails.preferredCourse}
                                        placeholderText="Choose an option"
                                        isRequired={'Not Required'}
                                        labelText={''}
                                        items={courses.map(course => ({
                                            value: course,
                                            name: course
                                        }))}
                                    />
                                </S.TextInputWrapper>
                            </div>
                        </Field>
                    </S.DetailsFieldRow>

                    <S.DetailsFieldRow widths={['50%', '50%']}>
                        <Field className="golf_dropdown">
                            <div>
                                <S.Styledlabel>Left/Right Handed</S.Styledlabel>
                                <S.TextInputWrapper>
                                    <S.StyledDropdown
                                        id={`${idPrefix}_handed`}
                                        {...register('leftOrRightHanded')}
                                        control={control}
                                        value={golferStateInfo.leftorRightHanded?golferStateInfo.leftorRightHanded: golferDetails.leftorRightHanded}
                                        placeholderText="Choose an option"
                                        isRequired={'Not Required'}
                                        labelText={''}
                                        items={leftOrRightHanded.map(item => ({
                                            value: item,
                                            name: item
                                        }))}
                                    />
                                </S.TextInputWrapper>
                            </div>
                        </Field>
                        <div>
                            <S.Styledlabel>Home Golf Club</S.Styledlabel>
                            <S.TextInputWrapper>
                                <TextInput
                                    id={`${idPrefix}_homeGolfClub`}
                                    {...register('homeGolfClub')}
                                    control={control}
                                    value={golferStateInfo.homeGolfClub?golferStateInfo.homeGolfClub:golferDetails.homeGolfClub}
                                    placeholderText="Enter Home Golf Club"
                                />
                            </S.TextInputWrapper>
                        </div>
                    </S.DetailsFieldRow>
                </FormBody>

                <S.DetailsFormFooter>
                    <ButtonWrapper variation="space-between">
                        <S.StyledButton>
                            {true && (
                                <ButtonUI
                                    variant="tertiary"
                                    type="submit"
                                    label="Save"
                                    icon="ArrowRight32"
                                />
                            )}
                        </S.StyledButton>
                    </ButtonWrapper>
                </S.DetailsFormFooter>
            </S.FormContainer>
        </S.MyDetailsForm>
    );
};

