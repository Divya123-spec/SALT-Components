/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Resolver } from 'react-hook-form';

export const onChangeResolver = (
  onChange: undefined | ((values: any) => void),
  baseResolver: Resolver
) => async (values: any, context: any, options: any) => {
  if (onChange) onChange(values);
  return baseResolver(values, context, options);
};
