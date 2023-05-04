/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SmartComponentProps } from '@exo/frontend-common-utils';

export const GolfPackageContainer = ({ render }: Props) => render({});

type Props = SmartComponentProps<{
  render: (props: GolfPackageContainerProps) => JSX.Element;
}>;

export type GolfPackageContainerProps = {};
