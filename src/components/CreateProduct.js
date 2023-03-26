import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/createProduct.module.css";
import { BASE_URL } from "../utils";
import { useSelector } from "react-redux";

export default function CreateProduct() {
  const { data: products } = useSelector((state) => state.products);

  //state for new products array which will contain newly added product
  const [newProductsArr, setNewProductsArr] = useState(products);
  // states for individual elements of the new product to be added
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");

  // will be used to redirect to home page after successful addition of product
  const navigator = useNavigate();

  // function to create the product using states and sent the post request to add it in the server, we will also add the product into newProductsArr for our own use
  function addProduct(e) {
    e.preventDefault();
    let newProduct = {
      title,
      price,
      description,
      category,
      imageLink,
      rating: {
        rate: 0,
        count: 0,
      },
    };
    Axios.post(BASE_URL, newProduct)
      .then(() => {
        // alert user only on successfull resolution of promise then add it to new array and redirect to home at last
        alert("Product added successfully!");
        setNewProductsArr([...newProductsArr, newProduct]);
        navigator("/");
      })
      .catch((err) => console.log(err));
  }
  // rendering form using jsx
  return (
    <div className={styles.container}>
      <form onSubmit={addProduct}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          name="imageLink"
          id="imageLink"
          placeholder="Image Link"
          onChange={(e) => setImageLink(e.target.value)}
        />
        <textarea
          name="description"
          id="description"
          placeholder="Product description"
          rows="5"
          cols={50}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
