export const jsonDataLinks = {
  products: process.env.PUBLIC_URL + "/fakeapi/products.json",
  filter_data: process.env.PUBLIC_URL + "/fakeapi/filter_data.json",
}; // fake api json

export const fetchProductsAndFilters = () =>
  Promise.all(
    Object.values(jsonDataLinks).map((link) => fetch(link)),
  ).then((responses) =>
    Promise.all(responses.map((response) => response.json())),
  );
