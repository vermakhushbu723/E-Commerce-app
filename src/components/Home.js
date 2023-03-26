import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
import styles from "../css/home.module.css";
import ProductItem from "./ProductItem";
import { setProducts } from "../store/productsSlice";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

export default function Home(props) {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.products);
  function handleSetProducts(prods) {
    dispatch(setProducts(prods));
  }

  const handleProductDelete = props.handleProductDelete;
  // state for list of categories to be displayed in drop down menu
  const [categories, setCategories] = useState([]);
  // state for selected category by user
  const [selectedCaregory, setSelectedCategory] = useState("");

  const [arraySorted, setArraySorted] = useState(false);

  // hook to fetch all categories and set their state
  useEffect(() => {
    let url = `${BASE_URL}/categories`;
    Axios.get(url).then((categ) => setCategories(categ.data));
  }, []);

  // function to display all products on home page using products state
  function populateDOM(products) {
    // map over the array and return a new Product Item component
    return products.map((item, index) => {
      return (
        <ProductItem
          item={item}
          handleProductDelete={handleProductDelete}
          key={index}
        />
      );
    });
  }

  // function to create select menu options using categories state
  function listCategories() {
    return (
      <>
        <select
          name="category"
          id="category"
          value={selectedCaregory}
          onChange={(e) => {
            let val = e.target.value;
            // compare with previous state and make network call only iof state is changed
            setSelectedCategory((prevProps) => {
              if (prevProps === val) {
                return val;
              } else {
                displayCategoryProducts(val);
                return val;
              }
            });
          }}
        >
          <option value="">All Categories</option>
          {categories.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item.toUpperCase()}
              </option>
            );
          })}
        </select>
      </>
    );
  }

  // function to fetch and display products of specified category
  function displayCategoryProducts(val) {
    // if the specified cayegort is All Categories
    if (val === "") {
      // if specified category was already All categories and user again selects All Categories, then we should not make any request to the server, just return from here
      // need beter condition check here.......................
      // if (products.length === 20) {
      //   return;
      // }
      Axios.get(BASE_URL).then((res) => handleSetProducts(res.data));
      return;
    }
    // if specified category is anything but All Categories, we make the get request for specified category and set the products array to the received response
    Axios.get(`${BASE_URL}/category/${val}`).then((res) => {
      handleSetProducts(res.data);
    });
  }

  // sort products by price functionality
  useEffect(() => {
    let sortedProducts = [...products].sort((a, b) => a.price - b.price);
    if (arraySorted) {
      handleSetProducts(sortedProducts);
    } else {
      Axios.get(BASE_URL)
        .then((res) => handleSetProducts(res.data))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [arraySorted]);

  return (
    <div>
      <div className={styles.wrapper}>
        <button
          className={styles.sortByPrice}
          onClick={() => {
            if (!arraySorted) {
              toast.info("Items sorted by price", {
                position: "bottom-center",
                autoClose: 1500,
              });
            } else {
              toast.info("Sorting removed", {
                position: "bottom-center",
                autoClose: 1500,
              });
            }
            setArraySorted(!arraySorted);
          }}
        >
          Sort By Price
          {arraySorted ? (
            <span>
              {" "}
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          ) : (
            ``
          )}
        </button>
        <div className={styles.categories}>{listCategories()}</div>
      </div>
      <div className={styles.container}>{populateDOM(products)}</div>
    </div>
  );
}
