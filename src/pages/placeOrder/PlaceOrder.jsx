import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    food_list,
    getTotalCartAmount,
    url,
    token,
  } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item, index) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let res = await axios.post(
      url + "/api/order/place",
      {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 5,
      },
      { headers: { token } }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <form action="" className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={changeHandler}
            value={data.firstName}
            name="firstName"
            placeholder="First Name"
          />
          <input
            required
            type="text"
            onChange={changeHandler}
            value={data.lastName}
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          type="email"
          onChange={changeHandler}
          value={data.email}
          name="email"
          placeholder="Email Address"
        />
        <input
          required
          type="text"
          onChange={changeHandler}
          value={data.street}
          name="street"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={changeHandler}
            name="city"
            value={data.city}
            placeholder="City"
          />
          <input
            required
            type="text"
            onChange={changeHandler}
            value={data.state}
            name="state"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={changeHandler}
            value={data.zipCode}
            name="zipCode"
            placeholder="Zip Code"
          />
          <input
            required
            type="text"
            onChange={changeHandler}
            value={data.country}
            name="country"
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          onChange={changeHandler}
          value={data.phone}
          name="phone"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>${5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 5}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
