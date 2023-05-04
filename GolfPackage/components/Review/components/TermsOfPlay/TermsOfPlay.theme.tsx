/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props={
  subtitleFontFamily: string;
  subtitleFontColor: string;
};

export default (props:EXOThemeProps):Props=>({
    ...props.theme?.ballot?.features_terms_of_play,
    ...props.theme?.byComponent?.features_terms_of_play
});