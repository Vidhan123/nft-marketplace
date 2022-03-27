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
                    <div id="card-list" style={{ flexDirection: type == "horizontal" ? "row" : "column", margin: '0 auto 100px auto' }}>
                        {filteredList.map((item, index) => (
                            <NFTCard nftSrc={item.src} key={index} onClick={() => navigate('/detail', { state: { item: item } })} />
                        ))}
                    </div>
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
        'src': "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Transfers": "4",
        "Ownership": "Collected",
        "Category": "Folk"
    }, {
        "name": "Ta Ta Thaiya",
        "Owner": "Rishi Lakhani",
        'src': "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Transfers": "0",
        "Ownership": "Created",
        "Category": "Folk"
    }, {
        "name": "Ta Ta Thaiya",
        "Owner": "Rishi Lakhani",
        'src': "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Transfers": "4",
        "Ownership": "Collected",
        "Category": "Folk"
    }]

    let tags = ['Collected', 'Created', 'Activities']

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