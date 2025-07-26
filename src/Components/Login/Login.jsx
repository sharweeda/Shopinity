    import { useFormik } from 'formik'
    import React, {  useContext, useState } from 'react'
    import * as yup from 'yup'
    import axios from 'axios'
    import { Link, useNavigate } from 'react-router-dom'
    import { UserContext } from '../../Context/UserContext';
    import {jwtDecode} from 'jwt-decode'


    export default function Login() {
    let {setToken}=useContext(UserContext)
    let navigate = useNavigate();
    
    const [ setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handelLogin(values) {
        console.log(values);
        console.log('Login');

        try {
        setIsLoading(true); 
        
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values); 
        console.log(response);
        setToken(response?.data?.token);
        localStorage.setItem('token', response?.data?.token);
        jwtDecode(response?.data?.token);
        console.log(jwtDecode(response?.data?.token));
        

        
        setTimeout(() => navigate('/'), 2000);
        
        

        } 
        catch (error) {
        setApiError(error?.response?.data?.message); 
        console.error(error);
        } 
        finally {
        setIsLoading(false);
        }
    }


    const validationSchema = yup.object().shape({
        email: yup.string().required('email is required').email('please enter valid email'),
        password: yup.string().required('password is required').matches(/^[A-Z][a-z]{5,10}$/,
    `must be
    * Start with a letter (either uppercase or lowercase).
    * Be between 6 and 9 characters in total.
    * Can only contain letters (A-Z or a-z) and numbers (0-9)
    `),
    })

    const formik = useFormik({
    initialValues:{
    email:'',
    password:'',
    },
    onSubmit:handelLogin,
    validationSchema,
    })

    return (
        <>
        {isLoading ? <div className="flex justify-center items-center h-screen">
                            <ClipLoader size={50} color="#3B82F6" />
                        </div> : <div className="container m-auto py-8">
        <h2 className='text-blue-500 font-semibold text-center'>Login Now :</h2>

        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">

            <div className="relative z-0 w-full  mb-5 group">
                <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-lightblue-800 dark:text-red-500" role="alert">{formik.errors.email}</div> : null}


            <div className="relative z-0 w-full  mb-5 group">
                <input onBlur={formik.handleBlur} onChange={formik.handleChange}   type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-lightblue-800 dark:text-red-500" role="alert">{formik.errors.password}</div> : null}

            <div className="flex  justify-between ">
                <button type="submit" className="text-white mx-2 bg-blue-700 hover:bg-bluw-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                <span  ><Link to={'/register'} className=' font-semibold hover:text-blue-600 hover:transition-all sm-w-auto '>Register Now... </Link></span>
            </div>        
        </form>
        </div> }

        </>
    );
    }
