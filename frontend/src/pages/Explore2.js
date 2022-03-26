import React from "react";
import CardList2 from "../components/CardList2";
import { exploreList } from "../constants/MockupData";
import '../styles/Explore.css';
import Header from "../components/Header";
import Search from "../components/Search";

const Explore2 = ({ loadWeb3, account }) => {
  return (
    <div id="explore">
      <Header 
        loadWeb3={loadWeb3}
        account={account}
      />
      <Search/>
      <p id="card-list-header-text" style={{ textAlign: 'center' }} > Explore By Genres </p>
      <div id="list-container">
        <CardList2 list={exploreList} />
      </div>
    </div>
  );
};

export default Explore2;
