import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';

import metamaskIcon from "../assets/metamask.svg";

import '../App.css';

const Header = ({loadWeb3, account}) => {

    const handleWallet = () => {
      loadWeb3();
    }

    return (
        <div id="header">
        <Link to='/' id='logo'>NFT Room</Link>

        <div id="link-containers">
          <Link to="/explore">Explore</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/create">Create</Link>

          <Button
              onClick={() => handleWallet()}
              variant="contained"
              className="nav-link color-border"
              style={{ marginLeft: "2vw", background: 'transparent', color: "#fff"  }} 
              //  style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
            >
            <img
              src={metamaskIcon}
              alt="metamask-icon"
              style={{ width: "1.8rem", marginRight: "0.5rem", padding: "3px" }}
            />
            {account ? account.substring(0,4)+'...'+account.substring(account.length-3,account.length) : `Connect  `}
          </Button>
        </div>
      </div>
    );
}

export default Header;