import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultVal) => {
  const [state, setState ] = useState(() => {
    let value;
    try{
      value = JSON.parse(window.localStorage.getItem(key)) || defaultVal;
    } catch (err) {
      value = defaultVal;
      console.error(err);
    }
    return value;
  })

  useEffect(() => {
    try{
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error(err)
    }
  },[key, state])

  return [state, setState]
}

export {useLocalStorage};