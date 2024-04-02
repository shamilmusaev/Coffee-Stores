import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });


  const unsplashResults = photos.response.results;
  console.log(unsplashResults)

  return unsplashResults.map((result) => result.urls["small"]);
};


export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos()
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(
      "59.33611651627002%2C18.059627649713743",
      "coffee",
      30
    ),
    options
  );
  const data = await response.json();
  return data.results.map((result, idx) => {
    return {
      id: result.fsq_id,
      name: result.name,
      imgUrl: photos.length > 0 ? photos[idx] : null ,
      address: result.location.formatted_address,
      region : result.location.region
    }
  })
};
