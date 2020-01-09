const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    id: {
        type: Number
    },
    firstName : {
        type: String
    },
    skill : {
        type: [String]
    },
    team : {
        type: String
    }
});

module.exports = employeeSchema;