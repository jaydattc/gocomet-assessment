import useInterval from "hooks/useInterval";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "utils/formatters";
import "./index.css";
import { useCart, useCartActions } from "hooks/useCart";

const ProductItem = ({ product }) => {
  const { wishlist } = useCart();
  const { addWishlistItem, removeWishlistItem } = useCartActions();

  const [isSlideShowActive, setSlideShowStatus] = useState(false);
  const [slideShowIndex, setSlideShowIndex] = useState(0);

  const stopSlideShow = () => {
    setSlideShowStatus(false);
    setSlideShowIndex(0);
  };
  useInterval(
    () => {
      let newIndex = slideShowIndex + 1 ? slideShowIndex + 1 : 0;
      if (!product.images[slideShowIndex]?.src) newIndex = newIndex + 1; // skip invalid source
      if (slideShowIndex > product.images.length - 1) newIndex = 0;
      setSlideShowIndex(newIndex);
    },
    isSlideShowActive ? 1500 : null,
  );

  const isInWishlist = useMemo(
    () => !!wishlist?.wishlistItems?.find((item) => item.url === product.url),
    [wishlist.wishlistItems, product],
  );

  return (
    <li
      className="product-item"
      onMouseEnter={() => setSlideShowStatus(true)}
      onMouseLeave={stopSlideShow}
    >
      <Link to={`/${product.url}`} className="product-link">
        <div className="product-images">
          <div className="product-slider-container">
            <picture className="absolute h-full w-full">
              <img
                src={product.images[slideShowIndex]?.src}
                alt={product.title}
                title={product.title}
              />
            </picture>
          </div>
        </div>
        <div className="product-metainfo">
          <div className="product-name font-bold truncate">{product.brand}</div>
          <div className="product-desc text-sm leading-4 truncate">
            {product.additionalInfo}
          </div>
          <div className="product-sizes leading-4 truncate">
            Sizes:{" "}
            {product.allSkuForSizes?.map((size) => (
              <span className="product-sku-size font-light text-gray-400">
                {size.label}
              </span>
            ))}
          </div>
          <div className="product-price">
            <span className="font-bold text-sm mr-2">
              {formatCurrency(product.discountedPrice)}
            </span>
            {product.originalPrice !== product.discountedPrice && (
              <span className="text-xs text-red-600">
                <strike className="mr-2 black">
                  {formatCurrency(product.originalPrice)}
                </strike>
                {product.discountPercentage}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="product-actions">
        <div className="flex flex-center"></div>
        <button
          type="button"
          onClick={() =>
            isInWishlist
              ? removeWishlistItem(product)
              : addWishlistItem(product)
          }
          className={`w-full px-2 py-1 leading-6 text-center border text-sm rounded-sm border-gray-200 hover:border-gray-400 ${
            isInWishlist ? `text-red-600` : ``
          }`}
        >
          {isInWishlist ? "REMOVE FROM WISHLIST" : "WISHLIST"}
        </button>
      </div>
    </li>
  );
};

export default ProductItem;
