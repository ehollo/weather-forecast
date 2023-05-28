import * as React from "react";

type SendRequestProps = {
  requestUrl: RequestInfo;
  isLoading?: boolean;
  handleData(data: any): void;
};

const useQuery = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const sendRequest = React.useCallback(
    async ({ requestUrl, handleData }: SendRequestProps) => {
      setIsLoading(true);
      setError(null);
      if (!isLoading) {
        try {
          const response = await fetch(requestUrl);
          if (!response.ok) {
            throw new Error("Request failed!");
          }
          const data = await response.json();
          handleData(data);
        } catch (err) {
          setError(err);
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useQuery;
