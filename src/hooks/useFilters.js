import React, { createContext, useContext, useState } from "react";

const filtersContext = createContext(null);
const { Provider } = filtersContext;

const filtersActionsContext = createContext(null);
const { Provider: ActionsProvider } = filtersActionsContext;

/**
 * Custom hook for filters
 * @returns {Object} filterData
 * @returns {Object} appliedFilters
 */
export const useFilters = () => useContext(filtersContext);

/**
 * Custom hook for filters methods
 * @returns {function} setFilterData
 * @returns {function} setAppliedFilters
 */
export const useFiltersActions = () => useContext(filtersActionsContext);

export const FilterProvider = ({ children }) => {
  const [filterData, setFilterData] = useState({
    gender: [],
    categories: [],
    price_range: [],
  });
  const [appliedFilters, _setAppliedFilters] = useState({
    gender: null,
    categories: [],
    price_range: [],
  });
  const setAppliedFilters = (value) =>
    _setAppliedFilters({ ...appliedFilters, ...value });
  return (
    <ActionsProvider value={{ setFilterData, setAppliedFilters }}>
      <Provider value={{ appliedFilters, filterData }}>{children}</Provider>
    </ActionsProvider>
  );
};
