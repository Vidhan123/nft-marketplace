import React, { useEffect, useState } from "react";
import "../styles/NFTCard.css";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ColorExtractor } from 'react-color-extractor'
import Card from "./base/Card";
import Button from "./base/Button";
import { Colors } from "../constants/Colors";

import { ModelViewerElement } from "@google/model-viewer";
import { useARStatus } from "../hooks/isARStatus";

const NFTCard = ({ nftSrc,name, price,owner,creator,  likeCount, gradient, onClick, index }) => {
  const [isLike, setIsLike] = useState(false);
  const [colors, setColors] = useState([]);

  // const isARSupport = useARStatus(nftSrc);

  useEffect(() => {
    // console.log(isARSupport);
  }, [])

  const like = () => setIsLike(!isLike);

  const getColors = colors => {
    setColors(c => [...c, ...colors]);
    //console.log(colors);
  }

  // const names = ["Unnamed", "Priyansh Mehta", "Unnamed", "Varun Mehta"];
  // const prices = [1.2, 1, 4.5, 0.3];
  // const weiP= window.web3.utils.fromWei(price.toString(), "ether")
console.log("weiP",price)
  return (
    <Card
      blurColor={colors[0]}

      child={<>
        {/* {isARSupport ? <model-viewer ar-scale="auto" ar ar-modes="webxr scene-viewer quick-look" id="reveal" loading="eager" camera-controls auto-rotate src={nftSrc} > </model-viewer> : <>
        <ColorExtractor getColors={getColors}>
          <img className="nft-image" src={nftSrc} alt={"nft-img"} />
        </ColorExtractor></>} */}
        <ColorExtractor getColors={getColors}>
          <img className="nft-image" src={nftSrc} alt={"nft-img"} />
        </ColorExtractor>
        <div className="wrapper">
          <div className="info-container">
            <p className="owner">  {owner.substring(0, 4) + '...' + owner.substring(owner.length - 3, owner.length) }</p>
            <p className="name">{name}</p>
          </div>

          <div className="price-container">
            <p className="price-label">Price</p>
            <p className="price">
              {" "}
              <FaEthereum /> 
              {window.web3.utils.fromWei(price.toString(), "ether")}
              
            </p>
          </div>
        </div>
        <div className="buttons">
          {/* <button className="buy-now">Buy Now</button> */}
          <Button color={Colors.buttons.primary} textContent="Buy Now" onClick={onClick} />
          <div className="like-container">
            <button className="like" onClick={like}>
              {!isLike ? (
                <AiOutlineHeart size="30" color="white" />
              ) : (
                <AiFillHeart size="30" style={{
                  stroke: `-webkit-linear-gradient(
                    to bottom,
                    #38ef7d,
                    #11998e
                  );`
                }} color='#00f5c966' />
              )}
            </button>
            <p className="like-count">0</p>
          </div>
        </div>
      </>}>

    </Card>
  );
};

export default NFTCard;

