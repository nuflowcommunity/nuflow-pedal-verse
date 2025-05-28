

// Re-export all wishlist API functions from their respective modules
export {
  fetchUserWishlists,
  fetchWishlistById,
  fetchWishlistByToken,
  fetchPublicWishlists
} from './queries';

export {
  createWishlist,
  updateWishlist,
  deleteWishlist
} from './mutations';

export {
  addToWishlist,
  removeFromWishlist,
  checkProductInWishlist
} from './items';

export {
  shareWishlist
} from './sharing';
