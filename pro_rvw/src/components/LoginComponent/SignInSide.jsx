import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as React from 'react';
import axios from 'axios';
import store from '../../store';
import { useNavigate } from "react-router-dom";
import { adminLogin, staffLogin, studentLogin } from '../../routes/APIRoutes';
import { setCurrentAccesor } from '../../actions';


const theme = createTheme();

export default function SignInSide(props) {
  const navigate = useNavigate();
  const user = store.getState().user;
  console.log("User",user);


  const handleSubmit = async (event) => { 
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        name: data.get('userid'),
        password: data.get('password'),
      });

      if(user === 'Admin'){
        const res = await axios.post(adminLogin, {
          name: data.get('userid'),
          password: data.get('password'),
        });

        console.log(res);
        
        if (res.data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(res.data.ad)
          );
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_USER,
            "Admin"
          );          
          store.dispatch(setCurrentAccesor("Admin"));
          navigate('/admin', { replace: true });
        }
        console.log(res.data.ad);
        console.log(process.env.REACT_APP_LOCALHOST_KEY);
      }else if(user === 'Staff'){
        const res = await axios.post(staffLogin, {
          name: data.get('userid'),
          password: data.get('password'),
        });
        
        if (res.data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(res.data.user)
          );          
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_USER,
            "Staff"
          );
          store.dispatch(setCurrentAccesor("Staff"));
          navigate('/staff', { replace: true });         
        }
      }else{
        const res = await axios.post(studentLogin, {
          regno: data.get('userid'),
          password: data.get('password'),
        });

        console.log(res);
        
        if (res.data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(res.data.user)
          );
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_USER,
            "Student"
          );
          store.dispatch(setCurrentAccesor("Student"));
          navigate('/Student', { replace: true});
        }else{
          document.getElementById("de").innerHTML = "Invalid Credentials";
        }
      }
  };

  return (
    
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4}} style={styles.body}>
    <ThemeProvider theme={theme}>
      <Grid container component="main" >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://th-i.thgim.com/public/incoming/11eqie/article65312284.ece/alternates/FREE_1200/IMG_1693_24_3_2022_15_44_2_1_B99KPULJ.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userid"
                  label={user + " ID"}
                  name="userid"
                  autoComplete="userid"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <p id="de" style={{color:"red"}}></p>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Container>
  );
}

const styles = {
  body: {
    paddingBottom: '50px',
  },
}

