import { render, screen, prettyDOM } from '@testing-library/react'
import { Hello } from './Hello'

test('「Hello Test」is drawn', () => {
  // # type_1
  // render(<MyComponent />);
  // screen.debug();
  // expect(screen.getByText('Hello Test')).toBeInTheDocument();

  // # type_2
  const { baseElement } = render(<Hello />);
  console.log(prettyDOM(baseElement, Infinity));
  expect(screen.getByText('Hello Test')).toBeInTheDocument();
  expect(screen.getByText('Child Test')).toBeInTheDocument();
});
