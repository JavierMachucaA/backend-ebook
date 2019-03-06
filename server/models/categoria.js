const mongoose = require('mongoose');

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/ebook', {useNewUrlParser: true});

// =======
// Schemas
// =======

const CategoriaSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  principales: { type: Array, required: true, default: [] },
  descripcion: { type: String, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  habilitada:{type:Boolean}
});

module.exports = mongoose.model('categoria', CategoriaSchema);