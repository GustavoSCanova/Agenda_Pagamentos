const db = require("./db");

const faturas = db.sequelize.define('faturas',{

Nome_pend:{

type: db.Sequelize.STRING

},

Valor_compra:{

type: db.Sequelize.STRING

},

Valor_pago:{

    type: db.Sequelize.STRING

}, 

Tipo_fatura:{


    type: db.Sequelize.STRING

}, 


Situacao:{

    type: db.Sequelize.STRING

}, 

Vencimento:{

    type: db.Sequelize.STRING
    

}, 

Hora: {

    type: db.Sequelize.STRING


}


})

//cria a tabela faturas no banco

// faturas.sync({force: true})

module.exports = faturas

