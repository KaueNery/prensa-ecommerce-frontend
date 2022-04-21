import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { getCategories } from '../../functions/category';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then(c => {
            setCategories(c.data);
            setLoading(false);
        });
    }, []);

    const showCategories = () => categories.map((c) => (
        <div key={c._id} 
        className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
        </div>
    ));

    return (
        <>
        
        <div className="container">
            <h4 className="text-center">Categorias</h4>
            <div className="row">
                {loading ? (<h4 className="text-center">Carregando</h4>) : showCategories()}
            </div>
        </div>
        </>
    )
}

export default CategoryList;