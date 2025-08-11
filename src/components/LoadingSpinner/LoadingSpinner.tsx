type LoadingSpinnerProps = {
  className?: string;
  size?: "small" | "medium" | "large";
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = "medium",
}) => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div
        className={`
          border-2 border-current border-y-transparent rounded-full animate-spin
          ${
            size === "small"
              ? "w-3 h-3"
              : size === "medium"
                ? "w-6 h-6"
                : "w-10 h-10"
          }
          ${className}
        `}
      />
    </div>
  );
};

export default LoadingSpinner;
