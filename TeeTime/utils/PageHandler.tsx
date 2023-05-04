/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { Extras } from '../components/Extras/Extras';
import { MyDetails } from '../components/MyDetails/MyDetails';
import { TeeTimeDetails } from '../components/TeeTimeDetails/TeeTimeDetails';
import { Review } from '../components/Review/Review';
import { TeeTimeContext } from '../context/TeeTimeContext';


export const PageHandler = () => {
  const { currentStep } = useContext(TeeTimeContext);

  switch (currentStep) {
    case 0:
      return <TeeTimeDetails/>;
    case 1:
      return <MyDetails/>;
    case 2:
      return <Extras/>;
    case 3:
      return <Review/>;
    default:
      return <></>;
  }
};
