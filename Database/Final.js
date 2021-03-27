const Sequelize = require('sequelize')
const db = require('./dbIndex')

module.exports = db.define('final', {
    image: {
        type: Sequelize.JSON,
        allowNull: false
    }
})