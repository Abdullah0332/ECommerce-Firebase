import React from 'react'
import Lottie from 'react-lottie'
import * as loading from './loading.json';
import { makeStyles } from '@material-ui/core/styles';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const useStyles = makeStyles(() => ({
    root: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%"
    },
  }));

const Loading = () => {
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Lottie options={defaultOptions} height={320} width={220} />
        </div>
    )
}

export default Loading