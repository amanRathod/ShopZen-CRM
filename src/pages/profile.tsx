import { H2 } from '@common/components/elements/Text';
import asPortalPage from '@common/hoc/asPortalPage';
import { withAuth } from '@common/hoc/withAuth';
import { useAuth } from '@lib/auth';

const Profile = () => {
  const { user } = useAuth();
  // TODO: Create Profile page
  return (
    <>
      <H2>Hello {user?.firstName} {user?.lastName}!</H2>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <span className="font-bold">Email:</span>
          <span>{user?.email}</span>
        </div>
      </div>
    </>
  );
};

export default asPortalPage('Profile')(withAuth()(Profile));
