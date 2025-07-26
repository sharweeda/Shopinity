import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Register() {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(values) {
    setIsLoading(true);
    setApiError('');

    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );

      localStorage.setItem('token', response?.data?.token);
      setToken(response?.data?.token);

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setApiError(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(3).max(20),
    email: yup.string().required('Email is required').email(),
    password: yup
      .string()
      .required('Password is required')
      .matches(/^[A-Z][a-z]{5,10}$/, 'Start with uppercase & 5-10 letters'),
    rePassword: yup
      .string()
      .required('Confirm password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    phone: yup
      .string()
      .required('Phone is required')
      .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian number'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="#3B82F6" />
        </div>
      ) : (
        <div className="container m-auto py-8">
          <h2 className="text-blue-500 font-semibold text-center">Register Now :</h2>

          <form
            onSubmit={formik.handleSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800"
          >
            {/* API Error */}
            {apiError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-lightblue-800 dark:text-red-500" role="alert">
                {apiError}
              </div>
            )}

            {/* Name */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                id="name"
                {...formik.getFieldProps('name')}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                {...formik.getFieldProps('email')}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="password"
                {...formik.getFieldProps('password')}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Re-password */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                {...formik.getFieldProps('rePassword')}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
              {formik.touched.rePassword && formik.errors.rePassword && (
                <p className="text-red-500 text-sm">{formik.errors.rePassword}</p>
              )}
            </div>

            {/* Phone */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="phone"
                id="phone"
                {...formik.getFieldProps('phone')}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="text-white mx-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {isLoading ?  <ClipLoader size={50} color="#3B82F6" /> : 'Register'}
              </button>
              <span>
                <Link to={'/login'} className="font-semibold hover:text-blue-600">
                  Already have account?
                </Link>
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
