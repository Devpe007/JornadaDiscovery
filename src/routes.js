// Esxpress = É uma biblioteca para criar o servidor.
const express = require('express')
const routes = express.Router()
// Importando o controler do profile.
const ProfileController = require('./controllers/ProfileControler')
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

// req, res = Pergunta e Resposta.
// send = eviar.
// Resposta do pedido.

// Essa rota fazer parte do index.ejs
routes.get('/', DashboardController.index);

// Essa rota faz parte do job.ejs
routes.get('/job', JobController.create);

// Post = Método http para a circulação de dados seguramente.
routes.post('/job', JobController.save);

// Essa rota faz parte do job-edit.ejs
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);

// Essa rota tem a funçã de deletar os jobs.
routes.post('/job/delete/:id', JobController.delete);

// Essa rota faz parte do profile.ejs
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;