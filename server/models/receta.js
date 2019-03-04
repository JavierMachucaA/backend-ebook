const mongoose = require('mongoose');

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/ebook', {useNewUrlParser: true});

// =======
// Schemas
// =======

const RecetaSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  listaIngredientes: { type: Array, required: true, default: [] },
  descripcion: { type: String, required: true },
  categoria: {type:String},//{ type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  usuario: {type:String},//{ type: Schema.Types.ObjectId, ref: 'Usuario' },
  habilitada:{type:Boolean},
  img: { type: String,  required: false}
});

module.exports = mongoose.model('receta', RecetaSchema);