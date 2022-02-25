import { useCallback, useEffect, useRef, useState } from "react";
import { debounceV2 } from "../Utils/Common";

const InputDebounced = ({ error, label, onChange, ...rest }) => {
  const [touched, setTouched] = useState(false);
  const inputRef = useRef(null);

  const debounceInput = useCallback(debounceV2(onChange, 500), [debounceV2]);
  const blurInput = useCallback(() => setTouched(true), [setTouched]);

  useEffect(() => {
    inputRef.current.addEventListener("input", debounceInput);
    inputRef.current.addEventListener("blur", blurInput);

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("input", debounceInput);
        inputRef.current.removeEventListener("blur", blurInput);
      }
    };
  }, [inputRef, debounceInput, blurInput]);

  return (
    <>
      <label htmlFor={rest.name}>{label}</label>
      <input className="form-control" {...rest} ref={inputRef} />
      <span className="text-error">{touched && error}</span>
    </>
  );
};

export default InputDebounced;
