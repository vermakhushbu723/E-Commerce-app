import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../utils";
import styles from "../css/createProduct.module.css";
import { useSelector } from "react-redux";

export default function UpdateProduct() {
  const {data: products} = useSelector(state => state.products)

  // fetch product id from url
  const { prodId } = useParams();

  // instead of making the api call to fetch the specific ProductPage(which is making application slower), we will use the passed ID to fetch product from products array received as props
  const selectedProduct = products.find(
    (item) => item.id.toString() === prodId
  );

  // states for individual elements of the product to be modified
  const [title, setTitle] = useState(selectedProduct.title);
  const [price, setPrice] = useState(selectedProduct.price);
  const [category, setCategory] = useState(selectedProduct.category);
  const [imageLink, setImageLink] = useState(selectedProduct.image);
  const [description, setDescription] = useState(selectedProduct.description);

  // will be used to redirect to home page after successful modification of the product
  const navigator = useNavigate();

  function modifyProduct(e) {
    e.preventDefault();
    // create an object out of all states
    let modifiedProduct = {
      title,
      price,
      description,
      category,
      imageLink,
      rating: {
        rate: selectedProduct.rating.rate,
        count: selectedProduct.rating.count,
      },
    };
    // and put it to server using Axios
    Axios.put(`${BASE_URL}/${prodId}`, modifiedProduct)
      .then((res) => {
        // alert user only on successfull resolution of promise
        console.log(res.data);
        alert("Product modified successfully!");
        navigator("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={modifyProduct}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          name="imageLink"
          id="imageLink"
          placeholder="Image Link"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        <textarea
          name="description"
          id="description"
          placeholder="Product description"
          value={description}
          rows="5"
          cols={50}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Update Product</button>
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            navigator("/");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
