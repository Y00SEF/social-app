import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Auth.context";
import NavvBar from "../../Components/NavvBar/NavvBar";

import ProfileSkeleton from "../../Components/Skeleton/ProfileSkeleton";
import { Link } from "react-router";
import UploadPhoto from "../../Components/UploadPhoto/UploadPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import PostCard from "../../Components/PostCard/PostCard";

export default function Profile() {
  let { token } = useContext(AuthContext);
  const [user, setuser] = useState(null);
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadVisible, setIsUploadVisible] = useState(false);

  async function getuserData() {
    try {
      let { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: { token },
        }
      );
      setuser(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getuserPosts(userId) {
    try {
      let { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/${userId}/posts?limit=2`,
        {
          headers: { token },
        }
      );
      setposts(data.posts);
      console.log(data.posts);
    } catch (error) {
      console.log(error);
    }
  }
  async function deletePost(postid) {
    console.log(postid);

    try {
      let { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${postid}`,
        {
          headers: {
            token,
          },
        }
      );
      if (data.message == "success") {
        toast.success("Post has been Deleted");
        getuserPosts(user._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("You Can't Delete Your Freind Post");
    }
  }


  useEffect(() => {
    getuserData();
  }, [token]);
  useEffect(() => {
    if (user?._id) {
      getuserPosts(user._id);
    }
  }, [user, token]);

  if (loading) {
    return (
      <>
        <NavvBar />
        <ProfileSkeleton />
      </>
    );
  }

  return (
    <>
      <NavvBar />
      <div className="max-w-2xl mx-auto my-10 p-5 font-sans">
        <h1 className="text-3xl font-bold mb-7 text-gray-800">Profile</h1>

        {/* user Data Section */}
        <div className="bg-gray-50 rounded-lg p-7 shadow-md border border-gray-200 relative">
          <div className="flex items-center gap-5 mb-7 pb-5 border-b-2 border-gray-200">
            <div className="relative group">
              <img
                src={user?.photo}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              />
              <button
                onClick={() => setIsUploadVisible(!isUploadVisible)}
                className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition cursor-pointer"
                title="Change Photo"
              >
                <FontAwesomeIcon icon={faCamera} className="text-gray-600" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-600">ID: {user?._id}</p>
            </div>
          </div>

          {/* Upload Photo Section (Toggleable) */}
          {isUploadVisible && <UploadPhoto />}

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Email
              </label>
              <span className="text-base text-gray-800 font-medium">
                {user?.email}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Date of Birth
              </label>
              <span className="text-base text-gray-800 font-medium">
                {user?.dateOfBirth}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Gender
              </label>
              <span className="text-base text-gray-800 font-medium">
                {user?.gender}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Account Created
              </label>
              <span className="text-base text-gray-800 font-medium">
                {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Link
            to={"/changepassword"}
            className="bg-sky-600 font-bold text-white text-2xl rounded cursor-pointer p-2 mt-20 block text-center"
          >
            Change Password
          </Link>
        </div>

        {/* user Posts Section */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5 text-gray-800">My Posts</h2>

          {/*  */}

          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-black text-4xl font-bold p-2 text-center rounded bg-sky-500">
                Not Posts Yet
              </p>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  postinfo={post}
                  updatePosts={() => getuserPosts(user?._id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
