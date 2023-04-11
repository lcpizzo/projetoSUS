import mongoose from "mongoose";

const estoqueModel = new mongoose.Schema({
    medicamento: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'medicamento'
    },
    quantidadeEstoque: {
        type: Int32Array,
    },
    precoAtual: {
        type: Float64Array
    }
})

const postoSchema = new mongoose.Schema({
    codigoPosto: {
        type: String,
        required: true,
        index: true,
    },
    nome: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    CEP: {
        type: String,
        required: true,
        match: '/^([\d]{2})\.*([\d]{3})-*([\d]{3})/',
    },
    estoque: {
        type: [estoqueModel],
        default: () => ({})
    },
    funcionarios: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'funcionario'
    }

})

const posto = mongoose.model("Posto", postoSchema);

export default posto;
