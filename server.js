require('dotenv').config(); //carrega variáveis de ambiente (variáveis que você não devem ser expostas)
const express = require('express'); //carrega o express
const app = express(); //inicia a aplicação
const connectDB = require('./db'); 
connectDB(); //conecta ao banco de dados
const session = require('express-session'); // carrega os métodos para se trabalhar com sessões (navegador salvar cookies)
const MongoStore = require('connect-mongo'); //pacote que gerencia onde são armazenados os cookies (nesse caso, no bd)
const flash = require('connect-flash'); // pacote para trabalhar com mensagens que devem ser salvas em sessão, mas não no bd
const routes = require('./routes'); //rotas da nossa aplicação
const path = require('path'); //pacote para trabalhar com caminhos
// const helmet = require('helmet'); //também serve para proteção
const csrf = require('csurf'); // tokens para proteção de formulários   
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middlewares'); 
// ^ importa as "rotas de meio de caminho" criadas por nós

// app.use(helmet); //dá problema no localhost
app.use(express.urlencoded({ extended: true })); //necessário para recuperar o conteúdo do método post
app.use(express.json()); //faz parse de json para dentro da aplicação
app.use(express.static(path.resolve(__dirname, 'public'))); 

//configurações de sessão
const sessionOptions = session({
    secret: 'keyboard cat', //provavelmente a secretkey (pode ser qlqr coisa)
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }), 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7, //(7 dias em ms)
        httpOnly: true
    },  
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); //arquivos que renderizamos na tela
app.set('view engine', 'ejs'); //engine usada para renderizar os views

//ativa alguns middlewares e rotas
app.use(csrf()); //ativa o csrf
app.use(middlewareGlobal); 
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

//manda que a aplicação "escute" o que o servidor comunica
app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});