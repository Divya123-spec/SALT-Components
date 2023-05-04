/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { MyDetails } from '../components/MyDetails/MyDetails';
import { PackageDetails } from '../components/PackageDetails/PackageDetails';
import { Review } from '../components/Review/Review';
import { TeeTime } from '../components/TeeTime/TeeTime';
import { GolfPackageContext } from '../context/GolfPackageContext';


export const PageHandler = () => {
  const { currentStep } = useContext(GolfPackageContext);

  switch (currentStep) {
    case 0:
      return <PackageDetails />;
    case 1:
      return <TeeTime />;
    case 2:
      return <MyDetails />;
    case 3:
      return <Review />;
    default:
      return <></>;
  }

};
