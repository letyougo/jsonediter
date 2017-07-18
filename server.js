const jsonServer = require('json-server');
const bodyParser = require('body-parser');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const fs = require('fs');
const path = require('path');

const jsonfile = require('jsonfile');


server.use(middlewares);
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());


server.post('/addNewRewriter', (req, res, next) => {
  jsonfile.writeFile('./rewriter/rewriter.json', req.body, (error) => {
    console.log(error);
  });
  // jsonfile.readFile('./rewriter/rewriter.json', (err, object) => {
  //   Object.keys(req.body).forEach((item) => {
  //     object[item] = req.body[item];
  //   });
  //   jsonfile.writeFile('./rewriter/rewriter.json', object, (error) => {
  //     console.log(error);
  //   });
  // });
});
server.get('/getRewriter', (req, res, next) => {
  jsonfile.readFile('./rewriter/rewriter.json', (err, object) => {
    res.send(object);
  });
});

server.get('/db', (req, res, next) => {
  fs.readdir('./database', (err, list) => {
    list = list.map((item) => {
      var item = path.basename(item, '.json');
      console.log(req);
      console.log(item);
      return item;
    });
    res.send(list);
  });
});
server.post('/adddatatable/:databasename/:datatablename', (req, res, next) => {
  jsonfile.readFile(`./database/${req.params.databasename}.json`, (err, object) => {
    console.log('req.body', req.body);

    object[req.params.datatablename] = req.body;

    jsonfile.writeFile(`./database/${req.params.databasename}.json`, object, (error) => {
      console.error(error);
    });
  });
  res.send(req.body);
});

server.get('/adddatabase/:databasename/add-database-now', (req, res, next) => {
  console.log('req.params.databasename', req.params.databasename);
  fs.writeFile(`./database/${req.params.databasename}.json`, JSON.stringify({ datasheet: [{ id: 1, title: 'json-server' }] }));
  res.send(req.params.databasename);
});


server.use(jsonServer.rewriter(JSON.parse(fs.readFileSync('./rewriter/rewriter.json', 'utf-8'))));

server.use('/:database', (req, res, next) => {
  jsonServer.router(`./database/${req.params.database}.json`)(req, res, next);
});

// server.use(router)
server.listen(9091, () => {
  console.log('JSON Server is running');
});
