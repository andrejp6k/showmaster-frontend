let navigate: ((path: string) => void) | undefined;

export const setNavigate = (nav: (path: string) => void) => {
  navigate = nav;
};

export const navigateTo = (path: string) => {
  if (navigate) {
    navigate(path);
  } else {
    console.error('Navigate function not set. Make sure to call setNavigate first.');
  }
};
