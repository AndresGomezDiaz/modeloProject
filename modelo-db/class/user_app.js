'use strict'
const client = require('../lib/db')
module.exports = class userappClass {
    async createUser(data) {
        let sql = `INSERT INTO user_app(_name, last_name, email, pass, profile)
                        VALUES($1, $2, $3, $4, $5) RETURNING id`
        return client.query(sql, [data.name, data.last_name, data.email, data.pass, data.profile])
    }
    async searchUser(data) {
        let searchList = []
        if(data._name) searchList.push(` _name = '${data._name}'`)
        if(data.last_name) searchList.push(` last_name = '${data.last_name}'`)
        if(data.email) searchList.push(` email = '${data.email}'`)
        if(data.profile) searchList.push(` profile = '${data.profile}'`)

        let conditions = searchList.join(' AND ')
        let sql = `SELECT * FROM user_app ${conditions !== '' ? ` WHERE ${conditions}` : ''}`
        return client.query(sql)
    }
}


