import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';


export default function Home() {

  const [cateringListings, setCateringListings] = useState([]);
  const [djListings, setDjListings] = useState([]);
  const [hotelListings, setHotelListings] = useState([]);
  const [photographyListings, setPhotographyListings] = useState([]);
  const [decorationListings, setDecorationListings] = useState([]);
  const [ashatakaListings, setAshatakaListings] = useState([]);
  const [vehicleRentalListings, setVehicleRentalListings] = useState([]);
  const [weddingCakeListings, setWeddingCakeListings] = useState([]);
  const [venueListings, setVenueListings] = useState([]);

  

  SwiperCore.use([Navigation]);

  //             <option value="dj">DJ</option>
  //             <option value="hotel">Hotel</option>
  //             <option value="catering">Catering</option>
  //             <option value="photography">Photography</option>
  //             <option value="venue">Venue</option>
  //             <option value="decoration">Decoration</option>
  //              <option value="ashataka">Decoration</option>
  //  <option value="decoration">Vehicle Rental</option>
  //  <option value="decoration">Wedding Cake</option>


  useEffect(() => {
  

    const fetchCateringListings = async () => {
      try {
        const res = await fetch('/api/listing/get?categorie=catering&limit=4');
        const data = await res.json();
        setCateringListings(data);
     
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDjListings = async () => {
      try {
        const res = await fetch('/api/listing/get?categorie=dj&limit=4');
        const data = await res.json();
        setDjListings(data);
      
      } catch (error) {
        console.log(error);
      }
    };

    const fetchHotelListings = async () => {
      try {
        const res = await fetch('/api/listing/get?categorie=hotel&limit=4');
        const data = await res.json();
        setHotelListings(data);
      }
      catch (error) {
        console.log(error);
      }
    };

    const fetchPhotographyListings = async () => {
      try {
        const res = await fetch('/api/listing/get?categorie=photography&limit=4');
        const data = await res.json();
        setPhotographyListings(data);
      }
      catch (error) {
        console.log(error);
      }
    };

    const fetchDecorationListings = async () => {
      try {
        const res = await fetch('/api/listing/get?categorie=decoration&limit=4');
        const data = await res.json();
        setDecorationListings(data);
      }
      catch (error) {
        console.log(error);
      }
    };

    const fetchAshatakaListings = async () => {
      try {
        const res = await fetch('/api/listing/get?categorie=ashataka&limit=4');
        const data = await res.json();
        setAshatakaListings(data);
      }
      catch (error) {
        console.log(error);
      }
    };

    const fetchVehicleRentalListings = async () => {
      try {
        const res = await fetch('/api/listing/get?categorie=vehicleRental&limit=4');
        const data = await res.json();
        setVehicleRentalListings(data);
      }
      catch (error) {
        console.log(error);
      }
    };

    const fetchWeddingCakeListings = async () => {
      try {
        const res = await fetch('/api/listing/get?categorie=weddingCake&limit=4');
        const data = await res.json();
        setWeddingCakeListings(data);
      }
      catch (error) {
        console.log(error);
      }
    };

    const fetchVenueListings = async () => {
      try {
        const res = await fetch('/api/listing/get?categorie=venue&limit=4');
        const data = await res.json();
        setVenueListings(data);
      }
      catch (error) {
        console.log(error);
      }
    };

    fetchVenueListings();
    fetchWeddingCakeListings();
    fetchVehicleRentalListings();
    fetchAshatakaListings();
    fetchDecorationListings();
    fetchPhotographyListings();
    fetchHotelListings();
    fetchCateringListings();
    fetchDjListings();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className='relative overflow-hidden max-w-7xl mx-auto'>
        {/* <video 
          autoPlay 
          loop 
          muted 
          className='absolute top-0 left-0 w-full h-full object-cover z-0'
        >
          <source src={videoBackground} type='video/mp4' />
          Your browser does not support the video tag.
        </video> */}
        <div className='relative flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto bg-white bg-opacity-20 z-10'>
          <h1 className='text-slate-700 font-bold text-2xl lg:text-4xl'>
            Find the Perfect <span className='text-slate-500'>Wedding Services</span>
            <br />
            All Under One Roof
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm'>
            Mangalam is the best place to find all the wedding services you need for your special day.
          </div>
          <Link
            to={'/search'}
            className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
          >
            Let's get started...
          </Link>
        </div>
      </div>

      {/* Listing results for featured, catering, and DJ */}
      <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
        
        {djListings && djListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>DJ Listing</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?categorie=dj'}>Show more dj services</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {djListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {cateringListings && cateringListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Catering Listing</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?categorie=catering'}>Show more catering services</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {cateringListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )
        }
        {hotelListings && hotelListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Hotel Listing</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?categorie=hotel'}>Show more hotel services</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {hotelListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {photographyListings && photographyListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Photography Listing</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?categorie=photography'}>Show more photography services</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {photographyListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {decorationListings && decorationListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Decoration Listing</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?categorie=decoration'}>Show more decoration services</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {decorationListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {ashatakaListings && ashatakaListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Ashataka Listing</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?categorie=ashataka'}>Show more ashataka services</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {ashatakaListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {vehicleRentalListings && vehicleRentalListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Vehicle Rental Listing</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?categorie=vehicleRental'}>Show more vehicle rental services</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {vehicleRentalListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {weddingCakeListings && weddingCakeListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Wedding Cake Listing</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?categorie=weddingCake'}>Show more wedding cake services</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {weddingCakeListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {venueListings && venueListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Venue Listing</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?categorie=venue'}>Show more venue services</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {venueListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

      
      </div>
    </div>
  );
}
