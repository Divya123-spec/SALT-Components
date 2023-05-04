/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

const golferInformationObject = {
    ibm_image:'',
    handicap: '',
    preferredCourse: '',
    leftorRightHanded: '',
    homeGolfClub: '',
    golferId: '',
    emailID: '',
    displayName:'',
    country:'',
    dob:'',
    city:'',
    gender:'',
    firstname:'',
    lastname:'',
    address: ''
};

const GolferInfoContext = React.createContext(golferInformationObject);


export const GolferInfoProvider = GolferInfoContext.Provider;
export default GolferInfoContext;