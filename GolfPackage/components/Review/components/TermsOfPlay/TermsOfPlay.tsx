/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect } from 'react';
import { Checkbox } from 'carbon-components-react';
import { ReviewHeader } from '../ReviewHeader/ReviewHeader';
import * as S from './TermsOfPlay.styles';

export const TermsOfPlay = ({ clickHandler, isChecked }: Props) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    });
  }, []);
  return (
    <S.TermsOfPlayContainer>
      <S.ContentContainer>
        <ReviewHeader title="Terms of play" goToStep={4} />
        <S.Subtitle>Please agree in order to submit your application</S.Subtitle>
        <Checkbox
          checked={isChecked}
          onClick={clickHandler}
          labelText="I meet the handicap requirement and will show my handicap certificate to the starter on the day"
          id="terms-of-play"
        />
      </S.ContentContainer>
    </S.TermsOfPlayContainer>
  );
};

type Props = {
  clickHandler: () => void;
  isChecked: boolean;
};
