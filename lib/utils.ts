import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(num: number) {
  // Create a new Intl.NumberFormat object with options for currency formatting
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Change currency as needed
  });

  // Format the price using the formatter
  const formattedPrice = formatter.format(num / 100);

  return formattedPrice;
}
