import axios from 'axios';

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
      console.log("here all")
      const res = axios.get(`${URL}/user/all`)
      console.log(res);
      return res.data;
    }
    catch(err) {
      console.log(err);
    }
  }

  const updateUser = async (walletAddress, data) => {
    try {
      const res = await axios.put(`${URL}/user/${walletAddress}`, data);
    console.log(res);
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