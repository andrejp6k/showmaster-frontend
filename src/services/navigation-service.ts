import { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction | undefined;

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

export const navigateTo = (path: string, params?: any) => {
  if (navigate) {
    navigate(path, params);
  } else {
    console.error(
      'Navigate function not set. Make sure to call setNavigate first.',
    );
  }
};
