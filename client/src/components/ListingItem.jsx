import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaTag } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls && listing.imageUrls.length > 0
              ? listing.imageUrls[0]
              : 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='Listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300'
        />
        <div className='p-3 flex flex-col gap-2'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name || 'Unnamed Listing'}
          </p>
          <div className='flex items-center gap-1'>
            <FaTag className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate'>
              {listing.category || 'Category not specified'}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description || 'No description available'}
          </p>
          <p className='text-slate-500 mt-2 font-semibold'>
          ₹{listing.price.toLocaleString('en-IN')}
          </p>
          <div className='text-slate-700 flex gap-4 text-xs font-bold'>
            {listing.rating !== undefined && <span>⭐ {listing.rating.toFixed(1)}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
}
