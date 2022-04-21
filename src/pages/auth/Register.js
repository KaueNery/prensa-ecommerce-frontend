import React, { useState, useEffect } from "react";    
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    const { user } = useSelector((state) => ({ ...state }));
    useEffect(() => {
        if(user && user.token){
            navigate("/");
        } 
      }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`E-mail enviado para ${email}. Clique no link para finalizar seu cadastro.`)
        // save user email to the local storage
        window.localStorage.setItem('emailForRegistration', email)
        // clear the state
        setEmail("");
    };
   

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            autoFocus
          />
            <br/>
          <button type="submit" className="btn btn-raised">
            Enviar
          </button>
        </form>
      );
        

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Cadastre-se</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );

};

export default Register;