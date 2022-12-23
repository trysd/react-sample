import { render, screen } from '@testing-library/react';
import TabInHomeGroup from './tab-in-home-group';

test('tab in home group is drawn', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { baseElement } = render(<TabInHomeGroup />);
  // console.log(prettyDOM(baseElement, Infinity));
  // screen.debug();
  expect(screen.getByText('is tab in home group')).toBeInTheDocument();
});
