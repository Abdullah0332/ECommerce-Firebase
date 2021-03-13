import React from 'react';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import * as submit from './submit.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: submit.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const useStyles = makeStyles(() => ({
  root: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%"
  },
  heading: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    textAlign: "center"
  }
}));

const Submit = () => {

  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Lottie options={defaultOptions} height={150} width={120} />
      </div> 
  )
}

export default Submit