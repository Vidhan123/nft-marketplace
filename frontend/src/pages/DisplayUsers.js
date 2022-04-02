import react from "react";
import { exploreList } from "../constants/MockupData";
import '../styles/Explore.css';
import Header from "../components/Header";
import Search from "../components/Search";
import UsersList from "../components/UsersList";

const DisplayUsers = () => {
    const users = [
        {
            name: 'Rishi',
            src: 'https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX',
            nfts: '3',
            followers: '10',
            following: '7'
        },
        {
            name: 'Vidhan',
            src: 'https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX',
            nfts: '6',
            followers: '25',
            following: '30'
        },
        {
            name: 'Varun',
            src: 'https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX',
            nfts: '4',
            followers: '15',
            following: '14'
        },
        {
            name: 'Priyansh',
            src: 'https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX',
            nfts: '1',
            followers: '4',
            following: '5'
        },
    ]
  return (
    <div id="explore">
      <Header />
      <Search/>
      <p id="card-list-header-text" style={{ textAlign: 'center' }} > Users </p>
      <div id="list-container">
        <UsersList list={users} />
      </div>
    </div>
  );
};

export default DisplayUsers;