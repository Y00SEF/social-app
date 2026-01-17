import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { AuthContext } from "../../Context/Auth.context";
import { PostsContext } from "../usePosts/UsePosts";

export default function UploadPhoto() {
    const { getAllPosts } = useContext(PostsContext);
    const { token, user } = useContext(AuthContext);

    /* ================= Validation ================= */
    const validPost = yup.object({
        photo: yup
            .mixed()
            .required("Photo is required")
            .test("fileSize", "File is too large (max 5MB)", (file) => {
                return file && file.size <= 5 * 1024 * 1024;
            })
            .test("fileType", "Only images are allowed", (file) => {
                return (
                    file &&
                    ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
                        file.type
                    )
                );
            }),
    });

    /* ================= Submit ================= */
    async function handleSubmit(values, { resetForm }) {
        try {
            const formData = new FormData();
            formData.append("photo", values.photo);

            const { data } = await axios.put(
                "https://linked-posts.routemisr.com/users/upload-photo",
                formData,
                {
                    headers: {
                        token: token,
                    },
                }
            );

            if (data.message === "success") {
                toast.success("Photo uploaded successfully");
                resetForm();
                getAllPosts();
            }
        } catch (error) {
            toast.error("Photo upload failed");
            console.log(error);
        }
    }

    /* ================= Formik ================= */
    const formik = useFormik({
        initialValues: {
            photo: null,
        },
        validationSchema: validPost,
        onSubmit: handleSubmit,
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={user?.photo || "/default-avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-semibold text-gray-800">
                    {user?.name || "Loading..."}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
                {/* Change Photo */}
                <div className="mt-2">
                    <label
                        htmlFor="photo"
                        className="group cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center gap-4 hover:border-sky-500 transition"
                    >
                        {/* Preview */}
                        {formik.values.photo ? (
                            <img
                                src={URL.createObjectURL(formik.values.photo)}
                                alt="preview"
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faImage}
                                    className="text-gray-400 text-2xl group-hover:text-sky-500 transition"
                                />
                            </div>
                        )}

                        {/* Text */}
                        <div>
                            <p className="font-semibold text-gray-700 group-hover:text-sky-600 transition">
                                {formik.values.photo ? "Change Photo" : "Upload Photo"}
                            </p>
                            <p className="text-sm text-gray-500">
                                JPG, PNG, GIF (max 5MB)
                            </p>
                        </div>
                    </label>

                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                formik.setFieldValue("photo", file);
                                formik.setFieldTouched("photo", true);
                            }
                        }}
                    />

                    {formik.touched.photo && formik.errors.photo && (
                        <p className="text-red-600 text-sm mt-2 text-center">
                            {formik.errors.photo}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!formik.values.photo}
                    className={`w-full mt-4 py-2 rounded-lg font-semibold transition
                        ${formik.values.photo
                            ? "bg-sky-600 hover:bg-sky-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }
                    `}
                >
                    Post
                </button>
            </form>
        </div>
    );
}
