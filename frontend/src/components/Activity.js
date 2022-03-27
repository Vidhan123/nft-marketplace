import React, { useState, useEffect } from 'react';
import abiDecoder from 'abi-decoder';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, List, ListItem, ListItemText, Typography, Tooltip, ListItemSecondaryAction, IconButton, Grid, Card, CardContent, TextField, InputAdornment, Button } from '@material-ui/core';
import { GetAppOutlined } from '@material-ui/icons';

import DigiMusicabi from "../abis/DigiMusicabi.json";

import { downloadCSV } from '../helper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Activity(props) {
  const { account } = props;

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await axios.get(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=0x9e285F51342CF5a6fE0F5a201E7C35351792796d&startblock=0&endblock=latest&page=1&offset=100&sort=desc&apikey=YourApiKeyToken`);
    
    if(res && res.data && res.data.result && account) {
      abiDecoder.addABI(DigiMusicabi);
      let txs = [];
      res.data.result.forEach((tx) => {
        if(tx.to !== "" && tx.from && tx.from.toLowerCase() === account.toLowerCase()) txs.push({
          hash: tx.hash,
          method: abiDecoder.decodeMethod(tx.input).name,
          age: (new Date(tx.timeStamp*1000)).toUTCString().replace(" GMT", ""),
          value: tx.value/1e18,
          fee: ((tx.gasPrice*tx.gasUsed)/1e18)
        })
      });
      setTransactions(txs);
      // setTransactions(txs.filter((tx) => {
      //   return tx.method === 'withdraw' || tx.method === 'deposit';
      // }));
    }
    // Txn Hash => hash
    // Method => abiDecoder.decodeMethod(tx.input.name)
    // Age => timestamp
    // Value => value
    // Txn Fee => (gasPrice*gasUsed)/1e18
  
    // Block => blockNumber
    // From => from
    // To => to
  }

  useEffect(() => {
    fetchTransactions();
  }, [account])

  const classes = useStyles();

  return(
    <>
       {/* Download Transactions */}
       <List>
            <ListItem>
              <ListItemText
                disableTypography
                primary={<Typography variant="h6" style={{cursor: 'default'}}>Number of Transactions: {transactions.length}</Typography>}
              />
                <ListItemSecondaryAction>
                  <Tooltip title="CSV Export" aria-label="download">
                    <IconButton edge="end" style={{border:'none',outline:'none'}}
                      onClick={() => downloadCSV(transactions)}
                    >
                      <GetAppOutlined fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>      
          </List>

          {/* Transactions */}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead style={{ backgroundColor: '#f8fafd' }}>
                <TableRow>
                  <TableCell className='tableHeading'>Txn Hash</TableCell>
                  <TableCell className='tableHeading'>Method</TableCell>
                  <TableCell className='tableHeading'>Date Time (UTC)</TableCell>
                  <TableCell className='tableHeading'>Value</TableCell>
                  <TableCell className='tableHeading'>[Txn Fee]</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.hash}>
                    <TableCell onClick={() => window.open(`https://mumbai.polygonscan.com/tx/${tx.hash}`)} style={{ color: '#3f51b5', cursor: 'pointer' }}>
                      {tx.hash && tx.hash.substring(0,30)+'...'}
                    </TableCell>
                    <TableCell>
                      <Chip label={tx.method} style={{ backgroundColor: 'rgba(52,152,219,.1)' }} />
                    </TableCell>
                    <TableCell>{tx.age}</TableCell>
                    <TableCell>{tx.value} MATIC</TableCell>
                    <TableCell>{tx.fee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>   
    </>
  )
}

export default Activity;