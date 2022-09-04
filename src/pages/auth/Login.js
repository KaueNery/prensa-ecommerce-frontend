import React, { useState , useEffect} from "react";    
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import {
    GoogleOutlined,
    MailOutlined
  } from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate, Link, useParams } from 'react-router-dom';
import {createOrUpdateUser} from '../../functions/auth';

const Login = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        if(res.data.role === 'admin'){
            navigate("/admin/dashboard");
        } else {
            navigate("/user/history");
        }
    };

    const { user } = useSelector((state) => ({ ...state }));
    useEffect(() => {
        if(user && user.token){
            navigate("/");
        }
      }, [user]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(email, password);
        try {
          const result = await auth.signInWithEmailAndPassword(email, password);
          // console.log(result);
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();
    
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
                  roleBasedRedirect(res);
            })
            .catch(err => console.log(err));
            // navigate("/");

        } catch (error) {
          console.log(error);
          toast.error(error.message);
          setLoading(false);
        }
      };
   
    const googleLogin = async () =>{
        auth.signInWithPopup(googleAuthProvider)
        .then(async (result) => {
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
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
                roleBasedRedirect(res);
            })
            .catch(err => console.log(err));
            // navigate("/");
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.message);
        });
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                autoFocus
                />
            </div>
            <br />
            <div className="form-group">
                <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                />
            </div>

            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                className="mb-3"
                block
                shape="round"
                size="large"
                disabled={!email || password.length < 6}
                icon={<MailOutlined />}
            >
                Entrar com email/senha
            </Button>
        </form>
      );
        

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <h4 className="text-danger">Carregando...</h4> : <h4>Login</h4> }
                    {loginForm()}

                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        size="large"
                        icon={<GoogleOutlined />}
                    >
                        Entrar com Google
                    </Button>
                    <Link to="/forgot/password" style={{ marginLeft: 'auto' }} className="text-danger mb-3">Esqueci minha senha</Link>   
                </div>
                
            </div>
        </div>
    );

};

export default Login;