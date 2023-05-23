import { TertiaryButton } from '@common/components/elements/button';
import { TruckIcon } from '@heroicons/react/outline';
import axios from '@lib/axios';
import { showErrorAlert, showSuccessAlert } from '@utils/alert';
import { GlobalState } from '@utils/constants';
import { endpoint } from '@utils/constants/endpoints';
import { Action, CartState, State, StoreContext } from '@utils/store';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

type Props = {
  isCODVisible: boolean;
};

const CashOnDelivery = ({ isCODVisible }: Props) => {
  const router = useRouter();
  const { state, dispatch } = useContext<CartState>(StoreContext);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const {data, status} = await axios.post(endpoint.order.add, state.cart);

      setLoading(false);
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
      console.error('Payment Error:', error);
      showErrorAlert(
        'Order Error',
        'There was an error while placing your order. Please try again later.'
      );
    }
  };

  return (
    <>
      {isCODVisible && (
        <TertiaryButton
          Icon={TruckIcon}
          onClick={handlePayment}
          className="w-full mt-5"
          loading={loading}
        >
          Place Order
        </TertiaryButton>
      )}
    </>
  );
};

export default CashOnDelivery;
