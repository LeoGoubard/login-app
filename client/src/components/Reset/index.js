import React, { useEffect } from 'react'
import styles from "../../styles/Username.module.css";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidate } from "../../helper/validate";
import { resetPassword } from '../../helper/helper';
import { useAuthStore } from '../../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../../hooks/fetch.hook';


const Reset = () => {
  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')

  const formik = useFormik({
    initialValues: {
        password: '',
        confirmPassword: ''
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not reset</b>
      })

      resetPromise.then(function(){
        navigate('/password')
      })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'password'} replace={true} ></Navigate>

  return (
    <div className="container mx-auto border">
      <Toaster position='top-center' reverseOrder={false} ></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "50%" }}>

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500"> Enter new password.</span>
          </div>
          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
            <input className={styles.textbox} {...formik.getFieldProps("password")} type="password" placeholder="New password"/>
            <input className={styles.textbox} {...formik.getFieldProps("confirmPassword")} type="password" placeholder="Confirm password"/>
              <button className={styles.btn} type="submit">Sign in</button>
            </div>
          </form>
        </div>

      </div>
      
    </div>
  )
}

export default Reset