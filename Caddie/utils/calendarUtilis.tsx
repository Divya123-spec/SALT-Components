/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const addDays = (date) => {
    const oldDate = new Date(date);
    oldDate.setDate(oldDate.getDate() + 2);
    return oldDate.getTime();
};
export const getMinDate = (date) => {
    const oldDate = new Date(date);
    oldDate.setDate(oldDate.getDate() + 2);
    return oldDate.toLocaleDateString();
};