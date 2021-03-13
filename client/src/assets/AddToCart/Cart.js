import React from 'react'
import Lottie from 'react-lottie'
import * as cart from './cart.json';
import { makeStyles } from '@material-ui/core/styles';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cart.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const useStyles = makeStyles(() => ({
    root: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%"
    },
  }));

const Cart = () => {
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Lottie options={defaultOptions} height={150} width={120} />
        </div>
    )
}

export default Cart