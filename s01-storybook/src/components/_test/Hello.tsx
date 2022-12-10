import { Child } from 'components/_test/child/Child';
import React, { useState } from 'react'

export function Hello() {
  return (
    <div>
      <p>Hello Test</p>
      <Child />
    </div>
  );
}
