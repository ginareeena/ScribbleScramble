const Sequelize = require('sequelize')
const db = require('./dbIndex')

module.exports = db.define('final', {
    imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isUrl: true
        }
    }
})