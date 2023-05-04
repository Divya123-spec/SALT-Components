/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
 font: string;
 textColor: string;
 frameColor: string;
};

declare global{
    interface EXOComponentStyles{
        commerce_pagination?:Partial<Props>;
    }
}

export default (props:EXOThemeProps): Props=>({
    // Default theme

    // Override with custom theme
    ...props.theme?.byComponent.commerce_pagination,
    ...props.theme?.commerce?.pagination
});