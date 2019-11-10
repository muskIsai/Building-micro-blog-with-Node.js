const express = require('express')
//const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')//buscar grupo d arquivo pra usar aqui. Abaixo vai definir apenas as tais rotas
const path = require('path') //pra manipular as pastas
const  expressHbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')

const app = express()

//CONFiGURACOES
//OBS: app.use - serve p/ criar e configurar os Midlleweres/ Tdo q tem app.use eh nada+ ou nada- um Midllewere

//Sessoes
app.use(session({
    secret: 'cursoNode_balumuca',
    resave: true,
    saveUninitialized: true
}))
app.use(flash()) //O flash tem q xtar sempre abaixo do "session"

//Midllewre
app.use((req, res, next) =>{
    //vamos criar 2 variaveis globais q podem ser acessados em qlqr parte desta pagina (app.js). Eis as variaveis criadas:
    //sucess_msm, error_msg. Sao ceriadas atraves da propriedade "locals"
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next() //Vai permitir entrar ou passar (vai avancar)
})

//BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Definindo a tecnolgia do template usado, q eh o HANDLEBARS
//app.engine(' handlebars', handlebars({defaultLayout: 'main'}))
app.engine('.hbs', expressHbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')


//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/balumuca_db', {
    useMongoClient: true
}).then(()=>{
    console.log('MongoDB conectado!');
}).catch((err)=>{
    console.log('Erro ao conectar a MongoDB' + err);
});


//Publc
app.use(express.static(path.join(__dirname, 'public')))
//app.set('views', path.join(__dirname, 'views'))

//Usando e aprendendo <<MIDLEWARE>> (so ativado assim q acontecer uma requizcao)
/* app.use((req, res, next) => {
    console.log('Eu sou o MidleWare'); //A App va parar aqui, va carregar mas n vai abrir
    next(); //Vai permitir entrar ou passar (vai avancar) */

    //Cada vaez q eh carregada qlqr pagina o MIDLEWARE eh chamado



//Rotas
/* Definir as tais Rotas */
app.use('/admin', admin)

app.listen(8888, () => {
    console.log('Servidor xta de pe na porta 8888');
});