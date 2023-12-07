import React from 'react'
import Auth from '../../components/Auth'
import { loginSchema } from '../../helper/schema';
import { UserSigninQuery } from '../../hooks/login-user';

const Login = () => {
  const { mutate, isLoading } = UserSigninQuery();

  const handleSave = (userInformations) => {
    mutate(userInformations);
  }

  const inputs = [
    { text: "username", type: "text" },
    { text: "password", type: "password" }
  ]
  const params = {
    text: 'Login',
    redirection: 'register',
  };
  return <Auth handleSave={handleSave} isLoading={isLoading} zodSchema={loginSchema} params={params} inputs={inputs} />
}

export default Login