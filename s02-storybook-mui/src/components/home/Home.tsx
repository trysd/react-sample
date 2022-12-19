import { css } from '@emotion/react';
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react'

const HomeComponent = () =>
  <div css={rootStyle}>
    <div>
      <p css={uuidStyle}>Home: {uuid()}</p>
      <style>div</style>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined">login</Button>
      </Stack>
    </div>
  </div>
export default HomeComponent;

const rootStyle = css`
  background: #333;
  height: 100vh;
`;

const uuidStyle = css`
  color: #555
`;
