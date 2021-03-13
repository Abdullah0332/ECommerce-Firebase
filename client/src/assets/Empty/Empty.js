import React from 'react';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import * as empty from './Empty.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: empty.default,
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

const Empty = () => {

  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Lottie options={defaultOptions} height={320} width={320} />
          <h1 className={classes.heading}>No Products</h1>
      </div> 
  )
}

export default Empty