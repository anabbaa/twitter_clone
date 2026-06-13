"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoImageOutline } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import { useTweets } from "@/app/context/TweetsContext";
import useMediaUpload from "@/lib/hooks/useMediaUpload.js";
import useEmojiPicker from "@/lib/hooks/useEmojiPicker";

const AddTweet = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const { media, setMedia, imgRef, vidRef, handleImages, handleVideo, removeMedia, addGif } =
    useMediaUpload([]);

  const { showEmoji, showGif, textRef, toggleEmoji, toggleGif, insertEmoji } =
    useEmojiPicker(setText);

  const {EMOJIS  , GIFS} = useTweets()
  const router = useRouter();
  const { user } = useAuth()
  // You need a DOM element because: must click a real HTML element:Only the browser's file input
  // can open the operating system's file picke react cannot open them, and we need it for textarea
  //  because we do something that is textaarea cannot do it alone

  const remaining = 280 - text.length;
  const canTweet = (text.trim().length > 0 || media.length > 0) && remaining >= 0

  const postTweet = async () => {
    if (!text.trim() && media.length === 0) { setError("Please add something to tweet"); return; }
    if (!user?.id) { setError("You must be logged in to tweet"); return; }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("author", user.id);
      data.append("content", text);
      media.forEach((m) => { if (m.file) data.append("media", m.file); });

      const res = await fetch("/api/feed", { method: "POST", body: data });
      const results = await res.json();

      if (!res.ok) { setError(results.message || "Something went wrong"); return; }

      router.push("/home");
      setText("");
      setMedia([]);
    } catch (err) {
      setError(err?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col justify-center h-fill gap-4 ">
      <div className="relative border border-gray-400 rounded-lg p-2">
        <textarea
          ref={textRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          className="w-full text-xl outline-none resize-none"
          rows={8}
          cols={66}
        />

        {media.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {media.map((m, i) => (
              <div key={i} className="relative">
                {m.type === "video" ? (
                  <video src={m.url} className="w-28 h-20 object-cover rounded" controls />
                ) : (
                  <img src={m.url} className="w-28 h-20 object-cover rounded" alt="media" />
                )}
                <button
                  onClick={() => removeMedia(i)}
                  className="absolute top-1 right-1 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
                >✕</button>
              </div>
            ))}
          </div>
        )}

        {showEmoji && (
          <div className="flex flex-wrap gap-1 bg-gray-900 p-2 mt-2 rounded">
            {EMOJIS.map((e, i) => (
              <button key={i} onClick={() => insertEmoji(e)} className="text-xl">{e}</button>
            ))}
          </div>
        )}

        {showGif && (
          <div className="flex flex-wrap gap-2 bg-gray-900 p-2 mt-2 rounded">
            {GIFS.map((url , i) => (
              <img key={i} src={url} onClick={() => addGif(url)} className="w-24 h-16 cursor-pointer rounded" alt="gif" />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-3 text-sky-500 text-2xl">
          {/*clicks()* to let user to click on hiddenn */}
          <button onClick={() => imgRef.current?.click()}><IoImageOutline /></button>
          <input ref={imgRef} type="file" accept="image/*" multiple hidden onChange={handleImages} />

          <button onClick={() => vidRef.current?.click()}><FaVideo /></button>
          <input ref={vidRef} type="file" accept="video/*" hidden onChange={handleVideo} />

          <button onClick={toggleEmoji}>😀</button>
          <button onClick={toggleGif}>🎬</button>
        </div>

        <div className="flex items-center gap-3">
          {remaining <= 20 && (
            <span className={remaining < 0 ? "text-red-500" : "text-yellow-500"}>{remaining}</span>
          )}
          <button
            disabled={!canTweet || loading}
            onClick={postTweet}
            className="bg-sky-500 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >{loading ? "Posting..." : "Tweet"}</button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )

};

export default AddTweet;