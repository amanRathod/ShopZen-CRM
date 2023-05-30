import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/outline";
import { OrderStatus } from "./constants";

export function getOrderStatusComponent(status: string): JSX.Element | null {
  switch (status) {
    case OrderStatus.PENDING:
      return (
        <div className="flex py-4">
          <ClockIcon className="text-gray-500 h-4 w-4 mr-1 mt-1" />
          <p>Pending</p>
        </div>
      );
    case OrderStatus.PROCESSING:
      return (
        <div className="flex py-4">
          <ClockIcon className="text-yellow-500 h-4 w-4 mr-1 mt-1" />
          <p>Processing</p>
        </div>
      );
    case OrderStatus.SHIPPED:
      return (
        <div className="flex py-4">
          <CheckCircleIcon className="text-blue-500 h-4 w-4 mr-1 mt-1" />
          <p>Shipped</p>
        </div>
      );
    case OrderStatus.DELIVERED:
      return (
        <div className="flex py-4">
          <CheckCircleIcon className="text-green-500 h-4 w-4 mr-1 mt-1" />
          <p>Delivered</p>
        </div>
      );
    case OrderStatus.CANCELLED:
      return (
        <div className="flex py-4">
          <XCircleIcon className="text-red-500 h-4 w-4 mr-1 mt-1" />
          <p>Cancelled</p>
        </div>
      );
    case OrderStatus.RETURNED:
      return (
        <div className="flex py-4">
          <XCircleIcon className="text-purple-500 h-4 w-4 mr-1 mt-1" />
          <p>Returned</p>
        </div>
      );
    default:
      return null;
  }
}