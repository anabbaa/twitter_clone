"use client";
import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { useTweets } from "@/app/context/TweetsContext";
import useMediaUpload from "@/lib/hooks/useMediaUpload.js";
import useEmojiPicker from "@/lib//hooks/useEmojiPicker";

const TweetEditor = ({
  initialText = "", initialMedia = [],
  onSubmit, submitLabel = "Tweet", loading = false, error = "",
}) => {
  const [text, setText] = useState(initialText);

  const { media, imgRef, vidRef, handleImages, handleVideo, removeMedia, addGif } =
    useMediaUpload(initialMedia);

  const { showEmoji, showGif, textRef, toggleEmoji, toggleGif, insertEmoji } =
    useEmojiPicker(setText);

    const {EMOJIS , GIFS} = useTweets()

  const remaining = 280 - text.length;
  const canSubmit = (text.trim().length > 0 || media.length > 0) && remaining >= 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative border border-gray-400 rounded-lg p-2">
        <textarea
          ref={textRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          className="w-full text-xl outline-none resize-none"
          rows={6}
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
            {EMOJIS.map((e) => (
              <button key={e} onClick={() => insertEmoji(e)} className="text-xl">{e}</button>
            ))}
          </div>
        )}

        {showGif && (
          <div className="flex flex-wrap gap-2 bg-gray-900 p-2 mt-2 rounded">
            {GIFS.map((url) => (
              <img key={url} src={url} onClick={() => addGif(url)} className="w-24 h-16 cursor-pointer rounded" alt="gif" />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-3 text-sky-500 text-2xl">
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
            disabled={!canSubmit || loading}
            onClick={() => canSubmit && onSubmit(text, media)}
            className="bg-sky-500 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >{loading ? "Saving..." : submitLabel}</button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TweetEditor;