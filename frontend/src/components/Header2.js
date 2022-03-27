import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import metamaskIcon from "../assets/metamask.svg";
import Fuse from 'fuse.js';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import '../App.css';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      color: "#e8e2e2"
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "aliceblue",
    opacity: 0.7,
    zIndex: 5,
    '&:hover': {
      backgroundColor: "aliceblue",
      opacity: 1,
      zIndex: 5
    },
    marginLeft: 0,
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "black"
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  expanded: {
    width: "75%",
    marginLeft: "2%"
  },
  collapsed: {
    width: "2%",
    marginLeft: "4px",
    display: "none"
  },
  expandedIcon: {
    display: "none",

  },
  collapsedIcon: {
    marginLeft: "2px",
    color: "aliceblue"
  },
  expanded1: {
    width: "-webkit-fill-available",
    marginLeft: "2%",
    webkitTransition: "width 0.4s ease-in-out",
    transition: "width 0.4s ease-in-out"
  },
  collapsed1: {
    width: "2%",
    marginLeft: "4px",
    display: "none"
  },
  expandedIcon1: {
    display: "none",

  },
  collapsedIcon1: {
    marginLeft: "2px",
    color: "white"
  },
  suggestions: {
    borderLeft: "1px solid white ",
    borderRight: "1px solid white",
    borderBottom: "1px solid white",
    //borderTop:"1px solid black",
    //borderColor:"white",
    '&:hover': {
      backgroundColor: "gray",
      color: "white"
    }
  },
  //  searchbox:{
  //    backgroundColor:"white",
  //    color:"white",
  //  },
  //  searchText:{
  //    color:"black",
  //  }
  notBlurredCard: {
    position: "absolute", zIndex: 10, backgroundColor: "aliceblue", color: "black", borderRadius: "15px", top: "100%",
    // [theme.breakpoints.down('sm')]: {
    //   width: '70%',
    // },

    // [theme.breakpoints.down('md')]: {
    //   width: '50%',
    // },

    // [theme.breakpoints.down('lg')]: {
    //   width: '66%',
    // },
    width: "50%"

  },
  BlurredCard: {
    position: "absolute", zIndex: -1, backgroundColor: "aliceblue", color: "black", borderRadius: "15px", top: "100%"
  }
}));
const Header2 = ({ loadWeb3, account }) => {
  const classes = useStyles();
  const [expanded1, setExpanded1] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [tokenSuggestions, setTokenSuggestions] = useState([]);
  const [text, setText] = useState(null);
  const handleWallet = () => {
    loadWeb3();
  }
  const tokens = [
    {
      "tokenId": 1,
      "name": "Old Man's War",
      "author": "John Scalzi",
      "image": "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
      "tags": ["fiction"]
    },
    {
      "tokenId": 2,
      "name": "The Lock Artist",
      "author": "Steve",
      "image": "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
      "tags": ["thriller"]
    }
  ]
  const searchData = [
    {

      "title": "Old Man's War",
      "userName": "John Scalzi",
      "userAvatarHash": "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
      "tags": ["fiction"]
    },
    {
      "title": "The Lock Artist",
      "userName": "Teve",
      "userAvatarHash": "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
      "tags": ["thriller"]
    }
  ]

  const currentUser = {
    userName: "Varun",
    userAvatarHash: "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
  }
  const fuse2 = new Fuse(tokens, {
    keys: [
      "name"
    ],
    includeScore: true
  })

  const fuse1 = new Fuse(searchData, {
    keys: [
      "userName"
    ],
    includeScore: true
  })
  const createProf = () => {
    window.location.href = "/create-profile"
  }
  const viewAcc = () => {
    window.location.href = "/profile"
  }
  const onChangeHandler = (text) => {


    let matchUserName = [];
    let matchTokenName = [];

    if (text.length > 0) {


      const resultsUser = fuse1.search(text);
      console.log(resultsUser, text)
      if (resultsUser) { matchUserName = resultsUser.map(result => result.item); }

      const resultsDesign = fuse2.search(text);
      console.log(resultsDesign, text)
      if (resultsDesign) { matchTokenName = resultsDesign.map(result => result.item); }


    }

    console.log("matchUserName", matchUserName)
    console.log("matchTokenName", matchTokenName)
    setUserSuggestions(matchUserName);
    setTokenSuggestions(matchTokenName);
    setText(text)
  }
  const handleSearchSubmit = (e, val) => {
    e.preventDefault();
    setUserSuggestions([]); setTokenSuggestions([]);
    console.log("form submitted", val)
    // searchTermfromApp(val)
  }

  const handleSearchSubmit2 = (e, val, id) => {
    e.preventDefault();
    setUserSuggestions([]); setTokenSuggestions([]);
    console.log("form submitted", val)
    // searchNFTFromApp(val,id)
  }
  return (
    <div id="header" >
      <Link to='/' id='logo'>NFT Room</Link>


      {expanded1 ? (<div style={{ display: "flex", justifyContent: "flex-end", width: "50%" }} >
        <IconButton onClick={() => { setExpanded1(false); setText(null); setUserSuggestions([]); setTokenSuggestions([]) }} className={classes.collapsedIcon1}>
          <CancelIcon /> </IconButton>
        <div style={{ width: "100%" }}>
          <input placeholder="Search NFT or people" type="search" className="input" onChange={(e) => { onChangeHandler(e.target.value) }} value={text}
            style={{ borderRadius: "40px", color: "black", backgroundColor: "white", height: "45px" }} />

          {userSuggestions.length != 0 || tokenSuggestions.length != 0 ? (
            <div className="card col-md-12 justify-content-md-center" >

              <div className="card-body" >
                {userSuggestions.length != 0 ? (
                  <div style={{ maxHeight: "25vh", overflow: "auto" }}>

                    <h4>Creators</h4>
                    {userSuggestions && userSuggestions.map((result, i) =>
                      <div key={i} className={classes.suggestions} onClick={(e) => { setText(result.userName); handleSearchSubmit(e, result.userName) }} style={{ cursor: "pointer", paddingTop: "1px", paddingBottom: "1px", padding: "4px", borderRadius: "2px", display: "flex", alignItems: "center", overflowWrap: "break-word" }}>
                        <Avatar alt={result.userName} src={result.userAvatarHash} /><b>@{result.userName}</b>
                      </div>
                    )}
                  </div>
                ) : (null)}
                <hr />
                {tokenSuggestions.length != 0 ? (
                  <div style={{ maxHeight: "25vh", overflow: "auto" }}>
                    <h4>Designs</h4>
                    {tokenSuggestions && tokenSuggestions.map((result, i) =>
                      <div key={i} className={classes.suggestions} onClick={(e) => { setText(result.name); handleSearchSubmit2(e, result.name, result.tokenId) }} style={{ cursor: "pointer", paddingTop: "1px", padding: "4px", paddingBottom: "1px", borderRadius: "2px", display: "flex", alignItems: "center", overflowWrap: "break-word" }}>
                        <img alt={result.name} src={result.image} style={{ objectFit: "contain", borderRadius: 0, width: "45px", height: "45px", display: "flex", alignItems: "center", postion: "relative" }} /><b>@{result.name}</b>
                      </div>
                    )}
                  </div>
                ) : (null)}
              </div>


            </div>) : (null)}
        </div>



      </div>

      ) : (
        <div >
          <IconButton onClick={() => { setExpanded1(true) }} className={classes.collapsedIcon1}>
            <SearchIcon /> </IconButton>
        </div>

      )}
      <div id="link-containers">
        <Link to="/explore">Explore</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/create">Create</Link>
        {currentUser.userName ? (<IconButton
          edge="end"
          aria-label="account of current user"
          // aria-controls={menuId}
          aria-haspopup="true"
          onClick={createProf}
        // color="inherit"
        >
          <AccountCircle style={{ color: "aliceblue" }} />
        </IconButton>) : (<IconButton
          edge="end"
          aria-label="account of current user"
          // aria-controls={menuId}
          aria-haspopup="true"
          onClick={viewAcc}
          color="inherit"
        >
          <Avatar alt={currentUser.userName} src={currentUser.userAvatarHash} />
        </IconButton>)}
        {currentUser.userName ? (<Button
          onClick={() => handleWallet()}
          variant="contained"
          className="nav-link color-border"
          style={{ marginLeft: "2vw", background: 'transparent', color: "#fff" }}
        //  style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
        >
          <img
            src={metamaskIcon}
            alt="metamask-icon"
            style={{ width: "1.8rem", marginRight: "0.5rem", padding: "3px" }}
          />
          {account ? account.substring(0, 4) + '...' + account.substring(account.length - 3, account.length) : `Connect  `}
        </Button>) : null}

      </div>
    </div>
  );
}

export default Header2;