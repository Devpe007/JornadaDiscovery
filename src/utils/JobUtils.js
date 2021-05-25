module.exports = {
    remainingDays(job) {
        // Ajustes no job.
        // Calculo de tempo restante.
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    
        // Criando a data da criação do projeto.
        const createdDate = new Date(job.created_At)
    
        const dueDay = createdDate.getDate() + Number(remainingDays)
    
        // Criando a data de vencimento do projeto.
        const dueDateInMs = createdDate.setDate(dueDay)
    
        const timeDiffInMs = dueDateInMs - Date.now()
    
        // Transformando os milisegundos em dias.
        // 1000 = milisegundos.
        // 1º - 60 = segundos.
        // 2º - 60 = minutos.
        // 24 = horas.
        const dayInMs = 1000 * 60 * 60 * 24
    
        // Diferença de dias.
        const dayDiff = (timeDiffInMs / dayInMs).toFixed()
    
        // Retornando o restante de dias para o fim do projeto.
        return dayDiff;
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}