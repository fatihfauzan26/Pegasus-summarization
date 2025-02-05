import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getSeverityColors = (severity) => {
  switch (severity) {
    case "None":
      return "bg-green-500";
    case "Low":
      return "bg-yellow-500";
    case "Medium":
      return "bg-orange-500";
    case "High":
      return "bg-red-500";
    case "Critical":
      return "bg-red-900";
    default:
      return "bg-gray-500";
  }
};
