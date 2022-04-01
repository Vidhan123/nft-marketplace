import React from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
import CardList from "../components/CardList2";
import { hotDropsData } from "../constants/MockupData";

const Home = ({ loadWeb3, account,allNFTS }) => {

  return (
    <div id="home">
      <Hero loadWeb3={loadWeb3} account={account} />

      <p id="card-list-header-text"> Trending </p>
      <div id="list-container">
        <CardList list={allNFTS} />
      </div>
    </div>
  );
};

export default Home;
