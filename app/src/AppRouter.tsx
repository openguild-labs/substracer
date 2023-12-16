import React from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import AppProvider from './AppProvider';
import { NotFoundScreen } from './pages';
import { CustomRouteProps, routeList } from './routeList';

type Props = {};

export const renderRoutes = (routes: CustomRouteProps[]) => (
  <Switch>
    {routes.map(route => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.isExact}
        render={route.component as any}></Route>
    ))}
    <Route component={NotFoundScreen} />
  </Switch>
);

const AppRouter = (props: Props) => {
  return (
    <HashRouter basename="/">
      <AppProvider>{renderRoutes(routeList)}</AppProvider>
    </HashRouter>
  );
};

export default AppRouter;
