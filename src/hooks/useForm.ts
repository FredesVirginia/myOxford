import { useState, ChangeEvent, SyntheticEvent } from "react";

type useFormReturnType<T> = {
  form: T;
  onChange: (e: ChangeEvent<HTMLInputElement> | SyntheticEvent) => void;
  customOnChange: <K extends keyof T>(value: T[K], key: K) => void;
  updateForm: (form: T) => void;
};

const useForm = <T extends NonNullable<object>>(initialValues: T): useFormReturnType<T> => {
  const [formState, setFormState] = useState<T>(initialValues);

  const onChange = (e: ChangeEvent<HTMLInputElement> | SyntheticEvent) => {
    if ("target" in e) {
      const target = e.target as HTMLInputElement;
      const { name, value, type } = target;

      switch (type) {
        case "checkbox":
          setFormState({
            ...formState,
            [name]: target.checked,
          });
          break;
        default: {
          const updatedFormState = {
            ...formState,
            [name]: value,
          };
          setFormState(updatedFormState);
          break;
        }
      }
    }
  };

  const updateForm = (form: T) => {
    const updatedFormState = {
      ...formState,
      ...form,
    };
    setFormState(updatedFormState);
  };

  const customOnChange = <K extends keyof T>(value: T[K], key: K) => {
    const updatedFormState = {
      ...formState,
      [key]: value,
    };
    setFormState(updatedFormState);
  };

  return { form: formState, onChange, customOnChange, updateForm };
};

export default useForm;