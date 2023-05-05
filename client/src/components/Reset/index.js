import React from 'react'
import styles from "../../styles/Username.module.css";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidate } from "../../helper/validate";


const Reset = () => {

  const formik = useFormik({
    initialValues: {
        password: '',
        confirmPassword: ''
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  })

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