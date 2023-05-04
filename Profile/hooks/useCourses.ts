/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { authHeader } from '../../../../../../common/auth-header/authHeader';


export const GET_COURSE_DETAILS = gql`
 query GetHCCourses {
    getHCCourses{
        id
        courseName
    }
  }
`;


export const useGetCourses = () => {
    const { loading, error, data } = useQuery<GenericReturn>(GET_COURSE_DETAILS, {
        context: authHeader()
    });

    return { loading, error, courseDetails: data?.getHCCourses };
};




export type Courses = {
    id:string;
    courseName:string;
};

export type GenericReturn = {
    getHCCourses: Courses[];
};
