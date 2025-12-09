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
import { useDispatch } from "react-redux";
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
} from "./store/productSlice";
import Loading from "./components/Loading";
import ProductListPage from "./pages/ProductListPage";
import ProductDisplayPage from "./pages/ProductDisplayPage";
import { Checkout } from "./pages/Checkout";
import { NoInternet } from "./components/NoInternet";
import { setAddressSlice } from "./store/addressSlice";
import OrderSuccess from "./pages/OrderSuccess";
// import { setAddress} from "./store/addressSlice";

export const App = () => {
  const dispatch = useDispatch();
  const [userLoading, setUserLoading] = useState(true);

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

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      if (response.data.success) {
        dispatch(setAllCategory(response.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      if (response.data.success) {
        dispatch(setSubCategory(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProduct = async () => {
    try {
      setLoadingProduct(true);
      const response = await Axios({
        ...SummaryApi.getAllProduct,
      });
      if (response.data.success) {
        dispatch(setProduct(response.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingProduct(false));
    }
  };
  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress
      })
      if (response.data.success) {
        dispatch(setAddressSlice(response.data.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    fetchProduct();
    fetchAddress()
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
          path="/success/:order"
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

