import Listing from '../model/listing.model.js'; 
import { errorHandler } from '../utils/error.js';

// Create Listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// Deleting Listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Updating Listing
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// finding listing by id
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

//  all listings with filtering, sorting, and pagination
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * limit;

    const filters = {
      name: { $regex: req.query.searchTerm || '', $options: 'i' },
      price: {
        $gte: req.query.minPrice || 0,
        $lte: req.query.maxPrice || 1000000,
      },
      rating: { $gte: req.query.minRating || 0 },
    };

    const sortOption = {};
    if (req.query.sortBy) {
      sortOption[req.query.sortBy] = req.query.order === 'asc' ? 1 : -1;
    }

    const listings = await Listing.find(filters)
      .sort(sortOption)
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
