import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    codigoPedido: {
        type: String,
        required: true,
        index: true,
    },
    postoDestino: {
        type: mongoose.Schema.Types.ObjectId,
        // TODO: modificar a referência quando o schema de posto for criado
        ref: 'posto',
        required: true,
    },
    medicamento:{
        type: [String],
    },
    farmaceutico:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'funcionario',
    }
})

const pedido = mongoose.model("Pedido", pedidoSchema);

export default pedido;