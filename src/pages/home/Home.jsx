import React, { useContext, useState } from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import ExploreMenu from "../../components/exploreMenu/ExploreMenu";
import FoodDisplay from "../../components/foodDisplay/FoodDisplay";
import AppDownload from "../../components/appDownload/AppDownload";
import { StoreContext } from "../../context/StoreContext";
const Home = () => {
  const [category, setCategory] = useState("All");

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
