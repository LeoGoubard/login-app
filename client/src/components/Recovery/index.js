import React, { useEffect, useState } from 'react'
import styles from "../../styles/Username.module.css";
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../../store/store';
import { generateOTP, verifyOTP } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';


const Recovery = () => {
  const { username } = useAuthStore(state => state.auth)
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();
  const [spoiler, setSpoiler] = useState('');

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if(OTP) {
        setSpoiler(OTP);
        return toast.success('OTP has been send to your email!')
      }
      return toast.error('Problem while generating OTP!')
    })
  }, [username])

  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const { status } = await verifyOTP({ username, code: OTP })

      if(status === 201) {
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wrong OTP! check email again')
    }
  }

  const resendHandler = async() => {
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: 'Sending...',
      success: <b>OOTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>
    })

    sendPromise.then((OTP) => {
      setSpoiler(OTP);
    })
  }

  return (
    <div className="container mx-auto border">
      <Toaster position='top-center' reverseOrder={false} ></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500"> Enter OTP to recover password.</span>
            <div className="">If you use gmail, use the following spoiler on hover: <span className="opacity-0 hover:opacity-100 text-black">{spoiler}</span></div>
          </div>
          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
                <div className="input text-center">
                    <span className="py-4 text-sm text-left text-gray-500">
                        Enter 6 digit OTP send to your email address.
                    </span>
                    <input onChange={(e) => setOTP(e.target.value)} className={styles.textbox} type="text" placeholder="OTP"/>
                </div>
              <button className={styles.btn} type="submit">Recover</button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className="text-gray-500">Can't get OTP ?<button onClick={resendHandler} className="text-red-600 ml-1">Resend</button></span>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Recovery