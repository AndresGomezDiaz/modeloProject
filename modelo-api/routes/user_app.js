'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const Joi = require('@hapi/joi')
const {UserApp} = require('modelo-db') 

const routes = asyncify(express.Router())

const bodyCreate = Joi.object().keys({
    user:Joi.object().keys({
        name: Joi.string().min(5).max(50).required().label('El nombre no puede ser menor a 5 ni mayor a 50 caracteres.'),
        last_name: Joi.string().min(5).max(50).required().label('El nombre no puede ser menor a 5 ni mayor a 50 caracteres.'),
        email: Joi.string().email().required().label('Debe ingresar un email valido.'),
        pass: Joi.string().required().min(5).label('La contraseña tiene que tener mas de 5 caracteres'),
        profile: Joi.string().required().label('Es necesario envia run perfil de usuario')
    }).required()
})

routes.post('/', async(req, res, next) => {
    console.log('Request a user/create')
    try{
        let {body} = req
        let validate = await bodyCreate.validate(body)
        if(validate.error)return res.status(400).send({error: true, message: validate.error.details})
        
        let altaUsuario = await UserApp.createUser(body.user)
        return res.status(200).send({error: false, message: 'Registro insertado correctamente.'})
    }catch(err){
        return next(err)
    }
})

module.exports = routes