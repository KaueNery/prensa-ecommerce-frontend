import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { removeProduct } from "../../../functions/product";
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";

const AllProducts = () => {

   const [products, setProducts] = useState([]);
   const [ loading, setLoading ] = useState(false);
   const { user } = useSelector((state) => ({...state}));

   useEffect(() => {
      loadAllProducts();
   }, [])

   const loadAllProducts = () => {
      setLoading(true);
      getProductsByCount(100)
      .then(res => {
         setProducts(res.data);
         setLoading(false);
      })
      .catch(err => {
         console.log(err);
         setLoading(false);
      })
   };

   const handleRemove = (slug) => {
      setLoading(true);
      let answer = window.confirm('Tem certeza que quer deletar o produto? ');
      if(answer){
         removeProduct(slug, user.token)
         .then(res => {
            loadAllProducts();
            toast.success(`${res.data.title} removido!`);
         })
         .catch(err => {
            toast.error("Não foi possivel remover o produto! ");
            console.log(err);
         });
      }
   };

   return(
      <div className="container-fluid">
         <div className="row">
            <div className="col-md-2">
               <AdminNav />
            </div>
            <div className="col">
            
            <div className="col"> {loading ? <h4>Carregando...</h4> : <h4>Produtos</h4> }</div>   
               <div className="row">
                  {products.map(p => 
                     <div key={p._id} className="col-md-4 pb-3" >
                        <AdminProductCard 
                           product={p} 
                           handleRemove={handleRemove}
                        />
                     </div>   
                     )   
                  }
               </div>
            </div>
         </div>
      </div> 
   )
};

export default AllProducts;