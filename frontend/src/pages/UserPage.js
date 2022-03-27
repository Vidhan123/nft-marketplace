import { Container, Divider, Typography } from '@material-ui/core'
import UserCardList from '../components/UserCardList'
import React from 'react'
import Header from "../components/Header";

const UserPage = ({ loadWeb3, account }) => {
    const dummy = {
        "Name": "Rishi Lakhani",
        "Profile": "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
        "Creations": '9',
        "Followers": '25'
    }
    return (
        <Container style={{ margin: '50px auto' }}>
            <Header 
                loadWeb3={loadWeb3}
                account={account}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "50px" }} >
                <img width='10%' src={dummy.Profile} alt='Profile Pic' style={{ borderRadius: '50%', marginTop: "50px" }} />
            </div>
            <Typography variant='h4' align='center' style={{ color: 'white', marginTop: '20px' }}>{dummy.Name}</Typography>
            <Typography variant='h6' align='center' style={{ color: 'white', marginTop: '20px' }}>{dummy.Creations} Creations | {dummy.Followers} Followers</Typography>
            <Divider style={{ backgroundColor: 'white', marginTop: '5%' }}/>
            <UserCardList account={account} />
        </Container>
    )
}

export default UserPage