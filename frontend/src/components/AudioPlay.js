import {  ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
import { createTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const theme = createTheme({});
 
const useStyles = makeStyles((theme) => {
  return {
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    loopIcon: {
      color: '#3f51b5',
      '&.selected': {
        color: '#0921a9',
      },
      '&:hover': {
        color: '#7986cb',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    playIcon: {
      color: '#f50057',
      '&:hover': {
        color: '#ff4081',
      },
    },
    replayIcon: {
      color: '#e6e600',
    },
    pauseIcon: {
      color: '#0099ff',
    },
    volumeIcon: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    volumeSlider: {
      color: 'black',
    },
    progressTime: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    mainSlider: {
      color: '#3f51b5',
      '& .MuiSlider-rail': {
        color: '#7986cb',
      },
      '& .MuiSlider-track': {
        color: '#3f51b5',
      },
      '& .MuiSlider-thumb': {
        color: '#303f9f',
      },
    },
  };
});
 
const AudioPlay=()=>{
    return (
    <ThemeProvider theme={theme}>
  <AudioPlayer
    width="500px"
    useStyles={useStyles}
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    loop={true}
  />
</ThemeProvider>
    );
};
export default AudioPlay;
