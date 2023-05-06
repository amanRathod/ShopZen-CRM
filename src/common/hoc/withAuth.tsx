import { useAuth } from "@lib/auth";
import { useRouter } from "next/router";

export const withAuth = <T extends object>() => {
  const WrappedComponent = (Component: React.FC<T>) => (props: T) => {
    const router = useRouter();
    const { user } = useAuth();

    if (!user) {
      router.replace("/login");
      return <></>;
    }
    
    return <Component {...props} />;
  };

  return WrappedComponent;

};