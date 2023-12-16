import React from 'react';

type Props = {
  isLoading: boolean;
  loadComponent: React.ReactElement;
  children: React.ReactElement | React.ReactNode | React.ReactNode[];
};

const LoadableContainer = ({ loadComponent, isLoading, children }: Props) => {
  return isLoading ? loadComponent : <React.Fragment>{children}</React.Fragment>;
};

export default LoadableContainer;
