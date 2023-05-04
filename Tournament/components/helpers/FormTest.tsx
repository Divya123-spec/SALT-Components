/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const FormTest = ({ render, renderStandalone, data }) => {
  const { register, reset, control, watch } = useForm({
    mode: 'onBlur'
  });

  const [standaloneData, setStandaloneData] = useState(data);

  useEffect(() => {
    reset({ field: data });
  }, []);

  const v = watch('field');

  const parseValue = (val: string) => (val === 'false' ? false : val);

  return (
    <div>
      <div>
        <div>react-hook-form</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{render({ control, register })}</div>
          <div style={{ width: '25%', padding: '1rem', background: '#eeeeee' }}>
            <div>{JSON.stringify(v)}</div>
            <div style={{ marginTop: '1rem' }}>
              <input style={{ padding: '0.5rem' }} id="formData" type="text" />
              <button
                style={{ padding: '0.5rem' }}
                onClick={() =>
                  reset({
                    field: parseValue(
                      (document.getElementById('formData')! as HTMLInputElement).value!
                    )
                  })
                }
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </div>

      {renderStandalone && (
        <div style={{ marginTop: '2rem' }}>
          <div>as standalone field</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {renderStandalone({ value: standaloneData, onChangeValue: setStandaloneData })}
            </div>
            <div style={{ width: '25%', padding: '1rem', background: '#eeeeee' }}>
              <div>{JSON.stringify(standaloneData)}</div>
              <div style={{ marginTop: '1rem' }}>
                <input style={{ padding: '0.5rem' }} id="sData" type="text" />
                <button
                  style={{ padding: '0.5rem' }}
                  onClick={() =>
                    setStandaloneData(
                      parseValue((document.getElementById('sData')! as HTMLInputElement).value!)
                    )
                  }
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
