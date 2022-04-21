import React, {useState} from "react";
import {Card, Tooltip} from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import defaultImage from "../../images/defaultImage.png";
import ProductListItems from "../cards/ProductListItems";
import _ from "lodash";
import {useSelector, useDispatch} from 'react-redux';

const {Meta} = Card;

const SingleProduct = ({product}) => {
    const [tooltip, setTooltip] = useState('Clique para adicionar');
    //redux
    const {user, cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        let cart = [];
        setTooltip("Adicionado");
        if(typeof window !== 'undefined'){
            if (localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.push({
                ...product,
                count: 1,
            });
            //remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            //save to local storage
            localStorage.setItem('cart', JSON.stringify(unique)); 
            
            //add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
            window.location.reload();
        }
    }

    const {title, images} = product;

    return (
        <>
            <div className="col-md-7">
               {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
                </Carousel> : <Card 
                        cover={
                            <img
                            src={defaultImage}
                            style={{ height: "500px", objectFit: "cover" }}
                            />
                        }
                ></Card>}
            </div>
            <div className="col-md-5">
                <h1 className="p-3">{title}</h1>
                <Card 
                    actions={[
                        < >
                        <Tooltip title={tooltip}>
                            <a onClick={product.quantity > 1 ? handleAddToCart : ''} disabled={product.quantity < 1}>
                                <ShoppingCartOutlined  className="text-success" />  <br/>
                                {product.quantity < 1 ? 'Produto sem estoque' : 'Adicionar ao Carrinho'}        
                            </a>    
                        </Tooltip>
                        </>,
                        <Link to={`/`} className="">
                            <HeartOutlined className="text-danger"/> <br/>Adicionar aos Favoritos
                        </Link>
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;