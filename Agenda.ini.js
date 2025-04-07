const express = require("express");
const session = require('express-session')
const handlebars = require("express-handlebars");
const app = express();
const sequelize = require("sequelize");
const moment = require('moment');
const bodyParser = require("body-parser");
const path = require('path')
const Handlebars = require('handlebars')
const Faturas = require('./models/fatura')
const Empréstimo = require('./models/empréstimo')
const flash = require('connect-flash');
const faturas = require("./models/fatura");

//sessão

app.use(session({

    secret: "agenda_pagamentos",
    resave: true,
    saveUninitialized: true
}))

//fim sessão

//middleware

app.use(flash())

app.use((req, res, next) =>{

res.locals.success_msg = req.flash("success_msg")
res.locals.error_msg = req.flash("error_msg")
next()

})

//fim middleware

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//ARRAY DO BANCO DE DADOS

app.get('/lista_faturas', function(req, res){
    Faturas.findAll({order: [['id', 'DESC']]}).then(function(faturas){
        res.render('lista_faturas', {faturas: faturas});
      
    })
    
})

app.get('/editar_faturas', function(req,res){
    Faturas.findAll({order: [['id', 'DESC']]}).then(function(id){
        res.render('editar_faturas', {id: id});
      
    })
    
})
//fim do array

//rotas

app.get("/inicio",function(req,res){

res.render("inicio");
})

app.get("/efetuar_emprestimos", function(req,res){
res.render("efetuar_emprestimos");
})

app.get("/cad-saldo", function(req, res){
res.render("cad-saldo");

})

//fim rotas

//funcionalidade criar formulário

app.post('/add-fatura', function(req,res){

var erros = []

if(!req.body.Nome_pend || typeof req.body.Nome_pend == undefined || req.body.Nome_pend == null){
erros.push({texto: "Obrigatório preeencher o campo Nome da pendência!"})
}

if(!req.body.Valor_compra || typeof req.body.Valor_compra == undefined || req.body.Valor_compra == null){
erros.push({texto: "Obrigatório preeencher o campo Valor total da compra!"})
}

if(!req.body.Valor_pago || typeof req.body.Valor_pago == undefined || req.body.Valor_pago == null){
erros.push({texto: "Obrigatório preeencher o campo Valor total pago!"})
}

if(!req.body.Situacao || typeof req.body.Situacao == undefined || req.body.Situacao == null){
erros.push({texto: "Obrigatório preeencher o campo Situação de pagamento!"})
}


if(!req.body.Vencimento || typeof req.body.Vencimento == undefined || req.body.Vencimento == null){
erros.push({texto: "Obrigatório preeencher o campo Vencimento do pagamento!"})
}

if(!req.body.Hora || typeof req.body.Hora == undefined || req.body.Hora == null){
erros.push({texto: "Obrigatório preeencher o campo Horário!"})
}

if(erros.length > 0){

res.render("inicio", {erros: erros})

}

else

Faturas.create({

Nome_pend: req.body.Nome_pend,
Valor_compra: req.body.Valor_compra,
Valor_pago: req.body.Valor_pago,
Forma_pag: req.body.Forma_pag,
Situacao: req.body.Situacao,
Vencimento: req.body.Vencimento,
Hora: req.body.Hora

}).then(function(){

req.flash("success_msg", "Fatura adicionada com sucesso")
res.redirect('lista_faturas')

}).catch(function(error){

req.flash("error_msg" ,"erro ao adicionar está Fatura")

})

})

//fim funcionalidade criar Faturas

//funcionalidade criar empréstimo

app.post('/cad-emprestimo', function(req,res){

    var erros = []

    if(!req.body.Saldo_atual_R$ || typeof req.body.Saldo_atual_R$ == undefined || req.body.Saldo_atual_R$ == null){
    erros.push({texto: "Obrigatório preeencher o campo valor a ser acrescentado R$ !"})
    }

    if(erros.length > 0){

        res.render("cad-saldo", {erros: erros})
        
        }

        else

    Saldo.create({

        Saldo_atual_R$: req.body.Saldo_atual_R$

    }).then(function(){

        req.flash("success_msg", "Saldo adicionado com sucesso")
        res.redirect('cad-saldo')

    }).catch(function(error){

        req.flash("error_msg", "Ocorreu um erro ao realizar cadastro do saldo")

    })

})

//fim funcionalidade criar empréstimo

//funcionalidade deletar pagamento

app.get('/deletar/fatura/:id', function(req,res){

faturas.destroy({

where: {'id': req.params.id}

}).then(function(){

req.flash("success_msg", "Fatura excluída com sucesso")
res.redirect('/lista_faturas')

})

})
//fim funcionalidade deletar pagamento

app.post('/editar_faturas', function(req,res){

    var erros = []

    if(!req.body.Nome_pend || typeof req.body.Nome_pend == undefined || req.body.Nome_pend == null){
    erros.push({texto: "Obrigatório preeencher o campo Nome da pendência!"})
    }
    
    if(!req.body.Valor_compra || typeof req.body.Valor_compra == undefined || req.body.Valor_compra == null){
    erros.push({texto: "Obrigatório preeencher o campo Valor total da compra!"})
    }
    
    if(!req.body.Valor_pago || typeof req.body.Valor_pago == undefined || req.body.Valor_pago == null){
    erros.push({texto: "Obrigatório preeencher o campo Valor total pago!"})
    }
    
    if(!req.body.Situacao || typeof req.body.Situacao == undefined || req.body.Situacao == null){
    erros.push({texto: "Obrigatório preeencher o campo Situação de pagamento!"})
    }
    
    
    if(!req.body.Vencimento || typeof req.body.Vencimento == undefined || req.body.Vencimento == null){
    erros.push({texto: "Obrigatório preeencher o campo Vencimento do pagamento!"})
    }
    
    if(!req.body.Hora || typeof req.body.Hora == undefined || req.body.Hora == null){
    erros.push({texto: "Obrigatório preeencher o campo Horário!"})
    }
    
    if(erros.length > 0){
    
    res.render("editar_faturas", {erros: erros})
    
    }
    
    else

                Faturas.update({
                    
                    Loja:req.body.Loja, 
                    Produto: req.body.Produto, 
                    Quantidade: req.body.Quantidade, 
                    Valor_compra: req.body.Valor_compra, 
                    Valor_pago: req.body.Valor_pago, 
                    Troco: req.body.Troco, 
                    Forma_pag: req.body.Forma_pag, 
                    Situacao: req.body.Situacao, 
                    Vencimento: req.body.Vencimento, 
                    Hora: req.body.Hora}, {where:{ id: req.body.id}}).then(function(){

                    req.flash("success_msg", "Pagamento atualizado com sucesso")
                    res.redirect('editar_faturas')

                }).catch(function(error){

                    req.flash("error_msg" ,"Ocorreu um erro ao atualizar esse pagamento !")

                })
            
            })

app.listen(3366);
