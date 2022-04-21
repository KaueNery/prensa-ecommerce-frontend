import React, {useEffect, useState} from "react";
import { Button } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import { 
    getUserCart,
     emptyUserCart, 
     saveUserAddress,
     applyCoupon
    } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
    const dispatch = useDispatch(); 
    const { user } = useSelector((state) => ({...state}));
    const [products, setProducts] = useState([]); 
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [discountError, setDiscountError] = useState("");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        alert(user)
        getUserCart(user.token) 
        .then((res) => {
            setProducts(res.data.products)
            setTotal(res.data.cartTotal);
        });
    }, []);

    const saveAddressToDb = () => {
        // console.log(address);
        saveUserAddress(user.token,address).then(res => {
            if(res.data.ok) {
                setAddressSaved(true);
                toast.success("Endereço salvo!")
            }
        });
    };
    
    const emptyCart = () => {
        //remove from local storage
        if (typeof window !== "undefined"){
            localStorage.removeItem("cart");    
        }
        //remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        //remove from database
        emptyUserCart(user.token)
        .then(res => {
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0);
            toast.success("Carrinho vazio. Continuar comprando");
        })
    };

    const applyDiscountCoupon = () => {
        console.log("send coupon to backend", coupon);
        applyCoupon(user.token, coupon).then((res) => {
          console.log("RES ON COUPON APPLIED", res.data);
          if (res.data) {
            setTotalAfterDiscount(res.data);
            // update redux coupon applied true/false
            dispatch({
              type: "COUPON_APPLIED",
              payload: true,
            });
          }
          // error
          if (res.data.err) {
            setDiscountError(res.data.err);
            // update redux coupon applied true/false
            dispatch({
              type: "COUPON_APPLIED",
              payload: false,
            });
          }
        });
      };

    const showAddress = () => (
        <>
         <ReactQuill theme="snow" value={address} onChange={setAddress}/>
            <br/>
         <Button type="primary" className="btn btn-primary mt-2" onClick={saveAddressToDb}>Salvar</Button>
        </>
      );

      const showProductSummary = () => 
        products.map((p, i) => (
                <div key={i}>
                    <p>
                        {p.product.title} ({p.color}) x {p.count} ={" R$: "}
                        {p.product.price * p.count}
                    </p>
                </div>
        ));
  
    const showApplyCoupon = () => (
      <>
        <input
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          value={coupon}
          type="text"
          className="form-control"
        />
        <Button type="primary" onClick={applyDiscountCoupon} className="btn btn-primary mt-2 ">
          Aplicar
        </Button>
      </>
    );

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Endereço de entrega</h4>
                {showAddress()}
                <br/>
                <hr/>
                <h4>Cupom de desconto</h4>
                <br/>
                {showApplyCoupon()}
                <br/>
                <br/>
                {discountError && <p className="bg-danger p-2">{discountError}</p>}
            </div>

            <div className="col-md-6">
                <h4>Resumo do Pedido</h4>
                <hr/>
                <p>Produtos {products.length} </p>
                <hr/>
                {showProductSummary()}
                <hr/>   
                <p>Total do Pedido = {"R$: "}{total} </p>

                {totalAfterDiscount > 0 && (
                    <div className="bg-success p-2">
                       Desconto aplicado: 
                       Total líquido = {"R$: "}{totalAfterDiscount}
                    </div>
                )}
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <Button 
                            type="primary" 
                            className="btn btn-primary" 
                            disabled={!addressSaved} 
                            onClick={() => navigate(`/payment`)} 
                        >
                            Finalizar Pedido
                        </Button>
                    </div>
                    <div className="col-md-6">
                        <Button
                            disabled={!products.length}
                            onClick={emptyCart} 
                            className="btn btn-primary"
                        >
                            Limpar Carrinho
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Checkout;