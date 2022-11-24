import { useState } from 'react'

interface IGetFreshModelObject {
  getFreshModel: () => {
    name: string;
    email: string;
}}

interface ErrorProp {
  name?: string;
  email?: string;
}


export default function useForm( {getFreshModel} :IGetFreshModelObject) {

  const [values, setValues] = useState(getFreshModel());
  const [errors, setErrors] = useState<ErrorProp>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values, [name]: value
    })
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  }
}
