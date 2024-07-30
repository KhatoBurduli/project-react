import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import useFetch from "../hooks/useFetch";
import { useCart } from "../components/CartContext";

const IngredientOrder = () => {
  const { response: responseIngredient, loading: loadingIngredient } = useFetch({ url: "/api/v1/ingredients", method: "GET" });
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const ingredientList = responseIngredient?.items.map((item) => ({
    item: item.newIngredient,
    price: item.newPrice,
    id: item._uuid,
  })) || [];

  if (loadingIngredient) return <Spinner/>  

  return (
    <div className="container">
        <div className="order">
      <div className="options-box">
      <button className="back" onClick={() => navigate('/')}>Back</button>
      <h1>Ingredient Menu</h1>
      <div className="options">
        {ingredientList.map((item) => (
          <div key={item.id} className="option">
            <h3>{item.item}</h3>
            <h4>{item.price} GEL</h4>
            <FontAwesomeIcon className="icon" onClick={() => addToCart(item)} icon={faCartPlus}/>
          </div>
        ))}
      </div>
      </div>
      <div className="cart">
        <h1>Cart</h1>
        <div className="cart-items">
        {cart.map((order) => (
          <div key={order.id} className="cart-item">
            <h3>{order.item}</h3>
            <h4 className="item-quantity">x {order.quantity}</h4>
            <h4 className="item-price">{order.price * order.quantity} GEL</h4>
            <FontAwesomeIcon className="icon-e" onClick={() => removeFromCart(order.id)} icon={faEraser}/>
          </div>
        ))}
        </div>
        <div className="total-price">
            <h2>Total Price: {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} GEL</h2>
        </div>
      </div>
    </div>
    </div>
  );
};

export default IngredientOrder;
