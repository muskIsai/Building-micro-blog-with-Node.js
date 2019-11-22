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

//Posts
routes.get('/posts', (req, res) => {
        res.render('admin/posts')
    }) 


//Categorias
//Exibir todas categorias cadastradas. Serão mostrado na página "categorias"
routes.get('/categorias', (req, res) => {
    Categoria.find().sort({date: 'desc'}).then((categorias) => { //sort({date: 'desc'} = permite exibir conteúdo  na ordem descrente d acordo com a data, mostrando posts bem mais recente
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msgs', 'Erro so listar as categorias na página')
        res.redirect('/admin')
})

routes.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
    })
})

            /* Rota de ADD */

/*rota (abaxo) responsavel por cadastrar usuario o BD mongo. Ela va//rota responsavel por cadastrar usuario o BD mongo. Elareceber os dados
do formulario (atraves d body-parser) e vai add no mongo */
routes.post('/categorias/nova', (req, res) => { 

    /* Validacao do formulario */
/* Campo do "nome" */
var erros = []// array vazio
//N pemitir enviar formulario vazio
if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null)
{
//Se o campo nome for vazio ou tipo do campo nome for igual a indefenido ou se o nome for nulo, ele vai exibir msg de erro
    erros.push({texto: 'Nome invalido!!'}); //Fcao push() serve p/ colocar novo dados num array.
    //"erros" - eh um vetor vazio, com ajuda do push() sera colocados textos q vao contar ou captar os erros na no formulario
}

/* Campo do "slug" */
if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null)
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
else{
    const novaCategoria = { //novaCategoria = objecto q recebe e guarda os valores vindo do formulario (nome e slug)
        nome: req.body.nome, //.nome = refere o elemento q xta nos campo do formulario <input ... name='nome' ...>
        slug: req.body.slug  // <input ... name='slug' ...>
    }

    //Ja foi recebido agora falta 'Salvar' a tal categoria
    new Categoria(novaCategoria).save().then(() => {
        //console.log('Categoria salva com sucesso!!')
        req.flash('success_msg', 'Categoria criada com sucesso!!')
        res.redirect('/admin/categorias') //Assim q salvar uma categoria, sera redirecionado p/ a pagina d categorias
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao salvar a categoria. Tente novamente!!')
        //console.log('Erro ao salvar a categoria!!')
        res.redirect('/admin')
    })
}  
})//#Final da  rota post //Rota de ADD



/* Rota de EDIÇÃO */
routes.get('/categorias/edit/:id', (req, res) => { //id: eh o parâmetro da categoria q será editado
    Categoria.findOne({_id:req.params.id}).then((categoria) =>{ //xta efetuar uma procura na colletions
        req.flash('success_msg', 'Categoria editada com sucesso!!')
        res.render('admin/editcategorias', {categoria: categoria})
    }).catch((err) =>{
        req.flash('error_msg', 'Está categoria não existe')
        res.redirect('/admin/categorias')
    })
})//#Final da  rota get //Rota de EDIÇÃO 


routes.post('/categorias/edit', (req, res) => { //Eu próprio devo fzr o meu sistema de validação p/ Edição
    Categoria.findOne({_id: req.body.id}).then((categoria) => {

        categoria.nome = req.body.nome //Diz q o noenda categoria q queremos editar vai receber o novo elemento q xta ser digitado no campo nome
        categoria.slug = req.body.slug //msm coisa q acontece no campo nome

        //salvar Edicao
        categoria.save().then(() =>{
            req.flash('success_msg', 'Categoria editada com sucesso')
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash('error_error', 'Houve erro interno ao salvar a editacao da categoria')
            res.redirect("/admin/categorias")
        })

        
    }).catch((err) => {
        res.flash('error_msg', 'Houve erro aí editar a categoria')
        res.redirect("/admin/categorias")
    })
})//#Edicao


//          DELETAR
routes.post('/categorias/deletar', (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Categoria Deletada com sucesso')
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash('error_msg', 'Houve erro aí Deletar a categoria')
        res.redirect("/admin/categorias")
    })
})

module.exports = routes; //Exportar 'routes' p/ o 'app.js'