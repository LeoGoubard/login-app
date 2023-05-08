import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Username.module.css";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from "../../helper/validate";
import { useAuthStore } from "../../store/store";
import { verifyPassword } from "../../helper/helper"
import useFetch from "../../hooks/fetch.hook";


const Password = () => {
  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : {
      password : 'admin@123'
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto border">
      <Toaster position='top-center' reverseOrder={false} ></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello {apiData?.firstName || apiData?.username}!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500"> Explore More by connecting with us.</span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={apiData?.profile || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80"} className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input className={styles.textbox} {...formik.getFieldProps("password")} type="password" placeholder="password"/>
              <button className={styles.btn} type="submit">Sign in</button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">Forgot Password ?<Link className="text-red-600 ml-1" to="/recovery">Recover now</Link></span>
            </div>
          </form>
        </div>

      </div>
      
    </div>
  )
}

export default Password