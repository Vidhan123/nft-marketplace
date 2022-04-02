import React, { useState } from 'react'
import Card from './base/Card'
import Button from './base/Button2'
import { Colors } from '../constants/Colors'
import { ColorExtractor } from 'react-color-extractor'
import { useNavigate } from 'react-router-dom'


const UsersList = ({ list, type = 'horizontal' }) => {
    const [colors, setColors] = useState([]);
    const getColors = colors => {
        setColors(c => [...c, ...colors]);
    }
    let navigate = useNavigate();
    return (
        <div id="card-list" style={{ flexDirection: type == "horizontal" ? "row" : "column" }}>
            {list.map((item, index) => (
                <Card
                    key={index}
                    blurColor={colors[0]}
                    child={<>
                        <ColorExtractor getColors={getColors}>
                            <img className="nft-image" src={item.src} alt={"nft-img"} />
                        </ColorExtractor>
                        <div className="wrapper">
                            <div className="info-container">
                                <p className="name">{item.name}</p>
                                <p className="owner">
                                    <br />
                                    NFTS Created: {item.nfts} <br />
                                    Followers: {item.followers} | Following: {item.following}
                                </p>
                            </div>
                        </div>
                        <div className="buttons">
                            <Button color={Colors.buttons.primary} width='100%' fontSize='15px' height='35px' textContent="View Profile" onClick={() => navigate('/users')} />
                        </div>
                    </>}>
                </Card>
            ))}
        </div>
    )
}

export default UsersList