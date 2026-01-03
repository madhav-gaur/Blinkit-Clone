export const statusFinder = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "Order Confirmed";
    case "PACKED":
      return "Order Packed";
    case "OUT_FOR_DELIVERY":
      return "Order Out for Delivery";
    case "DELIVERED":
      return "Successfully Delivered";
    case "CANCELLED_BY_USER":
      return "Cancelled By You";
    case "CANCELLED_BY_ADMIN":
      return "Cancelled due to technical issues";
    case "CANCELLED_OUT_OF_STOCK":
      return "Items Out of Stock, Order Cancelled";
    case "DELIVERY_FAILED":
      return "Delvery Failed";
    case "RETURN_REQUESTED":
      return "You Requested To return items";
    case "RETURNED":
      return "Ordered Returned";
    case "REFUNDED":
      return "Refund Completed";
    default:
      return "Unknown Status";
  }
};
