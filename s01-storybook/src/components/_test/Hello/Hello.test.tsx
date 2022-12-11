import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('「Hello Test」is drawn', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { baseElement } = render(<Hello>isHello</Hello>);
  // console.log(prettyDOM(baseElement, Infinity));
  // screen.debug();
  expect(screen.getByText('Hello Test isHello')).toBeInTheDocument();
});
