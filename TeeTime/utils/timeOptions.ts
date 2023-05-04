/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const generateTime=(interval='30', startTime='06:00', endTime='19:00')=>{

    const startHour=Number(startTime.replace('.', ':')?.split(':')[0]);
    const startMinute=Number(startTime.replace('.', ':')?.split(':')[1]);

    const endHour=Number(endTime.replace('.', ':')?.split(':')[0]);
    const endMinute=Number(endTime.replace('.', ':')?.split(':')[1]);

    const  times: Array<{ value;name }> = [];
    const start = startHour*60+startMinute; 
    const end=endHour*60+endMinute;
    // eslint-disable-next-line no-plusplus
    // eslint-disable-next-line operator-assignment
    for (let i=start;i<=end; i=i+Number(interval)) {
      const hh = Math.floor(i/60);
      const mm = (i%60);

      times.push({
        value:`${(String(0)+(hh%24)).slice(-2)}:${(String(0)+mm).slice(-2)}`,
        name:`${(String(0)+(hh%24)).slice(-2)}:${(String(0)+mm).slice(-2)}`
      });

    }
    return times;
  };
  
  

  