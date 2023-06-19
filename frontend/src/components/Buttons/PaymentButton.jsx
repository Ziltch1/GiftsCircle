import React from 'react';
import { PaystackButton } from 'react-paystack';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { createResponse } from '../../redux/utils/UtilSlice';

const PaymentButton = ({ amount, action, text }) => {
  const { user } = useSelector(state => state.user);

  const componentProps = {
    email: user.email,
    amount: amount * 100,
    publicKey: 'pk_test_29904691e1634d5c16a66b00afd15548bea054f5',
    text: text ? text : `Check Out N${amount}`,
    onSuccess: response => {
      dispatch(
        createResponse({
          type: 'Success',
          message: 'The payment was successful',
          title: 'Payment Successful',
        })
      );
      action();
    },
    onClose: () =>
      dispatch(
        createResponse({
          type: 'Error',
          message: 'Payment Request Cancelled',
          title: '',
        })
      ),
  };

  return <PaystackButton {...componentProps} className="paystack-button" />;
};

export default PaymentButton;
