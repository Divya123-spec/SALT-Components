/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  textColor: string;
  headingFont: string;
  descriptionFont: string;
};

declare global {
  interface EXOComponentStyles {
    commerce_pressAreaForm?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => ({
  // Default theme
  // Override with custom theme
  ...props.theme?.byComponent.commerce_pressAreaForm,
  ...props.theme?.commerce?.pressAreaForm
});
