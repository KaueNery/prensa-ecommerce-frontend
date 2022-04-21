import React, {useState, useEffect}from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createCategory, 
    getCategories, 
    removeCategory
}from '../../../functions/category' ; 
import {Link} from "react-router-dom";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
    const {user} = useSelector(state => ({...state}));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState ([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () =>
     getCategories().then(c => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createCategory({name}, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" criado com sucesso! `);
            loadCategories();
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            toast.error("Não foi possivel criar a categoria! ");
        })
    };

    const handleRemove = async(slug) => {
        if(window.confirm("Tem certeza que deseja excluir?")){
            setLoading(true);
            removeCategory(slug, user.token)
            .then(res => {
                setLoading(false);
                toast.success(`${res.data.name} Removido com sucesso!`)
                loadCategories();
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                toast.error("Não foi possivel excluir!")
            });
        };
    };

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return(
      <div className="container-fluid">
         <div className="row">
            <div className="col-md-2">
               <AdminNav />
            </div>
            <div className="col"> 
                {loading ? <h4 className="text-danger">Carregando...</h4> :  <h4>Criar Categoria</h4>}
                <CategoryForm handleSubmit={handleSubmit} 
                    name={name} 
                    setName={setName}
                />
                <br/>
                <LocalSearch setKeyword={setKeyword} keyword={keyword} />
                {categories.filter(searched(keyword)).map((c) => (
                    <div className="alert alert-primary" key={c.id}>
                        {c.name} 
                        
                        <span onClick={() => handleRemove(c.slug)} style={{ float: 'right' }} className="btn btn-sm float-right" ><DeleteOutlined/></span>
                        <Link to={`/admin/category/${c.slug}`}><span className="btn btn-sm" style={{ float: 'right' }}><EditOutlined/></span></Link> 

                        
                    </div>
                ))}
            </div>
            
         </div>
      </div> 
    )
};

export default CategoryCreate;