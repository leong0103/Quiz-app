import { useState } from "react";

interface IGetFreshModelObject {
  getFreshModel: () => {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

interface ErrorProp {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function useCreateUserForm({ getFreshModel }: IGetFreshModelObject) {
  const [values, setValues] = useState(getFreshModel());
  const [errors, setErrors] = useState<ErrorProp>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  };
}
