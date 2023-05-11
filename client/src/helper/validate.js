import toast from 'react-hot-toast'
import { authenticate } from './helper'

export const usernameValidate = async(values) => {
    toast.loading('Cheking...')
    const errors = usernameVerify({}, values);

    if(values.username){
        const { status } = await authenticate(values.username);
        toast.dismiss()
        if(status !== 200){
            errors.exist = toast.error('User does not exist...!')
        }
    }

    return errors;
}

export const passwordValidate = async(values) => {
    const errors = passwordVerify({}, values);

    return errors;
}

export const resetPasswordValidate = async(values) => {
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirmPassword){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

export const registerValidate = async(values) => {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

export const profileValidate = async(values) => {
    const errors = emailVerify({}, values);
    return errors;
}


const passwordVerify = (errors = {}, values) => {
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}


const usernameVerify = (error = {}, values) => {
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

const emailVerify = (error = {}, values) => {
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}