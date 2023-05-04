/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import { Intl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';

export const isRequired = (
  schema: ObjectSchema | undefined,
  fieldName: string,
  defaultValue: boolean
) => {
  if (!schema) return defaultValue;

  if (fieldName.includes('.')) {
    const arr = fieldName.replace(/\[.*\]/, '').split('.');

    let b = schema.fields!;
    arr.forEach((c, idx, a) => {
      if (idx !== a.length - 1) {
        b = b[c]?.fields ?? b[c]?.innerType?.fields;
      }
    });

    // eslint-disable-next-line no-underscore-dangle
    const excl = b?.[arr[arr.length - 1]]?._exclusive;
    return excl ? excl.required : defaultValue;
  } else {
    // eslint-disable-next-line no-underscore-dangle
    const excl = schema?.fields?.[fieldName]?._exclusive;
    return excl ? excl.required : defaultValue;
  }
};

export const requiredLabelText = (intl: Intl) => (isReq: boolean, labelText: string) => {
  if (isReq) {
    return labelText + intl.msg('required_suffix', ' ');
  } else {
    return labelText + intl.msg('optional_suffix', ' (optional)');
  }
};
