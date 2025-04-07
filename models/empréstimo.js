const db = require('./db');

const empréstimo = db.sequelize.define('empréstimo',{

Pessoa:{

type: db.Sequelize.STRING

},

Item:{

type: db.Sequelize.STRING

},

Valor_empréstimo:{

type: db.Sequelize.DOUBLE

},

Valor_pago_Empréstimo:{

type: db.Sequelize.DOUBLE

},

Troco:{

type: db.Sequelize.DOUBLE

},

Situação:{

type: db.Sequelize.STRING

},

Vencimento:{

type: db.Sequelize.STRING

},

Hora:{

type: db.Sequelize.STRING

}

})

// empréstimo.sync({force: true})

module.exports = empréstimo