var Employee = require('./employee.dao');

exports.createEmployee = function (req, res, next) {
    console.log(req)
    var employee = {
        id: req.body.id,
        firstName: req.body.firstName,
        skill: req.body.skill,
        team: req.body.team
    };
console.log(employee)
    Employee.create(employee, function(err, employee) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Employee created successfully"
        })
    })
}

exports.getEmployee = function(req, res, next) {
    Employee.get({}, function(err, employees) {
        // console.log(employees);
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            employees: employees
        })
    })
}
exports.getEmployeeById = function(req, res, next){
    Employee.get({ _id: req.params.id }, function(err, employee){
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            employee: employee[0]
        })
    })
}
exports.updateEmployee = function(req, res, next) {
    var employee = {
        id: req.body.id,
        firstName: req.body.firstName,
        skill: req.body.skill,
        team: req.body.team
    }
    Employee.update({_id: req.params.id}, employee, function(err, employee) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Employee updated successfully"
        })
    })
}

exports.removeEmployee = function(req, res, next) {
    Employee.delete({_id: req.params.id}, function(err, hero) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Employee deleted successfully"
        })
    })
}
