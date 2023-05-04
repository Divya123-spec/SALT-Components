/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Column, Grid, Row } from 'carbon-components-react';
import { StepsComponent } from '../../components/StepsComponent/StepsComponent';
import { TeeTimeProvider } from '../../context/TeeTimeProvider';
import { TeeTimeContainer } from '../../smart-components/TeeTimeContainer/TeeTimeContainer';
import { PageHandler } from '../../utils/PageHandler';
import * as S from './TeeTimePage.styles';

export const TeeTimePage = () => (
  <TeeTimeProvider>
    <TeeTimeContainer render={() => (
      <S.GridWrapper>
        <Grid>
          <Row>
            <Column sm={12} md={3} lg={3}>
              <S.ProgressContainer>
                <StepsComponent />
              </S.ProgressContainer>
            </Column>
            <Column sm={12} md={6} lg={6}>
              <S.TeeTimeWrapper>{PageHandler()}</S.TeeTimeWrapper>
            </Column>
          </Row>
        </Grid>
      </S.GridWrapper>
    )} />
  </TeeTimeProvider>
);
