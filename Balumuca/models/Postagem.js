/* Model dos posts */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Postagem = new Schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        //Aqui vamos relacionar uma categoria que ja existe. vamos armazenar id de uma categoria que ja existe (ObjectId)
        type: Schema.Types.ObjectId, //relacionar 2 documentos (categoria + postagem)
        ref: 'categoria', //"categoria" - essa referencia vem do categoria.js -> "mongoose.model('categoria', Categoria);"
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('postagens', Postagem); //foi criada a collection com nome "'postagens'" baseada em nosso model "Postagem"