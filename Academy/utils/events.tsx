/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

function on(eventType, listener) {
    document.addEventListener(eventType, listener);
  }
  
  function off(eventType, listener) {
    document.removeEventListener(eventType, listener);
  }
  
  function once(eventType, listener) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    on(eventType, handleEventOnce);
  
    function handleEventOnce(event) {
      listener(event);
      off(eventType, handleEventOnce);
    }
  }
  
  function trigger(eventType, data) {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
  }
  
  export { on, once, off, trigger };