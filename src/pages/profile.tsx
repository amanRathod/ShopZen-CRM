import Card from '@common/components/elements/Card';
import Divider from '@common/components/elements/Divider';
import GridContainer from '@common/components/elements/GridContainer';
import LinkedItem from '@common/components/elements/LinkedItem';
import { H2, H3, H4, P } from '@common/components/elements/Text';
import asPortalPage from '@common/hoc/asPortalPage';
import { withAuth } from '@common/hoc/withAuth';
import { Address } from '@common/types/address';
import { LocationMarkerIcon, MapIcon } from '@heroicons/react/outline';
import { useAuth } from '@lib/auth';
import { useMutation } from '@lib/react-query';
import { getDummyPicture } from '@utils';
import { endpoint } from '@utils/constants/endpoints';

const Profile = () => {
  const { user } = useAuth();
  const { firstName, lastName, email, image } = user!;

  // const { } = useMutation(endpoint.address.update )

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
                    href=""
                    className="text-primary-600  hover:text-primary-800  hover:underline"
                  >
                    Edit
                  </LinkedItem>
                  <div className="border-l-2 border-gray-200 h-8 ml-2"></div>
                  <LinkedItem
                    href=""
                    className="ml-2 text-primary-600  hover:text-primary-800  hover:underline"
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
