import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const getProductKey = (product) => `${product.id}-${product.size}`;

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productKey = getProductKey(product);
      const existingProductIndex = prevCart.findIndex(
        (item) => getProductKey(item) === productKey
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        return [...prevCart, product];
      }
    });

    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = updatedCart.findIndex(
      (item) => getProductKey(item) === getProductKey(product)
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += product.quantity;
    } else {
      updatedCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId, productSize) => {
    setCart((prevCart) =>
      prevCart.filter(
        (product) => !(product.id === productId && product.size === productSize)
      )
    );

    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCartFiltered = updatedCart.filter(
      (product) => !(product.id === productId && product.size === productSize)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCartFiltered));
  };

  const removeAllItemsFromCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        cart,
        addToCart,
        removeFromCart,
        removeAllItemsFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
