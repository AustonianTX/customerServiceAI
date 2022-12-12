/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ticket } from "./types";

// function to make an api call to https://ssapi.shipstation.com/orders?customerName=austin@austinjohnson.me&sortBy=CreateDate&sortDir=ASC

export const getShipStationOrders = async (ticket: Ticket) => {
  const rawOrders = await fetch(
    `https://ssapi.shipstation.com/orders?customerName=${ticket.requesterEmail}&sortBy=CreateDate&sortDir=DESC&pageSize=3`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${process.env.SHIPSTATION_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  const orders = rawOrders.orders.map(
    (order: {
      orderNumber: any;
      orderDate: any;
      orderStatus: any;
      orderTotal: any;
      items: any[];
      advancedOptions: { customField1: any };
    }) => {
      return {
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
        orderTotal: order.orderTotal,
        items: order.items.map(
          (item: { sku: any; name: any; quantity: any }) => {
            return {
              sku: item.sku,
              name: item.name,
              quantity: item.quantity,
              // unitPrice: item.unitPrice,
              // lineItemTotal: item.lineItemTotal,
            };
          }
        ),
        shippingDate: order.advancedOptions.customField1,
      };
    }
  );

  return orders;
};
