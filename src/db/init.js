// Importando as configurações do sqlite.
const Database = require('./config')

const initDb = {
    // async = vai dizer ao JavaScript que existem awaits dentro do código o fazendo esperar a executar 1 a 1.
    async init() {

        // await = vai fazer o código esperar executar 1 a 1.
        const db = await Database()

        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day,
            vacation_per_year INT,
            value_hour INT
        )`);

        await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        await db.run(`INSERT INTO profile(
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour   
        ) VALUES (
            "Pedro Henrique",
            "https://github.com/Devpe007.png",
            3000,
            5,
            8,
            4,
            70
        )`)

        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            7,
            70,
            1617514376018
        )`)

        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Project",
            4,
            47,
            1617514376018
        )`)

        await   db.close()
    }
}

// executando o init.
initDb.init()