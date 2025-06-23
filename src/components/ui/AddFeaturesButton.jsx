import { Button } from "./button";

export default function AddFeaturesButton({ onClick, className = "", ...props }) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`text-sm ${className}`}
      {...props}
    >
      + Үнэ тариф нэмэх
    </Button>
  );
} 