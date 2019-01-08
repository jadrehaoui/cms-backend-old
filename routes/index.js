import home from './home';
import * as product from './product';
import * as project from './project';
import * as user from './user';
import cors from 'cors';
import Product from '../Models/Product';
import Project from '../Models/Project';
export default function(app){
  app.get('/', (req, res) => home(req, res));
  app.use(cors())
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
  // PRODUCT ROUTES
  app.post('/products', (req, res) => product.list(req, res));
  app.post('/product/add', (req, res) => product.add(req, res));
  app.post('/product/:id', (req, res) => product.findById(req, res));
  app.put('/product/edit/:id', (req, res) => product.edit(req, res));
  app.put('/product/unpublish/:id', (req, res) => product.unpublish(req, res));
  app.put('/products/unpublish', (req, res) => product.unpublishMany(req, res));
  app.put('/products/publish', (req, res) => product.publishMany(req, res));
  app.delete('/product/remove', (req, res) => product.remove(req, res));
  app.delete('/products/remove', (req, res) => product.removeMany(req, res));
  app.delete('/product/soft/remove', (req, res) => product.softlyRemove(req, res));
  app.delete('/products/soft/remove',(req, res) => product.softlyRemoveMany(req, res));
  app.post('/products/restore',(req, res) => product.restoreMany(req, res));
  // PROJECT ROUTES
  app.post('/projects', (req, res) => project.list(req, res));
  app.post('/project/add', (req, res) => project.add(req, res));
  app.post('/project/:id', (req, res) => project.findById(req, res));
  app.put('/project/edit/:id', (req, res) => project.edit(req, res));
  app.put('/project/unpublish/:id', (req, res) => product.unpublish(req, res));
  app.put('/projects/unpublish', (req, res) => product.unpublishMany(req, res));
  app.delete('/project/remove', (req, res) => project.remove(req, res));
  app.delete('/projects/remove', (req, res) => project.removeMany(req, res));
  app.delete('/project/soft/remove', (req, res) => project.softlyRemove(req, res));
  app.delete('/projects/soft/remove', (req, res) => project.softlyRemoveMany(req, res));
  // USER ROUTES
  app.post('/users', (req, res) => user.list(req, res));
  app.post('/user/add', (req, res) => user.add(req, res));
  app.post('/user/:id', (req, res) => user.findById(req, res));
  app.put('/user/edit/:id', (req, res) => user.edit(req, res));
  app.put('/user/unpublish/:id', (req, res) => product.unpublish(req, res));
  app.put('/users/unpublish', (req, res) => product.unpublishMany(req, res));
  app.delete('/user/remove', (req, res) => user.remove(req, res));
  app.delete('/users/remove', (req, res) => user.removeMany(req, res));
  app.delete('/user/soft/remove', (req, res) => user.softlyRemove(req, res));
  app.delete('/users/soft/remove', (req, res) => user.softlyRemoveMany(req, res));

  app.get('/dashboard/tables', (req, res, next) => {
    getLatest(Product, req, next, "Products");
  }, (req, res, next) => {
    getLatest(Project, req, next, "Projects");
  },
  // {getLatest(Table, req, next,"TableName")},
  (req, res, next) => {
    res.send([
      req["Products"], req["Projects"]
    ])
  })
}

function getLatest(Record, req, next,name){
  var latestRecord = Record.findOne({}, {}, {sort: {updatedTs: -1}}, (err, result) => {
    console.log(result);
    if(result === null){
      req[name] = {
        id: "table-"+name,
        table: name,
        lastUpdated: "never"
      }
    } else {
      req[name] = {
        id: result.id,
        table: name,
        lastUpdated: result.updatedTs
      }
    }
    next();
  })
}
