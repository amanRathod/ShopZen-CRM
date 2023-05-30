import * as y from 'yup';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useQuery } from '@lib/react-query';
import React, { useContext, useEffect, useState } from 'react';
import {
  ArrowNarrowLeftIcon,
  LockClosedIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import { H2, H4, P } from '@elements/Text';
import { Address } from '@appTypes/address';
import Form from '@components/form';
import Input from '@elements/form/Input';
import ListInput from '@elements/form/ListInput';
import Checkbox from '@elements/form/Checkbox';
import LinkedItem from '@elements/LinkedItem';
import { endpoint } from '@utils/constants/endpoints';
import { Country } from '@appTypes/address';
import { State } from '@appTypes/address';
import { CartState, StoreContext } from '@utils/store';
import { GlobalState } from '@utils/constants';
import { useAuth } from '@lib/auth';
import Divider from '@common/components/elements/Divider';
import { TertiaryButton } from '@common/components/elements/button';

type Props = {
  shippingAddress?: Address;
};

const shippingAddressSchema = y.object().shape({
  fullName: y.string().required('First name is required'),
  street: y.string().required('Street is required'),
  phone: y
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'phone number must be of 10-12 digits')
    .max(12, 'Phone number must be of 10-12 digits')
    .required('Phone number is required'),
  city: y.string().required('City is required'),
  state: y.string().required('State is required'),
  country: y.string().required('Country is required'),
  zipCode: y
    .string()
    .length(6, 'Pin Code must be of 6 digits')
    .required('Pin code is required'),
});

const initialShippingAddress = {
  fullName: '',
  street: '',
  phone: '',
  city: '',
  state: '',
  country: 'India',
  zipCode: '',
};

const ShippingDetails: React.FC<Props> = ({
  shippingAddress = initialShippingAddress,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(user?.primaryAddress);
  const { dispatch } = useContext<CartState>(StoreContext);
  const [currentCountryCode, setCurrentCountryCode] = useState('IN');

  const userAddressData = user?.addresses;
  const [newAddressFormVisible, setNewAddressFormVisible] = useState(
    userAddressData?.length === 0 || false
  );

  const { data: countryData } = useQuery(
    endpoint.country.getInSortedOrder,
    'Countries',
    {},
    false,
    true
  );
  let countries = countryData?._embedded?.countries;

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

  const handleSubmit = async (shippingAddress: any) => {
    shippingAddress.zipCode = shippingAddress.zipCode.toString();
    shippingAddress.phone = shippingAddress.phone.toString();

    dispatch({
      type: GlobalState.SAVE_SHIPPING_ADDRESS,
      payload: { ...shippingAddress },
    });

    dispatch({
      type: GlobalState.SAVE_BILLING_ADDRESS,
      payload: { ...shippingAddress },
    });

    router.push('/payment');
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
            className="flex items-center text-gray-500 hover:text-primary-600 cursor-pointer"
            href="/cart"
          >
            <ArrowNarrowLeftIcon className="w-5 h-5 mr-1" />
            <P>Back to cart</P>
          </LinkedItem>
          {userAddressData?.length != 0 && (
            <div className="flex flex-col mt-4 border border-gray-200 rounded-md p-4">
              <H4 className="mb-2">Your addresses</H4>
              <Divider className="bg-gray-300" />
              <div className="flex flex-col gap-y-3">
                {userAddressData?.map((address: Address) => (
                  <div
                    key={address.id}
                    className={clsx(
                      'flex',
                      (selectedAddress?.id === address.id) &&
                        'border-2 border-primary-600 bg-primary-50',
                      'rounded-md shadow-sm p-2'
                    )}
                  >
                    <input
                      type="radio"
                      name="Address"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
                      onChange={() => setSelectedAddress(address)}
                      checked={selectedAddress?.id === address.id}
                    />
                    <label className="text-sm text-gray-950 ml-2">
                      <P>
                        <span className="font-semibold">
                          {address.fullName}{' '}
                        </span>
                        {address.street},{' '}
                        <span className="uppercase">
                          {address.city}, {address.state}
                        </span>
                        , {address.zipCode}, {address.country}, Phone number:{' '}
                        {address.phone}
                      </P>
                    </label>
                  </div>
                ))}
              </div>
              {newAddressFormVisible ? (
                <LinkedItem
                  className="flex pt-2"
                  href=""
                  onClick={() =>
                    setNewAddressFormVisible(!newAddressFormVisible)
                  }
                >
                  <MinusIcon className="w-5 h-5 text-gray-300" />
                  <P className="pl-1 text-primary-600  hover:text-primary-800  hover:underline">
                    Remove new address
                  </P>
                </LinkedItem>
              ) : (
                <LinkedItem
                  className="flex pt-2"
                  href=""
                  onClick={() =>
                    setNewAddressFormVisible(!newAddressFormVisible)
                  }
                >
                  <PlusIcon className="w-5 h-5 text-gray-300" />
                  <P className="pl-1 text-primary-600  hover:text-primary-800  hover:underline">
                    Add new address
                  </P>
                </LinkedItem>
              )}
            </div>
          )}
          {newAddressFormVisible ? (
            <Form
              className="mt-6"
              schema={shippingAddressSchema}
              initialValues={shippingAddress}
              onSubmit={async (shippingAddress, reset) => {
                await handleSubmit(shippingAddress);
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

              <Input
                name="street"
                label="Street"
                placeholder="Street"
                required
              />

              <Input
                type="number"
                name="phone"
                label="Phone Number"
                placeholder="Phone Number"
                inputClassName="arrows-none"
                required
              />

              <Form.Row>
                <Input name="city" label="City" placeholder="City" required />

                <Input
                  type="number"
                  name="zipCode"
                  label="Pin Code"
                  placeholder="Pin Code"
                  inputClassName="arrows-none"
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

                <ListInput
                  options={states}
                  name="state"
                  label="State"
                  required
                />
              </Form.Row>
              <Checkbox
                name="billingAddress"
                label="Billing address is the same as shipping address"
                checked={true}
                disabled={true}
              />
            </Form>
          ) : (
            <TertiaryButton
              onClick={() => handleSubmit(selectedAddress)}
              Icon={LockClosedIcon}
              disabled={!selectedAddress}
            >
              Proceed to payment
            </TertiaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
