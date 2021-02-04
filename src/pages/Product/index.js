import { useEffect, useState } from "react";
import { fetchProductsAndFilters } from "utils/fetchAPIData";

function Products() {
  const [isFetching, setIsFetching] = useState(true);
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState({
    gender: [],
    categories: [],
    price: [],
  });
  useEffect(() => {
    setIsFetching(true);
    fetchProductsAndFilters().then(([products, filter_data]) => {
      setProducts(products);
      setFilterData(filter_data);
    });
  }, []);
  return (
    <div>
      <div>
        Home / <span className="bold semi-bold">Shirts for Men & Women</span>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Products;
