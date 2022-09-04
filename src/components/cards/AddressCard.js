import React, {useEffect, useState} from "react";
import { Card } from "antd";
import { 
    getUser,
} from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AddressCard = () => {
    // const { addressInfo , email } = user;
    // const add = JSON.parse(addressInfo)
    const [cep, setCep] = useState(''); 
    const [rua, setRua] = useState(''); 
    const [numero, setNumero] = useState(''); 
    const [comp, setComp] = useState(''); 
    const [bairro, setBairro] = useState(''); 
    const [cidade, setCidade] = useState(''); 
    const [estado, setEstado] = useState(''); 

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUser(user.token) 
        .then((res) => {
            const add = JSON.parse(res.data.addressInfo)
            // setAddressInfo(res.data.addressInfo);

            const { cep } = add;

            setCep(cep);
            setRua(add.rua);
            setNumero(add.numero);
            setComp(add.complemento);
            setBairro(add.bairro);
            setCidade(add.cidade);
            setEstado(add.estado);
        });
    }, []);

    return ( 
        <Card>
            
            <h5>
                Endereço: 
                </h5>
            {}

                CEP: {cep}<br/>
                Rua: {rua}<br/> 
                Número: {numero}<br/>
                Complemento: {comp}<br/>
                Bairro: {bairro}<br/>
                Cidade: {cidade}<br/>
                Estado: {estado}<br/>
                <br/>

                <Link to="/user/address">
                    <h7 style={{ color: 'green' }}>Alterar Endereço</h7>
                </Link>
                    
        </Card>
    );
};

export default AddressCard;