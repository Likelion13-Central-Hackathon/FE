import React from "react";
import { BeatLoader } from "react-spinners";

type LoadingSpinnerProps = {
  loading?: boolean;
  size?: number;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 8,
  loading = true,
}) => {
  return (
    <div>
      <BeatLoader
        color="#0400fa"
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
