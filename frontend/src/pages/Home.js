import React from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
import CardList from "../components/CardList";
import { hotDropsData } from "../constants/MockupData";

const Home = ({ loadWeb3, account }) => {

  return (
    <div id="home">
      <Hero loadWeb3={loadWeb3} account={account} />

      <p id="card-list-header-text"> Hot Drops </p>
      <div id="list-container">
        <CardList list={hotDropsData} />
      </div>
    </div>
  );
};

export default Home;
