const Sequelize = require('sequelize')
const db = require('./dbIndex')

module.exports = db.define('scribble', {
    image: {
        type: Sequelize.JSON,
        allowNull: false
    }
})