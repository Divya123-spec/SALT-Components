/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  headingFont:string;
  headingFontColor:string;
  mobileHeadingFont:string;
  descriptionFont:string;
  headlinedescriptionFont:string;
  descriptionColor:string;
  blueLight20: string;
  gray70:string;

};

declare global {
  interface EXOComponentStyles {
    commerce_packageDetails?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => ({
    
    // Override with custom theme
    ...props.theme?.byComponent.commerce_packageDetails,
    ...props.theme?.commerce?.packageDetails
  });
