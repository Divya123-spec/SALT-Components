/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  font: string;
  titleFont: string;
  mobileTitleFont: string;
  mobileHeadingFont: string;
  descriptionFont: string;
  mobileDescriptionFont: string;
  linkColor: string;
  blueLight20: string;
  goldLight80: string;
  headlinedescriptionFont: string;
  headingFontColor: string;
  golferTitleFont: string;
  fontColor: string;

};

declare global {
  interface EXOComponentStyles {
    commerce_teeTime?: Partial<Props>;
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
  ...props.theme?.byComponent.commerce_teeTime,
  ...props.theme?.commerce?.teeTime
});
