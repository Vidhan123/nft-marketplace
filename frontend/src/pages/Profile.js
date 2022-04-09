import React from 'react'
import Card from '../components/base/Card';
import Button from '../components/base/Button2';
import TextInput from '../components/base/TextInput2';
import AvatarImageCropper from 'react-avatar-image-cropper';
import { useLocation } from "react-router";
import { Container, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../constants/Colors';
import Header from "../components/Header";
import ProfileCardList from '../components/ProfileCardList';

const styles = makeStyles(() => ({
    card: {
        padding: '50px',
        width: '70%',
        margin: 'auto',
        marginTop: '100px',
    },
}))

const Profile = ({ loadWeb3, account }) => {
    const classes = styles()
    const { state } = useLocation();

    return (
        <Container style={{ display: 'flex', justifyContent: 'center' }} >
            <Header
                loadWeb3={loadWeb3}
                account={account}
            />
            <Card width='75%' height='75%' child={
                <>
                    <br />
                    <br />
                    <Typography variant='h4' style={{ color: 'white' }}>User Profile</Typography>
                    <Grid container spacing={4} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item md={4} style={{ padding: '50px', alignItems: 'center', }}>
                                <img src={state.item.profilePic} width='100%' alt="Preview" name="userAvatarHash" style={{ borderRadius: '50%' }} />
                        </Grid>
                        <Grid item md={8} style={{ padding: '50px' }}>
                            <Typography variant='body1' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '10px' }}>Name</Typography>
                            <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '5px' }}>{state.item.name}</Typography>
                            <Typography variant='body1' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '10px' }}>Email id</Typography>
                            <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '5px' }}>{state.item.email}</Typography>
                            <Typography variant='body1' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '10px' }}>Bio</Typography>
                            <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '5px' }}>{state.item.bio}</Typography>
                        </Grid>
                    </Grid>
                </>
            } />
            {/* <ProfileCardList userMinted={state.item.mints} /> */}
        </Container>
    )
}

export default Profile