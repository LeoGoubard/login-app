import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Username.module.css";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from "../../helper/validate";
import { useAuthStore } from "../../store/store";

const Username = () => {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername)

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.username)
      navigate('/password')
    }
  })

  return (
    <div className="container mx-auto border">
      <Toaster position='top-center' reverseOrder={false} ></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500"> Explore More by connecting with us.</span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80" className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input className={styles.textbox} {...formik.getFieldProps("username")} type="text" placeholder="username"/>
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