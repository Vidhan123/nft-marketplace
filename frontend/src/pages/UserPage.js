import { Container, Divider, Typography } from '@material-ui/core'
import UserCardList from '../components/UserCardList'
import React from 'react'

const UserPage = () => {
    const dummy = {
        "Name": "Rishi Lakhani",
        "Profile": "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
        "Creations": '9',
        "Followers": '25'
    }
    return (
        <Container style={{ margin: '50px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <img width='10%' src={dummy.Profile} alt='Profile Pic' style={{ borderRadius: '50%' }} />
            </div>
            <Typography variant='h4' align='center' style={{ color: 'white', marginTop: '20px' }}>{dummy.Name}</Typography>
            <Typography variant='h6' align='center' style={{ color: 'white', marginTop: '20px' }}>{dummy.Creations} Creations | {dummy.Followers} Followers</Typography>
            <Divider style={{ backgroundColor: 'white', marginTop: '5%' }}/>
            <UserCardList />
        </Container>
    )
}

export default UserPage