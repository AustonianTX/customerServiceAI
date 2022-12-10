import { Ticket } from "./types";

// function to make an api call to https://ssapi.shipstation.com/orders?customerName=austin@austinjohnson.me&sortBy=CreateDate&sortDir=ASC

export const getShipStationOrders = async (ticket: Ticket) => {
  const rawOrders = await fetch(
    `https://ssapi.shipstation.com/orders?customerName=${ticket.requesterEmail}&sortBy=CreateDate&sortDir=DESC`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${process.env.SHIPSTATION_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  const orders = rawOrders.orders.map((order) => {
    return {
      orderNumber: order.orderNumber,
      orderDate: order.orderDate,
      orderStatus: order.orderStatus,
      orderTotal: order.orderTotal,
      items: order.items.map((item) => {
        return {
          sku: item.sku,
          name: item.name,
          quantity: item.quantity,
          // unitPrice: item.unitPrice,
          // lineItemTotal: item.lineItemTotal,
        };
      }),
      shippingDate: order.advancedOptions.customField1,
    };
  });

  return orders;
};