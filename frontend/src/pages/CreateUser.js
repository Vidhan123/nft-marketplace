import React from 'react'
import Card from '../components/base/Card';
import Button from '../components/base/Button';
import TextInput from '../components/base/TextInput';
import AvatarImageCropper from 'react-avatar-image-cropper';
import { Container, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../constants/Colors';

const styles = makeStyles(() => ({
    card: {
        padding: '50px',
        width: '70%',
        margin: 'auto',
        marginTop: '100px',
    },
}))

const CreateUser = ({createUserFromApp}) => {
    const classes = styles()
    const [src, setSrc] = React.useState("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX");
    const [clickedChange, setClickedChange] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [bio, setBio] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { 'profile': src, 'name': name, 'email': email, 'bio': bio }
        console.log(data)
        createUserFromApp(data)
    }

    const apply = (file) => {
        var src = window.URL.createObjectURL(file);
        setSrc(src);
        setClickedChange(false)
    }

    return (
        <Container style={{ display: 'flex', justifyContent: 'center' }} >
            <Card width='75%' height='75%' child={
                <>
                    <Typography variant='h4' style={{ color: 'white', margin: '20px' }}>Edit Profile</Typography>
                    <Grid container spacing={4} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item md={4} style={{ padding: '50px', alignItems: 'center' }}>
                            <div style={{
                                margin: 'auto',
                                marginTop: '20px',
                                width: '200px',
                                height: '200px'
                            }}>
                                {clickedChange ? (
                                    <div style={{
                                        margin: 'auto',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        borderRadius: '50%'
                                    }} >
                                        <AvatarImageCropper apply={apply} text={"Change"} />
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            margin: 'auto',
                                            height: '100%',
                                            backgroundColor: 'white',
                                            borderRadius: '50%'
                                        }}
                                        onClick={() => { setClickedChange(true) }}
                                    >
                                        <img src={src} width='100%' alt="Preview" name="userAvatarHash" style={{ borderRadius: '50%' }} />
                                    </div>
                                )}
                            </div>
                            <Button
                                width='100%'
                                height='50px'
                                margin='40px 0 0 0'
                                color={Colors.buttons.danger}
                                fontSize='14px'
                                textContent="Remove"
                                onClick={() => setSrc("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX")}
                            >
                                Remove Image
                            </Button>
                        </Grid>
                        <Grid item md={8} style={{ padding: '30px' }}>
                            <form className="form" noValidate onSubmit={handleSubmit}>
                                <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '20px' }}>Name</Typography>
                                <TextInput width="100%" height="30px" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '20px' }}>Email id</Typography>
                                <TextInput width="100%" height="30px" placeholder="Email id" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '20px' }}>Bio</Typography>
                                <TextInput width="100%" height="30px" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                                <Button width='100%' height='50px' color={Colors.buttons.secondary} fontSize='20px' margin='30px 0 0 0' textContent="Save" />
                            </form>
                        </Grid>
                    </Grid>
                </>
            } />
        </Container>
    )
}

export default CreateUser