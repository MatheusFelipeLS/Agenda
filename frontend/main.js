// import './assets/css/style.css';

import 'core-js/stable';
import 'regenerator-runtime/runtime'

import Login from './modules/Login'
import Contato from './modules/Contato'

const cadastro = new Login('.form-cadastro');
const login = new Login('.form-login');
const novoContato = new Contato('.form-cria-contato');
const editaContato = new Contato('.form-edita-contato');

cadastro.init();
login.init();
novoContato.init();
editaContato.init();