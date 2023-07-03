import Layout from "@/src/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  });
  return (
    <Layout>
      <table className="basic">
        <thead>
          <tr>
            <th>Data</th>
            <th>Destinatário</th>
            <th>Produto</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>
                  {new Date(order.createdAt).toLocaleString().substring(0, 17)}
                </td>
                <td>
                  {order.name} <br />
                  {order.email} <br />
                  {order.phoneNumber} <br />
                  {order.streetAdress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data?.name} x {l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
