import React, {useState, useEffect}from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { 
    getCategory,
    updateCategory,
}from '../../../functions/category' ; 
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({match}) => {
    const {user} = useSelector(state => ({...state}));
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState ([]);

    let {slug} = useParams();

    useEffect(() => {
        loadCategory();
    }, [])


    const loadCategory = () =>
     getCategory(slug).then(c => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, {name}, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" editada com sucesso! `);
            navigate("/admin/category");
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            toast.error("Não foi possivel editar a categoria! ");
        })
    };

   return(
      <div className="container-fluid">
         <div className="row">
            <div className="col-md-2">
               <AdminNav />
            </div>
            <div className="col"> 
                {loading ? <h4 className="text-danger">Carregando...</h4> :  <h4>Editar Categoria</h4>}
                <CategoryForm handleSubmit={handleSubmit} 
                    name={name} 
                    setName={setName}
                />
            </div>
            
         </div>
      </div> 
   )
};

export default CategoryUpdate;