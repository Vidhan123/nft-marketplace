import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
  const { data, value, index, type, ...other } = props;
  let navigate = useNavigate();

  let filteredList = index !== 'All' ? (
     data && data.filter((item) => {
      return item[0].metadata.categories === index
    })) : (
    data
  )

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div id="card-list" style={{ flexDirection: type == "horizontal" ? "row" : "column", margin: '0 auto 100px auto' }}>
          {filteredList && filteredList.map((item, index) => (
            <NFTCard nftSrc={item[0].imageHash} key={index} name={item[0].tokenName}is3d={item[0].is3d} price={item[0].price} owner={item[0].currentOwner} creator={item[0].mintedBy}index={index} onClick={() => navigate('/detail', { state: { item: item[0] } })} />
          ))}
        </div>
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

const CardList = ({ list, type = "horizontal" }) => {
  const [value, setValue] = React.useState('All');
  const classes = useStyles();
console.log("Cardlist",list);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tags = ['All', 'Pop', 'Classical', 'Hip-Hop and Rap', 'EDM', 'Country', 'Folk']
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
        <TabPanel value={value} key={index} index={item} data={list} type={type} />
      ))}
    </div>
  );
};

export default CardList;
