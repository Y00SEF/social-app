import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faReply,
  faPaperPlane,
  faTrash,
  faPen,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/Auth.context";
import axios from "axios";
import { toast } from "react-toastify";

export default function CommentServices({ postId, comments, onCommentUpdate }) {
  const { token, user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");

  // Edit State
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  /* ================= Create Comment ================= */
  async function createComment() {
    if (!commentText.trim()) return;

    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/comments",
        {
          content: commentText,
          post: postId,
        },
        {
          headers: { token },
        },
      );

      if (data.message === "success") {
        toast.success("Comment added");
        setCommentText("");
        if (onCommentUpdate) onCommentUpdate();
      }
    } catch (error) {
      console.log(error);
      toast.error("Can't add comment");
    }
  }

  /* ================= Delete Comment ================= */
  async function deleteComment(commentId) {
    // Optimistic UI could be handled by parent, but here we just wait for API
    try {
      const { data } = await axios.delete(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        {
          headers: { token },
        },
      );

      if (data.message === "success") {
        toast.success("Comment deleted");
        if (onCommentUpdate) onCommentUpdate();
      }
    } catch (error) {
      console.log(error);
      toast.error("Can't delete comment");
    }
  }

  /* ================= Update Comment ================= */
  function startEditing(comment) {
    setEditingCommentId(comment._id);
    setEditCommentText(comment.content);
  }

  function cancelEditing() {
    setEditingCommentId(null);
    setEditCommentText("");
  }

  async function updateComment(commentId) {
    if (!editCommentText.trim()) return;

    try {
      const { data } = await axios.put(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        {
          content: editCommentText,
        },
        {
          headers: { token },
        },
      );

      if (data.message === "success") {
        toast.success("Comment updated");
        setEditingCommentId(null);
        setEditCommentText("");
        if (onCommentUpdate) onCommentUpdate();
      }
    } catch (error) {
      console.log(error);
      toast.error("Can't update comment");
    }
  }

  return (
    <>
      {/* Create Comment Input */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <img
            src={user?.photo}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="flex-1 flex items-center bg-white rounded-full border border-gray-200 px-4 py-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createComment()}
              placeholder="Add a comment..."
              className="flex-1 border-none outline-none text-sm"
            />
            <button
              onClick={createComment}
              className="text-sky-600 hover:text-sky-700 ml-2"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-0">
        {comments?.map((comment, index) => {
          const isOwner = user?._id === comment.commentCreator?._id;
          const isEditing = editingCommentId === comment._id;

          return (
            <div
              key={index}
              className="flex items-start gap-3 px-4 py-3 border-t border-gray-100 bg-gray-50 group"
            >
              <img
                src={comment.commentCreator?.photo}
                alt="Comment User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="bg-white rounded-lg px-3 py-2 shadow-sm relative group/content">
                  {/* Header: Name and Actions (if owner) */}
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-800">
                      {comment.commentCreator?.name}
                    </p>

                    {/* Edit/Delete Actions */}
                    {isOwner && !isEditing && (
                      <div className="flex gap-2 opacity-0 group-hover/content:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditing(comment)}
                          className="text-gray-400 hover:text-sky-600 text-xs"
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button
                          onClick={() => deleteComment(comment._id)}
                          className="text-gray-400 hover:text-red-600 text-xs"
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content or Edit Input */}
                  {isEditing ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-sky-500"
                        autoFocus
                      />
                      <button
                        onClick={() => updateComment(comment._id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">{comment.content}</p>
                  )}
                </div>

                {/* Footer: Time and Interactions */}
                <div className="flex items-center gap-4 mt-1 ml-2">
                  <span className="text-xs text-gray-400">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString()
                      : "Just now"}
                  </span>
                  <button className="text-xs text-gray-500 hover:text-sky-600 flex items-center gap-1 cursor-pointer">
                    <FontAwesomeIcon icon={faThumbsUp} /> Like
                  </button>
                  <button className="text-xs text-gray-500 hover:text-sky-600 flex items-center gap-1 cursor-pointer">
                    <FontAwesomeIcon icon={faReply} /> Reply
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {(!comments || comments.length === 0) && (
          <div className="px-4 py-6 text-center text-gray-500">
            <p className="text-sm">No comments yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
