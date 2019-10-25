/* //AQui sra guardada tds rotas do admin// */

const express = require('express')
const routes = express.Router()
const mongoose = require('mongoose')
require('../models/categoria') //Carregar o mudulo da pasta q cootem ficheiro (categoria.js) responsavel pela BD MONGO
const Categoria = mongoose.model('categoria')/*vai passar referencia da 'categoria' p/ carcategoria'avel Categoria. 'categoria'
 veio da ficheiro categoria.js na dentro da pasta model*/


//criar rotas
routes.get('/', (req, res)=> {
    res.render('admin/index')
})

routes.get('/posts', (req, res) => {
    res.render('admin/posts')
})

routes.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})

routes.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})


        

/*rota (abaxo) responsavel por cadastrar usuario o BD mongo. Ela va//rota responsavel por cadastrar usuario o BD mongo. Elareceber os dados
do formulario (atraves d body-parser) e vai add no mongo */
routes.post('/categorias/nova', (req, res) => { 

    /* Validacao do formulario */
/* Campo do "nome" */
var erros = []// array vazio
//N pemitir enviar formulario vazio
if(req.body.nome || typeof req.body.nome == undefined || req.body.nome == null)
{
//Se o campo nome for vazio ou tipo do campo nome for igual a indefenido ou se o nome for nulo, ele vai exibir msg de erro
    erros.push({texto: 'Nome invalido!!'}); //Fcao push() serve p/ colocar novo dados num array.
    //"erros" - eh um vetor vazio, com ajuda do push() sera colocados textos q vao contar ou captar os erros na no formulario
}

/* Campo do "slug" */
if(req.body.slug || typeof req.body.slug == undefined || req.body.slug == null)
{
    erros.push({texto: 'Slug invalido!'});
}

/*Brincando com a validacao*/

if(req.body.nome.length < 2)
{
    //Se o nome da categoria digitada for menor q 2 letras vai mostrar a sgte msg:
    erros.push({texto: 'O nome da categoria eh mto pequena.'})
}

if(erros.length > 0)
{
    //Se o array "erros" tiver erro, vamos reinderizar p/ view na pagina addCategorias.hbs
    res.render('admin/addcategorias', {erros: erros}) //sera add o texto "erros" na  pagina addCategorias.hbs q xta dentro da view
}//#Final da Validacao

    const novaCategoria = { //novaCategoria = objecto q recebe e guarda os valores vindo do formulario (nome e slug)
        nome: req.body.nome, //.nome = refere o elemento q xta nos campo do formulario <input ... name='nome' ...>
        slug: req.body.slug  // <input ... name='slug' ...>
    }

    //Ja foi recebiso agora falta 'Salvar' a tal categoria
    new Categoria(novaCategoria).save().then(() => {
        console.log('Categoria salva com sucesso!!')
    }).catch((err) =>{
        console.log('Erro ao salvar a categoria!!')
    })
})//#Final da  rota post

module.exports = routes; //Exportar 'routes' p/ o 'app.js'