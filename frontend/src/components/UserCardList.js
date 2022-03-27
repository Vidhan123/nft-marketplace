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

function TabPanel(props) {
    const { data, value, index, type, ...other } = props;
    let navigate = useNavigate();

    let filteredList = index !== 'Activities' && (
        data.filter((item) => {
            return item.Ownership === index
        })
    )

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value !== "Activities" ? (
                value === index && (
                    <>
                        <div id="card-list" style={{ flexDirection: type === "horizontal" ? "row" : "column", margin: '0 auto' }}>
                            {filteredList.map((item, index) => (
                                <NFTCard nftSrc={item.src} key={index} onClick={() => navigate('/detail', { state: { item: item } })} />
                            ))}
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                    </>
                )
            ) : (
                <Typography variant='h4' align='center' style={{ color: 'white', marginTop: '20px' }}>Activities</Typography>
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

const UserCardList = ({ list, type = "horizontal" }) => {
    const [value, setValue] = React.useState('Collected');
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dummy = [{
        "name": "Ta Ta Thaiya",
        "Owner": "Rishi Lakhani",
        'src': "https://images.unsplash.com/photo-1541661538396-53ba2d051eed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Transfers": "4",
        "Ownership": "Collected",
        "Category": "Folk"
    }, {
        "name": "Ta Ta Thaiya",
        "Owner": "Rishi Lakhani",
        'src': "https://images.unsplash.com/photo-1541661538396-53ba2d051eed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Transfers": "0",
        "Ownership": "Created",
        "Category": "Folk"
    }, {
        "name": "Ta Ta Thaiya",
        "Owner": "Rishi Lakhani",
        'src': "https://images.unsplash.com/photo-1541661538396-53ba2d051eed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Transfers": "4",
        "Ownership": "Collected",
        "Category": "Folk"
    }]

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
                <TabPanel value={value} key={index} index={item} data={dummy} type={type} />
            ))}
        </div>
    );
};

export default UserCardList;