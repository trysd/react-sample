import { css } from '@emotion/react';
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react'

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from '@mui/material';
import SignIn from '../SignIn/Signin';

let theme = createTheme({
  palette: {
    primary: {
      main: "#42a5f5",
      light: "#1976d2",
      dark: "#1565c0",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        // 影なし
        disableElevation: true
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
        color: "transparent"
      },
    },
  }
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box component="div">

        <Button
          color="inherit"
          type="submit"
          variant="contained"
          sx={{ mt: 3, ml: 3 }}
        >
          information
        </Button>

        <SignIn></SignIn>

      </Box>
    </ThemeProvider>
  )
};
export default Home;

const rootStyle = css`
  padding: 20px;
  height: 100vh;
  text-align: center;
  background-color: #242424;
`;

const uuidStyle = css`
  color: #555
`;
