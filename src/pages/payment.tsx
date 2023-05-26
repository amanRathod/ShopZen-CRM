import { NextPage } from 'next';
import asPortalPage from '@hoc/asPortalPage';
import { CreditCardIcon } from '@heroicons/react/solid';
import { H4} from '@elements/Text';
import { GlobalState, PaymentMethod, Years } from '@utils/constants';
import { withAuth } from '@common/hoc/withAuth';
import { useContext, useEffect, useState } from 'react';
import { CartState, StoreContext } from '@utils/store';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@modules/payment/PaymentForm';
import getStripe from '@lib/getStripe';
import CashOnDelivery from '@modules/payment/CashOnDelivery';

const stripePromise = getStripe();

const Payment: NextPage = () => {
  const { dispatch } = useContext<CartState>(StoreContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PaymentMethod.STRIPE
  );

  useEffect(() => {
    dispatch({
      type: GlobalState.SAVE_PAYMENT_METHOD,
      payload: selectedPaymentMethod,
    });
  }, [selectedPaymentMethod]);

  return (
    <div className="min-w-screen  flex items-center justify-center mt-20">
      <div className="w-full mx-auto rounded-lg bg-white border shadow-lg p-5 text-gray-700 max-w-lg">
        <div className="w-full pt-1 pb-5">
          <CreditCardIcon className="bg-primary-600 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg" />
        </div>

        <div className="mb-10">
          <H4 className="text-center uppercase">Secure payment info</H4>
        </div>

        <div className="mb-3 flex -mx-2">
          <div className="px-2">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-primary-600 cursor-pointer"
                name="type"
                id="type1"
                checked={selectedPaymentMethod == PaymentMethod.COD}
                onChange={() => setSelectedPaymentMethod(PaymentMethod.COD)}
              />
              <img
                src="https://res.cloudinary.com/di9zvktdc/image/upload/v1684813181/ShopZen/8123531_smmvcn.png"
                className="h-12 w-16"
                />
            </label>
          </div>
          <div className="px-2">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-primary-600 cursor-pointer"
                name="type"
                id="type2"
                checked={selectedPaymentMethod == PaymentMethod.STRIPE}
                onChange={() => setSelectedPaymentMethod(PaymentMethod.STRIPE)}
              />
              <img
                src="https://res.cloudinary.com/di9zvktdc/image/upload/v1682938494/ShopZen/2560px-Stripe_Logo__revised_2016.svg_vaubnt.png"
                className="h-12 w-16"
              />
            </label>
          </div>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm
            isStripeFormVisible={selectedPaymentMethod === PaymentMethod.STRIPE}
          />
        </Elements>

        <CashOnDelivery isCODVisible={selectedPaymentMethod === PaymentMethod.COD}/>
      </div>
    </div>
  );
};

export default asPortalPage('Payment')(withAuth()(Payment));
