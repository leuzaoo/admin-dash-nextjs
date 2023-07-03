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
                  <span className="font-bold">Nome: </span>
                  {order.name} <br />
                  <span className="font-bold">Email: </span>
                  {order.email} <br />
                  <span className="font-bold">Telefone: </span>
                  {order.phoneNumber} <br />
                  <span className="font-bold">Endereço: </span>
                  {order.streetAdress}
                </td>
                <td className="text-center">
                  {order.line_items.map((l) => (
                    <>
                      <span className="font-bold text-xl">
                        {l.price_data?.product_data?.name}
                      </span>{" "}
                      Quantidade:
                      {l.quantity}
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
