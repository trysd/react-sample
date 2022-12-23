import { render, screen } from '@testing-library/react';
import Child from './Child';

test('「Child Test」is drawn', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { baseElement } = render(<Child />);
  // console.log(prettyDOM(baseElement, Infinity));
  // screen.debug();
  expect(screen.getByText('Child Test')).toBeInTheDocument();
});
