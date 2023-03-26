import "../App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { BASE_URL } from "../utils";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import Cart from "./Cart";
import ProductPage from "./ProductPage";
import Login from "./Login";
import Error404 from "./Error404";

import { fetchProducts } from "../store/productsSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  // to maintain login state and achieve conditional rendering
  const [loggedIn, setLoggedIn] = useState(false);

  // hook to fetch products data from store
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // function to send delete request to server using product id
  function handleProductDelete(id) {
    Axios.delete(`${BASE_URL}/${id}`)
      .then(() => alert("Product Deleted!"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      {/* navbar component which will be rendered in all cases out of routes */}
      <NavBar loggedIn={loggedIn} handleSetLoggedIn={setLoggedIn} />
      <Routes>
        {/* route to render Home component */}
        <Route
          exact
          path="/"
          element={<Home handleProductDelete={handleProductDelete} />}
        />
        {/* route to render a specific product component */}
        <Route exact path="/products/:prodId" element={<ProductPage />} />
        {/* route to create a new product */}
        <Route exact path="/create-product" element={<CreateProduct />} />
        {/* route to update the specific component */}
        <Route
          exact
          path="/update-product/:prodId"
          element={<UpdateProduct />}
        />
        {/* rout to cart componet  */}
        <Route exact path="/cart" element={<Cart />} />
        {/* route to login page   */}
        <Route
          exact
          path="/login"
          element={
            <Login loggedIn={loggedIn} handleSetLoggedIn={setLoggedIn} />
          }
        />
        {/* any other route i.e. handle Error 404 - Page Not Found */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
