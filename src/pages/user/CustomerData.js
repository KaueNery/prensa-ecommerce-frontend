import React, {useEffect, useState} from "react";
import UserNav from "../../components/nav/UserNav";
import AddressFinder from '../../components/forms/AddressFinder';
import { useSelector, useDispatch } from "react-redux";
import { 
    getUser,
} from "../../functions/user";
import AddressCard from "../../components/cards/AddressCard";

const CustomerData = () => {
    const dispatch = useDispatch(); 
    const { user } = useSelector((state) => ({ ...state }));
    const [cep, setCep] = useState(''); 
    const [rua, setRua] = useState(''); 
    const [numero, setNumero] = useState(''); 
    const [comp, setComp] = useState(''); 
    const [bairro, setBairro] = useState(''); 
    const [cidade, setCidade] = useState(''); 
    const [estado, setEstado] = useState(''); 
    const [addressInfo, setAddressInfo] = useState(''); 

    useEffect(() => {
        getUser(user.token) 
        .then((res) => {
            const add = JSON.parse(res.data.addressInfo)
            setAddressInfo(res.data.addressInfo);
            setCep(cep);
            setRua(add.rua);
            setNumero(add.numero);
            setComp(add.complemento);
            setBairro(add.bairro);
            setCidade(add.cidade);
            setEstado(add.estado);
        });
    }, []);

    return(
     <div className="container-fluid">
        
        <div className="row">

        <div className="col-md-2">
            <UserNav />
        </div>
        <div className="col">
                <br/>
                <h4>
                    Meus Dados
                </h4>
                <AddressCard />
                <br/>
            
            </div>
        </div>
    </div>
  );
};

export default CustomerData;