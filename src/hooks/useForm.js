import { useCallback, useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = useCallback(() => {
    setValues(inputValues);
  }, [inputValues]);

  return { values, handleChange, resetForm };
}
