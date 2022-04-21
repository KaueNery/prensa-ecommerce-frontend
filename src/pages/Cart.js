import { CarryOutTwoTone } from '@ant-design/icons';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { useNavigate } from 'react-router-dom';
import {userCart} from '../functions/user';

const Cart = () => {
    const {cart, user} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    };

    const saveOrderToDb = () => {
        userCart(cart, user.token)
        .then(res => {
            alert(res.data)
            if(res.data.ok) navigate(`/checkout`);
        }).catch(err => console.log('cart save error', err));
    };

    const showCartItems = () => (
        <table className="table table-borderec">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Imagem</th>
                    <th scope="col">Título</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Cor</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Remover</th>
                </tr>
            </thead>

            {cart.map((p) => 
                <ProductCardInCheckout key={p._id} p={p} />
            )}
        </table>
    );


    return (<div className="container-fluid pt-2 pl-2">
        <div className="row">
            <h3>Carrinho</h3>
        </div>

        <div className="row">
            <div className="col-md-8">
                {!cart.length ? (
                    <p>
                        Carrinho vazio. <Link to="/shop"> Continuar comprando </Link>
                    </p>
                )
                 :
                (
                    showCartItems()
                )}   
            </div>
            <div className="col-md-4">
                  <h4>Resumo do pedido</h4>
                  <hr/  >
                  <h6>Produtos</h6>
                  {cart.map((c, i) => (
                        <div key={i}>
                            <p>{c.title} x {c.count} = ${c.price * c.count}</p>
                        </div>
                  ))}
                  <hr/>
                    Total: <b>R$: {getTotal()}</b>
                  <hr/>
                  {
                      user ? (
                        <Button 
                            type="primary" 
                            onClick={saveOrderToDb} 
                            className="btn btn-sm btn-primary mt-2"
                            disabled={!cart.length}
                        >
                            Ir para o checkout
                        </Button>
                      ): (
                        <Link 
                            to={{
                                pathname: "/login",
                                state: {from: "cart"},
                            }}
                        >
                            Logar para ir para o checkout
                        </Link>
                      )
                  }
            </div>
        </div>
    </div>)
};


export default Cart;