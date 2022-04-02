import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

const CardList = ({ list,type="horizontal" }) => {
  let navigate = useNavigate();

  return (
    <div id="card-list" style={{flexDirection:type=="horizontal" ? "row" : "column"}}>
      {list.map((item,index) => (
        <NFTCard nftSrc={item[0].imageHash} key={index} name={item[0].tokenName} price={item[0].price} owner={item[0].currentOwner} creator={item[0].mintedBy}index={index} onClick={() => navigate('/detail', { state: { item: item[0] } })} />
        ))}
    </div>
  );
};

export default CardList;
