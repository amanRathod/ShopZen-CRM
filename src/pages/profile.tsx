import Card from '@common/components/elements/Card';
import Divider from '@common/components/elements/Divider';
import GridContainer from '@common/components/elements/GridContainer';
import LinkedItem from '@common/components/elements/LinkedItem';
import { H2, H3, H4, P } from '@common/components/elements/Text';
import asPortalPage from '@common/hoc/asPortalPage';
import { withAuth } from '@common/hoc/withAuth';
import { Address } from '@common/types/address';
import {
  LocationMarkerIcon,
  MapIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import { useAuth } from '@lib/auth';
import { useMutation } from '@lib/react-query';
import { getDummyPicture } from '@utils';
import { showInfoAlert, showWarningAlert } from '@utils/alert';
import { endpoint } from '@utils/constants/endpoints';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Profile = () => {
  const router = useRouter();
  const { user, refetchUser } = useAuth();
  const { firstName, lastName, email, image } = user!;

  // const { } = useMutation(endpoint.address.update )

  const removeAddress = async (id: string) => {
    showInfoAlert(
      'Remove Address',
      'Removing address is not allowed yet and will be implemented in the future'
    );
  };

  useEffect(() => {
    refetchUser();
  }, [user]);

  return (
    <>
      <div className="">
        <div className="mt-1 flex items-center">
          <div className="flex-shrink-0">
            <img
              src={image || getDummyPicture(`${firstName} ${lastName}`)}
              className="inline-block h-20 w-20 overflow-hidden rounded-full ring-2 ring-gray-200"
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">
              {firstName} {lastName}
            </div>
            <div className="text-sm font-medium text-gray-500">{email}</div>
          </div>
        </div>
        <Divider className="mt-6" />
        <div className="mt-6">
          <H3 className="flex">
            <LocationMarkerIcon className="h-10 w-10 text-primary-600" />
            Your Addresses
          </H3>

          <GridContainer className="ml-0 mr-0">
            <LinkedItem href="/address/save" className="w-full flex">
              <Card className="w-full flex flex-col justify-center items-center border-dashed border-2 border-gray-300 cursor-pointer rounded-md bg-slate-50">
                <PlusIcon className="h-14 w-14 text-gray-300" />
                <H3>Add address</H3>
              </Card>
            </LinkedItem>
            {user?.addresses?.map((address: Address) => (
              <Card className="w-full border-2 border-gray-200 pt-2 pb-2 pl-6 pr-6 rounded-md bg-slate-50">
                <H4>{address.fullName}</H4>
                <P>{address.street}</P>
                <P>{address.city}</P>
                <P className="uppercase">
                  {address.state}, {address.zipCode}
                </P>
                <P>{address.country}</P>
                <P>Phone number: {address.phone}</P>

                <div className="flex items-center py-4">
                  <LinkedItem
                    href={`/address/save/${address.id}`}
                    className="text-primary-600  hover:text-primary-800  hover:underline"
                  >
                    Edit
                  </LinkedItem>
                  <div className="border-l-2 border-gray-200 h-8 ml-2"></div>
                  <LinkedItem
                    href=""
                    className="ml-2 text-primary-600  hover:text-primary-800  hover:underline"
                    onClick={() => {
                      showWarningAlert(
                        'Remove Address',
                        'Are you sure you want to remove this address?',
                        () => {
                          removeAddress(address.id);
                        }
                      );
                    }}
                  >
                    Remove
                  </LinkedItem>
                </div>
              </Card>
            ))}
          </GridContainer>
        </div>
      </div>
    </>
  );
};

export default asPortalPage('Profile')(withAuth()(Profile));
