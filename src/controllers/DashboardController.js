const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()
    
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        };

        // Total de horas por dia de cada job em progresso.
        let jobTotalHours = 0

        // Adicionando dados novos ao array.
        const updatedJobs = jobs.map((job) =>   {
    
            const remaining = JobUtils.remainingDays(job)
            // Se os dias restantes forem menor ou igual a zero o resultado é "done", se não o resultado é "progress".
            // Uma condicional ternaria de apenas uma linha.
            const status = remaining <= 0 ? 'done' : 'progress'
    
            // Somando a quantidade de status.
            statusCount[status] += 1

            // Total de horas por dia de cada job em progresso.
            jobTotalHours = status === 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

            // ...job = Espalhamento = Ele está adicionando todos os objetos do array "job".
            // E agora é só adicionar os objetos remaining e status ao array job. 
            return {
                ...job,
                remaining,
                status,                                     // get = Profile.js
                budget: JobUtils.calculateBudget(job,  profile["value-hour"] )
            };
        });

        // Quantidade de horas que quero trabalhar por dia (Profile).
        // MENOS.
        // A quantidade de horas/dias de cada job em progress.
        const freeHours = profile["hours-per-day"] - jobTotalHours

        return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours})
    }
};