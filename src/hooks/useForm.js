import { useState, useCallback, useRef } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const initialValues = useRef(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const resetForm = useCallback((newValues) => {
    setValues(newValues ?? initialValues.current);
  }, []);

  return { values, handleChange, resetForm };
}
