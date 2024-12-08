import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatCurrency(amount: number, currency: string = 'PKR'): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
export const getStatusVariant = (status: string) => {
  const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    // Payment Status
    paid: "outline",
    unpaid: "secondary",
    refund: "destructive",
    
    // Order Status
    completed: "default",
    cancelled: "destructive",
    "in-progress": "secondary",
    draft: "secondary",
    
    // Priority
    high: "destructive",
    normal: "secondary",
  };
  
  return variantMap[status] || "secondary";
};