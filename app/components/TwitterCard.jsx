"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaRegComment , FaEye} from "react-icons/fa";
import Button from "./Button";
import TweetEditor from "./TweetEditor";
import Link from "next/link";

const TwitterCard = ({ tweet: tweetProp, onDelete }) => {

  const [tweet, setTweet] = useState(tweetProp)
  const { user } = useAuth();

  const userId = user?.id
// state of the author doesnot equal userId it will not rend jsx
  const isAuthor = tweet.author?._id?.toString() === userId || tweet.author?.toString() === userId;
// states of add views and likes 
  const hasLiked = tweet.likedBy?.some(id => id.toString() === userId);
  const hasDisliked = tweet.dislikedBy?.some(id => id.toString() === userId);
  const hasWatched = tweet.watchedBy?.some(id => id.toString() === userId);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // edit fn
  const handleEdit = async (text, media) => {
    setEditLoading(true);
    setEditError("");

    try {
      const formData = new FormData();
      formData.append("content", text);

      // new files the user added
      media.forEach((m) => { if (m.file) formData.append("media", m.file); });

      // existing media to keep
      const kept = media.filter((m) => !m.file).map((m) => m.url);
      formData.append("keptMedia", JSON.stringify(kept));

      const res = await fetch(`/api/tweets/${tweet._id}`, {
        method: "PATCH",
        body: formData, // NO Content-Type header — browser sets it automatically for FormData
      });

      const data = await res.json();
      if (!res.ok) { setEditError(data.message || "Failed to edit"); return; }

      // update card in place without page reload
      setTweet(prev => ({ ...prev, content: data.content, media: data.media, edited: data.edited }));
      setIsEditing(false);
      setEditError("");

    } catch (err) {
      setEditError("Unexpected error");
    } finally {
      setEditLoading(false);
    }
  };
// add vlikes dislikes  fn 
  const handleVote = async (direction) => {
    if (!userId) return;
    const res = await fetch(`/api/tweets/${tweet._id}/vote`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    if (res.ok) {
      const data = await res.json();
      setTweet(prev => ({ ...prev, ...data }));
    }
  };

  const handleView = async () => {
    if (!userId || hasWatched) return;
    const res = await fetch(`/api/tweets/${tweet._id}/view`, { method: "PATCH" });
    if (res.ok) {
      const data = await res.json();
      setTweet(prev => ({
        ...prev,
        views: data.views,
        watchedBy: [...(prev.watchedBy || []), userId]
      }));
    }
  };
  // add vid views 

  const handleDelete = async () => {
    const res = await fetch(`/api/tweets/${tweet._id}`, { method: "DELETE" });
    if (res.ok) onDelete(tweet._id);
  };

  const { author, media } = tweet;

return (
  <div className="w-full flex justify-center px-2 sm:px-4">
    
    <div className="w-full max-w-xl border border-gray-300 rounded-xl bg-white p-3 sm:p-4">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-3 mb-3">

        {/* USER INFO */}
        <div className="flex items-center gap-3 min-w-0">
          
          <img
            src={author?.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />

          <div className="flex flex-col min-w-0">
            <Link
              href={`/users/${author?._id}`}
              className="font-semibold text-sm text-gray-900 hover:underline truncate"
            >
              {author?.name}
            </Link>

            <Link
              href={`/users/${author?._id}`}
              className="text-xs text-gray-500 hover:underline truncate"
            >
              @{author?.handle}
            </Link>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

          {isAuthor && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold
              px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm"
            >
              Edit
            </Button>
          )}

          {isAuthor && (
            <button
              onClick={handleDelete}
              className="text-gray-500 hover:text-red-500 text-lg sm:text-xl"
            >
              ✕
            </button>
          )}

        </div>
      </div>

      {/* CONTENT */}
      <p className="text-sm text-gray-800 whitespace-pre-wrap mb-3 break-words">
        {tweet.content}
        {tweet.edited && (
          <span className="text-xs text-gray-400 ml-2">(edited)</span>
        )}
      </p>

      {/* MEDIA */}
      {media?.length > 0 && (
        <div className="flex flex-col gap-2 mb-3">
          {media.map((item, index) => (
            <div key={index}>
              {item.type === "image" || item.type === "gif" ? (
                <img
                  src={item.url}
                  alt="media"
                  className="w-full max-h-[400px] object-cover rounded-xl"
                />
              ) : (
                <video
                  onPlay={handleView}
                  src={item.url}
                  controls
                  playsInline
                  className="w-full max-h-[400px] object-cover rounded-xl bg-black"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex items-center gap-4 sm:gap-6 h-[6vh] text-sm">

        <button onClick={() => handleVote("up")} className="flex items-center gap-1">
          <AiFillLike color={hasLiked ? "blue" : "gray"} />
          <span>{tweet.upvotes}</span>
        </button>

        <button onClick={() => handleVote("down")} className="flex items-center gap-1">
          <AiFillDislike color={hasDisliked ? "red" : "gray"} />
          <span>{tweet.downvotes}</span>
        </button>

        <button className="flex items-center gap-1">
          <FaRegComment color="gray" />
        </button>

        {media?.[1]?.type === "video" && (
          <div className="flex items-center gap-1">
            <FaEye color="gray" />
            <span>{tweet.views || 0}</span>
          </div>
        )}

      </div>

    </div>

    {/* EDIT MODAL */}
    {isEditing && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3">
        <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg shadow-xl">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Edit Tweet</h2>

            <button
              onClick={() => {
                setIsEditing(false);
                setEditError("");
              }}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          <TweetEditor
            initialText={tweet.content}
            initialMedia={tweet.media || []}
            onSubmit={handleEdit}
            submitLabel="Save"
            loading={editLoading}
            error={editError}
          />

        </div>
      </div>
    )}
  </div>
);
};

export default TwitterCard;