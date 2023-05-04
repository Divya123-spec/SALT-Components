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
    blueLight20: string;
    linkColor: string;
    
  };
  
  declare global {
    interface EXOComponentStyles {
      commerce_myDetails?: Partial<Props> | undefined;
    }
  }
  
  export default (props: EXOThemeProps): Props => ({
    
      ...props.theme?.byComponent.commerce_myDetails,
      ...props.theme?.commerce?.myDetails
    });