import React, { forwardRef } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FaRegHeart, FaTrash } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  AspectRatio,
  Button,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useCart, useCartActions } from "hooks/useCart";
import Quantity from "components/Quantity";

const FakeLink = ({ children, ...props }) => (
  <button
    className="h-full ml-4 flex box-border items-center hover:border-b-4 border-red-300"
    {...props}
  >
    {children}
  </button>
);
const IconButton = forwardRef(({ children, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    className="w-12 h-full ml-4 flex flex-col box-border items-center text-xs font-bold"
  >
    {children}
  </button>
));

const Header = (props) => {
  const {
    removeWishlistItem,
    removeCartItem,
    addCartItem,
    editCartItem,
  } = useCartActions();
  const { wishlist, cart } = useCart();
  const links = React.useMemo(
    () => [
      { label: "MEN" },
      { label: "WOMEN" },
      { label: "KIDS" },
      { label: "HOME & LIVING" },
      { label: "OFFERS" },
    ],
    [],
  );

  return (
    <header className="header-root bg-white flex justify-between">
      <Link to="/" className="text-3xl font-bold">
        M
      </Link>
      <div className="h-full flex items-center">
        {links.map((link) => (
          <FakeLink>{link.label}</FakeLink>
        ))}
      </div>
      <div></div>
      <div className="flex flex-center">
        <Popover placement="bottom">
          <PopoverTrigger>
            <IconButton>
              <FaRegHeart className="text-xl" />
              <span>Wishlist</span>
            </IconButton>
          </PopoverTrigger>
          <PopoverContent outline="none">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight="bold">Wishlist</PopoverHeader>
            <PopoverBody>
              {!wishlist.wishlistItems?.length && (
                <Text textAlign="center" p="0.5rem">
                  Your wishlist is empty!
                </Text>
              )}
              {wishlist.wishlistItems?.map((item) => (
                <Link to={item.url} className="flex p-2" key={item.url}>
                  <AspectRatio w="100%" maxW="75px" ratio={1} mr="0.25rem">
                    <Image
                      borderRadius="md"
                      objectFit="fill"
                      src={item.images[0].src}
                      alt={item.title}
                    />
                  </AspectRatio>
                  <div className="flex-1">
                    <div className="font-bold text-sm truncate">
                      {item.brand}
                    </div>
                    <div className="text-xs leading-4 truncate">
                      {item.additionalInfo}
                    </div>
                    <Button
                      mt="0.5rem"
                      size="xs"
                      onClick={(e) => {
                        e.preventDefault();
                        addCartItem(item);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                  <button
                    className="text-red-400"
                    onClick={(e) => {
                      e.preventDefault();
                      removeWishlistItem(item);
                    }}
                  >
                    <FaTrash />
                  </button>
                </Link>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Popover placement="bottom">
          <PopoverTrigger>
            <IconButton>
              <HiOutlineShoppingBag className="text-xl" />
              <span>Cart</span>
            </IconButton>
          </PopoverTrigger>
          <PopoverContent outline="none">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight="bold">Cart</PopoverHeader>
            <PopoverBody>
              {!cart.cartItems?.length && (
                <Text textAlign="center" p="0.5rem">
                  Your cart is empty!
                </Text>
              )}
              {cart.cartItems?.map((item) => (
                <div className="flex p-2" key={item.url}>
                  <AspectRatio w="100%" maxW="75px" ratio={1} mr="0.25rem">
                    <Image
                      borderRadius="md"
                      objectFit="fill"
                      src={item.images[0].src}
                      alt={item.title}
                    />
                  </AspectRatio>
                  <div className="flex-1">
                    <Link to={item.url}>
                      <div className="font-bold text-sm truncate">
                        {item.brand}
                      </div>
                      <div className="text-xs leading-4 truncate">
                        {item.additionalInfo}
                      </div>
                    </Link>
                    <Quantity
                      value={item.quantity}
                      onChange={(quantity) =>
                        editCartItem({ ...item, quantity })
                      }
                    />
                  </div>
                  <button
                    className="text-red-400"
                    onClick={(e) => {
                      e.preventDefault();
                      removeCartItem(item);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              {!!cart.cartItems?.length && (
                <div className="flex flex-row-reverse p-2">
                  <Button ml="auto">Checkout</Button>{" "}
                </div>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
