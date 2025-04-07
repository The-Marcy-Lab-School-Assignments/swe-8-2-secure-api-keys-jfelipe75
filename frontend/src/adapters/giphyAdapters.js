import { handleFetch } from "./handleFetch.js";

export const getTrendingGifs = async () => {
  return await handleFetch(`/api/gifs`);
};

export const getGifsBySearch = async (searchTerm) => {
  return await handleFetch(`/api/gifs?search=${searchTerm}`);
};
