const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Categoria = require('../models/categoria');
const app = express();
const log = require('../../utils/logger');

app.get('/categorias',verificarToken, function (req, res) {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    let condiciones = {habilitada:true} //google:true
    let campos = 'nombre principales descripcion usuario habilitada';
    
    Categoria.find(condiciones,campos)
    .skip(desde)
    .limit(limite)
    .exec(
        (err,categorias)=>{
            console.log("desde",desde," limite",limite)
        if(err){
            return res.status(400).json({ 
                status: false,
                mensaje: err
            });
        }
        //console.log("consultando usuarios ")
        Categoria.countDocuments(condiciones,(error,conteo)=>{
            if(error){
                return res.status(400).json({ 
                    status: false,
                    mensaje: error
                });
            }
            //console.log("sin errores ")
            res.json({
                status: true,
                mensaje: categorias,
                total:conteo
            })
        })
    })
})

app.post('/categoria', function (req, res) { //[verificarToken,verificaAdminRol],
    
    let body = req.body
    
    let categoria = new Categoria({
        nombre : body.nombre,
        principales:body.principales,
        descripcion: body.descripcion,
        usuario: body.role,
        habilitada: true,
    })
    
    categoria.save((err,categoriaDB)=>{
        if(err){
            return res.status(400).json({
                status: false,
                mensaje: err
            });
        }
       
        res.json({
            status : true,
            usuario : categoriaDB
        });
    })

});

app.put('/usuarios/:id',[verificarToken,verificaAdminRol], function (req, res) {
    let id = req.params.id
    let body = _.pick( req.body,[
        'nombre',
        'email',
        'img',
        'role',
        'estado'
    ])
    let options = {new:true,runValidators:true}

    Usuario.findByIdAndUpdate(id, body, options ,(err, usuarioDB)=>{
        if(err){
            return res.status(400).json({
                status: false,
                mensaje: err
            })
        }

        res.json({
            status: true,
            mensaje: usuarioDB
         })
        
    })

})

app.delete('/usuario/:id',verificarToken, function (req, res) {
    
    let id = req.params.id

    /*Usuario.findByIdAndRemove(id,(err,usuario)=>{
        if(err){
            return res.status(400).json({
                status: false,
                mensaje: err
            })
        }
        if(!usuario){
            return res.status(400).json({
                status: false,
                mensaje: "Usuario no es encontrado"
            })
        }
        res.json({
            status: false,
            usuario: usuario
        })
    })*/
    let cambiaEstado = { estado : false }
    let  options = {new:true}
    Usuario.findByIdAndUpdate(id,cambiaEstado,options,(err,usuario)=>{
        if(err){
            return res.status(400).json({
                status: false,
                mensaje: err
            })
        }
        if(!usuario){
            return res.status(400).json({
                status: false,
                mensaje: "Usuario no es encontrado"
            })
        }
        log(usuario)
        res.json({
            status: true,
            usuario: usuario
        });
        
    })

})

module.exports = app 