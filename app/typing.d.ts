interface ILayoutProps {
  children: React.ReactNode;
}

type TErrorResponse = {
  response: {
    data: {
      error: TError;
    };
  };
};
