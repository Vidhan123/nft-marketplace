import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { exploreList } from "../constants/MockupData";
import { Button, Avatar, TextField } from '@material-ui/core';
import {  makeStyles } from '@material-ui/core/styles';
import Fuse from 'fuse.js';
import metamaskIcon from "../assets/metamask.svg";

import '../App.css';

const useStyles = makeStyles((theme) => ({
  suggestions:{
    borderLeft:"1px solid white ",
    borderRight:"1px solid white",
    borderBottom:"1px solid white",
    //borderTop:"1px solid black",
    //borderColor:"white",
    '&:hover':{
      backgroundColor:"gray" ,
      color:"white"
    }
  },
notBlurredCard:{
  position:"absolute",zIndex:10,backgroundColor:"aliceblue",color:"black",borderRadius:"15px",top:"100%",
  // [theme.breakpoints.down('sm')]: {
  //   width: '70%',
  // },
  
  // [theme.breakpoints.down('md')]: {
  //   width: '50%',
  // },
  
  // [theme.breakpoints.down('lg')]: {
  //   width: '66%',
  // },
  width:"50%"
},
}));

const Header = ({loadWeb3, account}) => {
  const classes = useStyles();
  const [userSuggestions,setUserSuggestions]=useState([]);
  const [tokenSuggestions,setTokenSuggestions]=useState([]);
  const [text,setText]=useState(null);

  const searchData=[
    {
      
      "title": "Old Man's War",
      "userName": "John Scalzi",
      "userAvatarHash":"https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
      "tags": ["fiction"]
    },
    {
      "title": "The Lock Artist",
      "userName": "Teve",
      "userAvatarHash":"https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
      "tags": ["thriller"]
    }
  ]

    const handleWallet = () => {
      loadWeb3();
    }
    const fuse2=new Fuse(exploreList,{
      keys:[
        "name"
      ],
      includeScore:true
    })
  
    const fuse1=new Fuse(searchData,{
      keys:[
        "userName"
      ],
      includeScore:true
    })

    const onChangeHandler=(text)=>{
      let matchUserName=[];
      let matchTokenName=[];
    
      if(text.length>0){  
        const resultsUser=fuse1.search(text);
        console.log(resultsUser,text)
        if(resultsUser){matchUserName=resultsUser.map(result=>result.item);}
        
        const resultsDesign=fuse2.search(text);
        console.log(resultsDesign,text)
        if(resultsDesign){matchTokenName=resultsDesign.map(result=>result.item);}
      }
      
      console.log("matchUserName",matchUserName)
      console.log("matchTokenName",matchTokenName)
      setUserSuggestions(matchUserName);
      setTokenSuggestions(matchTokenName);
      setText(text)
    }

    const handleSearchSubmit=(e,val)=>{
      e.preventDefault();
      setUserSuggestions([]);setTokenSuggestions([]);
      console.log("form submitted", val)
      // searchTermfromApp(val)
      }
      
      const handleSearchSubmit2=(e,val,id)=>{
        e.preventDefault();
        setUserSuggestions([]);setTokenSuggestions([]);
        console.log("form submitted", val)
        // searchNFTFromApp(val,id)
        }

    return (
        <div id="header">
        <Link to='/' id='logo'>DeMusic</Link>

        {/* Search */}
        <div>
        <input placeholder="Search NFT or people" type="search" className="input"  onChange={(e)=>{onChangeHandler(e.target.value)}} value={text}
        style={{borderRadius:"10px",color:"black",backgroundColor:"white",height:"45px", padding: '10px', minWidth: '250px'}}/>
          {/* <TextField
          variant="outlined"
          margin="normal"
          id="search"
          placeholder="Search NFT or people"
          name="search"
          onChange={(e)=>{onChangeHandler(e.target.value)}}
          fullWidth
        /> */}
          {userSuggestions.length!=0 ||tokenSuggestions.length!=0?(
          <div className={classes.notBlurredCard} > 
       
          <div className="card-body" >
          {userSuggestions.length!=0?(
             <div style={{maxHeight:"25vh",overflow:"auto"}}>
           
             <h4>Creators</h4>
             {userSuggestions&&userSuggestions.map((result,i)=>
              <div key={i}className={classes.suggestions}onClick={(e)=>{setText(result.userName);handleSearchSubmit(e,result.userName)}} style={{cursor:"pointer",paddingTop:"1px",paddingBottom:"1px",padding:"4px",borderRadius:"2px",display:"flex",alignItems:"center",overflowWrap:"break-word"}}>
               {/* <Avatar alt={result.userName} src={result.userAvatarHash}/> */}
               <b>@{result.userName}</b>
              </div>
             )}
             </div>
          ):(null)}
          <hr/>
           {tokenSuggestions.length!=0?( 
           <div style={{maxHeight:"25vh",overflow:"auto"}}>
            <h4>Designs</h4>
             {tokenSuggestions&&tokenSuggestions.map((result,i)=>
             <div key={i}className={classes.suggestions} onClick={(e)=>{setText(result.name);handleSearchSubmit2(e,result.name,result.tokenId)}} style={{cursor:"pointer",paddingTop:"1px",padding:"4px",paddingBottom:"1px",borderRadius:"2px",display:"flex",alignItems:"center",overflowWrap:"break-word"}}>
               {/* <img alt={result.name} src={result.image}style={{objectFit:"contain",borderRadius:0,width:"45px",height:"45px",display:"flex",alignItems:"center",postion:"relative"}}/> */}
               <b>@{result.name}</b>
             </div>
            )}
            </div>
             ):(null)}
             </div>
             </div>):(null)}
        </div>

        <div id="link-containers">
          <Link to="/explore" style={{ textDecoration: 'none' }}>Explore</Link>
          <Link to="/stats" style={{ textDecoration: 'none' }}>Stats</Link>
          <Link to="/create" style={{ textDecoration: 'none' }}>Create</Link>
          <Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link>

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