import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";
import { Button } from 'antd';
import { useScript } from 'usehooks-ts'

//load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = props => {
  useScript('https://assets.pagar.me/checkout/checkout.js');
  
  const handleSubmit = async (e) => {
    const checkout = new window.PagarMeCheckout.Checkout({
      encryption_key: 'SUA ENCRYPTION KEY',
      success: function(data) {
        console.log(data);
      },
      error: function(err) {
        console.log(err);
      },
      close: function() {
        console.log('The modal has been closed.');
      }
    }); 

    checkout.open({
 
    "createToken": false,
    // "amount": this.props.chosen.amountCentavos
    })
  }

  return (
    <div className="container p-5 text-center">
      <Button 
          type="primary" 
          className="btn btn-sm btn-primary mt-2"
          onClick={handleSubmit}
    >
            Ir para o checkout
      </Button>

      <h4>Finalizar Compra</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>

      
    </div>
  );
};

export default Payment;
 