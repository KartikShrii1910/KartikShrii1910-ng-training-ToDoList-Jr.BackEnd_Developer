const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../');
const { expect } = chai;

chai.use(chaiHttp);


describe('Todo API Tests', () => {
    describe('GET /api/tasks', () => {
        it('should fetch all todos', (done) => {
            chai.request(server)
                .get('/api/tasks')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /api/task/:id', () => {
        it('should fetch a todo by id', (done) => {
            const id = 48;  //write only vaild id which is available in Databse
            chai.request(server)
                .get(`/api/task/${id}`)
                .end((err, res) => {
                    // console.log(res.body); // Log the response body
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id').eql(id);
                    done();
                });
        });
        

        it('should return 404 if the todo is not found', (done) => {
            const id = 1; 
            chai.request(server)
                .get(`/api/task/${id}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').eql('Todo not found');
                    done();
                });
        });
    });

    describe('POST /api/task', () => {
        it('should create a new todo', (done) => {
            const newTodo = {
                title: 'Test Todo',
                description: 'This is a test todo.',
                isCompleted: false,
            };
            chai.request(server)
                .post('/api/task')
                .send(newTodo)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message').eql('Todo created');
                    expect(res.body).to.have.property('id');
                    done();
                });
        });
    });

    describe('PUT /api/task/:id', () => {
        it('should update a todo by id', (done) => {
            const id = 1;
            const updatedTodo = {
                title: 'Updated Todo',
                description: 'This todo has been updated.',
                isCompleted: true,
            };
            chai.request(server)
                .put(`/api/task/${id}`)
                .send(updatedTodo)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').eql('Todo updated');
                    done();
                });
        });
    });

    describe('DELETE /api/task/:id', () => {
        it('should delete a todo by id', (done) => {
            const id = 1; 
            chai.request(server)
                .delete(`/api/task/${id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').eql('Todo deleted');
                    done();
                });
        });
    });
});
// npx mocha .\test\test.js --->>> for test case file run command