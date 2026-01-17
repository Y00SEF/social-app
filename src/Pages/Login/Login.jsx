import {
  faArrowRight,
  faAward,
  faBell,
  faDownload,
  faHeart,
  faMessage,
  faPhotoFilm,
  faSpinner,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import * as yup from "yup";
import FormField from "../../Components/Ui/FormField/FormField";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth.context";

export default function Login() {
  let { token, setToken } = useContext(AuthContext);
  let navigate = useNavigate();

  let LoginSchema = yup.object({
    email: yup.string().email().required("Please enter a valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      ),
  });

  async function handleSubmit(values, { setSubmitting }) {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );

      console.log(data.token);

      if (data.message == "success") {
        toast.success(" Welcome Back", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setToken(data.token);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (err) {
      toast.error(err.response?.data?.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setSubmitting(false);
    }
  }

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
    validateOnMount: true,
    validateOnChange: true,
  });

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Side - Visual & Branding */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-sky-600 to-blue-700 relative overflow-hidden items-center justify-center">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 text-center px-10">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                <FontAwesomeIcon icon={faUsers} className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">Social Hub</h1>
            <p className="text-sky-100 text-xl font-light leading-relaxed max-w-md mx-auto">
              Connect with friends, share your moments, and discover the world around you.
            </p>

            {/* Stats */}
            <div className="mt-12 flex justify-center gap-8 text-white/90">
              <div className="text-center">
                <h4 className="text-2xl font-bold">10M+</h4>
                <p className="text-sm text-sky-200">Users</p>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-bold">2M+</h4>
                <p className="text-sm text-sky-200">Posts</p>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-bold">4.9</h4>
                <p className="text-sm text-sky-200">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo (Visible only on small screens) */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-600 rounded-lg mb-4 text-white">
                <span className="font-bold text-xl">S</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Social Hub</h2>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-500">Please enter your details to sign in.</p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                <span className="text-red-500 font-bold">G</span>
                <span className="text-sm font-medium text-gray-600">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                <span className="text-blue-600 font-bold">f</span>
                <span className="text-sm font-medium text-gray-600">Facebook</span>
              </button>
            </div>

            <div className="relative flex items-center gap-4 mb-8">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <form onSubmit={form.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-1">
                  <FormField
                    name={"email"}
                    id={"email"}
                    inputType={"email"}
                    elementType={"input"}
                    placeholder={"name@example.com"}
                    labelText={"Email Address"}
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    errors={form.errors.email}
                    touched={form.touched.email}
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-1">
                  <FormField
                    name={"password"}
                    id={"password"}
                    inputType={"password"}
                    elementType={"input"}
                    placeholder={"••••••••"}
                    labelText={"Password"}
                    value={form.values.password}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    errors={form.errors.password}
                    touched={form.touched.password}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                  <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sky-600 hover:text-sky-700 font-medium transition-colors">Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={!form.isValid || form.isSubmitting}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg shadow-sky-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {form.isSubmitting ? (
                  <>
                    <span>Signing In...</span>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-sky-600 font-bold hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
