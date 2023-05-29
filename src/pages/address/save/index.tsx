import * as y from 'yup';
import { Response } from '@appTypes/.';
import asPortalPage from '@common/hoc/asPortalPage';
import { withAuth } from '@common/hoc/withAuth';
import { Address, Country, State } from '@common/types/address';
import { NextPage } from 'next';
import Form from '@common/components/form';
import { RefreshIcon, UserAddIcon, TrashIcon } from '@heroicons/react/outline';
import Input from '@common/components/elements/form/Input';
import ListInput from '@common/components/elements/form/ListInput';
import { endpoint } from '@utils/constants/endpoints';
import { RequestType, useMutation, useQuery } from '@lib/react-query';
import { useEffect, useState } from 'react';
import { showSuccessAlert } from '@utils/alert';
import { useRouter } from 'next/router';

type Props = {
  address?: Address;
};

const addAddressSchema = y.object().shape({
  fullName: y.string().required('Full name is required'),
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

const initialAddress = {
  id: '',
  fullName: '',
  street: '',
  phone: '',
  city: '',
  state: '',
  country: 'India',
  zipCode: '',
};

const SaveAddress: NextPage<Props> = ({ address = initialAddress }) => {
  const router = useRouter();
  const [currentCountryCode, setCurrentCountryCode] = useState('IN');

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

  const { mutateAsync: addAsync } = useMutation<Address>(endpoint.address.add);

  const { mutateAsync: updateAsync } = useMutation<Address>(
    endpoint.address.update(address.id),
    RequestType.Patch
  );

  const isUpdateMode = !!address.id;

  useEffect(() => {
    refetch();
  }, [currentCountryCode]);

  return (
    <Form
      schema={addAddressSchema}
      initialValues={address}
      onSubmit={async (address, reset) => {
        address.zipCode = address.zipCode.toString();
        address.phone = address.phone.toString();

        if (isUpdateMode) {
          const { message }: Response = await updateAsync(address);

          if (message) {
            showSuccessAlert('Address Updated', message);
            reset();
          }

          router.push('/profile');
          return;
        }

        const { message }: Response = await addAsync(address);

        if (message) {
          showSuccessAlert('Address Added', message);
          reset();
        }

        router.push('/profile');
        return;
      }}
      submitButton={
        isUpdateMode
          ? { title: 'Update Address', Icon: RefreshIcon }
          : { title: 'Add Address', Icon: UserAddIcon }
      }
      resetButton={
        isUpdateMode ? undefined : { title: 'Clear Fields', Icon: TrashIcon }
      }
    >
      <Form.Grid>
        <Input
          name="fullName"
          label="Full Name"
          placeholder="Full Name"
          required
        />

        <Input name="street" label="Street" placeholder="Street" required />

        <Input
          type="number"
          name="phone"
          label="Phone Number"
          placeholder="Phone Number"
          inputClassName="arrows-none"
          required
        />

        <Input name="city" label="City" placeholder="City" required />

        <Input
          type="number"
          name="zipCode"
          label="Pin Code"
          placeholder="Pin Code"
          inputClassName="arrows-none"
          required
        />

        <ListInput
          options={countries}
          name="country"
          label="Country"
          onChange={handleCountryChange}
          required
        />

        <ListInput options={states} name="state" label="State" required />
      </Form.Grid>
    </Form>
  );
};

export { SaveAddress as SaveAddressInternal };

export default asPortalPage<Props>('Add Address')(withAuth()(SaveAddress));
