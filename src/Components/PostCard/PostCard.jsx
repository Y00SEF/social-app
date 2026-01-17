import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../Context/Auth.context";
import { PostsContext } from "../usePosts/UsePosts";
import { toast } from "react-toastify";
import axios from "axios";
import CommentServices from "../CommentServices/CommentServices";

export default function PostCard({ postinfo, updatePosts }) {
  const { getAllPosts } = useContext(PostsContext);
  const { token, user } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(postinfo.likes || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(postinfo.body);
  const [editImage, setEditImage] = useState(postinfo.image || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const deletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${postinfo._id}`,
        { headers: { token } },
      );
      if (data.message === "success") {
        toast.success("Post deleted");
        setIsMenuOpen(false);
        updatePosts ? updatePosts() : getAllPosts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Can't delete post");
    }
  };
  const formData = new FormData();
  formData.append("body", editBody);
  if (editImage) formData.append("image", editImage); // لو في image

  const updatePost = async () => {
    try {
      const { data } = await axios.put(
        `https://linked-posts.routemisr.com/posts/${postinfo._id}`,
        formData,
        { headers: { token } },
      );
      if (data.message === "success") {
        toast.success("Post updated");
        setIsEditing(false);
        if (updatePosts) {
          updatePosts();
        } else {
          postinfo.body = editBody;
          postinfo.image = editImage;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Can't update post");
    }
  };

  return (
    <div className="bg-white mt-6 rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={postinfo.user?.photo}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{postinfo.user?.name}</p>
          <div className="text-xs text-gray-500 hover:underline">
            {new Date(postinfo.createdAt).toLocaleString()}
          </div>
        </div>
        {user?._id === postinfo.user?._id && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 text-xl transition-colors p-1"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2 border-b border-gray-100"
                >
                  <span>✏️</span>
                  <span className="font-medium">Edit Post</span>
                </button>

                <button
                  onClick={deletePost}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                  <span>🗑️</span>
                  <span className="font-medium">Delete Post</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-4 pb-4">
        {isEditing ? (
          <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg">
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows="4"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={updatePost}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditBody(postinfo.body);
                  setEditImage(postinfo.image || "");
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <Link
            to={`/postinfo/${postinfo?._id}`}
            className="text-xl text-gray-500 hover:underline"
          >
            <p className="text-gray-700 mb-3">{postinfo.body}</p>
            {postinfo.image && (
              <img
                src={postinfo.image}
                alt="Post"
                className="w-full rounded-lg object-cover"
              />
            )}
          </Link>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 flex justify-around">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
            isLiked
              ? "text-red-500 bg-red-50"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FontAwesomeIcon icon={isLiked ? faHeart : faHeartRegular} />
          <span className="font-medium">Like</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
          <FontAwesomeIcon icon={faComment} />
          <span className="font-medium">Comment</span>
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied!");
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
        >
          <FontAwesomeIcon icon={faShare} />
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comment Services */}
      <CommentServices
        postId={postinfo._id}
        comments={postinfo.comments}
        onCommentUpdate={updatePosts || getAllPosts}
      />
    </div>
  );
}
