import React, { useState, useEffect } from "react";    
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {createOrUpdateUser} from '../../functions/auth';

const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const { user } = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));   
    }, [])

    const handleSubmit = async (e) => {
        
        e.preventDefault(); 
        //validation 
        if(!email || !password) {
            toast.error('Email e senha sāo obrigatórios!');
            return;
        }

        if(password.length < 6) {
            toast.error('A senha deve ter no mínimo 6 caracteres!');
            return;
        }

        try{
            const result = await auth.signInWithEmailLink(email, window.location.href);
            // console.log(result);
            if(result.user.emailVerified){
                //remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');
                //get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                
                //redux store
                createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                          name: res.data.name,
                          email: res.data.email,
                          token: idTokenResult.token,
                          role: res.data.role,
                          _id: res.data._id,
                        },
                      });
                })
                .catch(err => console.log(err));
                navigate("/");

               //redirect
               navigate("/");
            }
        }catch (error) {
            console.log(error); 
            toast.error(error.message);
        }
    };
   
    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            value={email}
            disabled
          />
          <br />
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            placeholder="Senha"
          />
            <br/>
          <button type="submit" className="btn btn-raised">
            Confirmar
          </button>
        </form>
      );
        

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Finalizar Cadastro</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );

};

export default RegisterComplete;