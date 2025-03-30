import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { FiSearch, FiSliders, FiX, FiChevronDown } from "react-icons/fi";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    minPrice: 0,
    maxPrice: 100000,
    minRating: 0,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const minPriceFromUrl = urlParams.get('minPrice');
    const maxPriceFromUrl = urlParams.get('maxPrice');
    const minRatingFromUrl = urlParams.get('minRating');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (searchTermFromUrl || minPriceFromUrl || maxPriceFromUrl || minRatingFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        minPrice: minPriceFromUrl || 0,
        maxPrice: maxPriceFromUrl || 100000,
        minRating: minRatingFromUrl || 0,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const searchQuery = urlParams.toString();

    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      setShowMore(false);

      try {
        const res = await fetch(`/api/listings/get?${searchQuery}`);
        if (!res.ok) throw new Error("Failed to fetch listings");

        const data = await res.json();
        setListings(data);
        setShowMore(data.length > 8);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings. Please try again.");
      }
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'sort') {
      const value = e.target.value;
      const [sort, order] = value.split('_');
      setSidebardata((prev) => ({ ...prev, sort, order }));
    } else {
      setSidebardata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    
    Object.entries(sidebardata).forEach(([key, value]) => {
      if (value !== '' && value !== 0 && !(key === 'maxPrice' && value === 100000)) {
        urlParams.set(key, value);
      }
    });
    
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleClear = () => {
    setSidebardata({
      searchTerm: "",
      minPrice: 0,
      maxPrice: 100000,
      minRating: 0,
      sort: "createdAt",
      order: "desc",
    });
    navigate("/search");
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    try {
      setLoading(true);
      const res = await fetch(`/api/listings/get?${searchQuery}`);
      if (!res.ok) throw new Error("Error fetching more listings");

      const data = await res.json();
      setListings([...listings, ...data]);
      setShowMore(data.length >= 9);
      setLoading(false);
    } catch (error) {
      console.error("Error loading more listings:", error);
      setError("Failed to load more listings.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-8xl  px-4 py-5">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg mb-4"
        >
          {showFilters ? <FiX size={20} /> : <FiSliders size={20} />}
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Sidebar */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4">
              <h2 className="text-xl font-bold text-white">Refine Results</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search items..."
                  className="border rounded-lg p-3 pl-10 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={sidebardata.searchTerm}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 block mb-1">Min Price</label>
                    <input
                      type="number"
                      id="minPrice"
                      className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                      value={sidebardata.minPrice}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 block mb-1">Max Price</label>
                    <input
                      type="number"
                      id="maxPrice"
                      className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                      value={sidebardata.maxPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 border-b pb-2 mb-3">Rating</h3>
                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-600 mr-3">Min Rating:</label>
                  <input
                    type="range"
                    id="minRating"
                    min="0"
                    max="5"
                    step="0.5"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    value={sidebardata.minRating}
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-blue-600 font-medium">{sidebardata.minRating}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 border-b pb-2 mb-3">Sort By</h3>
                <select
                  id="sort"
                  className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                  value={`${sidebardata.sort}_${sidebardata.order}`}
                  onChange={handleChange}
                >
                  <option value="createdAt_desc">Newest First</option>
                  <option value="createdAt_asc">Oldest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating_desc">Highest Rated</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 flex-1 transition-colors duration-200 font-medium"
                >
                  Apply Filters
                </button>
                <button 
                  type="button" 
                  onClick={handleClear} 
                  className="bg-gray-200 text-gray-700 p-3 rounded-lg uppercase hover:bg-gray-300 transition-colors duration-200 font-medium"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Listings */}
        <div className="lg:w-3/4 h-[full]">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Search Results</h1>
              <span className="text-gray-200">
                {listings.length} {listings.length === 1 ? 'listing' : 'listings'} found
              </span>
            </div>
            
            <div className="p-6">
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {!loading && listings.length === 0 && !error && (
                <div className="text-center py-20">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No listings found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search filters or clear them to see all listings.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleClear}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}

              {!loading && listings.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {listings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {showMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={onShowMoreClick}
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-blue-600 px-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-700 transition-all duration-300"
              >
                <span className="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                  <FiChevronDown />
                </span>
                <span className="text-sm font-medium transition-all group-hover:mr-4">
                  Show More Results
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
