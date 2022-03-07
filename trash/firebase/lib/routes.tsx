import { useRouter } from "next/router";

import { useAuth } from "../context/auth-context";

function withPublic<T>(WrappedComponent: React.ComponentType<T>) {
  const ComponentWithExtraInfo = (props: T) => {
    const auth = useAuth();
    const router = useRouter();

    if (auth.user) {
      router.replace("/");
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithExtraInfo;
}

function withProtected<T>(WrappedComponent: React.ComponentType<T>) {
  const ComponentWithExtraInfo = (props: T) => {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.user) {
      router.replace("/auth");
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithExtraInfo;
}

export { withPublic, withProtected };
