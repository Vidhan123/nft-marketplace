import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from "@material-ui/core";
import Activity from "./Activity";

function TabPanel(props) {
    const { account, data, value, index, type, ...other } = props;
    let navigate = useNavigate();

    // let filteredList = index !== 'Activities' && (
    //     data.filter((item) => {
    //         return item.Ownership === index
    //     })
    // )

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value !== "Activities" && (
                value === index && (
                    <>
                        <div id="card-list" style={{ flexDirection: type === "horizontal" ? "row" : "column", margin: '0 auto' }}>
                            {data.map((item, index) => (
                                <NFTCard nftSrc={item[0].imageHash} key={index} name={item[0].tokenName} price={item[0].price} owner={item[0].currentOwner} creator={item[0].mintedBy}index={index} onClick={() => navigate('/detail', { state: { item: item[0] }})} />
                            ))}
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                    </>
                )
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'black',
        margin: '0',
        marginTop: '50px'
    },
    tabs: {
        backgroundColor: 'black'
    }
}));

const ProfileCardList = ({ account, list, type = "horizontal",userMinted }) => {
    const [value, setValue] = React.useState('Collected');
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let tags = ['Collected', 'Created', 'Favourited', 'Activities']

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} className={classes.tabs} onChange={handleChange} centered>
                    {tags.map((item, index) => (
                        <Tab label={item} key={index} value={item} />
                    ))}
                </Tabs>
            </AppBar>
            {tags.map((item, index) => (
                <TabPanel value={value} key={index} index={item} data={userMinted} type={type} account={account} />
            ))}
        </div>
    );
};

export default ProfileCardList;