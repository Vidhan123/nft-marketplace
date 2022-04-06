import axios from 'axios';
import ipfs from "./ipfs";
const URL = 'http://localhost:8000/api/v1'

function useAPI() {

  const getUser = async (walletAddress) => {
    try {
      console.log("getwallet",walletAddress)
      const res = axios.get(`${URL}/user/${walletAddress}`)
      console.log(res);
      return res.data;
    }
    catch(err) {
      console.log(err);
    }
  }

  const getAllUsers = async () => {
    try {
      console.log("here all use api")
      const res =await axios.get(`${URL}/user/all/users`)
      // const allUsers= Promise.then(result => result.data);
      console.log("all use api",res.data);
      return res.data;
    }
    catch(err) {
      console.log(err);
    }
  }

  const updateUser = async (walletAddress, data) => {
    try {
      const file = await ipfs.add(data.profilePic)
      const imageHash = `https://ipfs.infura.io/ipfs/${file.path}`;
      data.profilePic=imageHash;
      const res = await axios.put(`${URL}/user/${walletAddress}`, data);
    console.log(res.data);
      return res.data;
    }
    catch(err) {
      console.log(err);
    }
  }

  const getItem = async (itemId) => {
    try {
      const res = axios.get(`${URL}/item/${itemId}`)

      return res.data;
    }
    catch(err) {
      console.log(err);
    }
  }

  const updateItem = async (itemId, data) => {
    try {
      const res = await axios.put(`${URL}/item/${itemId}`, data);
    
      return res.data;
    }
    catch(err) {
      console.log(err);
    }
  }

  return {
    getUser,
    updateUser,
    getAllUsers,
    getItem,
    updateItem
  }
}

export default useAPI;