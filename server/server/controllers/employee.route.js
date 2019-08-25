const fs = require('fs');
const express = require('express');
const app = express();
const employeeRoute = express.Router();
const multer = require('multer');

const { ObjectID } = require('mongodb')

/*app.use(multer({
    dest: './uploads/',
    rename: (fieldname, filename) => filename,
}));*/

let { Employee } = require('../models/employee');

employeeRoute.get('/', ((req, res) => {
    Employee.find()
        .select('name dob salary skills empno')
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
        .select('name dob salary skills empno')
        .then((emp) => {
            if (!emp) {
                res.status(404).send('Employee not found');
                return;
            }
            res.send({ emp });
        }).catch(e => res.status(400).send(e));
});

employeeRoute.put('/', ((req, res) => {
    try {
        let dob = new Date(req.body.dob);
        /*let img = {
            data: fs.readFileSync(req.files),
            contentType: 'image/png',
        }*/
        let employee = new Employee({
            name: req.body.name,
            dob: req.body.dob,
            salary: req.body.salary,
            skills: req.body.skills,
        });
        employee.save()
            .then(emp => {
                res.status(200).json(emp);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    } catch (e) {
        res.status(400).send(e);
    }

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