import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [video, setVideo] = useState(null);
  const [formData, setFormData] = useState({
    imageUrls: [],
    videoUrl: "",
    title: "",
    description: "",
    address: "",
    regularPrice: 50,
    categorie: "",
    district: "",
    contactNumber1: "", // Adding contact number fields
    contactNumber2: "", // Adding contact number fields
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [videoUploadError, setVideoUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeMedia(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const handleVideoSubmit = (e) => {
    if (video) {
      if (video.size > 100 * 1024 * 1024) {
        // 100 MB size limit
        setVideoUploadError("Video size should be under 100 MB");
        return;
      }
      setUploading(true);
      setVideoUploadError(false);
      storeMedia(video)
        .then((url) => {
          setFormData({
            ...formData,
            videoUrl: url,
          });
          setVideoUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setVideoUploadError("Video upload failed (100 mb max per video)");
          setUploading(false);
        });
    } else {
      setVideoUploadError("Please select a video to upload");
    }
  };

  const storeMedia = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleRemoveVideo = () => {
    setFormData({
      ...formData,
      videoUrl: "",
    });
    setVideo(null);
  };

  const handleChange = (e) => {
    const { id, value, type } = e.target;

    if (type === "number" || type === "text" || type === "textarea") {
      setFormData({
        ...formData,
        [id]: value,
      });
    }

    if (id === "categorie") {
      setFormData({
        ...formData,
        categorie: value,
      });
    }

    if (id === "district") {
      setFormData({
        ...formData,
        district: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (!formData.contactNumber1 && !formData.contactNumber2)
        return setError("You must provide at least one contact number");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Title"
            className="border p-3 rounded-lg"
            id="title"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="categorie" className="font-semibold">
              Categorie:
            </label>
            <select
              id="categorie"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.categorie}// value categorie
            >
              <option value="dj">DJ</option>
              <option value="hotel">Hotel</option>
              <option value="catering">Catering</option>
              <option value="photography">Photography</option>
              <option value="venue">Venue</option>
              <option value="decoration">Decoration</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="district" className="font-semibold">
              District:
            </label>
            <select
              id="district"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.district}
            >
              <option value="">Select a district</option>
              <option value="ampara">Ampara</option>
              <option value="anuradhapura">Anuradhapura</option>
              <option value="badulla">Badulla</option>
              <option value="batticaloa">Batticaloa</option>
              <option value="colombo">Colombo</option>
              <option value="galle">Galle</option>
              <option value="gampaha">Gampaha</option>
              <option value="hambantota">Hambantota</option>
              <option value="jaffna">Jaffna</option>
              <option value="kalutara">Kalutara</option>
              <option value="kandy">Kandy</option>
              <option value="kegalle">Kegalle</option>
              <option value="kilinochchi">Kilinochchi</option>
              <option value="kurunegala">Kurunegala</option>
              <option value="mannar">Mannar</option>
              <option value="matale">Matale</option>
              <option value="matara">Matara</option>
              <option value="monaragala">Monaragala</option>
              <option value="mullaitivu">Mullaitivu</option>
              <option value="nuwara eliya">Nuwara Eliya</option>
              <option value="polonnaruwa">Polonnaruwa</option>
              <option value="puttalam">Puttalam</option>
              <option value="ratnapura">Ratnapura</option>
              <option value="trincomalee">Trincomalee</option>
              <option value="vavuniya">Vavuniya</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="contactNumber1" className="font-semibold">
              Contact Number 1 (required):
            </label>
            <input
              type="String"
              id="contactNumber1"
              placeholder="Enter contact number"
              className="border p-3 rounded-lg"
              required
              onChange={handleChange}
              value={formData.contactNumber1}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="contactNumber2" className="font-semibold">
              Contact Number 2 (optional):
            </label>
            <input
              type="String"
              id="contactNumber2"
              placeholder="Enter contact number"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.contactNumber2}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <p className="font-semibold mt-6">
            Video:
            <span className="font-normal text-gray-600 ml-2">
              You can upload 1 video (max 100 MB)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setVideo(e.target.files[0])}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="videos"
              accept="video/*"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleVideoSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {videoUploadError && videoUploadError}
          </p>
          {formData.videoUrl && (
            <div className="flex justify-between p-3 border items-center">
              <video
                src={formData.videoUrl}
                controls
                className="w-20 h-20 object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
              >
                Delete
              </button>
            </div>
          )}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

//updated
