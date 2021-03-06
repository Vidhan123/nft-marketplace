import { Container, Divider, Typography } from '@material-ui/core'
import UserCardList from '../components/UserCardList'
import React from 'react'
import Header from "../components/Header";

import Button from '../components/base/Button2';
import { Link } from 'react-router-dom';
import { Colors } from '../constants/Colors';

const UserPage = ({ loadWeb3, account,user,allNFTS }) => {
    const dummy = {
        "Name": "Unnamed",
        "Profile": "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
        "Creations": '3',
        "Followers": '0'
    }
    let tokens=allNFTS.map((cryptoBoy)=>{return cryptoBoy[0]});
    const my_minted_tokens = tokens.filter(
      (cryptoboy) => cryptoboy.mintedBy === account
    );
    console.log("User Here: ", user)
    return (<>
        {user?<Container style={{ margin: '50px auto' }}>
            <Header 
                loadWeb3={loadWeb3}
                account={account}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "50px" }} >
                <img width='10%' src={user.profilePic} alt='Profile Pic' style={{ borderRadius: '50%', marginTop: "50px" }} />
            </div>
            <Typography variant='h4' align='center' style={{ color: 'white', marginTop: '20px' }}>{user.name}</Typography>
            <Typography variant='h6' align='center' style={{ color: 'white', marginTop: '20px' }}>{dummy.Creations} Creations | {dummy.Followers} Followers</Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to='/editProfile'><Button width='120px' height='50px' color={Colors.buttons.primary} fontSize='20px' margin='0 0 0 -30px' textContent="Edit Profile" /></Link>
            </div>
            <Divider style={{ backgroundColor: 'white', marginTop: '5%' }}/>
            <UserCardList account={account} userMinted={my_minted_tokens}/>
        </Container>:
        <><p>Loading</p></>}</>
        
    )
}

export default UserPage