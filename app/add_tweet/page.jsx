"use client";
import React, { useState, useRef } from "react";
import { IoImageOutline } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

const EMOJIS = [
"😀","😂","😍","🥰","😎","🤔","😮","😢","😡","🔥","❤️",
"💯","✅","🎉","👍","👏","🙌","💪","🤝","👀","⚡","🌟",
"💡","🎯","🚀"
];

const GIFS = [
"https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/200w.gif",
"https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/200w.gif",
"https://media.giphy.com/media/26ufdipQqU2lhNA4g/200w.gif",
"https://media.giphy.com/media/xT9IgG50Lg7russbD6/200w.gif",
];

const AddTweet = () => {
const [text, setText] = useState("");
const [media, setMedia] = useState([]);
const [showEmoji, setShowEmoji] = useState(false);
const [showGif, setShowGif] = useState(false);
const [error, setError] = useState("");
  // You need a DOM element because: must click a real HTML element:Only the browser's file input
  // can open the operating system's file picke react cannot open them, and we need it for textarea
  //  because we do something that is textaarea cannot do it alone

const imgRef = useRef(null);
const vidRef = useRef(null);
const textRef = useRef(null);

const remaining = 280 - text.length;

const canTweet =
    (text.trim().length > 0 || media.length > 0) &&
    remaining >= 0;

const router = useRouter()

const { data: session } = useSession();
console.log(session)
  // TEXT
  const handleText = (e) => {
    setText(e.target.value);
};
// change object target to array to llo over files then empty it so use if he changes his mind
// can select another file

  // IMAGES
const handleImages = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
        setMedia((prev) => [
        ...prev,
        { url: URL.createObjectURL(file), type: "image" },
    ]);
    });
    e.target.value = "";
};

  // VIDEO
const handleVideo = (e) => {
    const file = e.target.files?.[0];
    // securitx checks If there is no selected file, stop the function.
    if (!file) return;
    setMedia((prev) => [
        ...prev, { url: URL.createObjectURL(file), type: "video" },
    ]);

    e.target.value = "";
};

  // REMOVE MEDIA
const removeMedia = (idx) => {
    setMedia((prev) => prev.filter((_, i) => i !== idx));
};

  // EMOJI
const insertEmoji = (emoji) => {
    const textarea = textRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newText =
    text.slice(0, start) + emoji + text.slice(end);
    setText(newText);
    {/* to wait until React finishes updating the textarea. it is to wait because if yuou move the
    crusor before the tectarea updated. setTimeOut means Run this after the current JavaScript 
    work finishes. 0 means Run this callback as soon as the current JavaScript work is finished. */}

    setTimeout(() => {
    textarea.selectionStart = textarea.selectionEnd =
        start + emoji.length;
    }, 0);
};

  // GIF
const addGif = (url) => {
    setMedia((prev) => [...prev, { url, type: "gif" }]);
    setShowGif(false);
};

  // SUBMIT
const postTweet = async () => {
    if (!text.trim() && media.length === 0) {
        setError("Please add something to tweet")
        return
    }

    if (!session?.user?.id) {
        setError("You must be logged in to tweet")
        return
    }

    try {
    const res = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            author:  session?.user?.id, 
            content: text,
            media,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
    }else {
      console.log("Tweet added:", data);
      router.push("/home") 
    }
      // reset
    setText("");
    setMedia([]);
    setShowEmoji(false);
    setShowGif(false);
    setError("");
    } catch (err) {
    setError(err.message);
    }
};

//we do not need vale and name for input which its type is file becaause user select them from
//his device 
{/* we use button to handel input in a nicer way input after itbecause button it self cannot
handel open file accept only thes files multiple use more than one file*/}

return (
  <div className="h-fill flex flex-col justify-center items-center gap-4 ">

    {/* INPUT AREA WRAPPER */}
    <div className="relative border border-gray-400 rounded-lg p-2">

      {/* TEXTAREA */}
      <textarea
        ref={textRef}
        value={text}
        onChange={handleText}
        placeholder="What's happening?"
        className="w-full text-xl outline-none resize-none"
        rows={10}
        cols={66}
      />

      {/* MEDIA INSIDE AREA (fake inside textarea) */}
      {media.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {media.map((m, i) => (
            <div key={i} className="relative">

              {m.type === "video" ? (
                <video
                  src={m.url}
                  className="w-28 h-20 object-cover rounded"
                  controls
                />
              ) : (
                <img
                  src={m.url}
                  className="w-28 h-20 object-cover rounded"
                  alt="media"
                />
              )}

              <button
                onClick={() => removeMedia(i)}
                className="absolute top-1 right-1 bg-black text-white w-5 h-5 rounded-full"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* EMOJIS */}
      {showEmoji && (
        <div className="flex flex-wrap gap-1 bg-gray-900 p-2 mt-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => insertEmoji(e)}
              className="text-xl"
            >
              {e}
            </button>
          ))}
        </div>
      )}

      {/* GIFS */}
      {showGif && (
        <div className="flex flex-wrap gap-2 bg-gray-900 p-2 mt-2">
          {GIFS.map((url) => (
            <img
              key={url}
              src={url}
              onClick={() => addGif(url)}
              className="w-24 h-16 cursor-pointer"
            />
          ))}
        </div>
      )}
    </div>

    {/* ACTIONS */}
    <div className="flex justify-between items-center">

      <div className="flex gap-3 text-sky-500 text-2xl">

        <button onClick={() => imgRef.current?.click()}>
          <IoImageOutline />
        </button>

        <input
          ref={imgRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleImages}
        />

        <button onClick={() => vidRef.current?.click()}>
          <FaVideo />
        </button>

        <input
          ref={vidRef}
          type="file"
          accept="video/*"
          hidden
          onChange={handleVideo}
        />

        <button onClick={() => setShowEmoji(!showEmoji)}>
          😀
        </button>

        <button onClick={() => setShowGif(!showGif)}>
          🎬
        </button>
      </div>

      <div className="flex items-center gap-3">

        {remaining <= 20 && (
          <span className={remaining < 0 ? "text-red-500" : "text-yellow-500"}>
            {remaining}
          </span>
        )}

        <button
          disabled={!canTweet}
          onClick={postTweet}
          className="bg-sky-500 text-white px-4 py-2 rounded-full disabled:opacity-50"
        >
          Tweet
        </button>
      </div>
    </div>

    {error && <p className="text-red-500">{error}</p>}
  </div>
);

};

export default AddTweet;