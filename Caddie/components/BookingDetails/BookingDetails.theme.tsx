/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  headingFont: string;
  headingFontColor: string;
  mobileHeadingFont: string;
  descriptionFont: string;
  headlinedescriptionFont: string;
  descriptionColor: string;
  blueLight20: string;
  gray70: string;

};

declare global {
  interface EXOComponentStyles {
    commerce_packageDetails?: Partial<Props>;

  }
}

export default (props: EXOThemeProps): Props => ({
  // Default theme

  /* e.g. 
    leftBackground: props.theme.ui02,
    rightBackground: props.theme.ui01,
    titleFontSize: props.theme.type.type2,
    titleFontFamily: props.theme.font.default,
    textFontSize: props.theme.type.type_1,
    textFontFamily: props.theme.font.default,
    layoutSpacing: props.theme.layoutSm,
    paragraphSpacing: props.theme.spacingMd,
    maxWidth: '74rem',
  */


  // Override with custom theme
  ...props.theme?.byComponent.commerce_packageDetails,
  ...props.theme?.commerce?.packageDetails
});
