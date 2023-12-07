import styles from '../../styles/Username.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Auth = ({ zodSchema, handleSave, isLoading, params, inputs }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '45%', paddingTop: '3em' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">{params.text}</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Happy to see you!</span>
          </div>

          <form className="py-1" onSubmit={handleSubmit(handleSave)}>
            <div className="textbox flex flex-col items-center justify-center gap-4">
              {inputs.map((inputItem, index) => (
                <div key={index} className="w-full flex flex-col items-center justify-center">
                  <input
                    {...register(inputItem.text)}
                    className={styles.textbox}
                    type={inputItem.type}
                    placeholder={inputItem.text}
                  />
                  {errors[inputItem.text] && <p className={styles.error}>{errors[inputItem.text]?.message}</p>}
                </div>
              ))}
              <button className={styles.btn} type="submit">
                {isLoading ? 'loading...' : params.text}
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                {params.redirection === 'login' ? 'Already registered' : 'Need an account'} ?{' '}
                <Link className="text-red-500" to={`/${params.redirection}`}>
                  {params.redirection === 'login' ? 'Login Now' : 'Register Now'}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
