const { response } = require("express");
const { deleteOne } = require("../models/usuario");
const Usuario = require('../models/usuario');

const crearUsuario = async ( req, res= response ) =>  {
    const { username } = req.body;
    try {
        const existeUsername = await Usuario.findOne({ username });
        if ( existeUsername ) {
            return res.status(400).json({
                ok: false,
                message: 'Ese nombre ya esta ocupado'
            });
        }

            // ! usuarios, puzzles, pieces, 


        const usuario = new Usuario( req.body);

        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable Con el Admin'
        });
    }
    
    
    

}


const validarToken = async ( req, res= response ) =>  {
    const uid  = req.header('x-uid');
    
    if (!uid) {
        return res.status(401).json({
            existe: false,
            msg: 'No tiene uid header'
        });
    }
    
    try {
        const usuario= await Usuario.findById(uid);

        if ( usuario ) {
            return res.status(200).json({
                ok: true,
                usuario
            });
        }
        return res.status(404).json({
            existe: false,
            msg: 'No encontrado'
        });
        
    } catch (error) {
        return res.status(500).json({
            existe: false,
            msg: 'Error buscando'
        });
    }
    
}



const comprobarUser = ( uid ) => {
    
    
    if (!uid) {
        return [false, 1]
    }
    
    try {
        const resultado = test(uid);
        console.log(resultado);
        return [true, 4]
        
    } catch (error) {
        return [false, null]
    }
}

const test = async ( uid ) => {
    
    try {
        const x=await Usuario.findById(uid);
        next();
        return x
        
    } catch (error) {
        return null;
    }
    
    
}



const borrarUsuario = async ( req, res= response ) =>  {
    const { uid } = req.body;
    try {
        await Usuario.findByIdAndRemove(uid);
        

        res.status(200).json({
            deleted: true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            deleted: false
        });
    }

}

module.exports = { 
    crearUsuario,
    validarToken,
    borrarUsuario,
    comprobarUser,
}