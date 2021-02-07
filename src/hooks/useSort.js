import React, { createContext, useContext, useState } from "react";

const sortContext = createContext(null);
const { Provider } = sortContext;

const sortActionsContext = createContext(null);
const { Provider: ActionsProvider } = sortActionsContext;

/**
 * Custom hook for sort
 * @returns {Object} sortValues
 * @returns {Object} appliedSort
 */
export const useSort = () => useContext(sortContext);

/**
 * Custom hook for sort methods
 * @returns {function} setAppliedSort
 */
export const useSortActions = () => useContext(sortActionsContext);

const sortValues = [
  {
    title: "Popularity",
    checked: false,
    option: "popularity",
    method: (x, y) => x.ratingCount > y.ratingCount,
  },
  {
    title: "Better Discount",
    checked: false,
    option: "discount",
    method: (x, y) =>
      x.discountedPrice / x.originalPrice > y.discountedPrice / y.originalPrice,
  },
  {
    title: "Price: High to Low",
    checked: false,
    option: "price_desc",
    method: (x, y) => x.discountedPrice < y.discountedPrice,
  },
  {
    title: "Price: Low to High",
    checked: false,
    option: "price_asc",
    method: (x, y) => x.discountedPrice > y.discountedPrice,
  },
];

export const SortProvider = ({ children }) => {
  const [appliedSort, setAppliedSort] = useState("");
  return (
    <ActionsProvider value={{ setAppliedSort }}>
      <Provider value={{ appliedSort, sortValues }}>{children}</Provider>
    </ActionsProvider>
  );
};
