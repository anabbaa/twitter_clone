import { useState, useRef } from "react";

const useMediaUpload = (initialMedia = []) => {
const [media, setMedia] = useState(initialMedia);
const imgRef = useRef(null);
const vidRef = useRef(null);

  const handleImages = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) =>
      setMedia((prev) => [...prev, { file, url: URL.createObjectURL(file), type: "image" }])
    );
    e.target.value = "";
  };

  const handleVideo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMedia((prev) => [...prev, { file, url: URL.createObjectURL(file), type: "video" }]);
    e.target.value = "";
  };

  const removeMedia = (idx) => setMedia((prev) => prev.filter((_, i) => i !== idx));

  const addGif = (url) => setMedia((prev) => [...prev, { url, type: "gif" }]);

  return { media, setMedia, imgRef, vidRef, handleImages, handleVideo, removeMedia, addGif };
};

export default useMediaUpload;