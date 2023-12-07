import React from 'react'
import Auth from '../../components/Auth'
import { registerSchema } from '../../helper/schema';
import { UserRegisterMutation } from '../../hooks/register-user';

const Register = () => {
  console.log('Register')
  const { mutate, isLoading } = UserRegisterMutation();

  const handleSave = (userInformations) => {
    console.log('first', userInformations)
    mutate(userInformations);
  }

  const inputs = [
    { text: "username", type: "text" },
    { text: "email", type: "text" },
    { text: "password", type: "password" },
    { text: "confirmPassword", type: "password" }
  ]

  const params = {
    text: 'Register',
    redirection: 'login',
  };
  return <Auth handleSave={handleSave} isLoading={isLoading} zodSchema={registerSchema} params={params} inputs={inputs} />
}

export default Register