import { useState } from "react";

export default function useFormHelpers(initialLoadingState?: boolean) {
  const [loading, setLoading] = useState<boolean>(initialLoadingState ?? false);
  const [error, setError] = useState<Error | any>();

  function startLoading() {
    setLoading(true);
  }

  function endLoading() {
    setLoading(false);
  }
  function toggleLoading() {
    setLoading(!loading);
  }

  function handleError(err: Error | any) {
    setError(err);
  }

  function clearError(err: Error | any) {
    setError({});
  }

  return {
    loading,
    error,
    startLoading,
    endLoading,
    toggleLoading,
    handleError,
    clearError,
  };
}
