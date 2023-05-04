/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { MyDetails } from '../components/MyDetails/MyDetails';
import { Review } from '../components/Review/Review';
import { CaddieContext } from '../context/CaddieContext';
import { BookingDetails } from '../components/BookingDetails/BookingDetails';
import { CaddieDetails } from '../components/CaddieDetails/CaddieDetails';


export const PageHandler = () => {
  const { currentStep } = useContext(CaddieContext);

  switch (currentStep) {
    case 0:
      return <BookingDetails />;
    case 1:
      return <CaddieDetails />;
    case 2:
      return <MyDetails />;
    case 3:
      return <Review />;
    default:
      return <></>;
  }

};
