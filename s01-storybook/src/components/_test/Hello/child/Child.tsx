/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Child = () => {
  return (
    <div css={main}>
      <div>Child Test</div>
    </div>
  );
}
export default Child

const main = css`
border: 1px solid #000;
padding: 4px;
color: blue;
`;