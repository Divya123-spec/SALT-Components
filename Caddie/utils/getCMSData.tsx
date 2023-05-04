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
                    const maxGolfers = item.elements?.f_max_golfers.value;
                    const minGolfers = item.elements?.f_min_golfers?.value;
                    const maxTees = item.elements?.max_number_of_tee_times?.value;
                    const reqDate = item.elements?.form__requires_date_of_play.value[0].name;
                    const reqTime = item.elements?.f_requires_tee_time.value[0].codename;
                    const start = item.elements?.start_date.value;
                    const end = item.elements?.end_date.value;
                    const start_Time = item.elements?.start_time?.value;
                    const end_Time = item.elements?.end_time?.value;
                    const hasTeeTimes = item.elements?.course?.linkedItems.length > 0;
                    const cmsCourse = item.elements?.course?.linkedItems.map(course => ({
                        value: course.system?.codename,
                        name: course.elements?.title?.value
                    }));
                    const mandatoryCourse = item.elements?.mandatory_courses?.linkedItems.map(course => ({
                        value: course.system.codename,
                        name: course.elements?.title?.value
                    }));

                    document.dispatchEvent(new CustomEvent('cms_golf_package', {
                        detail: {
                            minGolfers,
                            maxGolfers,
                            maxTees,
                            reqDate,
                            reqTime,
                            start,
                            end,
                            start_Time,
                            end_Time,
                            hasTeeTimes,
                            mandatoryCourse,
                            cmsCourse
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
