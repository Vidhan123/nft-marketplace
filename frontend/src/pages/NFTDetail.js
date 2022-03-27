import React, { useState, useEffect, createRef } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useLocation, Navigate } from "react-router";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import { ColorExtractor } from "react-color-extractor";
import Button from "../components/base/Button";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useMobile } from "../hooks/isMobile";
import { hotDropsData } from "../constants/MockupData";
import { useARStatus } from "../hooks/isARStatus";

const NFTDetail = ({ loadWeb3, account,buyNFTFromApp }) => {
  const isMobile = useMobile();

  const [colors, setColors] = useState([]);

  const [isLike, setIsLike] = useState(false);

  const like = () => setIsLike(!isLike);

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    setColors([]);
  }, [state]);

  const isARSupport = useARStatus(state.item.src);
  const dummy = {
    "Name": "Ta Ta Thaiya",
    "Owner": "Rishi Lakhani",
    "Description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Transfers": "4",
    "Category": "Folk",
    "price":"0.5",
    "like":"100",
    "src":"hii",
}

  return (
    <div>
      <Header 
        loadWeb3={loadWeb3}
        account={account}
      />
      <div id="nft-detail-card-wrapper">
        <Card
          width={isMobile ? "100%" : "65vw"}
          height={isMobile ? "700px" : "60vh"}
          blurColor={colors[0]}
          child={
            //Detail Content
            <div id="detail-content">
             {isARSupport ? <model-viewer ar-scale="auto" ar ar-modes="webxr scene-viewer quick-look" id="arDetail" loading="eager" camera-controls auto-rotate src={state.item.src} > </model-viewer> 
             : <> <ColorExtractor getColors={getColors}>
                {/* <img id="detail-image" src={state.item.src} /> */}
                {/* <img id="detail-image" src={dummy.src} /> */}
              </ColorExtractor></>}

              <div id="detail-info" style={{}}>
                {/* <div id='detail-info-container'>
                  <p id="collection"> {state.item.name} </p>
                  <p id="name"> {state.item.name} </p>
                  <p id="description" > {state.item.description} </p>

                </div> */}
                <div id='detail-info-container'>
                  <p id="collection"> {dummy.name} </p>
                  <p id="name"> {dummy.name} </p>
                  <p id="description" > {dummy.description} </p>

                </div>

                <div id="detail-controls">
                  <Button
                    width={isMobile ? "70%" : "70%"}
                    height="50px"
                    onClick={buyNFTFromApp(dummy.tokenID,dummy.price)}
                    child={
                      <div id="button-child">
                        <FaEthereum size="28px" />
                        <p id="price">Buy for {dummy.price}</p>
                      </div>
                    }
                  ></Button>
                  <div className="like-container">
                    <button className="like" onClick={like}>
                      {!isLike ? (
                        <AiOutlineHeart size="45" color="white" />
                      ) : (
                        <AiFillHeart
                          size="45"
                          style={{
                            stroke: `-webkit-linear-gradient(
                    to bottom,
                    #38ef7d,
                    #11998e
                  );`,
                          }}
                          color="#00f5c966"
                        />
                      )}
                    </button>
                    <p className="like-count">{dummy.like}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        
      </div>

    </div>
  );
};

export default NFTDetail;
