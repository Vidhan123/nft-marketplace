import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from 'web3';
import ipfsClient from 'ipfs-http-client';

import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import NFTDetail from "./pages/NFTDetail";

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function App() {

  const [account, setAccount] = useState('');

  const fetchAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
    setAccount(accounts[0]);
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    
      window.ethereum.on('accountsChanged', function () {
        // loadBlockchainData();
      })
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.ethereum.on('accountsChanged', function () {
        // loadBlockchainData();
      })
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/detail" element={<NFTDetail />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/stats" element={<Stats />} /> */}
          <Route path="/" element={ 
            <Home
              loadWeb3={fetchAccount}
              account={account}
            />
          } />
        </Routes>
      </BrowserRouter>
    </>    
  );
}

export default App;