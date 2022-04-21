import React from "react";

const LocalSearch = ({setKeyword, keyword}) => {

    const handleSearchChannge = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };

    return (

        <input type="search" 
            placeholder="Filtrar" 
            value={keyword}
            onChange={handleSearchChannge} 
            className="form-control mb-4"
        />

    );

    

}

export default LocalSearch;