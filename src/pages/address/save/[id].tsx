import ErrorBox from "@common/components/elements/ErrorBox";
import asPortalPage from "@hoc/asPortalPage";
import { withAuth } from "@hoc/withAuth";
import { useAuth } from "@lib/auth";
import { useRouter } from "next/router";
import { SaveAddressInternal } from ".";

const UpdateAddress = () => {
  const router = useRouter();
  const id = router.query.id ? `${router.query.id}` : undefined;

  const { user } = useAuth();
  const address = user?.addresses?.find((address) => address.id === id!);

  if (!address) { 
    <ErrorBox
      title="Address not found"
      text="The address you are looking for does not exist"
      redirectButton={{
        text: "Go to profile",
        href: "/profile",
      }}
    />
  }

  return <SaveAddressInternal address={address} />;
}

export default asPortalPage("Update Address")(withAuth()(UpdateAddress));