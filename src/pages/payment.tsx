import { NextPage } from 'next';
import * as y from 'yup';
import asPortalPage from '@hoc/asPortalPage';
import { CreditCardIcon } from '@heroicons/react/solid';
import { H4 } from '@common/components/elements/Text';
import { GlobalState, Months, PaymentMethod, Years } from '@utils/constants';
import { Payments } from '@common/types/payment';
import { useRouter } from 'next/router';
import { showSuccessAlert } from '@utils/alert';
import { withAuth } from '@common/hoc/withAuth';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '@utils/store';
import axios from 'axios';
import { RequestType, useMutation } from '@lib/react-query';
import { endpoint } from '@utils/constants/endpoints';
import InlineLoader from '@common/components/elements/loader/InlineLoader';

type Props = {
  payment?: Payments;
};

const paymentSchema = y.object().shape({
  fullName: y.string().required('Name on card is required'),
  cardNumber: y
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(16, 'Card number must be of 16 digits')
    .max(16, 'Card number must be of 16 digits')
    .required('Card number is required'),
  month: y.string().required('Expiry month is required'),
  year: y.string().required('Expiry year is required'),
  cvv: y
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(3, 'CVV must be of 3 digits')
    .max(3, 'CVV must be of 3 digits')
    .required('CVV is required'),
});

const initialPayment = {
  fullName: '',
  cardNumber: '',
  month: '',
  year: '',
  cvv: '',
};

const Payment: NextPage<Props> = ({ payment = initialPayment }) => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PaymentMethod.CARD
  );

  const { state, dispatch }: any = useContext(StoreContext);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const { mutateAsync, isLoading } = useMutation(endpoint.order.add, RequestType.Post, "order");

  if (isLoading) return <InlineLoader />;

  const handlePayment = async () => {
    state.cart.orderItems = state.cart.cartItems;
    delete state.cart.cartItems;

    const token = localStorage.getItem('token');
    // const data = await mutateAsync(state.cart);

    const data = await axios.post('http://localhost:8080/api/checkout/purchase', state.cart, {
      headers: {
        'Authorization': `Bearer ${token}`
        }
        });

    dispatch({
      type: GlobalState.CART_CLEAR_AFTER_PAYMENT,
    });

    showSuccessAlert(
      'Payment Successful',
      'Your order has been placed successfully!'
    );

    router.push('/');
  };

  useEffect(() => {
    if (!shippingAddress) {
      router.push('/cart');
    }

    dispatch({
      type: GlobalState.SAVE_PAYMENT_METHOD,
      payload: selectedPaymentMethod,
    });

  }, [paymentMethod, shippingAddress, selectedPaymentMethod]);

  return (
    <div className="min-w-screen  flex items-center justify-center mt-20">
      <div className="w-full mx-auto rounded-lg bg-white border shadow-lg p-5 text-gray-700 max-w-lg">
        <div className="w-full pt-1 pb-5">
          <CreditCardIcon className="bg-tertiary-600 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg" />
        </div>

        <div className="mb-10">
          <H4 className="text-center uppercase">Secure payment info</H4>
        </div>

        <div className="mb-3 flex -mx-2">
          <div className="px-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-tertiary-600"
                name="type"
                id="type1"
                checked={selectedPaymentMethod == PaymentMethod.CARD}
                onChange={() => setSelectedPaymentMethod(PaymentMethod.CARD)}
              />
              <img
                src="https://res.cloudinary.com/di9zvktdc/image/upload/v1682938998/ShopZen/ShopZen_paymentlogo2_hki2qk-c_scale_h_65_w_273_dmj7ar.jpg"
                className="h-8 ml-3"
              />
            </label>
          </div>
          <div className="px-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-tertiary-600"
                name="type"
                id="type2"
                checked={selectedPaymentMethod == PaymentMethod.STRIPE}
                onChange={() => setSelectedPaymentMethod(PaymentMethod.STRIPE)}
              />
              <img
                src="https://res.cloudinary.com/di9zvktdc/image/upload/v1682938494/ShopZen/2560px-Stripe_Logo__revised_2016.svg_vaubnt.png"
                className="h-8 ml-2"
              />
            </label>
          </div>
        </div>
      {/* TODO: ADD Payment Form*/}
        {/* <Form
          schema={paymentSchema}
          initialValues={payment}
          onSubmit={async (payment) => {
            payment.cvc = `${payment.cvv}`,
            payment.cardNumber = `${payment.cardNumber}`,

            dispatch({
              type: 'SAVE_PAYMENT_METHOD',
              payload: {...payment},
            })

            router.push('/');
          }}
          submitButton={{
            title: 'PAY NOW',
            Icon: LockClosedIcon,
            className: 'w-full',
          }}
        >
          <Input
            label="Name on Card"
            type="text"
            placeholder="John Doe"
            name="fullName"
            required
          />

          <Input
            label="Card Number"
            type="number"
            placeholder="0000 0000 0000 0000"
            name="cardNumber"
            required
          />

          <Form.Row>
            <ListInput
              options={Months}
              name="month"
              label="Expiry Month"
              required
            />
            <ListInput
              options={Years}
              name="year"
              label="Expiry Year"
              required
            />
          </Form.Row>

          <Input
            label="CVC"
            type="number"
            placeholder="000"
            name="cvc"
            className="w-1/2"
            required
          />
        </Form> */}

        <div className="flex justify-center">
          <button
            className="bg-tertiary-600 text-white px-4 py-2 rounded hover:bg-tertiary-500 focus:outline-none focus:bg-tertiary-500"
            onClick={handlePayment}
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default asPortalPage('Payment')(withAuth()(Payment));
