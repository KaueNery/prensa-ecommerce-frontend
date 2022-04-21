import React , {useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import { Button } from "antd";

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await auth.currentUser.updatePassword(password)
        .then(() => {
            setLoading(false);
            toast.success("Senha atualizada.");
        })
        .catch((err) => {
            setLoading(false);
            toast.error("Não foi possível atualizar sua senha.")
            console.log(err.message);
        })

    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nova senha</label>
                <input type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="form-control"
                    placeholder="Digite a nova senha"
                    disabled={loading}
                    value={password}
                />  
                <br />
                <button type="submit" className="btn btn-raised" 
                disabled={!password || loading}>
                    Enviar
                </button>
            </div>    
        </form>
    )
    return (
        
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-2">
                <UserNav />
            </div>
            <div className="col">
                {loading ? <h4 className="danger"> Carregando... </h4> :<h4>Alterar Senha</h4> }
                {passwordUpdateForm()}
            </div>
            </div>
        </div>
    );
};

export default Password;