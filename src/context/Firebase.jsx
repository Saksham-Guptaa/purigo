import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getFirestore,
  addDoc,
  getDocs,
  query,
  limit,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "./CartContext";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU8wFH2X5GlvmSePIRCdd7gBtYi4v-d-8",
  authDomain: "purigo-26410.firebaseapp.com",
  projectId: "purigo-26410",
  storageBucket: "purigo-26410.appspot.com",
  messagingSenderId: "592782719700",
  appId: "1:592782719700:web:653f57097a2a775fbe9941",
  measurementId: "G-GGMF74E49E",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [bestproducts, setbestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const { removeAllItemsFromCart } = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      if (authUser) {
        getUser();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchProductsLimit();
    fetchProducts();
    getUser();
    fetchCoupons();
  }, []);

  const getUser = async () => {
    try {
      setLoading(true);
      const currentUser = firebaseAuth.currentUser;

      if (!currentUser || !currentUser.uid) {
        return "User is not authenticated or has no UID";
      }

      const userReferenceCollection = collection(firestore, "users");
      const userDocumentReference = doc(
        userReferenceCollection,
        currentUser.uid
      );
      const userSnapshot = await getDoc(userDocumentReference);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();

        // Update lastLoggedIn field
        await updateDoc(userDocumentReference, {
          lastLoggedIn: Date.now(), 
        });

        setUser(userData);
        return userData;
      } else {
        throw new Error("User document does not exist");
      }
    } catch (error) {
      // console.error("Firebase Error: getUser", error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(firebaseAuth);
      setUser(null);
    } catch (error) {
      // console.error("Firebase Error: logout", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const continueWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      setUser(user);
      setError(null);
      return user;
    } catch (error) {
      // console.error("Firebase Error: continueWithGoogle", error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createUserWithEmailAndPasswordFirebase = async (
    email,
    password,
    fullName,
    address,
    phone
  ) => {
    try {
      setLoading(true);
      const authUserCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const { user } = authUserCredential;
      const userReferenceCollection = collection(firestore, "users");
      const userData = {
        uid: user.uid,
        email,
        fullName,
        address,
        number: phone,
        isActive: false,
        admin: false,
      };
      await setDoc(doc(userReferenceCollection, user.uid), userData);
      setError(null);
      return user;
    } catch (error) {
      // console.error(
      //   "Firebase Error: createUserWithEmailAndPasswordFirebase",
      //   error.message
      // );
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const loggedInUser = userCredential.user;

      if (loggedInUser) {
        setUser(loggedInUser);
        setError(null);
        return getUser();
      }

      return null;
    } catch (error) {
      // console.error("Firebase Error :: login", error.message);
      setError("Invalid email or password. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addNewProduct = async (
    title,
    price,
    description,
    twofifty,
    fivehundred,
    onekg,
    images,
    category,
    callback
  ) => {
    try {
      setLoading(true);

      const imageUrls = [];
      const promises = images.map(async (image) => {
        const randomName = uuidv4();
        const imageName = `${randomName}_${image.name}`;
        const storageRef = getStorage(firebaseApp);
        const storageImageRef = ref(storageRef, `images/${imageName}`);
        await uploadBytes(storageImageRef, image);
        const downloadUrl = await getDownloadURL(storageImageRef);
        imageUrls.push(downloadUrl);
      });

      await Promise.all(promises);

      const currentUser = firebaseAuth.currentUser;

      if (!currentUser || !currentUser.uid) {
        throw new Error("User is not authenticated or has no UID");
      }

      const slug = title.replace(/\s+/g, "-").toLowerCase();

      const newPrice = twofifty || fivehundred || onekg;

      const productData = {
        title,
        slug,
        price: newPrice,
        description,
        twofifty,
        fivehundred,
        onekg,
        category,
        images: imageUrls,
        userId: currentUser.uid,
        status: true,
      };

      const productCollectionRef = collection(firestore, "products");

      await setDoc(doc(productCollectionRef, slug), productData);

      setError(null);

      if (callback && typeof callback === "function") {
        callback(true);
      }
    } catch (error) {
      // console.error("Firebase Error: addNewProduct", error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const productCollectionRef = collection(firestore, "products");
      const productsQuerySnapshot = await getDocs(productCollectionRef);

      const products = [];
      productsQuerySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      setLoading(false);
      setProducts(products);
      // console.log("new request festch");
      return products;
    } catch (error) {
      // console.error("Firebase Error: fetchProducts", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const fetchProductsLimit = async () => {
    try {
      setLoading(true);

      const productCollectionRef = collection(firestore, "products");
      const limitedQuery = query(productCollectionRef, limit(4));
      const productsQuerySnapshot = await getDocs(limitedQuery);

      const fetchedProducts = productsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setbestProducts(fetchedProducts);
      setLoading(false);
      // console.log("new request");
      return fetchedProducts;
    } catch (error) {
      // console.error("Firebase Error: fetchProducts", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const findProductById = async (productId) => {
    try {
      setLoading(true);
      const productDocRef = doc(collection(firestore, "products"), productId);
      const productDocSnapshot = await getDoc(productDocRef);

      if (productDocSnapshot.exists()) {
        const productData = productDocSnapshot.data();
        setLoading(false);
        return { id: productDocSnapshot.id, ...productData };
      } else {
        setLoading(false);
        throw new Error("Product not found");
      }
    } catch (error) {
      // console.error("Firebase Error: findProductById", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const isLoggedIn = firebaseAuth.currentUser ? true : false;

  const signInWithPhoneNumberFirebase = async (phoneNumber) => {
    try {
      setLoading(true);

      const currentUser = firebaseAuth.currentUser;

      if (currentUser) {
        const userReferenceCollection = collection(firestore, "users");
        const userDocumentReference = doc(
          userReferenceCollection,
          currentUser.uid
        );

        await updateDoc(userDocumentReference, {
          number: phoneNumber,
          isActive: true,
        });

        const updatedUserData = {
          ...user,
          number: phoneNumber,
          isActive: true,
        };
        setUser(updatedUserData);
      } else {
        throw new Error("User not found");
      }

      setLoading(false);
      setError(null);
    } catch (error) {
      // console.error("Error adding phone number:", error);
      setError("Error adding phone number. Please try again.");
      setLoading(false);
      throw error;
    }
  };

  const fetchCoupons = async () => {
    try {
      setLoading(true);

      const couponsCollectionRef = collection(firestore, "coupons");
      const couponsQuerySnapshot = await getDocs(couponsCollectionRef);

      const coupons = couponsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCoupons(coupons);
      setLoading(false);
      return coupons;
    } catch (error) {
      // console.error("Firebase Error: fetchCoupons", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const reduceCouponQuantity = async (couponId) => {
    try {
      setLoading(true);

      const couponDocRef = doc(collection(firestore, "coupons"), couponId);
      const couponDocSnapshot = await getDoc(couponDocRef);

      if (couponDocSnapshot.exists()) {
        const couponData = couponDocSnapshot.data();
        let currentQuantity = couponData.quantity;

        if (currentQuantity > 0) {
          const newQuantity = currentQuantity - 1;

          await updateDoc(couponDocRef, {
            quantity: newQuantity,
          });

          if (newQuantity === 0) {
            await updateDoc(couponDocRef, {
              isActive: false,
            });
            await fetchCoupons();
          }
        }
      } else {
        // console.error("Coupon document not found.");
        return "INVALID COUPON";
      }

      setLoading(false);
    } catch (error) {
      // console.error("Firebase Error: reduceCouponQuantity", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const getCurrentFormattedDate = () => {
    const date = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  // const ORDERstatuses = ["ORDER CONFIRMED", "SHIPPING", "DELIVERED"];
  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const firestore = getFirestore(firebaseApp);

      orderData.confirmedDate = getCurrentFormattedDate();

      const batch = writeBatch(firestore);

      const orderCollectionRef = collection(firestore, "orders");
      const orderDocRef = doc(orderCollectionRef, orderData.trackingNumber);
      batch.set(orderDocRef, orderData);

      const userCollectionRef = collection(firestore, "users");
      const userDocRef = doc(userCollectionRef, orderData.userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const orderHistory = userData.orderHistory || [];
        const coupons = userData.coupons || [];
        if (orderData.discounts[0].code != "") {
          coupons.push(orderData.discounts[0].code);
        }
        orderHistory.push({
          orderId: orderData.trackingNumber,
          items: orderData.items,
          grandTotal: orderData.grandTotal,
          confirmedDate: orderData.confirmedDate,
        });
        batch.update(userDocRef, { orderHistory, coupons });
      } else {
        throw new Error("User document does not exist");
      }

      await batch.commit();
      if (orderData.discounts[0].code != "") {
        await reduceCouponQuantity(orderData.discounts[0].code);
      }

      removeAllItemsFromCart();

      // console.log("Order created successfully:", orderData);
      setLoading(false);
    } catch (error) {
      // console.error("Firebase Error: createOrder", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const findOrderById = async (orderId) => {
    try {
      setLoading(true);
      const orderDocRef = doc(collection(firestore, "orders"), orderId);
      const orderDocSnapshot = await getDoc(orderDocRef);

      if (orderDocSnapshot.exists()) {
        const orderData = orderDocSnapshot.data();
        setLoading(false);
        return { id: orderDocSnapshot.id, ...orderData };
      } else {
        setLoading(false);
        throw new Error("Order not found");
      }
    } catch (error) {
      // console.error("Firebase Error: findOrderById", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const addContact = async (email, subject, message, trackingID) => {
    try {
      setLoading(true);

      const contactData = {
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      };

      if (trackingID !== "") {
        contactData.trackingID = trackingID;
      }

      if (user) {
        contactData.uid = user.uid;
      }

      const contactCollectionRef = collection(firestore, "contact");

      await addDoc(contactCollectionRef, contactData);

      setLoading(false);
      setError(null);
    } catch (error) {
      // console.error("Firebase Error: addContact", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const fetchAllOrders = async () => {
    try {
      setLoading(true);

      const ordersCollectionRef = collection(firestore, "orders");
      const ordersQuerySnapshot = await getDocs(ordersCollectionRef);

      const orders = ordersQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLoading(false);
      return orders;
    } catch (error) {
      // console.error("Firebase Error: fetchAllOrders", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);

      const orderDocRef = doc(collection(firestore, "orders"), orderId);
      const orderDocSnapshot = await getDoc(orderDocRef);

      if (orderDocSnapshot.exists()) {
        const orderData = orderDocSnapshot.data();

        orderData.status = newStatus;

        await setDoc(orderDocRef, orderData);

        setLoading(false);
        return "Order status updated successfully.";
      } else {
        setLoading(false);
        throw new Error("Order not found");
      }
    } catch (error) {
      // console.error("Firebase Error: updateOrderStatus", error.message);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const createCoupon = async (couponData) => {
    try {
      setLoading(true);
      couponData.createdOn = getCurrentFormattedDate();
      const couponsCollectionRef = collection(firestore, "coupons");
      await setDoc(doc(couponsCollectionRef, couponData.title), couponData);
      return true;
    } catch (error) {
      // console.error("Error creating coupon:", error.message);
      // throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        createCoupon,
        updateOrderStatus,
        addContact,
        fetchAllOrders,
        findOrderById,
        createOrder,
        coupons,
        reduceCouponQuantity,
        fetchCoupons,
        findProductById,
        fetchProducts,
        user,
        loading,
        error,
        logout,
        getUser,
        isLoggedIn,
        continueWithGoogle,
        createUserWithEmailAndPasswordFirebase,
        login,
        addNewProduct,
        bestproducts,
        fetchProductsLimit,
        signInWithPhoneNumberFirebase,
        products,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
