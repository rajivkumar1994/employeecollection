const { ObjectID } = require('mongodb');
const { Employee } = require('./../../models/employee');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const employees = [{
    _id: userOneId,
    name: "Rajivkumar",
    dob: new Date("1994-10-24"),
    salary: 20000,
    skills: ["Node", "Angular", "React"]

}, {
    _id: userTwoId,
    name: "Ramkumar",
    dob: new Date("1994-10-24"),
    salary: 20000,
    skills: ["Node", "Angular", "React", "Java"]
}];

const populateEmployees = (done) => {
    Employee.deleteMany({}).then(() => {
        Employee.insertMany(employees);
        return Promise.resolve();
    }).then(() => done());
}

module.exports = { employees, populateEmployees };