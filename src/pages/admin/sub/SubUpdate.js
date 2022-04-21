import React, {useState, useEffect}from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { useParams , useNavigate } from "react-router-dom";
import {
    getSub, updateSub, 
}from '../../../functions/sub' ; 
import {
    getCategories, 
}from '../../../functions/category' ; 
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = () => {
    const {user} = useSelector(state => ({...state}));

    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState ([]);
    const [parent, setParent] = useState('');

    let {slug} = useParams();

    useEffect(() => {
        loadCategories();
        loadSub();
    }, [])

    const loadCategories = () =>
     getCategories().then(c => setCategories(c.data));

     const loadSub = () =>
         getSub(slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        updateSub(slug, {name , parent},user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" Editado com sucesso! `);
            navigate("/admin/sub");
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
                {loading ? <h4 className="text-danger">Carregando...</h4> :  <h4>Editar Sub Categoria</h4>}
               
                <div className="form-group">
                    <label>Categoria Mãe</label>
                    <select 
                        name="category" 
                        className="form-control"
                        onChange={(e) => setParent(e.target.value)}
                    >
                        <option>Selecione</option>
                        {categories.length > 0 && categories.map((c) => (
                            <option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>
                        ))};
                    </select>
                </div>

                <CategoryForm handleSubmit={handleSubmit} 
                    name={name} 
                    setName={setName}
                />
                <br/>
            </div>
            
         </div>
      </div> 
    )
};

export default SubUpdate;