import React, {useState, useEffect}from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { createProduct } from "../../../functions/product";
import { useNavigate } from 'react-router-dom';
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories , getCategorySubs } from '../../../functions/category' ; 
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from '@ant-design/icons';

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    categories: [],
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Grey', 'White', 'Blue'],
    brands: ['Prensa'],
    color: '',
    brand: '',
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    let navigate = useNavigate();
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] =  useState(false);
    const [loading, setLoading] = useState(false);

    //redux
    const {user} = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () =>
        getCategories().then(c => setValues({...values,categories: c.data}));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token).
        then(res => {
            console.log(res);
            window.alert('Produto criado com sucesso!');
            window.location.reload();
        })
        .catch(err => {
            console.log(err.response.status);
            // if (err.response.status === 400) toast.error('Não foi possivel criar o produto!');
            toast.error(err.response.data.err);
        })
    };

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        setValues({...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
        .then(res => {
            // console.log('SUB DATA:'  , res.data);
            setSubOptions(res.data);
            setShowSub(true);
        })
        .catch (err => {
            console.log(err);
        })
        
    };
    
    return(
        <div className="container-fluid">
           <div className="row">
                 <div className="col-md-2">
                   <AdminNav />
                </div>

                <div  className="col-md-10">
                    {loading? <LoadingOutlined /> : <h4>Criar Produto</h4>}
                    <hr/>
                  
                    {/* {JSON.stringify(values.images)} */}

                    <div className="p-3">
                        <FileUpload 
                            values={values} 
                            setValues={setValues} 
                            setLoading={setLoading}
                        />
                    </div>

                    <ProductCreateForm 
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                        setValues={setValues}
                        values={values}
                        handleCategoryChange = {handleCategoryChange}
                        subOptions = {subOptions}
                        showSub={showSub}
                    />
     
                </div>            
           </div>
        </div> 
      )
};

export default ProductCreate;