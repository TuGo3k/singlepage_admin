import { Button } from "./button";

export default function AddSectionButton({ onClick, className = "", ...props }) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`text-sm ${className}`}
      {...props}
    >
      + Хэсэг нэмэх
    </Button>
  );
} 