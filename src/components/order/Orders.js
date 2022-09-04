import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Produto</th>
          <th scope="col">Preço</th>
          <th scope="col">Quantidade</th>
       
          <th scope="col">Data</th>
          <th scope="col">Método De Pagamento</th>
          <th scope="col">Status do Pagamento</th>
          <th scope="col">Status Do Pedido</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.count}</td>
            
            <td>
              <span>
                {new Date(order.paymentIntent.created * 1000).toLocaleString()}
              </span>
            </td>
            <td>
              <span>
                {order.paymentIntent.payment_method_types[0]}
              </span>
            </td> 
            <td> <span>{order.paymentIntent.status.toUpperCase()}</span></td>
            <td>
              <div className="row">
                {/* <div className="col-md-4">Delivery Status</div> */}
                <div className="col-md-8">
                  <select
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="form-control"
                    defaultValue={order.orderStatus}
                    name="status"
                  >
                    <option value="Processing">Em processamento</option>
                    <option value="Dispatched">Despachado</option>
                    <option value="Cancelled">Cancelado</option>
                    <option value="Completed">Completo</option>
                  </select>
                </div>
             </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
    <div class="container">
    {orders.map((order) => (
        <div key={order._id} className="row pb-5">
   

          {showOrderInTable(order)}
        </div>
      ))}
    </div>
     
    </>
  );
};

export default Orders;
