import { render, screen, prettyDOM } from '@testing-library/react'
import { ReactElement } from 'react';
import { MyComponent } from './MyComponent'

test('「Hello Test」is drawn', () => {
  // # type_1
  // render(<MyComponent />);
  // screen.debug();
  // expect(screen.getByText('Hello Test')).toBeInTheDocument();

  // # type_2
  const { baseElement } = render(<MyComponent /> as ReactElement);
  console.log(prettyDOM(baseElement, Infinity));
  expect(screen.getByText('Hello Test')).toBeInTheDocument();

});