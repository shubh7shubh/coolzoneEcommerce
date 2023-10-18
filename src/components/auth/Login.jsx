import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoggedInUser } from './authSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginUserAsync } from './authSlice';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';






export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies(["token"]);
    const error = useSelector(selectError);
    const user = useSelector(selectLoggedInUser);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (user?.success) {
            console.log(user, "hjfdsfsj")
            setCookies("token", user.token);
            localStorage.setItem("isAdmin", false);
            localStorage.setItem("userId", user.user._id);
            localStorage.setItem("token", user.token);
            toast(" User Login Successful")
            navigate("/")
        }
    }, [user])


   

    return (
        <>
            {/* {user?.success && <Navigate to="/" replace={true}></Navigate>} */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://cdn.pixabay.com/photo/2018/08/29/17/07/ecommerce-3640321_1280.jpg"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        noValidate
                        onSubmit={handleSubmit((data) => {
                            dispatch(
                                loginUserAsync({ email: data.email, password: data.password, token:"djkfsdlfkjdksjaflkjdfklsajdflak" })
                            );
                        })}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register('email', {
                                        required: 'email is required',
                                        // pattern: {
                                        //   value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                        //   message: 'email not valid',
                                        // },
                                    })}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.email && (
                                    <p className="text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link
                                        to="/forgot-password"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register('password', {
                                        required: 'password is required',
                                    })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.password && (
                                    <p className="text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            {error && <p className="text-red-500">{error || error.message}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Create an Account
                        </Link>
                    </p>

                </div>
            </div>
        </>
    );
}
