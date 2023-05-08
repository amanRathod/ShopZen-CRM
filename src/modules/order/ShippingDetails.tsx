import React, { useContext, useEffect, useState } from 'react';
import { H2, P } from '@elements/Text';
import { Address } from '@appTypes/address';
import * as y from 'yup';
import Form from '@components/form';
import Input from '@elements/form/Input';
import ListInput from '@elements/form/ListInput';
import { ArrowNarrowLeftIcon, LockClosedIcon } from '@heroicons/react/outline';
import LinkedItem from '@common/components/elements/LinkedItem';
import { useRouter } from 'next/router';
import { useQuery } from '@lib/react-query';
import { endpoint } from '@utils/constants/endpoints';
import { Country } from '@appTypes/address';
import { State } from '@appTypes/address';
import Checkbox from '@common/components/elements/form/Checkbox';
import { StoreContext } from '@utils/store';

type Props = {
  shippingAddress?: Address;
};

const shippingAddressSchema = y.object().shape({
  fullName: y.string().required('First name is required'),
  street: y.string().required('Street is required'),
  mobile: y
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Mobile number must be of 10-12 digits')
    .max(12, 'Mobile number must be of 10-12 digits')
    .required('Mobile number is required'),
  city: y.string().required('City is required'),
  state: y.string().required('State is required'),
  country: y.string().required('Country is required'),
  zipCode: y
    .string()
    .length(6, 'Zip Code must be of 6 digits')
    .required('Zip code is required'),
});

const initialShippingAddress = {
  fullName: '',
  street: '',
  mobile: '',
  city: '',
  state: '',
  country: 'India',
  zipCode: '',
};

const ShippingDetails: React.FC<Props> = ({
  shippingAddress = initialShippingAddress,
}) => {
  const router = useRouter();
  const { state, dispatch }: any = useContext(StoreContext);
  const [currentCountryCode, setCurrentCountryCode] = useState('IN');

  const { data } = useQuery(
    endpoint.country.getInSortedOrder,
    'Countries',
    {},
    false,
    true
  );
  let countries = data?._embedded?.countries;

  countries = countries?.map((country: Country) => ({
    label: country.name,
    value: country.name,
    code: country.code,
  }));

  const { data: statesData, refetch } = useQuery(
    endpoint.state.getByCountryCodeInSortedOrder(currentCountryCode),
    '',
    {},
    false,
    true
  );
  let states = statesData?._embedded?.states;

  states = states?.map((state: State) => ({
    label: state.name,
    value: state.name,
  }));

  const handleCountryChange = (country: any) => {
    setCurrentCountryCode(country.code);
  };

  useEffect(() => {
    refetch();
  }, [currentCountryCode]);

  return (
    <div className="flex flex-col md:pl-10 pl-4 pr-10 md:pr-4 bg-white overflow-y-auto overflow-x-hidden h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col md:mt-10 mt-4">
          <H2>Shipping Details</H2>
          <LinkedItem
            className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
            href="/cart"
          >
            <ArrowNarrowLeftIcon className="w-5 h-5 mr-1" />
            <P>Back to cart</P>
          </LinkedItem>
          <Form
            className="mt-6"
            schema={shippingAddressSchema}
            initialValues={shippingAddress}
            onSubmit={async (shippingAddress, reset) => {
              shippingAddress.zipCode = shippingAddress.zipCode.toString();
              shippingAddress.mobile = shippingAddress.mobile.toString();

              dispatch({
                type: 'CART_SAVE_SHIPPING_ADDRESS',
                payload: { ...shippingAddress },
              });

              dispatch({
                type: 'CART_SAVE_BILLING_ADDRESS',
                payload: { ...shippingAddress },
              });

              await router.push('/payment');
              return;
            }}
            submitButton={{
              title: 'Proceed to payment',
              Icon: LockClosedIcon,
              className: 'w-full',
            }}
          >
            <Input
              name="fullName"
              label="Full Name"
              placeholder="Full Name"
              required
            />

            <Input name="street" label="Street" placeholder="Street" required />

            <Input
              type="number"
              name="mobile"
              label="Mobile Number"
              placeholder="Mobile Number"
              inputClassName="arrows-none"
              required
            />

            <Form.Row>
              <Input name="city" label="City" placeholder="City" required />

              <Input
                name="zipCode"
                label="Zip Code"
                placeholder="Zip Code"
                required
              />
            </Form.Row>

            <Form.Row>
              <ListInput
                options={countries}
                name="country"
                label="Country"
                onChange={handleCountryChange}
                required
              />

              <ListInput options={states} name="state" label="State" required />
            </Form.Row>
            <Checkbox
              name="billingAddress"
              label="Billing address is the same as shipping address"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
