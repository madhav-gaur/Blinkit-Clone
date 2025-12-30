/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchUserDetails from "./utils/userDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Account from "./layout/Account";
import Profile from "./pages/Profile";
import Address from "./pages/Address";
import Orders from "./pages/Orders";
import Privacy from "./pages/Privacy";
import ProtectedRoute from "./components/ProtectedRoute";
import SubCategory from "./pages/SubCategory";
import Category from "./pages/Category";
import UploadProduct from "./pages/UploadProduct";
import ProductAdmin from "./pages/ProductAdmin";
import AdminProtect from "./components/AdminProtect";
import LoginProtect from "./components/LoginProtect";
import Axios from "./utils/axios";
import SummaryApi from "./common/summaryAPI";
import {
  setAllCategory,
  setLoadingCategory,
  setSubCategory,
  setProduct,
  setLoadingProduct,
  setIsLoaded,
  setIsLoadedCategory,
  setIsLoadedSubCategory,
} from "./store/productSlice";
import Loading from "./components/Loading";
import ProductListPage from "./pages/ProductListPage";
import ProductDisplayPage from "./pages/ProductDisplayPage";
import { Checkout } from "./pages/Checkout";
import { NoInternet } from "./components/NoInternet";
import { setAddressSlice, setAllAddress, setIsAddressLoaded, setIsAllAddressLoaded } from "./store/addressSlice";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import { setIsOrderLoaded, setOrderSliceData } from "./store/orderSlice";
import AdminOrders from "./pages/AdminOrders";
import isAdmin from "./utils/isAdmin";
// import { setAddress} from "./store/addressSlice";

export const App = () => {
  const dispatch = useDispatch();
  const [userLoading, setUserLoading] = useState(true);
  const user = useSelector(state => state.user)
  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      dispatch(setUserDetails(userData?.data?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setUserLoading(false);
    }
  };
  const isLoadedCategory = useSelector(state => state.product.isLoadedCategory)

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      if (response.data.success) {
        dispatch(setAllCategory(response.data.data));
        dispatch(setIsLoadedCategory(true))
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  useEffect(() => {
    if (!isLoadedCategory) {
      fetchCategory()
    }
  }, [isLoadedCategory])

  const isLoadedSubCategory = useSelector(state => state.product.isLoadedSubCategory)
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      if (response.data.success) {
        dispatch(setSubCategory(response.data.data));
        dispatch(setIsLoadedSubCategory(true))
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isLoadedSubCategory) {
      fetchSubCategory()
    }
  }, [isLoadedSubCategory])

  const isAllAddressLoaded = useSelector(state => state.address.isAllAddressLoaded)

  const fetchAllAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAllAddress,
      });
      if (response.data.success) {
        dispatch(setAllAddress(response.data.data));
        dispatch(setIsAllAddressLoaded(true))
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAllAddressLoaded && isAdmin(user.role)) {
      fetchAllAddress()
    }
  }, [isAllAddressLoaded])
  // const fetchProduct = async () => {
  //   try {
  //     setLoadingProduct(true);
  //     const response = await Axios({
  //       ...SummaryApi.getAllProduct,
  //     });
  //     if (response.data.success) {
  //       dispatch(setProduct(response.data.data));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     dispatch(setLoadingProduct(false));
  //   }
  // };
  const isLoaded = useSelector(state => state.product.isLoaded)
  const fetchProduct = async () => {
    try {
      dispatch(setLoadingProduct(true))
      const response = await Axios({
        ...SummaryApi.getAllProduct
      })
      if (response.data.success) {
        const tempProduct = response.data.data
        dispatch(setProduct(tempProduct))
        dispatch(setIsLoaded(true))
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingProduct(false))
    }
  }

  useEffect(() => {
    if (!isLoaded) {
      fetchProduct()
    }
  }, [isLoaded])
  const isAddressLoaded = useSelector(state => state.address.isAddressLoaded)

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress
      })
      if (response.data.success) {
        let arr = response.data.data;
        dispatch(setAddressSlice(arr))
        dispatch(setIsAddressLoaded(true))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!isAddressLoaded) {
      fetchAddress()
    }
  }, [isAddressLoaded])
  const fetchOrders = async () => {
    try {
      setIsOrderLoaded(false)
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      })
      if (response.data.success) {
        const temp = response.data.data.reverse()
        dispatch(setOrderSliceData(temp))
        dispatch(setIsOrderLoaded(true))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const isOrderLoaded = useSelector((state) => state.orders.isOrderLoaded)
  useEffect(() => {
    if (!isOrderLoaded) {
      fetchOrders()
    }
  }, [])
  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    fetchAddress()
    fetchOrders()
  }, []);


  if (userLoading) return <Loading />;
  return (
    <>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss={false}
      />
      <NoInternet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path=":category">
          <Route path=":subCategory" element={<ProductListPage />} />
        </Route>
        <Route path=":product/:productId" />
        <Route path="product/:product" element={<ProductDisplayPage />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={
            <LoginProtect>
              <Checkout />
            </LoginProtect>}
        />
        <Route
          path="/success/:orderId"
          element={
            <LoginProtect>
              <OrderSuccess />
            </LoginProtect>}
        />

        <Route
          path="/account"
          element={
            <LoginProtect>
              <Account />
            </LoginProtect>
          }
        >
          <Route
            path="profile"
            element={
              <LoginProtect>
                <Profile />
              </LoginProtect>
            }
          />
          <Route
            path="address"
            element={
              <LoginProtect>
                <Address />
              </LoginProtect>
            }
          />
          <Route
            path="orders"
            element={
              <LoginProtect>
                <Orders />
              </LoginProtect>
            }
          />
          <Route
            path="privacy"
            element={
              <LoginProtect>
                <Privacy />
              </LoginProtect>
            }
          />
          <Route
            path="/account/orders/:orderId"
            element={
              <LoginProtect>
                <OrderDetails />
              </LoginProtect>}
          />
          <Route
            path="category"
            element={
              <AdminProtect>
                <Category />
              </AdminProtect>
            }
          />
          <Route
            path="subcategory"
            element={
              <AdminProtect>
                <SubCategory />
              </AdminProtect>
            }
          />
          <Route
            path="all-orders"
            element={
              <AdminProtect>
                <AdminOrders />
              </AdminProtect>
            }
          />
          <Route
            path="upload-product"
            element={
              <AdminProtect>
                <UploadProduct />
              </AdminProtect>
            }
          />
          <Route
            path="product"
            element={
              <AdminProtect>
                <ProductAdmin />
              </AdminProtect>
            }
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

