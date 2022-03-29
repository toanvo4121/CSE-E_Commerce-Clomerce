import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function Paypal(order) {
  const paypal = useRef();

  useEffect(() => {
    console.log(order)
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your CloMerce Order",
                amount: {
                  currency_code: "USD",
                  value: order.data.totalAmount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          localStorage.setItem("isPaypalSuccess", true);
          toast.success("Order Placed Successfully");
          console.log("Paypal ok");

        },
        onError: (err) => {
          console.log(err);
          localStorage.setItem("isPaypalSuccess", false);
          toast.error("Order Failed");
        },
      })
      .render(paypal.current);
  });

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}