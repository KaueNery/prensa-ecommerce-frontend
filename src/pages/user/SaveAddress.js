import React from "react";
import UserNav from "../../components/nav/UserNav";
import AddressFinder from '../../components/forms/AddressFinder';

const SaveAddress = () => (
    <div className="container-fluid">
        
    <div className="row">

    <div className="col-md-2">
        <UserNav />
    </div>
    <div className="col">
            <br/>
            <h4>
                Endereço
            </h4>
            
            <br/>
            
        
            <AddressFinder />
        
        </div>
    </div>
</div>
);

export default SaveAddress;