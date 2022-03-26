import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from 'web3';
import ipfsClient from 'ipfs-http-client';

import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import NFTDetail from "./pages/NFTDetail";

import useAPI from './hooks/useAPI';
import useNFT from './hooks/useNFT';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function App() {

  const [musicNFT, setMusicNFT] = useState(null);
  const [account, setAccount] = useState('');
  const [user, setUser] = useState({});
  const [allNfts, setAllNfts] = useState([]);

  const { getUser } = useAPI();
 
  const fetchAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
    setAccount(accounts[0]);
  }

  const loadDetails = async () => {
    // User
    const res2 = await getUser(account);
    setUser(res2);
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    // const contractAddress = "0x92b290D4f56Fe06B1E964CC6A2EcFb09dfD10569";
    // const contract = new web3.eth.Contract(contractAbi, contractAddress);
    // setMusicNFT(contract);

    // Get All NFTs
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    
      window.ethereum.on('accountsChanged', function () {
        // load details
        loadDetails();
      })
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.ethereum.on('accountsChanged', function () {
        // load details
        loadDetails();
      })
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  useEffect(() => {
    const Load = async () => {
      await loadBlockchainData();
      await loadWeb3();
    }
    Load()
  }, [])

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
