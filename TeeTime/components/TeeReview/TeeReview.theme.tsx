/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props={
  sectionContainerBorderColor: string;
  reviewTitleFontFamily: string;
  reviewTitleFontColor: string;
};
declare global {
  interface EXOComponentStyles {
    features_golfer_details_tee_time?: Partial<Props>;
  }
}

export default (props:EXOThemeProps):Props=>({
    ...props.theme?.ballot?.features_golfer_details,
    ...props.theme?.byComponent?.features_golfer_details
});