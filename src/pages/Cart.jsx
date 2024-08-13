import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { isCartOpen, closeCart, cart, removeFromCart } = useCart();

  useEffect(() => {
    document.title = "Purigo"
  }, [])


  const calculateSubtotal = () => {
    return cart.reduce((total, product) => {
      const price = parseFloat(product.price.replace("$", ""));
      return total + price * product.quantity;
    }, 0);
  };

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog className="fixed inset-0 overflow-y-auto" onClose={closeCart}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={closeCart}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-8 max-h-80 overflow-y-auto">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.length === 0 ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="text-center">Cart is empty</div>
                      </div>
                    ) : (
                      cart.map((product) => (
                        <li key={`${product.id}-${product.size}`} className="flex flex-col py-6">
                          <div className="h-24 w-24 mx-auto flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.image}
                              alt="Product"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="mt-4 text-center">
                            <h3 className="text-base font-medium text-gray-900">{product.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            <p className="mt-1 text-sm text-gray-900">{product.price}</p>
                            <p className="mt-1 text-sm text-gray-500">Qty {product.quantity}</p>
                            <button
                              type="button"
                              className="mt-2 font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => removeFromCart(product.id , product.size)}
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{calculateSubtotal().toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/account/checkout"
                    onClick={() => closeCart()}
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => closeCart()}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
