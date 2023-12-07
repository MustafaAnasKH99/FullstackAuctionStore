import { fireEvent, render, screen } from '@testing-library/react';
import PaymentForm from '/payment/payment-form';

// test('inputs invalid credit card', () => {
//   render(<PaymentForm/>);
//   const cc = screen.getByTestId("ccf");
//   fireEvent.change(cc, {target: {value: "11112222333344442"}})
//   expect(screen.getByTestId("error").toBeInTheDocument())
// });

// test('inputs valid credit card', () => {
//   render(<PaymentForm/>);
//   const cc = screen.getByTestId("ccf");
//   fireEvent.change(cc, {target: {value: "1111222233334444"}})
//   expect(screen.getByTestId("error").toBeNull())
// });

// test('inputs invalid credit card', () => {
//   render(<PaymentForm/>);
//   const cc = screen.getByTestId("ccf");
//   fireEvent.change(cc, {target: {value: "0000000"}})
//   expect(screen.getByTestId("error").toBeInTheDocument())
// });

// test('inputs invalid credit card', () => {
//   render(<PaymentForm/>);
//   const cc = screen.getByTestId("ccf");
//   fireEvent.change(cc, {target: {value: "text"}})
//   expect(screen.getByTestId("error").toBeInTheDocument())
// });

test('inputs invalid credit card', () => {
  // render(<PaymentForm/>);
  // const cc = screen.getByTestId("ccf");
  // fireEvent.change(cc, {target: {value: "12341234123412341234"}})
  // expect(screen.getByTestId("error").toBeInTheDocument())
});
