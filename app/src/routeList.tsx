import AuthScreen from "@pages/AuthScreen";
import StudioScreen from "@pages/StudioScreen";

export interface CustomRouteProps {
  isExact: boolean;
  component: React.ComponentType<any>;
  path: string;
}

export const routeList: CustomRouteProps[] = [
  {
    isExact: true,
    component: () => <AuthScreen />,
    path: "/sign-in",
  },
  {
    isExact: true,
    component: () => <StudioScreen />,
    path: "/app",
  },
];
