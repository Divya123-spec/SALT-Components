/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props={
  reviewTextBackgroundColor: string;
  reviewTextFontFamily: string;
  labelColor: string;
  reviewTextColor: string;
};
declare global {
  interface EXOComponentStyles {
    features_review_text?: Partial<Props>;
  }
}

export default (props:EXOThemeProps):Props=>({
    ...props.theme?.ballot?.features_review_text,
    ...props.theme?.byComponent?.features_review_text
});