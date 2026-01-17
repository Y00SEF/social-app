import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faComment,
  faHeart,
  faShare
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "../../Context/Auth.context";
import CommentServices from "../CommentServices/CommentServices";
export default function PostDetails() {
  let { token } = useContext(AuthContext);
  let { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  async function getPostD() {
    try {
      let options = {
        url: `https://linked-posts.routemisr.com/posts/${id}`,
        method: "GET",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      setPost(data.post);
      setLikeCount(data.post?.likes?.length || 0);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPostD();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-6 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="font-medium">Back to Feed</span>
        </Link>

        {/* Post Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <img
              src={post?.user?.photo}
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-lg">
                {post?.user?.name}
              </p>
              <p className="text-sm text-gray-500">
                {post?.createdAt && new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <p className="text-gray-800 text-lg mb-4">{post?.body}</p>
            {post?.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full rounded-lg object-cover"
              />
            )}
          </div>

          {/* Stats & Actions */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>{likeCount} likes</span>
              <span>{post?.comments?.length || 0} comments</span>
            </div>

            <div className="flex items-center justify-around border-t border-b border-gray-100 py-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${isLiked
                  ? "text-red-500 bg-red-50"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <FontAwesomeIcon
                  icon={isLiked ? faHeart : faHeartRegular}
                  className={isLiked ? "animate-pulse" : ""}
                />
                <span className="font-medium">Like</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                <FontAwesomeIcon icon={faComment} />
                <span className="font-medium">Comment</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faShare} />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Comment Services */}
          <CommentServices
            postId={post?._id}
            comments={post?.comments}
            onCommentUpdate={getPostD}
          />
        </div>
      </div>
    </div>
  );
}

