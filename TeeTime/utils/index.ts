/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// Place for all our utils

export const utilFunction = () => true;

export const buildCourseNameFromCodename = (courseName?: string) => {
    if (!courseName) {
      return '';
    }
    const splitName = courseName.split(/_/g);
    const actualCourseName: Array<string> = [];
    for (let i = 0; i < splitName.length; i += 1) {
      actualCourseName.push(splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1));
    }
    

    return actualCourseName.join(' ');
  };

export const scrollToElement=(ref)=>{
  const headerOffset = 150;
  const elementPosition = ref.current?.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};