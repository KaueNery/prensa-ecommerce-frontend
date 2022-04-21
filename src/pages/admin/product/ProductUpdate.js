import React, {useState, useEffect}from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { getProduct , updateProduct} from "../../../functions/product";
import { useNavigate ,useParams} from 'react-router-dom';
import { getCategories , getCategorySubs } from '../../../functions/category' ; 
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from '@ant-design/icons';
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Grey', 'White', 'Blue'],
    brands: ['Prensa'],
    color: '',
    brand: '',
};

const ProductUpdate = () => {
    const [values, setValues] = useState(initialState);
    let navigate = useNavigate();
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] =  useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    //redux
    const {user} = useSelector((state) => ({ ...state }));

    //get slug from params
    let {slug} = useParams();

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, [])

    const loadProduct = () =>
        getProduct(slug).then(p => {
            setValues({ ...values, ...p.data});
            getCategorySubs(p.data.category ? p.data.category._id : "")
            .then(res => {
                setSubOptions(res.data); //on first load, show default subs
            });
            //subcategory id array 
            let arr = []
            p.data.subs.map(s => {
                arr.push(s._id);
            });
            console.log(arr);
            setArrayOfSubIds((prev) => arr); //it is needed for Ant design Select component
        });

    const loadCategories = () =>
        getCategories().then(c => {
            setCategories(c.data);
        });
   
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubIds;
        values.category = selectedCategory.length > 0 ? selectedCategory : values.category;

        updateProduct(slug, values, user.token).
        then(res => {
            // console.log(res);
            window.alert('Produto atualizado com sucesso!');
            navigate("/admin/products");
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
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [] });
    
        setSelectedCategory(e.target.value);
    
        getCategorySubs(e.target.value).then((res) => {
          console.log("SUB OPTIONS ON CATGORY CLICK", res);
          setSubOptions(res.data);
        });
    
        console.log("EXISTING CATEGORY values.category", values.category);
    
        // if user clicks back to the original category
        // show its sub categories in default
        if (values.category._id === e.target.value) {
          loadProduct();
        }
        // clear old sub category ids
        setArrayOfSubIds([]);
    };

    return(
        <div className="container-fluid">
           <div className="row">
                 <div className="col-md-2">
                   <AdminNav />
                </div>

                <div  className="col-md-10">
                
                    <div className="col-md-5 pt-3">
                        {loading? <LoadingOutlined /> : <h4>Atualizar Produto</h4>}
                    </div>
                    <hr/>
                    
                  
                    {/* {JSON.stringify(values)} */}

                    <div className="p-3">
                        <FileUpload 
                            values={values} 
                            setValues={setValues} 
                            setLoading={setLoading}
                        />
                    </div>

                    <ProductUpdateForm
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                        setValues={setValues}
                        values={values}
                        handleCategoryChange = {handleCategoryChange}
                        subOptions = {subOptions}
                        categories={categories}
                        arrayOfSubIds={arrayOfSubIds}
                        setArrayOfSubIds={setArrayOfSubIds}
                        selectedCategory={selectedCategory}
                    />
     
                </div>            
           </div>
        </div> 
      )
};

export default ProductUpdate;