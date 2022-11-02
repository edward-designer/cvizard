import { useEffect, useState } from 'react';

function useStateStorage<T>(
  name: string,
  defaultValue: T
): [T, (value: T) => void] {
  useEffect(() => {
    const localStoredValue = localStorage.getItem(name);
    if (localStoredValue) {
      setState(JSON.parse(localStoredValue));
    }
  }, [name]);
  const [state, setState] = useState<T>(defaultValue);
  const setStateStorage = (value: T) => {
    setState(value);
    localStorage.setItem(name, JSON.stringify(value));
  };
  return [state, setStateStorage];
}

export default useStateStorage;
