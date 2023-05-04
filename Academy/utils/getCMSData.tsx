/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import React, { PureComponent } from 'react';

interface IGetCMSDataProps {
    name: string;
    content_type: string;
}

interface IGetCMSDataState {
}
export class GetCMSData extends PureComponent<IGetCMSDataProps, IGetCMSDataState> {
    render() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { name, content_type } = this.props;
        return (
            <CmsContainer name={name} key={`get_${name}_data`}>
                <CmsSpot name='' spec={{ content_type }} render={({ item }) => {
                    const instructor = item.elements?.name?.value;
                    document.dispatchEvent(new CustomEvent('cms_instructor', {
                        detail: {
                            instructor
                        }
                    }));

                    return (
                        <></>
                    );
                }} />
            </CmsContainer>
        );
    }
}
