import React, {useEffect, useState} from 'react';
import {getProduct} from '../functions/product';
import { useNavigate ,useParams} from 'react-router-dom';
import SingleProduct from "../components/cards/SingleProduct"
import { getRelated } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';

const Product = () => {
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);

    let {slug} = useParams();

    useEffect(() => {
        loadSingleProduct();
    },[slug]);

    const loadSingleProduct = () =>
     getProduct(slug).then(res => {
        setProduct(res.data);
        getRelated(res.data._id).then(res => setRelated(res.data));
    });

     return <div className="container-fluid">
        <div className="row pt-4">
            <SingleProduct product={product} />
        </div>

        <div className="row">
            <div>
                <br/>
                <h4 class="text-success text-center">Produtos Relacionados</h4>
            </div>
        </div>
        {/* <div className="container"> */}
         <div className="row ">
            {related.length ? related.map((r) => <div key={r._id} className="col-md-4 p-2">
                <ProductCard product={r} />
            </div>) : ''}
            
        {/* </div> */}
      </div>
        
     </div>;
};

export default Product;