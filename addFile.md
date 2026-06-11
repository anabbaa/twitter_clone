# 📁 Full File Upload Flow (Frontend → Backend → MongoDB)

This document explains everything that happens when a user uploads a file (image/video) in a web application using React + Node.js / Next.js.

---

# 🟡 1. User selects a file (Frontend)

When the user selects a file from input:

```js
const file = e.target.files[0];
```

## 🧠 What is `file`?

It is a **File object** that contains:
- file name
- file type (image/video)
- file size
- binary data reference

---

# 🟡 2. Preview the file (Frontend only)

To show a preview before uploading:

```js
const preview = URL.createObjectURL(file);
```

## 🔥 Result

```
blob:http://localhost:3000/xyz
```

## ⚠️ Important

- This is ONLY temporary
- Works only in browser
- Must NEVER be stored in MongoDB

---

# 🟡 3. Send file to backend

Instead of JSON, we use `FormData`:

```js
const data = new FormData();

data.append("content", content);
data.append("media", file);

fetch("/api/upload", {
  method: "POST",
  body: data,
});
```

## ❗ Why FormData?

Because JSON cannot send files.

---

# 🟠 4. Backend receives request

In Next.js:

```js
const formData = await req.formData();

const file = formData.get("media");
const content = formData.get("content");
```

---

# 🟠 5. Convert file into binary data

```js
const bytes = await file.arrayBuffer();
const buffer = Buffer.from(bytes);
```

## 🧠 What happens here?

### 1. `arrayBuffer()`
Converts file into raw binary data.

```
file → binary stream (ArrayBuffer)
```

### 2. `Buffer.from()`
Converts browser binary into Node.js format.

```
ArrayBuffer → Node.js Buffer
```

---

# 🟠 6. Save file on server

```js
await writeFile(`public/uploads/${file.name}`, buffer);
```

Now the file exists physically:

```
/public/uploads/video.mp4
```

---

# 🟠 7. Create a public URL

```js
const mediaUrl = `/uploads/${file.name}`;
```

or full URL:

```
http://localhost:5000/uploads/video.mp4
```

---

# 🟠 8. Save URL in MongoDB

```js
await Tweet.create({
  content,
  media: [mediaUrl],
});
```

## 💾 MongoDB stores ONLY:

```json
{
  "media": ["/uploads/video.mp4"]
}
```

---

# 🔵 9. Fetch data from MongoDB

```js
const tweets = await Tweet.find().sort({ createdAt: -1 });
```

---

# 🔵 10. Display file in frontend

```jsx
<img src={tweet.media[0]} />
```

or for video:

```jsx
<video controls src={tweet.media[0]} />
```

---

# ❌ WRONG APPROACH (common mistake)

```txt
blob:http://localhost:3000/xyz
```

## Why it's wrong:
- Temporary browser URL
- Does not exist on server
- Breaks after refresh
- Cannot be shared or stored

---

# ✅ CORRECT ARCHITECTURE

| Step | What happens |
|------|-------------|
| File selection | File object created |
| Preview | blob URL (temporary only) |
| Submit | FormData sent |
| Backend | file converted to Buffer |
| Server | file saved to disk |
| Backend | real URL created |
| MongoDB | stores URL only |
| Frontend | displays URL |

---

# 🧠 FINAL SUMMARY

- Blob = preview only (NOT stored)
- File = real uploaded data
- Buffer = server-readable binary format
- MongoDB = stores file URL only
- Frontend = uses URL to display image/video
