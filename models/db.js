const Sequelize = require("sequelize")

const sequelize = new Sequelize('agenda_pagamentos', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}