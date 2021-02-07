import { Select } from "@chakra-ui/react";
import ProductItem from "components/ProductItem/ProductItem";
import { useFilters, useFiltersActions } from "hooks/useFilters";
import { useSort, useSortActions } from "hooks/useSort";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsAndFilters } from "utils/fetchAPIData";

const FilterContainer = ({ children }) => (
  <div className="flex flex-col text-sm pl-5 py-3 border-b border-r border-gray-300">
    {children}
  </div>
);
const InputRadio = ({ id, label, ...rest }) => (
  <label className="font-semibold mt-2" htmlFor={id}>
    <input type="radio" id={id} {...rest} className="mr-2" />
    {label}
  </label>
);
const Checkbox = ({ id, label, ...rest }) => (
  <label htmlFor={id} className="mt-2">
    <input type="checkbox" id={id} {...rest} className="mr-2" />
    {label}
  </label>
);

function Products() {
  const { setFilterData, setAppliedFilters } = useFiltersActions();
  const { filterData, appliedFilters } = useFilters();
  const { appliedSort, sortValues } = useSort();
  const { setAppliedSort } = useSortActions();
  const [isFetching, setIsFetching] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    fetchProductsAndFilters().then(([products, filter_data]) => {
      setProducts(products);
      setFilterData(filter_data);
      setIsFetching(false);
    });
  }, []);
  const filterProductsFn = useMemo(() => {
    let filterFnArray = [];
    const appliedPriceFilter = appliedFilters.price_range.map((id) =>
      filterData.price_range.find((priceFilter) => priceFilter.id === id),
    );
    if (appliedPriceFilter?.length > 0)
      filterFnArray = [
        ...filterFnArray,
        ...appliedPriceFilter.map((priceLimits) => (product) =>
          product.discountedPrice <= parseInt(priceLimits.end) &&
          product.discountedPrice >= parseInt(priceLimits.start),
        ),
      ];
    return (product) =>
      filterFnArray.length > 0
        ? filterFnArray.reduce((acc, fn) => fn(product) || acc, false)
        : true;
  }, [appliedFilters.price_range, filterData.price_range]);

  const filteredProducts = useMemo(
    () => products.filter((product) => filterProductsFn(product)),
    [products, filterProductsFn],
  );

  const sortedProducts = useMemo(() => {
    if (!appliedSort) return filteredProducts;
    const currentSort = sortValues.find(
      (sortParam) => sortParam.option === appliedSort,
    );
    if (currentSort?.method) return filteredProducts.sort(currentSort.method);
    return filteredProducts;
  }, [filteredProducts, appliedSort, sortValues]);

  // const searchResults = useMemo(() => {
  //   const filtered = sortedProducts.filter((entry) =>
  //     Object.values(entry).some(
  //       (val) =>
  //         typeof val === "string" &&
  //         val.toLowerCase().search(searchPhrase.toLowerCase()),
  //     ),
  //   );
  // }, [sortedProducts, searchPhrase]);

  return (
    <div>
      <div className="mx-5 mt-5 text-sm leading-8">
        <div>
          <Link to="/"> Home /</Link>
          <span className="font-semibold">Shirts for Men & Women</span>
        </div>
        <div>
          <span className="font-semibold">Shirts For Men & Women</span> - 89375
          items
        </div>
      </div>
      <div className="flex pt-3">
        <div className="filters sticky top-24 self-start flex flex-col w-1/4">
          <span className="font-semibold pl-5 flex items-center text-md w-full h-12 border-b border-gray-300">
            FILTERS
          </span>
          <FilterContainer>
            {filterData.gender?.map((gender) => (
              <InputRadio
                label={gender.title}
                id={`filter-gender-${gender.title}`}
                key={gender.title}
                value={gender.title}
                checked={appliedFilters.gender === gender.title}
                onChange={() => setAppliedFilters({ gender: gender.title })}
                name={`filter-gender`}
              />
            ))}
          </FilterContainer>
          <FilterContainer>
            <h3 className="text-md font-semibold">CATEGORIES</h3>
            {filterData.categories?.map((category) => (
              <Checkbox
                label={
                  <>
                    {category.id}
                    <span className="font-mono text-xs"> {category.count}</span>
                  </>
                }
                id={`filter-category-${category.id}`}
                key={category.id}
                value={category.id}
                checked={!!appliedFilters.categories?.includes(category.id)}
                onChange={(e) =>
                  setAppliedFilters({
                    categories: e.target.checked
                      ? Array.from(
                          new Set([
                            ...(appliedFilters.categories ?? []),
                            category.id,
                          ]),
                        )
                      : (appliedFilters.categories ?? [])?.filter(
                          (x) => x !== category.id,
                        ),
                  })
                }
                name={`filter-category`}
              />
            ))}
          </FilterContainer>
          <FilterContainer>
            <h3 className="text-md font-semibold">PRICE RANGE</h3>
            {filterData.price_range?.map((price) => (
              <Checkbox
                label={
                  <>
                    {`Rs. ${price.start} to Rs. ${price.end}`}
                    <span className="font-mono text-xs"> ({price.count})</span>
                  </>
                }
                id={`filter-price-${price.id}`}
                key={price.id}
                value={price.id}
                checked={!!appliedFilters.price_range?.includes(price.id)}
                onChange={(e) =>
                  setAppliedFilters({
                    price_range: e.target.checked
                      ? Array.from(
                          new Set([
                            ...(appliedFilters.price_range ?? []),
                            price.id,
                          ]),
                        )
                      : (appliedFilters.price_range ?? [])?.filter(
                          (x) => x !== price.id,
                        ),
                  })
                }
                name={`filter-price`}
              />
            ))}
          </FilterContainer>
        </div>
        <div className="products flex flex-col w-full">
          <div className="products-sort-container  w-full h-12 p-2 border-b border-gray-300 flex flex-row-reverse">
            <Select
              size="sm"
              value={appliedSort}
              onChange={(e) => setAppliedSort(e.target.value)}
              w="14rem"
              placeholder="Sort by"
            >
              {sortValues.map((sortParam) => (
                <option value={sortParam.option} key={sortParam.option}>
                  Sort by: {sortParam.title}
                </option>
              ))}
            </Select>
          </div>
          <ul className="py-8 px-6 flex flex-wrap">
            {sortedProducts.map((product) => (
              <ProductItem product={product} />
            ))}
            {!sortedProducts.length && (
              <span className="w-full text-center mt-6">
                No Products found!
              </span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Products;
