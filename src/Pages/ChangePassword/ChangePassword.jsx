import {
  faArrowRight,
  faSpinner,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import * as yup from "yup";
import FormField from "../../Components/Ui/FormField/FormField";
import { AuthContext } from "../../Context/Auth.context";
import NavvBar from "../../Components/NavvBar/NavvBar";

export default function ChangePassword() {
  let { token } = useContext(AuthContext);
  let navigate = useNavigate();

  let LoginSchema = yup.object({
    password: yup.string().required("Cuurent Password is required"),

    newPassword: yup
      .string()
      .required("New Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      ),
  });

  async function handleSubmit(values, { setSubmitting }) {
    try {
      const { data } = await axios.patch(
        "https://linked-posts.routemisr.com/users/change-password",
        {
          password: values.password,
          newPassword: values.newPassword,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.message == "success") {
        toast.success(" Password Changed successfully", {
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
        }, 3000);
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
      password: "",
      newPassword: "",
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
    validateOnMount: true,
    validateOnChange: true,
  });

  return (
    <>
      <NavvBar />
      <div className="min-h-screen flex">
        {/* Right Side - Login Form */}
        <div className="w-full  bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo (Visible only on small screens) */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-600 rounded-lg mb-4 text-white">
                <span className="font-bold text-xl">S</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Social Hub</h2>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Change Password
              </h2>
              <p className="text-gray-500">Please enter your new password</p>
            </div>

            <form onSubmit={form.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-1">
                  <FormField
                    name={"password"}
                    id={"password"}
                    inputType={"password"}
                    elementType={"input"}
                    placeholder={"••••••••"}
                    labelText={"Current Password"}
                    value={form.values.password}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    errors={form.errors.password}
                    touched={form.touched.password}
                  />
                </div>
                <div className="bg-gray-50 rounded-xl p-1">
                  <FormField
                    name={"newPassword"}
                    id={"newPassword"}
                    inputType={"password"}
                    elementType={"input"}
                    placeholder={"••••••••"}
                    labelText={"newPassword"}
                    value={form.values.newPassword}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    errors={form.errors.newPassword}
                    touched={form.touched.newPassword}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!form.isValid || form.isSubmitting}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg shadow-sky-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {form.isSubmitting ? (
                  <>
                    <span>Changeing Password...</span>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </>
                ) : (
                  <>
                    <span>Change Password</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
