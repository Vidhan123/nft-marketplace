import React, { useState, useEffect, createRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation, Navigate } from "react-router";
import Card from "../components/base/Card";
import { ColorExtractor } from "react-color-extractor";
import Button from "../components/base/Button";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useMobile } from "../hooks/isMobile";
import { useARStatus } from "../hooks/isARStatus";
import { Container, Grid, Typography } from '@material-ui/core'
import AudioPlay from "../components/AudioPlay";
import TextInput from "../components/base/TextInput";
import { Colors } from '../constants/Colors';

const NFTDetail2 = () => {
    const isMobile = useMobile();
    const [colors, setColors] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const like = () => setIsLike(!isLike);
    const [price, setPrice] = useState('')
    const getColors = (colors) => {
        setColors((c) => [...c, ...colors]);
    };
    const { state } = useLocation();

    useEffect(() => {
        setColors([]);
    }, [state]);

    const dummy = {
        "Name": "Ta Ta Thaiya",
        "Owner": "Rishi Lakhani",
        "Description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Transfers": "4",
        "Category": "Folk",
        "price":"0.5",
        "like":"100",
    }

    const isARSupport = useARStatus(state.item.src);

    return (
        <Container style={{ display: 'flex', justifyContent: 'center', margin: '50px auto' }}>
            <Card
                width={isMobile ? "100%" : "80%"}
                height={isMobile ? "700px" : "80%"}
                blurColor={colors[0]}
                child={
                    //Detail Content
                    <Grid container spacing={4} style={{ maxHeight: '100%', padding: '20px' }} >
                        <Grid item xs={7}>
                            {isARSupport ?
                                <model-viewer loading="eager" camera-controls auto-rotate src={state.item.src} />
                                : (
                                    <>
                                        <ColorExtractor getColors={getColors}>
                                            <img width='100%' src={state.item.src} style={{ borderRadius: '30px' }} />
                                        </ColorExtractor>
                                    </>
                                )
                            }
                            <AudioPlay id='detail-audio' />
                        </Grid>
                        <Grid item xs={5}>
                            <div style={{ maxHeight: '100%', overflow: 'hidden' }}>
                                <Typography variant='h4' style={{ color: 'white', fontFamily: 'cursive' }}> {dummy.Name} </Typography>
                                <Typography variant='body2' style={{ color: 'white' }}> {dummy.Owner} </Typography>
                                <Typography variant='body1' style={{ color: 'white', margin: '20px 0 0 0', textAlign: 'start' }}>Description: {dummy.Description} </Typography>
                                <Typography variant='body1' style={{ color: 'white', textAlign: 'start' }}>No. of Transfers: {dummy.Transfers} </Typography>
                                <Typography variant='body1' style={{ color: 'white', textAlign: 'start' }}>Music Type: {dummy.Category} </Typography>
                                <Typography variant='h6' style={{ color: 'white', textAlign: 'left', marginLeft: '10px', marginTop: '20px' }}>Price</Typography>
                                <TextInput width="100%" height="30px" placeholder="New Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <Button width='40%' height='50px' color={Colors.buttons.primary} fontSize='15px' margin='20px 5% 20px 5%' textContent="Update Price" />
                                <Button width='40%' height='50px' color={Colors.buttons.danger} fontSize='15px' margin='20px 5% 20px 5%' textContent="Remove from Sale" />
                            </div>
                            <Grid container>
                                <Grid item xs={9}>
                                <Button
                                    width={isMobile ? "70%" : "100%"}
                                    height="50px"
                                    onClick={buyNFTFromApp(dummy.tokenID,dummy.price)}
                                    child={
                                        <Typography variant='h6' color={Colors.buttons.primary}><FaEthereum size="20px" /> {dummy.price}</Typography>
                                    }
                                />
                                </Grid>
                                <Grid item xs={3}>
                                <div>
                                    <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={like}>
                                        {!isLike ? (
                                            <AiOutlineHeart size="30" color="white" />
                                        ) : (
                                            <AiFillHeart
                                                size="30"
                                                style={{
                                                    stroke: `-webkit-linear-gradient(
                                                            to bottom,
                                                            #38ef7d,
                                                            #11998e
                                                        );`,
                                                }}
                                                color="#00f5c966"
                                            />
                                        )}
                                    </button>
                                    <Typography variant='body1' style={{ color: 'white' }}>{dummy.like}</Typography>
                                </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            />
        </Container>
    );
};

export default NFTDetail2