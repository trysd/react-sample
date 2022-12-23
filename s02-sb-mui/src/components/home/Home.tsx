/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react'

export const HomeComponent = () => {
  return (
    <section css={rootStyle}>
      <div>
        <p css={uuidStyle}>Home: {uuid()}</p>
        <style>div</style>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">login</Button>
        </Stack>
      </div>
    </section>
  );
};

const rootStyle = css`
  padding: 20px;
  height: 100vh;
  text-align: center;
  background-color: #242424;
`;

const uuidStyle = css`
  color: #555
`;