/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { MyDetails } from '../components/MyDetails/MyDetails';
import { LessonDetails } from '../components/LessonDetails/LessonDetails';
import { Review } from '../components/Review/Review';
import { AcademyContext } from '../context/AcademyContext';


export const PageHandler = () => {
  const { currentStep } = useContext(AcademyContext);

  switch (currentStep) {
    case 0:
      return <LessonDetails />;
    case 1:
      return <MyDetails />;
    case 2:
      return <Review />;
    default:
      return <></>;
  }

};
