import { css } from "@emotion/react";
import { v4 as uuid } from "uuid";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
  background: #333;
`;

const uuidStyle = css`
  color: #ed4134
`;
