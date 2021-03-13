import React from 'react';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import * as userlogin from './userlogin.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: userlogin.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const useStyles = makeStyles(() => ({
  root: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    marginTop: "100px"
  },
}));

const UserLogin = () => {

  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Lottie options={defaultOptions} height={250} width={250} />
      </div> 
  )
}

export default UserLogin