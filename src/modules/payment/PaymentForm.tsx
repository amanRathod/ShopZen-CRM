import { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  PaymentMethodResult,
  StripeCardElementChangeEvent,
} from '@stripe/stripe-js';
import axios from '@lib/axios';
import { endpoint } from '@utils/constants/endpoints';
import { CARD_OPTIONS, GlobalState, STRIPE_AMOUNT } from '@utils/constants';
import { CartState, StoreContext } from '@utils/store';
import { showErrorAlert, showSuccessAlert } from '@utils/alert';
import { formatMoney } from '@utils/formatter';
import { TertiaryButton } from '@elements/button';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth';
import { paymentInfo } from '@common/types/paymentInfo';

type PaymentFormProps = {
  isStripeFormVisible: boolean;
};

const PaymentForm = ({ isStripeFormVisible }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext<CartState>(StoreContext);
  const { shippingAddress } = state.cart;
  const { totalPrice } = state.cart.order;

  const [cardErrorMessage, setCardErrorMessage] = useState<string | null>(null);
  const [formComplete, setFormComplete] = useState(false);

  const createPaymentMethod = async (): Promise<PaymentMethodResult> => {
    return await stripe!.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement)!,
      billing_details: {
        name: shippingAddress.fullName,
        phone: shippingAddress.phone,
        email: user?.email,
        address: {
          line1: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.zipCode,
          country: 'IN',
        },
      },
    });
  };

  const placeOrder = async () => {
    return await axios.post(endpoint.order.add, state.cart);
  };

  const createPaymentIntent = async () => {
    const paymentInfo: paymentInfo = {
      amount: Math.round(totalPrice * STRIPE_AMOUNT),
      currency: 'inr',
      receiptEmail: user?.email,
    };

    return await axios.post(endpoint.order.payment, paymentInfo);
  };

  const confirmCardPayment = async (clientSecret: string) => {
    return await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement)!,
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setFormComplete(false);

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    try {
      const { error: paymentError, paymentMethod } =
        await createPaymentMethod();
      if (paymentError) {
        setCardErrorMessage(paymentError.message!);
        setLoading(false);
        return;
      }

      const { client_secret: clientSecret, error: paymentIntentError }: any =
        await createPaymentIntent();
      if (paymentIntentError) {
        setCardErrorMessage(paymentIntentError);
        setLoading(false);
        return;
      }

      const { error: confirmPaymentError } = await confirmCardPayment(
        clientSecret
      );
      if (confirmPaymentError) {
        setCardErrorMessage(confirmPaymentError.message!);
        setLoading(false);
        return;
      }

      const { data } = await placeOrder();
      setLoading(false);

      if (!data) {
        setCardErrorMessage(data.message);
        return;
      }

      dispatch({
        type: GlobalState.CART_CLEAR_AFTER_PAYMENT,
        payload: '',
      });

      showSuccessAlert(
        'Order Placed',
        'Your order has been placed successfully!'
      );

      router.push('/');
    } catch (error) {
      setLoading(false);
      showErrorAlert(
        'Payment Error',
        'There was an error while processing your payment. Please try again later.'
      );
    }
  };

  const validateCardElement = (event: StripeCardElementChangeEvent) => {
    setFormComplete(event.complete);
    setCardErrorMessage(event.error ? event.error.message : null);
  };

  return (
    <form
      className={isStripeFormVisible ? '' : 'hidden'}
      acceptCharset="UTF-8"
      method="post"
    >
      <div className="block w-full px-3 py-2 placeholder-gray-200 border-4 border-primary-300 rounded-md shadow-sm appearance-none outline-none text-md sm:text-sm">
        <CardElement
          options={CARD_OPTIONS}
          className="col-md-12"
          onChange={validateCardElement}
        />
      </div>

      {cardErrorMessage && (
        <div className="mt-1 text-xs font-semibold text-danger-400 animate-slide-down -z-10">
          {cardErrorMessage}
        </div>
      )}

      <TertiaryButton
        className="w-full items-center mt-4"
        disabled={!formComplete}
        onClick={handleSubmit}
        loading={loading}
      >
        PAY&nbsp;&nbsp;
        <span className="text-lg">{formatMoney(totalPrice)}</span>
      </TertiaryButton>
    </form>
  );
};

export default PaymentForm;
