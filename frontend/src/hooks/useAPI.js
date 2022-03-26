import axios from 'axios';

const URL = 'http://localhost:8000/api/v1'

function useAPI() {

  const getUser = async (walletAddress) => {
    
    const res = axios.get(`${URL}/user/${walletAddress}`)

    return res.data;
  }

  const getAllUsers = async () => {
    const res = axios.get(`${URL}/user/all`)

    return res.data;
  }

  const updateUser = async (walletAddress, data) => {
    const res = await axios.put(`${URL}/user/${walletAddress}`, data);
    
    return res.data;
  }

  const getItem = async (itemId) => {
    const res = axios.get(`${URL}/item/${itemId}`)

    return res.data;
  }

  const updateItem = async (itemId, data) => {
    const res = await axios.put(`${URL}/item/${itemId}`, data);
    
    return res.data;
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