import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from 'web3';
import ipfsClient from 'ipfs-http-client';

import Home from "./pages/Home";
import CreateNFT from "./pages/CreateNFT";
import CreateUser from "./pages/CreateUser";
import Explore2 from "./pages/Explore2";
import NFTDetail from "./pages/NFTDetail2";
import DigiMusicabi from "./abis/DigiMusicabi.json";
import useAPI from './hooks/useAPI';
import useNFT from './hooks/useNFT';
import ipfs from "./hooks/ipfs";
import Header from "./components/Header";

import UserPage from "./pages/UserPage";
import DisplayUsers from "./pages/DisplayUsers";

function App() {

  const [musicNFT, setMusicNFT] = useState(null);
  const [account, setAccount] = useState('');
  const [user, setUser] = useState({});
  const [allNfts, setAllNfts] = useState([]);


  const [accountBalance,setAccountBalance]=useState(0);
  const [loading,setLoading]=useState(false);
  const [nftCount,setNftCount]=useState(0);

  const [allUsers, setAllUsers] = useState([]);

  const { getUser, getAllUsers, updateUser } = useAPI();
  const { getAllNFTs, createNFT, buyNFT, toggleForSale, changeTokenPrice, getTokenMetaData } = useNFT();

  const fetchAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
    console.log(accounts[0])
    setAccount(accounts[0]); 
    const res2 = await getUser(accounts[0]);
    setUser(res2);
  }

  const loadDetails = async () => {
    // User
    
    const res2 = await getUser(account);
    setUser(res2);
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const contractAddress ="0x9e285F51342CF5a6fE0F5a201E7C35351792796d";
    console.log(DigiMusicabi)
    const contract = new web3.eth.Contract(DigiMusicabi, contractAddress);
    console.log(contract)
    setMusicNFT(contract);

    // Get All NFTs
    let res2 = await getAllNFTs(contract);
    setAllNfts(res2)
    setNftCount(res2.length)
    console.log("Allnfts",res2)
    console.log("count",res2.length)
  }
  
  const loadAllUsers = async () => {
    const res2 = await getAllUsers();
    console.log("allUsers",res2)
    setAllUsers(res2);
  }


  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      console.log('wineth')
      window.ethereum.on('accountsChanged', async function () {
        // load details
       await fetchAccount();
      //  await loadDetails();

      })
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider.enable());
      window.ethereum.on('accountsChanged', function () {
        // load details
        fetchAccount();
        // loadDetails();
      })
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
const loadAllNFTs=async()=>{
  let {res2,res3} = await getAllNFTs(musicNFT);
  setAllNfts(res2)
  setNftCount(res3)
  console.log("Allnfts",res2)
  console.log("count",res3)
}
  useEffect(() => {
    const Load = async () => {
      await loadWeb3();
      await loadAllUsers();
      await loadBlockchainData();
      
    }
    Load()
  }, [])
  
  const createNFTFromApp=async(name, description, bufferImage,bufferMusic, tokenPrice,categories,is3d)=>{
    const newTokenPrice = window.web3.utils.toWei(tokenPrice, "Ether");
    const res2 = await createNFT(musicNFT,name, description, bufferImage,bufferMusic, newTokenPrice, categories,is3d,account);
   console.log(res2)
  }
  const toggleForSaleFromApp = async (tokenID) => {
    const res2 = await toggleForSale(musicNFT, tokenID, account)
    if (res2 == "confirmed") {
      console.log("status changed")
    }
  }

  const changeTokenPriceFromApp = async (tokenID, newPrice) => {
    const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
    const res2 = await changeTokenPrice(musicNFT, tokenID, newTokenPrice, account)
    if (res2 == "confirmed") {
      console.log("price changed")
    }
  }

  const buyNFTFromApp = async (tokenID, price) => {
    console.log(tokenID,price)
    const newTokenPrice = window.web3.utils.fromWei(price, "Ether");
    console.log(newTokenPrice)
    const res2 = await buyNFT(musicNFT, tokenID, newTokenPrice, account)
    if (res2 == "confirmed") {
      console.log("price changed")
    }
  }

  const createUserFromApp = async(details)=>{
    const res=await updateUser(account,details)
    console.log(res)
    if (res) {
      loadDetails();
    }
  }
console.log("allUsers",allUsers)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={
            <CreateNFT 
              loadWeb3={fetchAccount}
              account={account}
              createNFTFromApp={createNFTFromApp}
            />} 
          />
          <Route path="/users" element={<DisplayUsers allUsers={allUsers} />} />
          <Route path="/editProfile" element={
            <CreateUser
              loadWeb3={fetchAccount}
              account={account}
              createUserFromApp={createUserFromApp}
            />
          } />
          <Route path="/explore" element={
            <Explore2 
              loadWeb3={fetchAccount}
              account={account}
              allNFTS={allNfts}
            />
          } />
          <Route path="/detail" element={
            <NFTDetail 
              loadWeb3={fetchAccount}
              account={account}
              buyNFTFromApp={buyNFTFromApp}
            />
          } />
          <Route path="/profile" element={
            <UserPage 
              loadWeb3={fetchAccount}
              account={account}
              user={user}
              allNFTS={allNfts}
            />
          } />
          {/* <Route path="/stats" element={<Stats />} /> */}
          <Route path="/" element={ 
            <Home
              loadWeb3={fetchAccount}
              account={account}
              allNFTS={allNfts}
            />
            // <CreateUser createUserFromApp={createUserFromApp}/>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
