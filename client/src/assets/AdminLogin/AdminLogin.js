import React from 'react';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import * as adminlogin from './adminlogin.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: adminlogin.default,
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
    marginTop: "80px"
  },
}));

const AdminLogin = () => {

  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Lottie options={defaultOptions} />
      </div> 
  )
}

export default AdminLogin