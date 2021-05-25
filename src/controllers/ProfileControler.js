// Importando o Profile.js
const Profile = require('../model/Profile')

// Página Profile.
// Esportando o profile.
module.exports = {
    async index(req, res) {
        const profile = await Profile.get()

        // get = pegar.
        return res.render("profile", { profile: profile })
    },

    async update(req, res) {
        const profile = await Profile.get()

        // req.body para pegar os dados.
        const data = req.body

        // definir quantas semanas tem um ano: 52
        const weeksPerDay = 52

        // remover as semanas de ferias do ano, para pegar quantas semanas tem em 1 mês. 
        const weeksPerMonth = (weeksPerDay - data["vacation-per-year"]) / 12

        // quantas horas por semana estou trabalhando.
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        
        // total de horas trabalhadas no mês.
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        // setando o valor da minha hora.
        // o valor da minha hora é igual a quanto quero ganhar por mês dividido pelo numeros de meses.
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour 
        }) 

        return res.redirect("./profile")
    }
};