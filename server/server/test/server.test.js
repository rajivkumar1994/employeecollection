const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server');
const { Employee } = require('./../models/employee');
const { employees, populateEmployees } = require('./seed/seed');
const { ObjectID } = require('mongodb');

beforeEach(populateEmployees);

describe('GET /employees', () => {
    it('should get all employees', (done) => {
        request(app)
            .get('/employees')
            .expect(200)
            .expect((res) => {
                expect(res.body.employees.length).toBe(2)
            })
            .end(done);
    });
});

describe('Get /employees/:id', () => {
    it('it should return Employees doc', (done) => {
        request(app)
            .get(`/employees/${employees[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.emp.name).toBe(employees[0].name);
                expect(new Date(res.body.emp.dob).toString()).toMatch(employees[0].dob.toString());
                expect(res.body.emp.salary).toBe(employees[0].salary);
                expect(res.body.emp.skills).toEqual(employees[0].skills);
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        const hexId = new ObjectID().toHexString();
        request(app)
            .get(`/employees/${hexId}`)
            .expect(404)
            .end(done);
    });
    it('should return 400 if invalid todo', (done) => {
        request(app)
            .get(`/employees/1234a`)
            .expect(400)
            .end(done);
    })
});


describe('PUT /employees', () => {
    it('should create a new Employees', (done) => {
        let employee = {
            name: "Sarathy",
            dob: "1989-03-07",
            salary: 10000,
            skills: ["Java", "SQL"]
        };
        request(app)
            .put('/employees')
            .send(employee)
            .expect(200)
            .expect((res) => {
                expect(res.body.name).toBe(employee.name)
                expect(res.body.salary).toBe(employee.salary)
                expect(res.body.skills).toEqual(employee.skills)
                expect(res.body.dob.toString()).toContain(employee.dob)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Employee.find().then((emp) => {
                    expect(emp.length).toBe(3);
                    expect(emp[2].name).toBe(employee.name)
                    expect(emp[2].salary).toBe(employee.salary)
                    //expect(emp[2].skills).toEqual(employee.skills)
                    //expect(emp[2].dob.toString()).toContain(employee.dob)
                    done();
                })
                .catch(err => done(err));
            })
    });

    it('should not create Employee with invalid body data', (done) => {
        request(app)
            .put('/employees')
            .send()
            .expect(400)
            .end((err, emp) => {
                if (err) {
                    return done(err);
                }
                Employee.find().then((emp) => {
                    expect(emp.length).toBe(2);
                    done();
                })
                    .catch(e => done(e));
            })
    });
});
