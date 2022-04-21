import React, {useState, useEffect} from "react";
import {getProductsByCount, fetchProductsByFilter} from '../functions/product';
import {getCategories} from '../functions/category';
import {getSubs} from '../functions/sub';
import { useSelector, useDispatch } from "react-redux";
import ProductCard from '../components/cards/ProductCard';
import LoadingCard from "../components/cards/LoadingCard";
import {Menu, Slider, Checkbox, Button} from 'antd';
import { SubMenu } from "rc-menu";
import { DownSquareOutlined, DollarOutlined } from "@ant-design/icons";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0,0]);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState('');

    const dispatch = useDispatch();
    let {search} = useSelector((state) => ({...state}));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        //fetch categories
        getCategories().then(res => setCategories(res.data));
        //fetch subs
        getSubs().then(res => setSubs(res.data));
    }, []);

    //load default products
    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    //load products based on search text
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProductsByFilter({query: text}).then((res) => {
                setProducts(res.data);
                setLoading(false);
            });
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
          });
        
        setPrice(value);
        setTimeout(() => {
            fetchProductsByFilter({ price })
            .then((res) => {
                setProducts(res.data);
            });
        }, 300);
    }

    //load products based on category
    const showCategories = () => categories.map((c) => <div key={c._id}>
        <Checkbox onChange={handleCheck} className="pb-2 pl-4 pr-4" value={c._id} name="category">
            {c.name}
        </Checkbox>
        <br/>
    </div>)

    //handle check for categories
    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked);
        if(foundInTheState === -1) {
            inTheState.push(justChecked);
        }else{
            inTheState.splice(foundInTheState, 1);
        }

        setCategoryIds(inTheState);
        if(inTheState.length){
            fetchProductsByFilter({category: inTheState})
            .then((res) => {
            setProducts(res.data);
            });
        }else{
            loadAllProducts();
        }
    };

    const showSubs = () => 
        subs.map((s) => 
            <Button 
                key={s._id}
                onClick={() => handleSub(s)} 
                className="p-1 m-1 "
                style={{ cursor: "pointer"}}
            >
                {s.name}
            </Button>)

    const handleSub = (sub) => {
        let inTheState = [...categoryIds];
        setSub(sub);
        setPrice([0, 0]);
        fetchProductsByFilter({sub: sub})
        .then((res) => {
            setProducts(res.data);
        });
    };

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <br/>
                    <h6>Filtros</h6>
                    <Menu defaultOpenKeys={['1', '2', '3']} mode="inline">
                        <SubMenu key='1' title={
                            <span><DollarOutlined/> Preço</span>
                        }>
                            <div style={{marginTop: "4px", marginLeft: "4px"}}>
                                <Slider 
                                    className="ml-4 mr-4" 
                                    tipFormatter={(v) => `R$${v}`}
                                    range
                                    onChange={handleSlider} 
                                    max="500"   
                                />
                            </div>
                        </SubMenu>
                        <SubMenu key='2' title={
                            <span><DownSquareOutlined/> Categorias</span>                               
                            }>
                            <div style={{marginTop: "4px", marginLeft: "4px"}}>
                               {showCategories()}
                            </div>
                        </SubMenu>
                        <SubMenu key='3' title={
                            <span><DownSquareOutlined/> Sub Categorias</span>                               
                            }>
                            <div style={{marginTop: "4px", marginLeft: "4px"}}>
                               {showSubs()}
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9">
                    <br/>
                    {loading ? (<h4>Carregando...
                        <LoadingCard count={3}/>

                    </h4>) : (
                      <h4>Produtos</h4>  
                    )}

                    <div className="row">
                        {products.map((p) => (
                        <div key={p._id} className="col-md-4 p-2">
                            <ProductCard product={p} />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Shop;