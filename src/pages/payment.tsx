import { NextPage } from 'next';
import * as y from 'yup';
import Form from '@components/form';
import asPortalPage from '@hoc/asPortalPage';
import { CreditCardIcon } from '@heroicons/react/solid';
import { H4 } from '@common/components/elements/Text';
import Input from '@common/components/elements/form/Input';
import { LockClosedIcon } from '@heroicons/react/outline';
import ListInput from '@common/components/elements/form/ListInput';
import { Months, Years } from '@utils/constants';
import { Payment } from '@common/types/payment';
import { useRouter } from 'next/router';
import { showSuccessAlert } from '@utils/alert';
import { withAuth } from '@common/hoc/withAuth';

type Props = {
  payment?: Payment;
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
                checked
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
              />
              <img
                src="https://res.cloudinary.com/di9zvktdc/image/upload/v1682938494/ShopZen/2560px-Stripe_Logo__revised_2016.svg_vaubnt.png"
                className="h-8 ml-2"
              />
            </label>
          </div>
        </div>

        <Form
          schema={paymentSchema}
          initialValues={payment}
          onSubmit={async (values) => {
            showSuccessAlert(
              'Payment successful!',
              "You'll be redirected to the home page in a few seconds"
            );
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
        </Form>
      </div>
    </div>
  );
};

export default asPortalPage('Payment')(withAuth()(Payment));
