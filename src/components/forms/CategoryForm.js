import React from "react";

const CategoryForm = ({handleSubmit, name, setName}) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Nome</label>
            <input type="text" 
                className="form-control" 
                value={name} 
                onChange={e => setName(e.target.value)}
                autoFocus
                required
            />
            <br/>
            <button className="btn btn-outline-primary">Salvar</button>
        </div>
    </form>
);

export default CategoryForm;