import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper } from '@material-ui/core';
import { Step,
        StepLabel,
        StepContent,
        Paper,
        Typography,
        Dialog,
        DialogContent,
        DialogContentText,
        DialogTitle,
        DialogActions } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Submit from '../../../assets/Submit/Submit';
import UserInfo from './UserInfo';
import ShippingInfo from './ShippingInfo';
import PaymentInfo from './PaymentInfo';
import axios from 'axios';
import { ContextData } from '../../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getSteps() {
  return ['User Information', 'Shipping Information', 'Payment Details'];
}

function getStepContent(step) {

  switch (step) {
    case 0:
      return <UserInfo />;
    case 1:
      return <ShippingInfo />;
    case 2:
      return <PaymentInfo />;
  }
}

export default function ShippingStepper() {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const User = JSON.parse(localStorage.getItem("User"));
  const { shippingInfo } = useContext(ContextData);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOpen = () => {
    
    axios.post("https://ecommerce0011.herokuapp.com/postorder", {shippingInfo, User}, {
      headers: {
          "x-access-token": User.accessToken
      }}).then(response => {
        setOpen(true);  
      }).catch(error => {
        console.log(error)
      })
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location = `/`
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <>
          <Paper square elevation={0} className={classes.resetContainer}>
            <Button onClick={handleOpen} className={classes.button} variant="info" >
              Order Now
            </Button>
          </Paper>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            BackdropProps={{
              timeout: 500,
            }} 
          >
            <span style={{ padding: "30px 50px"}}>
              <Submit />
              <DialogTitle id="alert-dialog-title">Order Placed Successfully</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`Thanks ${User.name} for Buying`}
                </DialogContentText>
              </DialogContent>
            </span>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}
