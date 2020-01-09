var Employee = require('./employee.controller');

module.exports = function(router) {
    router.post('/create', Employee.createEmployee);
    router.get('/get', Employee.getEmployee);
    router.get('/get/:id', Employee.getEmployeeById);
    router.put('/update/:id', Employee.updateEmployee);
    router.delete('/remove/:id', Employee.removeEmployee);
}
