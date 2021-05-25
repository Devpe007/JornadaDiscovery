// Fazendo o requerimento para trazer a biblioteca EXPRESS para este script.
const { urlencoded } = require("express")
const express = require("express")
const server = express()
// O require ao se conectar ao exports, traz o routes de routes.js para o server.js
const routes = require('./routes')

// path é um modulo que significa "caminho de arqquivos".
const path = require('path')

// Setando a visualização do motor do ejs / Usando template engine.
server.set('view engine', 'ejs')

// Mudando a localização da pasta views.
// set = configurar.
// O .join = ele está juntando o __dirname = a pasta src. Com a pasta views, assim mommstrano qe a pasta views está dentro da pasta src.
server.set('views', path.join(__dirname, 'views'))

// Habilitar os aquivos staticos, Entregara as rotas corretamente.
server.use(express.static("public"))

// O "use" é usado para setar configurações para meu servidor.
// Usar o "req.body".
server.use(urlencoded({ extended: true }))

// routes / rotas
server.use(routes)

server.listen(3000, () => console.log ('CONNECTED'));