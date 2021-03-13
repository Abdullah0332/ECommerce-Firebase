import React from 'react';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import * as emptycart from './emptycart.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptycart.default,
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

const EmptyCart = () => {

  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Lottie options={defaultOptions} height={320} width={320} />
          <h1 className={classes.heading}>Cart is Empty</h1>
      </div> 
  )
}

export default EmptyCart