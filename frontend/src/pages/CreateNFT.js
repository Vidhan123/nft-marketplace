import React from 'react'
import AvatarImageCropper from 'react-avatar-image-cropper';
import Card from '../components/base/Card';
import Button from '../components/base/Button';
import TextInput from '../components/base/TextInput2';
import { Container, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../constants/Colors';
import Checkbox from '@material-ui/core/Checkbox';
import Header from "../components/Header";

const styles = makeStyles(() => ({
    card: {
        padding: '50px',
        width: '70%',
        margin: 'auto',
        marginTop: '100px',
    },
}))

const CreateNFT = ({ loadWeb3, account,createNFTFromApp }) => {
    const classes = styles()
    const [aud, setAud] = React.useState(null);
    const [music, setMusic] = React.useState(null)
    const [clickedChange, setClickedChange] = React.useState(false);
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [is3d, setIs3d] = React.useState(false);
    const [category, setCategory] = React.useState("");
    const categories = ['Pop', 'Classical', 'EDM', 'Country', 'Folk', 'Hip-Hop'];

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { 'profile': aud, 'name': name, 'price': price, 'description': description, 'music': music,"category":category,"3d":is3d }
        
        console.log(data)
        createNFTFromApp(name,description,aud,music,price,category,is3d)
    }

    const apply = (file) => {
        // var src = window.URL.createObjectURL(file);
        // setSrc(src);
        console.log(file)


        setAud(file);
        setClickedChange(false)
    }
    const captureAudio=(event)=> {
        event.preventDefault()
        
        const files = event.target.files[0]
        const reader = new FileReader()
        reader.readAsArrayBuffer(files)
        reader.onloadend = () => {
            setMusic(Buffer(reader.result))
    }
}
    const capture3d=(event)=> {
        event.preventDefault()
        
        const files = event.target.files[0]
        const reader = new FileReader()
        reader.readAsArrayBuffer(files)
        reader.onloadend = () => {
            setAud(Buffer(reader.result))
    }

}   
// }
//     const captureFile=(event)=> {
//         event.preventDefault()
        
//         const files = event.target.files[0]
//         const reader = new FileReader()
//         reader.readAsArrayBuffer(files)
//         reader.onloadend = () => {
//             setFinalBuffer(Buffer(reader.result))
//     }


    return (
        <Container style={{ display: 'flex', justifyContent: 'center', margin: '50px auto' }} >
            <Header 
                loadWeb3={loadWeb3}
                account={account}
            />
            <Card width='75%' height='75%' child={
                <>
                    <Typography variant='h4' style={{ color: 'white', margin: '20px' }}>Create NFT</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={5}>
                            <FormControlLabel
                                control={<Checkbox value="remember" style={{ color: 'white'}} />}
                                label="Is the image in 3D"
                                onClick={() => setIs3d(!is3d)}
                                style={{ color: 'white' }}
                            />
                            {is3d? 
                            <div style={{ backgroundColor: 'white', marginTop: '50px' }}>
                                <input type="file" id="finput" onChange={capture3d} />
                            </div>:
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
                                    }} >
                                        <AvatarImageCropper apply={apply} text={"Change"} />
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            margin: 'auto',
                                            height: '100%',
                                            backgroundColor: 'white',
                                        }}
                                        onClick={() => { setClickedChange(true) }}
                                    >
                                        {
                                            aud ?
                                            <img src={URL.createObjectURL(aud)} width='100%' alt="Preview" name="userAvatarHash" />
                                            :
                                            <img src={"https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX"} width='100%' alt="Preview" name="userAvatarHash" />
                                            
                                        }
                                        
                                    </div>
                                )}
                            </div>
            }
                            <br/>
                            <br/>
                            <Button
                                width='100%'
                                height='50px'
                                margin='40px 0 0 0'
                                color={Colors.buttons.danger}
                                fontSize='16px'
                                textContent="Remove"
                                onClick={() => setAud("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX")}
                            >
                                Remove Image
                            </Button>
                            <div style={{ backgroundColor: 'white', marginTop: '50px' }}>
                                <input type="file" id="finput" onChange={captureAudio} />
                            </div>
                        </Grid>
                        <Grid item xs={7}>
                            <form className="form" noValidate onSubmit={handleSubmit}>
                                <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '20px' }}>Name</Typography>
                                <TextInput width="100%" height="30px" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '20px' }}>Price</Typography>
                                <TextInput width="100%" height="30px" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '20px' }}>Select Music Type:</Typography>
                                {/* <Select items={categories} width='100%' /> */}
                                <RadioGroup aria-label="gender" name="gender1" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <Grid container spacing={4}>
                                        {categories.map((item, index) => (
                                            <Grid item xs={5}>
                                                <FormControlLabel value={item} key={index} control={<Radio style={{ color: 'white' }} />} label={item} style={{ color: 'white' }} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                                <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '20px' }}>Description</Typography>
                                <TextInput width="100%" height="30px" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                <br />
                                <Button width='100%' height='50px' color={Colors.buttons.secondary} fontSize='20px' margin='30px 0 0 0' textContent="Create" />
                            </form>
                        </Grid>
                    </Grid>
                </>
            } />
        </Container >
    )
}

export default CreateNFT