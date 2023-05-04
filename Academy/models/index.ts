/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// Place for all our custom models

export type Lessondetails={
  dateOfLesson:string;
  haveSpecificInstructor:boolean;
  specificInstructor?:string;
  lessonGoals:string;
  otherInformation?:string;
  handicap:string;
  HowLongPlaying?:string;
};

export type MyDetails={
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    address?:string;
};

export type Steps={
  title:string;
}[];
