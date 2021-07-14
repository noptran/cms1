var Odoo = require('odoo');
var odoo = new Odoo({
    host: 'rajaserver01.go.dyndns.org',
    port: 8072,
    database: 'Donation',
    username: 'admin',
    password: 'admin'
  });   

  exports.getDatas = function (req, res) {
    odoo.connect(function (err) {
      if (err) { 
        return console.log(err); 
      }else{
        var params = {
          ids: [],
          fields: req.body.fields,
          domain: req.body.domain,
          limit: 10000,
          offset: 0,
        };
        odoo.search_read(req.body.model, params, function (err, partners) {
          if (err) { return console.log(err); }
          res.send(partners);
        });
        console.log("Odoo Connected");
      }
    });
  };
  exports.createData = function (req, res) {
    odoo.connect(function (err) {
      if (err) { 
        return console.log(err); 
      }else{
        odoo.create('donation.profile',req.body, function (err, partners) {
          if (err) { return console.log(err); }
         res.sendStatus(partners ? 200 : 500);
        });
      }
    });
  }