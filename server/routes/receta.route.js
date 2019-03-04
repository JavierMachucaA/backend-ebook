const express = require('express');

let app = express();

let Receta = require('../models/receta');

/**
 * Crear nueva Receta
 */
app.post('/receta', (req, res) => {
    //regresa una nueva categoría
    //req.usuario._id
    let body = req.body;

    let receta = new Receta({
        nombre: body.nombre,
        listaIngredientes: body.listaIngredientes,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: body.usuario,
        habilitada:true,
        img: null
    });

    //console.log("Receta parseada:",receta);
    
    receta.save((err, recetaDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                mensaje: err
            })
        }
        if (!recetaDB) {
            return res.status(500).json({
                status: false,
                mensaje: err
            })
        }
        console.log("Se crea receta :", body.nombre);

        res.json({
            status: true,
            categoria: recetaDB
        });
    });
});

/**
 * Mostrar todas las recetas
 */
app.get('/recetas', (req, res) => {
    console.log("consultando recetas");
    Receta.find({})
    .sort({descripcion:'asc'})
    //.populate('usuario','nombre email')
    .exec((err,recetas)=>{
        if (err) {
            return res.status(500).json({
                status: false,
                mensaje: err
            })
        }
        res.json(
            {
                status: true,
                recetas: recetas
            }
        )
    })

})

/**
 * Mostrar una receta
 */
app.get('/receta/:id', (req, res) => {
    let id = req.params.id

    Receta.findById(id,(err,recetaDB)=>{
        if (err) {
            return res.status(500).json({
                status: false,
                mensaje: err
            })
        }
        if(!recetaDB){
            return res.status(500).json({
                status: false,
                mensaje: 'Id no es correcto'
            })
        }
        res.json(
            {
                status: true,
                receta: recetaDB
            }
        )
    });
    
});



/**
 * Actualizar nombre de una categoría
 */
app.put('/receta/:id', (req, res) => {
    let id = req.params.id
    let actualizar = req.body
    let options = {new: true};
    Receta.findByIdAndUpdate(id, actualizar, options, (err, recetaDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                mensaje: err
            })
        }
        if (!recetaDB) {
            return res.status(500).json({
                status: false,
                mensaje: err
            })
        }
        console.log("Se modifica Receta ...",id);

        res.json({
            status: true,
            receta: recetaDB
        });

    });

});

/**
 * Borrar receta
 */
app.delete('/receta/:id', (req, res) => {
    //solo el admin puede eliminar 
    let id = req.params.id
    let deshabilitar = {habilitada:false};
    let options = {new: true};
    Receta.findByIdAndUpdate(id,deshabilitar,options,(err,recetaDB)=>{
        if(err){
            return res.status(500).json({
                status: false,
                mensaje: err
            });
        }
        if(!recetaDB){
            return res.status(400).json({
                status:false,
                mensaje:`Receta ${id}, no es encontrada`
            })
        }
        
        res.json({
            status: true,
            recetaDB
        })
    })

});

module.exports = app