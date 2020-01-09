const mongoose = require('mongoose');
var employeeSchema = require('./employee.model');

employeeSchema.statics = {
    create: function (data, cb){
        var employee = new this(data);
        employee.save(cb);
    },
    get: function(query, cb){
        this.find(query, cb);
    },
    getById: function(query, cb){
        this.findOne(query,cb);
    },
    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },
    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var employeeModel = mongoose.model( 'Employee', employeeSchema);
module.exports = employeeModel;