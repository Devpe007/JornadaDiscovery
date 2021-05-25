const Job = require('../model/Job')
const jobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res) {
        return res.render("job")
    },

    async save(req, res) {

        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_At: Date.now() // Atribuindo data de agora.
        })

        return res.redirect('/')
    },

    async show(req, res) {
        // req.params.id = estamos pegando o id do projeto.
        const jobId = req.params.id

        const jobs = await Job.get()
        const profile = await Profile.get()

        // Procurando este id dentro da lista de jobs.
        const job = jobs.find(job => Number(job.id) === Number(jobId));

        // Se este id não representar nenhum dos jobs salvos mostrará este alerta.
        if (!job) {
            return res.send("Job not found");
        }

        job.budget = jobUtils.calculateBudget(job,  profile["value-hour"] )

        return res.render("job-edit",  { job });
    },

    async update(req, res) {
        // req.params.id = estamos pegando o id do prjeto.
        const jobId = req.params.id

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    // Função de deletar os jobs.
    async delete(req, res) {
        // req.params.id = estamos pegando o id do prjeto.
        const jobId = req.params.id

        await Job.delete(jobId)       

        return res.redirect('/')
    }
};