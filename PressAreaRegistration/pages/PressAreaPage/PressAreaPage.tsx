/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Column, Grid, Row } from 'carbon-components-react';
import { PressAreaProvider } from '../../context/PressAreaProvider';
import { MyDetails } from '../MyDetails/MyDetails';
// import * as S from './PressAreaPage.styles';

export const PressAreaPage = () => (
  <PressAreaProvider>
    <Grid>
      <Row>
        <Column sm={12} md={12} lg={12}>
          <MyDetails />
        </Column>
      </Row>
    </Grid>
  </PressAreaProvider>
);
