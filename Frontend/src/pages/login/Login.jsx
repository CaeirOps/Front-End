// import banner from "./pages/login/img/banner_login2.svg";
import '../../assets/css/pages/style.css'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import UserPool from '../../UserPool';
// import { parseJwt, usuarioAutenticado } from '../../services/auth';
import banner from '../../assets/img/banner_login2.svg'
import img_login from '../../assets/img/logo_black.svg'
import img_login2 from '../../assets/img/undraw_cloud_files_wmo8.svg'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faCoffee} from '@fortawesome/free-solid-svg-icons'


function Login() {

  const [Email, setEmail] = useState('')
  const [Senha, setSenha] = useState('')
  const [username, setUsername] = useState('')
  const [Animaition, setAnimaition] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm();


  const Cadastrar = (event) => {
    event.preventDefault();

    axios.post("http://54.165.113.191:8080/api/create_user/", {
      username: username
      // username: username,
      // project_name: project_name
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
      }
    })
      .then(resposta => {
        if (resposta.status === 201) {
          console.log("User cadastrado");
          setUsername("");
          // setUsername([]);
          // setNomeprojeto([]);
        }
      }).catch(erro => console.log(erro))

    UserPool.signUp(Email, Senha, [{
      Name: 'custom:username',
      Value: username
    }], null, (err, data) => {
      if (err) {
        console.error(err)
      } else {

        console.log(data)
        setEmail('')
        setSenha('')
        setUsername('')


      }
    })
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: Email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: Email,
      Password: Senha,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        navigate("/CriarProjeto")
        console.log("onSuccess: ", data);
      },
      onFailure: (err) => {
        console.log("onFailure: ", err);
      },



    });
  }
  // AtualizaStateCampo = (campo) =>{
  //       this.setState({[campo.target.name]: campo.target.value })
  //   }



  const addClass = () => {
    setAnimaition(true)
    // container.classList.add("sign-up-mode");
  };
  const removeClass = () => {
    setAnimaition(false)
    // container.classList.remove("sign-up-mode");
  };


  return (
    <>
      <div className={Animaition ? 'container sign-up-mode' : 'container '}   >
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form" onSubmit={onSubmit}>
              <h2 className="title">Login</h2>
              <div className="input-field ">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Email" value={Email} onChange={(evt) => setEmail(evt.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Senha" value={Senha} onChange={(evt) => setSenha(evt.target.value)} />
              </div>
              <input type="submit" value="Login" className="btn solid" />
            </form>
            <form action="#" className="sign-up-form" onSubmit={Cadastrar} >
              <h2 className="title">Cadastrar-se</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text" placeholder="Username" value={username} onChange={(evt) => setUsername(evt.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text" placeholder="Email" value={Email} onChange={(evt) => setEmail(evt.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password" placeholder="Senha" value={Senha} onChange={(evt) => setSenha(evt.target.value)}/>
              </div>
              <input type="submit" className="btn" value="Sign up" />
              {/* <p className="social-text">
                Ou inscreva-se em plataformas sociais
              </p> */}
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Novo aqui ?</h3>
              <p>
              Cadastre seu usuário para começar a realizar seus projetos!
              </p>
              <button onClick={addClass} className='btn transparent' id="sign-up-btn">
                  Cadastrar-se
              </button>
              <img src={banner} className="image" alt="" />
            </div>
            <img src="" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <img src={img_login} alt="" />
            <div className="content">
              <h3>Bora logar ?</h3>
              <p>
                Faça o login para entrar na plataforma!
              </p>
              <button onClick={removeClass} className="btn transparent" id="sign-in-btn">
                Entrar
              </button>
            </div>
            <img
              src={img_login2}
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}


export default Login;
