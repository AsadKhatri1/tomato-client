import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import ExploreMenu from "../../components/exploreMenu/ExploreMenu";
import FoodDisplay from "../../components/foodDisplay/FoodDisplay";
import AppDownload from "../../components/appDownload/AppDownload";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const Home = ({ setShowLogin }) => {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setShowLogin(true);
    }
  }, []);

  return (
    <div>
      <Header></Header>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}></FoodDisplay>
      <AppDownload />
    </div>
  );
};

export default Home;
