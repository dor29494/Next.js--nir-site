import React, { useState } from "react";
import Link from "next/link";
import { firebase } from "../../public/app";
import { useRouter } from "next/router";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    background: "white",
    borderRadius: "30px",
    maxWidth: "300px",
    maxHeight: "25px",
    ".&outlined-basic": {},
    ". &MuiInputLabel-root": {
      fontSize: "14px",
      direction: "rtl",
    },
  },
  inputGridItem: {
    maxWidth: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const InputField = withStyles((theme) => ({
  root: {
    marginBottom: "0.5rem",
    "& label.Mui-focused": {
      color: theme.palette.background.light,
    },
    "& label": {
      color: theme.typography.subtitle1,
      fontWeight: "200",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.background.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: "lightgrey",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.background.paper,
      },
    },
  },
}))(TextField);

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const classes = useStyles();
  const router = useRouter();
  return (
    <div>
      <Grid container mt={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} mt={3} mb={2}>
          <Typography variant="h1" component="div" align="center">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.inputGridItem}>
          <InputField
            mb={2}
            size="small"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className={classes.inputGridItem}>
          <InputField
            mb={2}
            type="password"
            defaultValue={pass}
            onChange={(e) => setPass(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonGridItem}>
          <Button
            onClick={async () => {
              await firebase.auth().signInWithEmailAndPassword(email, pass);

              router.push("/backoffice");
            }}
          >
            Log in
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
