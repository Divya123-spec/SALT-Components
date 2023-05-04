/* eslint-disable react/no-array-index-key */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Steps, Step } from '@exo/frontend-components-base';
import { ChevronLeft16 } from '@carbon/icons-react';
import * as S from './StepsComponent.styles';
import { GolfPackageContext } from '../../context/GolfPackageContext';

export const StepsComponent = () => {
  const isMobile = useMediaQuery({ query: '(max-width:1023px)' });
  const { steps, currentStep, onAnyStepBack, onStepBack, hasTeeTime } = useContext(GolfPackageContext);

  return (
    <S.StepsComponent>
      {!isMobile && (
        <Steps current={currentStep} onClick={(e) => onAnyStepBack(e)}>
          {steps.flatMap((item, id) => (
            <Step key={`${item.title}_${id}`} title={item.title} isDisabled={item.title === 'Tee time details' && !hasTeeTime || currentStep < id} />
          ))}
        </Steps>
      )}
      {isMobile && currentStep > 0 && (
        <S.PreviousStep onClick={onStepBack}>
          <ChevronLeft16 />
          <S.Text>Back to {steps[currentStep - 1].title}</S.Text>
        </S.PreviousStep>
      )}
    </S.StepsComponent>
  );
};
