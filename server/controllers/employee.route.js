const express = require('express');
const app = express();
const employeeRoute = express.Router();
const { ObjectID } = require('mongodb')

const multer = require('multer');
const upload = multer({
    dest: './uploads'
});

const storage = multer({
limits: {
    
}
});

let { Employee } = require('../models/employee');

employeeRoute.get('/', ((req, res) => {
    Employee.find()
        .then(employees => res.json({ employees }))
        .catch(err => res.status(400).send(err));
}));

employeeRoute.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    Employee.findOne({
        _id: id,
    })
        .then((emp) => {
            if (!emp) {
                res.status(404).send('Employee not found');
                return;
            }
            res.send({ emp });
        }).catch(e => res.status(400).send(e));
});

employeeRoute.put('/', upload.single(), ((req, res) => {
    console.log(req.file);
    let dob = new Date(req.body.dob);
    let employee = new Employee({
        name: req.body.name,
        dob: req.body.dob,
        salary: req.body.salary,
        skills: req.body.skills
    });
    employee.save()
        .then(emp => {
            res.status(200).json(emp);
        })
        .catch(err => {
            res.status(400).send(err);
        });
}));

//To Update the Employee using ID
employeeRoute.post('/:id', ((req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(400).send('Invalid ID');
        return;
    } else {
        Employee.findOneAndUpdate({
            _id: id
        }, { $set: req.body }, { new: true })
            .then((emp) => {
                if (!emp) {
                    return res.status(404).send();
                }
                return res.send({ emp });
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }
}));

// To Delete The Employee
employeeRoute.delete('/:id', ((req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(400).send('Invalid ID');
        return;
    } else {
        Employee.findByIdAndRemove({ _id: id })
            .then((employee) => {
                if (!employee) {
                    return res.status(404).send();
                }
                return res.send({ employee });
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }
}));

module.exports = employeeRoute;