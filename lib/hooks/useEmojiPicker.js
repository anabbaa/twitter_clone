import { useState, useRef } from "react";
{/* to wait until React finishes updating the textarea. it is to wait because if yuou move the
    crusor before the tectarea updated. setTimeOut means Run this after the current JavaScript 
    work finishes. 0 means Run this callback as soon as the current JavaScript work is finished. */}
//we do not need vale and name for input which its type is file becaause user select them from
//his device 
{/* we use button to handel input in a nicer way input after itbecause button it self cannot
handel open file accept only thes files multiple use more than one file*/}
const useEmojiPicker = (setText) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const textRef = useRef(null);

  const toggleEmoji = () => { setShowEmoji((v) => !v); setShowGif(false); };
  const toggleGif   = () => { setShowGif((v) => !v);   setShowEmoji(false); };

  const insertEmoji = (emoji) => {
    const textarea = textRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end   = textarea.selectionEnd;
    setText((prev) => prev.slice(0, start) + emoji + prev.slice(end));
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    }, 0);
  };

  return { showEmoji, showGif, textRef, toggleEmoji, toggleGif, insertEmoji };
};

export default useEmojiPicker;