// HomePage.js
import React from "react";
import Banner from "./Banner/Banner";
import TopProducts from "./TopProducts/TopProducts";
import Highlights from "./Highlights/Highlights";
import CustomPacks from "./CustomPacks/CustomPacks";
import Quote from "./Quote/Quote";
import "./HomePage.style.css";

function HomePage() {
  return (
    <>
      <Banner />
      <TopProducts />
      <Highlights />
      <CustomPacks />
      <Quote />
    </>
  );
}

export default HomePage;
