import React, {useState, useEffect}from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createSub, 
    getSubs, 
    removeSub
}from '../../../functions/sub' ; 
import {
    getCategories, 
}from '../../../functions/category' ; 
import {Link} from "react-router-dom";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
    const {user} = useSelector(state => ({...state}));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState ([]);
    const [category, setCategory] = useState("");
    const [keyword, setKeyword] = useState("");
    const [subs, setSubs] = useState ([]);

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () =>
     getCategories().then(c => setCategories(c.data));

     const loadSubs = () =>
     getSubs().then(s => setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createSub({name , parent: category},user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" criado com sucesso! `);
            loadSubs();
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
            removeSub(slug, user.token)
            .then(res => {
                setLoading(false);
                toast.success(`${res.data.name} Removido com sucesso!`);
                loadSubs();
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
                {loading ? <h4 className="text-danger">Carregando...</h4> :  <h4>Criar Sub Categoria</h4>}
               
                <div className="form-group">
                    <label>Categoria Mãe</label>
                    <select 
                        name="category" 
                        className="form-control"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value>Selecione</option>
                        {categories.length > 0 && categories.map((c) => (
                            <option key={c._id} value={c._id} >{c.name}</option>
                        ))};
                    </select>
                </div>

                {/* {JSON.stringify(category)} */}
                <CategoryForm handleSubmit={handleSubmit} 
                    name={name} 
                    setName={setName}
                />
                <br/>
                <LocalSearch setKeyword={setKeyword} keyword={keyword} /> 
                {subs.filter(searched(keyword)).map((c) => (
                    <div className="alert alert-primary" key={c.id}>
                        {c.name} 
                    
                        <span onClick={() => handleRemove(c.slug)} style={{ float: 'right' }} className="btn btn-sm float-right" ><DeleteOutlined/></span>
                        <Link to={`/admin/sub/${c.slug}`}><span className="btn btn-sm" style={{ float: 'right' }}><EditOutlined/></span></Link> 

                        
                    </div>
                ))}
            </div>
            
         </div>
      </div> 
    )
};

export default SubCreate;