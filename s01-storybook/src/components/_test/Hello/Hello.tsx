// import { Child } from 'components/_test/child/Child';
import Child from './child/Child';
import { css } from '@emotion/react';
import React, { useState } from 'react'

const Hello = (bet: {children: string}) => {
  return (
    <div css={rootStyle}>
      <p>Hello Test {bet.children}</p>
      <Child />
    </div>
  );
}

const rootStyle = css`
  color: #ed4134;
`;

export default Hello