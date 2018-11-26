var db = require("../models");
const sequelize = require('sequelize');



module.exports = function(app) {
  //Create a new image by artist. How to post to tag table with picture? Does this need to be a separate CRUD Operation?
  app.post("/api/new-image", function(req, res) {
    var newImage = req.body;
    db.Picture.create(newImage, { include: [db.Tag] })
      .then(function(dbPicture) {
        res.json(dbPicture);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //Get for search landing page. Frontend to loop through and populate the six images.
 app.get("/api/user", function(req, res) {
  db.Picture.findAll({
    limit: 6
  })
    .then(function(dbPicture) {
      res.json(dbPicture);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/api/style/:query", function(req, res) {
  db.Picture.findAll({
    where: {
      style: req.params.query
    }
  })
    .then(function(dbPicture) {
      res.json(dbPicture);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/api/placement/:query", function(req, res) {
  db.Picture.findAll({
    where: {
      placement: req.params.query

    }
  })
    .then(function(dbPicture) {
      res.json(dbPicture);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/api/image-form/:id", function(req, res) {
  console.log("Image hit");
  var newImage = req.body;
  db.Picture.create(newImage, {
    where: {
      id: req.params.id
    }
  })
    .then(function(dbPicture) {
      console.log("test", dbPicture);
      res.json(dbPicture);
    })
    .catch(function(err) {
      res.json(err);
    });
});


  app.get("/user/:id", function(req, res) {
    db.Customer.findOne({
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.render("user");
    });

  });



  app.get("/artist-profile/:id", function(req, res) {
    // console.log("hit");
    db.Artist.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Customer]
    }).then(function(dbArtist) {
      const dbObject = dbArtist.dataValues;

      const {
        location,
        address,
        city,
        state,
        zip,
        pricing,
        specialization,
        CustomerId,
        Customer
      } = dbObject;

      const { firstName, lastName } = Customer.dataValues;

      res.render("artistProfile", {
        location,
        address,
        city,
        state,
        zip,
        pricing,
        specialization,
        id: CustomerId,
        firstName,
        lastName
      });
    });
  });

};
