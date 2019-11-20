import { useState, useCallback } from "react";

export function useToggle(initial: boolean): [boolean, (data?) => void] {
  const [toggle, setToggle] = useState(initial);
  return [
    toggle,
    (value: boolean) => {
      if (value === undefined || value === null) {
        return setToggle(!toggle);
      }
      setToggle(value);
    },
  ];
}

export function useBoolean(
  initial: boolean,
): [boolean, () => void, () => void] {
  const [state, setState] = useState(initial);
  return [state, () => setState(true), () => setState(false)];
}

export function usePromiseProcessing<T, ARG>(
  promiseFunc: (arg: ARG) => Promise<T>,
  config: {
    onSuccess?: (result: T) => void;
    onError?: (error: string) => void;
    onFinish?: () => void;
  } = {},
) {
  const [{ result, error, loading }, setPromiseInfo] = useState<{
    loading: boolean;
    error: string;
    result: T;
  }>({
    result: null,
    loading: false,
    error: null,
  });

  const start = (arg: ARG) => {
    setPromiseInfo({
      result: null,
      loading: true,
      error: null,
    });

    promiseFunc(arg)
      .then(data => {
        setPromiseInfo({
          result: data,
          loading: false,
          error: null,
        });
        config.onSuccess && config.onSuccess(data);
      })
      .catch(error => {
        setPromiseInfo({
          result: null,
          loading: false,
          error: error.errorMessage,
        });
        config.onError && config.onError(error.errorMessage);
      })
      .then(() => {
        config.onFinish && config.onFinish();
      });
  };

  return {
    result,
    loading,
    error,
    start,
  };
}

export function useForceUpdate() {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
}
