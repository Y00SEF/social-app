import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/Auth.context";
import { useFormik } from "formik";
import FormField from "../Ui/FormField/FormField";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { PostsContext } from "../usePosts/UsePosts";

export default function PostCreate() {
  const { getAllPosts } = useContext(PostsContext);

  let { token, user } = useContext(AuthContext);
  const validPost = yup.object({
    body: yup
      .string()
      .min(3, "caption canot be less than 3 chatcter")
      .max(500, "caption canot be more than 500 chatcter"),
    image: yup
      .mixed()
      .nullable()
      .test("fileSize", "File is too large (max:5MB)", (file) => {
        if (file == null) {
          return true;
        }
        return file.size < 5 * 1024 * 1024;
      })
      .test("fileType", "Only Image", (file) => {
        if (file == null) {
          return true;
        }

        const validImage = [
          "image/jpg",
          "image/png",
          "image/jpeg",
          "image/gif",
        ];

        return validImage.includes(file.type);
      }),
  });

  async function handleSubmit(values) {
    try {
      let formdata = new FormData();

      formdata.append("body", values.body);
      if (values.image) {
        formdata.append("image", values.image);
      }

      let options = {
        url: "https://linked-posts.routemisr.com/posts",
        method: "POST",
        headers: {
          token,
        },
        data: formdata,
      };

      let { data } = await axios.request(options);
      if (data.message == "success") {
        toast.success("Your Post Has Been Uploded");
        formik.resetForm();
        getAllPosts();
        console.log(data);
      }
    } catch (error) {
      toast.error("Your Post Can NotUploded");
      console.log(error);
    }
  }

  let formik = useFormik({
    initialValues: {
      body: "",
      image: null,
    },
    onSubmit: handleSubmit,
    validationSchema: validPost,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user?.photo}
          alt="Your Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-semibold text-gray-800">
          {user ? user.name : "Loading..."}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit}>
        {/* Text Input */}

        <FormField
          elementType={"textarea"}
          placeholder={"What's on your mind?"}
          className={"min-h-24"}
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.errors.body}
          touched={formik.touched.body}
          name={"body"}
          id={"body"}
        />

        {/* Image Input at Bottom */}

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <label className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors cursor-pointer">
            <FontAwesomeIcon
              icon={faImage}
              className="text-green-500 text-xl"
            />
            <span className="font-medium">
              {formik.values.image ? formik.values.image.name : "Add Photo"}
            </span>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                formik.setFieldValue("image", file);
              }}
            />
          </label>

          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Post
          </button>
        </div>
        {formik.touched.image && formik.errors.image && (
          <p className="alert text-white bg-red-600 rounded p-1 mt-2 text-center">
            {formik.errors.image}
          </p>
        )}
      </form>
    </div>
  );
}
