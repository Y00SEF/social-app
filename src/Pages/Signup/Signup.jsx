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

export default function Signup() {
  let SignSchema = yup.object({
    name: yup
      .string()
      .required("Name Is Required")
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must not exceed 30 characters"),
    email: yup.string().email().required("Please enter a valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      ),
    rePassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    dateOfBirth: yup.string().required("Date of birth is required"),

    gender: yup.string().required("Please select your gender"),
  });

  let navigate = useNavigate();
  async function handleSubmit(values, { setSubmitting }) {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );

      if (data.message == "success") {
        toast.success("🦄 Wow so easy!", {
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

        setTimeout(() => {
          navigate("/login");
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema: SignSchema,
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
            <h1 className="text-5xl font-bold text-white mb-6">Join Social Hub</h1>
            <p className="text-sky-100 text-xl font-light leading-relaxed max-w-md mx-auto">
              Create an account today and start connecting with people from all around the world.
            </p>

            {/* Features List */}
            <div className="mt-12 text-left space-y-4 max-w-xs mx-auto text-white/90">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faMessage} className="text-sm" />
                </div>
                <span>Instant Messaging</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faPhotoFilm} className="text-sm" />
                </div>
                <span>Share Photos & Videos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUsers} className="text-sm" />
                </div>
                <span>Join Communities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Mobile Logo (Visible only on small screens) */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-600 rounded-lg mb-4 text-white">
                <span className="font-bold text-xl">S</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Social Hub</h2>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-500">Join us entirely for free!</p>
            </div>

            {/* Social Signup */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                <span className="text-red-500 font-bold">G</span>
                <span className="text-sm font-medium text-gray-600">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                <span className="text-blue-600 font-bold">f</span>
                <span className="text-sm font-medium text-gray-600">Facebook</span>
              </button>
            </div>

            <div className="relative flex items-center gap-4 mb-6">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Or register with email</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <form onSubmit={form.handleSubmit} className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-1">
                <FormField
                  name={"name"}
                  id={"name"}
                  inputType={"text"}
                  elementType={"input"}
                  placeholder={"Enter Your Full Name"}
                  labelText={"Full Name"}
                  value={form.values.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  errors={form.errors.name}
                  touched={form.touched.name}
                />
              </div>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="bg-gray-50 rounded-xl p-1">
                  <FormField
                    name={"rePassword"}
                    id={"rePassword"}
                    inputType={"password"}
                    elementType={"input"}
                    placeholder={"••••••••"}
                    labelText={"Confirm Password"}
                    value={form.values.rePassword}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    errors={form.errors.rePassword}
                    touched={form.touched.rePassword}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="bg-gray-50 rounded-xl p-1">
                  <FormField
                    name={"dateOfBirth"}
                    id={"dateOfBirth"}
                    inputType={"date"}
                    elementType={"input"}
                    labelText={"Date of Birth"}
                    value={form.values.dateOfBirth}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    errors={form.errors.dateOfBirth}
                    touched={form.touched.dateOfBirth}
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-3 h-full flex flex-col justify-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={form.values.gender === "male"}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      />
                      <span className="text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={form.values.gender === "female"}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-gray-300"
                      />
                      <span className="text-gray-700">Female</span>
                    </label>
                  </div>
                  {form.touched.gender && form.errors.gender && (
                    <div className="text-red-500 text-xs mt-1">{form.errors.gender}</div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!form.isValid || form.isSubmitting}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg shadow-sky-200 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {form.isSubmitting ? (
                  <>
                    <span>Creating Account...</span>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-sky-600 font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
