import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaMapMarkerAlt,
  FaShare,
  FaConciergeBell,
  FaMusic,
  FaUtensils,
  FaHeart,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (listing) {
      console.log(listing);
    }
  }, [listing]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
            {listing.videoUrl && (
              <SwiperSlide key={listing.videoUrl}>
                <div className="h-[550px] flex justify-center items-center">
                  <video
                    controls
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      backgroundSize: "cover",
                    }}
                  >
                    <source src={listing.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </SwiperSlide>
            )}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10  border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-4xl font-extrabold font-serif">
              {listing.title}
            </p>
            <div className="my-3 text-2xl font-semibold">
              {listing.regularPrice.toLocaleString("lkr-LK", {
                style: "currency",
                currency: "LKR",
              })}{" "}
            </div>
           
            <p className="flex items-center mt-4 gap-2 text-slate-600 text-lg font-bold">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.district}
            </p>
            {/* <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              {capitalizeFirstLetter(listing.categorie)}
              </p>
            </div> */}
            <p className="text-slate-800 my-4">
              <span className="font-semibold text-2xl  text-black ">Description</span>
              <p className="whitespace-pre-wrap">{listing.description}</p>
            </p>
            {/* <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              {listing.type === 'Catering' && (
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaUtensils className='text-lg' />
                  Catering Service
                </li>
              )}
              {listing.type === 'DJ' && (
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaMusic className='text-lg' />
                  DJ Service
                </li>
              )}
              {listing.type === 'Planner' && (
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaConciergeBell className='text-lg' />
                  Wedding Planner
                </li>
              )}
              {listing.type === 'Venue' && (
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaHeart className='text-lg' />
                  Wedding Venue
                </li>
              )}
            </ul> */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-red-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact service provider
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
