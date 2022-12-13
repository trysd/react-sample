/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Child from 'components/_test/Hello/child/Child';
import React, { useState } from 'react'

const Hello = (bet: {children: string}) => {
  return (
    <div css={main}>
      <div>Hello Test {bet.children}</div>
      <Child />
    </div>
  );
}

const main = css`
border: 1px solid #000;
padding: 4px;
color: red;
`;

export default Hello