import { ActionButton, PrimaryButton } from '@common/components/elements/button';
import asPortalPage from '@common/hoc/asPortalPage';
import { withAuth } from '@common/hoc/withAuth';
import { LogoutIcon } from '@heroicons/react/outline';
import { useAuth } from '@lib/auth';

const Profile = () => {
  const { logout } = useAuth();
  return (
    <>
      <div>Profile Page!</div>
      <PrimaryButton
        onClick={logout}
        Icon={LogoutIcon}
        className=""
        disabled={false}
      >
        Logout
      </PrimaryButton>
    </>
  );
};

export default asPortalPage('Profile')(withAuth()(Profile));
