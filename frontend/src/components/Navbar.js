import react, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
const Navbar = () => {

  const currentUser={
    userName:"Varun",
    userAvatarHash:"https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
  }
console.log(currentUser.userName)
const createProf=()=>{
  window.location.href="/create-profile"
}
const viewAcc=()=>{
  window.location.href="/profile"
}
    return (
        <div id="header">
        <Link to='/' id='logo'>NFT Room</Link>

        <div id="link-containers">
          <a href="/create">Create</a>
          <a href="/creators">Creators</a>
          <a href="/">Explore</a>
          
          {!currentUser.userName?( <IconButton
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={createProf}
              // color="inherit"
            > 
             <AccountCircle style={{color : "aliceblue"}} />
            </IconButton>):(<IconButton
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={viewAcc}
              color="inherit"
            >
               <Avatar alt={currentUser.userName} src={currentUser.userAvatarHash} />
            </IconButton>)}
          {true?<button id="connect-wallet"  >Connect wallet</button>:null}
        </div>
      </div>
    );
}

export default Navbar;