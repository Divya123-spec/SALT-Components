/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormHeader,
  FormBody,
  isRequired,
  Field,
  FieldRow,
  FormFooter
} from '@exo/frontend-components-forms';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { useIsAuthenticated } from '@azure/msal-react';
import * as S from './PackageDetails.styles';
import { GolfPackageContext } from '../../context/GolfPackageContext';
import { ButtonWrapper } from '../../../../ButtonWrapper/ButtonWrapper';
import { ButtonUI } from '../../../../ButtonUI/ButtonUI';
import { NotificationComponent } from '../../../../NotificationComponent/NotificationComponent';
import { GetCMSData } from '../../utils/getCMSData';
import { scrollToElement } from '../../utils';
import { useGetUserDetails } from '../../../Profile/hooks/useGetUserDetails';

export const PackageDetails = React.forwardRef<HTMLFormElement>(
  ({ idPrefix = 'packageDetails' }, ref) => {
    const [minimumGolfers, setMinimumGolfers] = useState(1);
    const [maximumGolfer, setMaxGolfers] = useState(16);
    const [nrOfGolfers, setNrOfGolfers] = useState<Array<{ value; name }>>();
    const [minorsGolfers, setMinors] = useState<Array<{ value; name }>>();
    const pageRef = useRef(null);
    const schema = yup
      .object()
      .shape({
        golfPackage: yup.string().required('Please select  golf package'),
        adultGolfers: yup.string().required('Please select number of golfers'),
        under16Golfers: yup.string().required('Please select number of golfers')
      })
      .required();


    const {
      onNextStep,
      steps,
      onAnyStepBack,
      currentStep,
      goToReview,
      packageDetails,
      setTeeTimes,
      setNrOfTees,
      setPackageDetails,
      goToReviewPage,
      hasTeeTime, setHasTeeTime
    } = useContext(GolfPackageContext);
    const isAuthenticated = useIsAuthenticated();
    if(isAuthenticated) {
      if (typeof window !== 'undefined' && window.sessionStorage.userDetails) {
        const result = JSON.parse(window.sessionStorage.userDetails);
        const userValues = result.idTokenClaims; 
        let emailID = '';
        if(result && userValues){
          emailID = userValues && userValues.email ? userValues.email: userValues.emails[0];
        }
        // eslint-disable-next-line
        const { userDetails, loading } = useGetUserDetails(emailID)!;
        if(userDetails && !loading) {
          window.sessionStorage.setItem('profileData', JSON.stringify(userDetails));
        }
      }
    }

    const { register, handleSubmit, formState, control, reset, setValue, watch } = useForm({
      mode: 'all',
      defaultValues: {
        golfPackage: packageDetails?.golfPackage.value,
        adultGolfers: packageDetails?.adultGolfers.toString(),
        under16Golfers: packageDetails?.under16Golfers.toString() || '0'
      },
      resolver: yupResolver(schema)
    });
    const { isValid } = formState;
    const showContinueButton = isValid;

    const onError = (err) => {
      throw new Error(err);
    };

    const onSubmit = (formData) => {
      const { adultGolfers, golfPackage, under16Golfers } = formData;

      setPackageDetails({
        adultGolfers: Number(adultGolfers),
        under16Golfers: Number(under16Golfers),
        golfPackage: {
          value: golfPackage,
          name: document.getElementById(`${idPrefix}_golf_package`)?.innerText || ''
        }
      });
      if (packageDetails?.golfPackage.value !== golfPackage || packageDetails?.adultGolfers !== Number(adultGolfers) || packageDetails?.under16Golfers !== Number(under16Golfers)) {
        setTeeTimes([]);
        setNrOfTees(1);
      }
      if (goToReview && !(packageDetails?.golfPackage.value !== golfPackage || packageDetails?.adultGolfers !== Number(adultGolfers) || packageDetails?.under16Golfers !== Number(under16Golfers))) {
        goToReviewPage();
      } else if (goToReview && packageDetails?.golfPackage.value !== golfPackage || packageDetails?.adultGolfers !== Number(adultGolfers) || packageDetails?.under16Golfers !== Number(under16Golfers)) {
        onNextStep();
      } else if (hasTeeTime) {
        onNextStep();
      } else {
        onAnyStepBack(currentStep + 2);
      }
    };

    const adults = watch('adultGolfers', packageDetails?.adultGolfers.toString());
    const golfPackage = watch('golfPackage', packageDetails?.golfPackage.value);

    const onRemove = () => { };

    useEffect(() => {
      const tempArray: Array<{ value: any; name: any }> = [];
      // eslint-disable-next-line no-plusplus
      for (let i = minimumGolfers; i <= maximumGolfer; i++) {
        tempArray.push({
          value: i.toString(),
          name: i.toString()
        });
      }
      setNrOfGolfers(tempArray);
    }, [maximumGolfer, minimumGolfers]);

    useEffect(() => {
      const tempMinors: Array<{ value: any; name: any }> = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= maximumGolfer; i++) {
        tempMinors.push({
          value: i.toString(),
          name: i.toString()
        });
      }
      setMinors(tempMinors);
    }, [maximumGolfer]);

    useEffect(() => {
      if (golfPackage !== packageDetails?.golfPackage.value) {
        setValue('adultGolfers', '', { shouldDirty: true });
        setValue('under16Golfers', '0', { shouldDirty: true });

      }
    }, [golfPackage]);


    useEffect(() => {
      goToReview || packageDetails.golfPackage.value && scrollToElement(pageRef);


      const listener = document.addEventListener('cms_golf_package', (e) => {
        // @ts-ignore
        const { minGolfers, maxGolfers, hasTeeTimes } = e.detail;
        setMinimumGolfers(Number(minGolfers));
        Number(maxGolfers) > 0 && setMaxGolfers(Number(maxGolfers));
        setHasTeeTime(hasTeeTimes);
      });
      return () => {
        // @ts-ignore
        document.removeEventListener('cms_golf_package', listener);
      };
    }, []);

    return (
      <S.PackageDetails
        onSubmit={(event) => handleSubmit(onSubmit)(event)}
        onError={onError}
        data={{
          golfPackage: packageDetails?.golfPackage,
          adultGolfers: packageDetails?.adultGolfers.toString(),
          under16Golfers: packageDetails?.under16Golfers.toString() || '0'
        }}
        form={{ reset, handleSubmit, formState }}
        ref={ref}
      >
        <FormHeader>
          <S.Heading ref={pageRef}>Package Details</S.Heading>
          <S.HeadlineDescription>
            You can request to book a Golf Package using this digital form. Please be aware that
            some packages are seasonal, and there is a minimum amount of golfers required with some
            group packages. Find out more about our golf packages.{' '}
          </S.HeadlineDescription>
        </FormHeader>

        <FormBody>
          <Field className="golf_dropdown">
            <CmsContainer name="" spec={{ content_type: 'offers_and_packages', limit: '99' }}>
              <CmsSpot
                name=""
                spec={{ content_type: 'offers_and_packages', limit: '99' }}
                render={({ items }) => (
                  <S.StyledDropdown
                    id={`${idPrefix}_golf_package`}
                    {...register('golfPackage')}
                    control={control}
                    isRequired={isRequired(schema, 'golfPackage', true)}
                    value={packageDetails?.golfPackage?.name}
                    errorText={formState.errors.golfPackage?.message}
                    labelText="Golf package"
                    placeholderText="Select Golf Package"
                    items={items.filter((item) => item.elements?.available_on_form?.value[0]?.codename === 'yes').map(item => ({
                      value: item.system.codename,
                      name: item.elements.name.value
                    }))}
                  />
                )}
              />
            </CmsContainer>
          </Field>

          {golfPackage && (
            <>
              <CmsContainer name={golfPackage} key={`${golfPackage}_container`}>
                <CmsSpot
                  name=""
                  spec={{
                    content_type: 'offers_and_packages',
                    richTextFieldName: 'tee_time_price'
                  }}
                  key={`${golfPackage}_spot`}
                />
              </CmsContainer>
              <GetCMSData name={golfPackage} content_type="offers_and_packages" />
            </>
          )}
          <LayoutSpacing size="sm" />

          <Field className="golf_dropdown" key={golfPackage}>
            <S.Description>
              Please specify you the amount of golfers you wish to book onto the package. Proof of
              age may be required for golfers under 16. Please refer to the price list table for the
              total price of the booking.
            </S.Description>
            {minimumGolfers !== undefined && minimumGolfers > 1 && (
              <NotificationComponent
                notification={{
                  id: 'golfersRequired',
                  kind: 'info',
                  title: 'Minimum amount of golfers required',
                  subtitle: `A minimum of ${minimumGolfers} golfers are required to book this package`
                }}
                onRemove={onRemove}
              />
            )}

            <FieldRow widths={['50%', '50%']}>
              {nrOfGolfers && (
                <S.StyledDropdown
                  id={`${idPrefix}_total_adult_golfer`}
                  {...register('adultGolfers')}
                  control={control}
                  isRequired={isRequired(schema, 'adultGolfers', true)}
                  value={packageDetails?.adultGolfers.toString()}
                  errorText={formState.errors.adultGolfers?.message}
                  labelText="Total adult golfers"
                  placeholderText="Select total adult golfers"
                  items={nrOfGolfers}
                  key={`${golfPackage}_total_adult_golfer`}
                />
              )}

              {minorsGolfers && (
                <S.StyledDropdown
                  id={`${idPrefix}_total_minor_golfer`}
                  {...register('under16Golfers')}
                  control={control}
                  isRequired={isRequired(schema, 'under16Golfers', true)}
                  value={packageDetails?.under16Golfers.toString() || '0'}
                  errorText={formState.errors.under16Golfers?.message}
                  labelText="Total golfers under 16"
                  placeholderText="Select total golfers under 16"
                  items={
                    adults
                      ? minorsGolfers.slice(0, maximumGolfer - Number(adults) + 1)
                      : minorsGolfers
                  }
                  key={`${golfPackage}_total_minor_golfer`}
                />
              )}
            </FieldRow>
          </Field>
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
                  label={
                    hasTeeTime
                      ? `Continue to ${goToReview && !(packageDetails?.golfPackage.value !== golfPackage || packageDetails?.adultGolfers !== Number(watch('adultGolfers')) || packageDetails?.under16Golfers !== Number(watch('under16Golfers'))) ? steps[3]?.title : steps[currentStep + 1]?.title}`
                      : `Continue to ${goToReview && !(packageDetails?.golfPackage.value !== golfPackage || packageDetails?.adultGolfers !== Number(watch('adultGolfers')) || packageDetails?.under16Golfers !== Number(watch('under16Golfers'))) ? steps[3]?.title : steps[currentStep + 2]?.title}`
                  }
                />
              )}
            </>
          </ButtonWrapper>
        </FormFooter>
      </S.PackageDetails>
    );
  }
);
