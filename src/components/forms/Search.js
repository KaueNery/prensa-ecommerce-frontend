import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SearchOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';

const Search = () => {
    const dispatch = useDispatch();
    const {search} = useSelector((state) => ({...state}));
    const {text} = search;
    const { Search } = Input;
    let navigate = useNavigate();

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value },
        });
    };

    const handleSubmit = (e) => {
        navigate(`/shop?${text}`);
    };

    
    return (   
        <Search placeholder="Pesquisar" onChange={handleChange} enterButton onSearch={handleSubmit} />
    )
}

export default Search;