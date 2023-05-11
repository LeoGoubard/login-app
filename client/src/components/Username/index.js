import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Username.module.css";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from "../../helper/validate";
import { useAuthStore } from "../../store/store";
import { Avatar, Loader } from '../index';

const Username = () => {
  const navigate = useNavigate();
  const { setLoader, setUsername, auth } = useAuthStore(state => state)

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setLoader(true)
      setUsername(values.username)
      navigate('/password')
    }
  })

  return (
    <div className="container mx-auto border">
      {auth.isLoading && <Loader />}
      <Toaster position='top-center' reverseOrder={false} ></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500"> Explore More by connecting with us.</span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <Avatar />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input className={styles.textbox} onChange={formik.handleChange} value={formik.values.username} id="username" type="text" placeholder="username"/>
              <button className={styles.btn} type="submit">Let's Go</button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">Not a Member <Link className="text-red-600 ml-1" to="/register">Register now</Link></span>
            </div>
          </form>
        </div>

      </div>
      
    </div>
  )
}

export default Username