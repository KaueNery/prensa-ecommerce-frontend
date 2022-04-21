import React from "react";
import { Select } from 'antd';
const { Option } = Select;

const ProductUpdateForm =  ({handleSubmit,
      handleChange,
      setValues,
      values, 
      handleCategoryChange,
      subOptions, 
      categories,
      arrayOfSubIds,
      setArrayOfSubIds,
      selectedCategory
    }) => {
      
    //destructure
    const {title, description, price, category, subs, shipping,quantity, 
            images, colors, brands, color, brand} = values;
            
    return (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nome</label>
                <input 
                    type="text" 
                    name="title" 
                    className="form-control" 
                    value={title} 
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Descrição</label>
                <input 
                    type="text" 
                    name="description" 
                    className="form-control" 
                    value={description} 
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Preço</label>
                <input 
                    type="number" 
                    name="price" 
                    className="form-control" 
                    value={price} 
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Entrega</label>
                <select 
                    value={shipping}
                    name="shipping" 
                    className="form-control" 
                    onChange={handleChange}
                >
                    <option value="No">Não</option>
                    <option value="Yes">Sim</option>
                </select>
            </div>
            <div className="form-group">
                <label>Quantidade</label>
                <input 
                    type="number" 
                    name="quantity" 
                    className="form-control" 
                    value={quantity} 
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Cor</label>
                <select 
                    value={color}
                    name="color" 
                    className="form-control" 
                    onChange={handleChange}
                >
                    {colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label>Marca</label>
                <select 
                    value={brand}
                    name="brand" 
                    className="form-control" 
                    onChange={handleChange}
                >
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label>Categoria </label>
                
                <select
                name="category"
                className="form-control"
                onChange={handleCategoryChange}
                value={selectedCategory.length > 0 ? selectedCategory : category._id}
                >
                
                {categories.length > 0 &&
                    categories.map((c) => (
                    <option key={c._id} value={c._id}>
                        {c.name}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Sub Categorias</label>
                <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    value={arrayOfSubIds}
                    onChange={(value) => setArrayOfSubIds(value)}
                >
                    {subOptions && subOptions.length &&
                    subOptions.map((s) => (<Option value={s._id}>{s.name}</Option>))}
                    
                </Select>
            </div>
            
            <br/>
            <button className="btn btn-outline-info">Salvar</button>
        </form>
    );
};

export default ProductUpdateForm;