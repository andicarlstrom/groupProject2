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

  //Get for search landing page. Frontend to loop through and populate the six images?
  app.get("/api/search/", function(req, res) {
    db.Picture.findAll({
      include: [db.Tag]
    })
      .then(function(dbPicture) {
        res.json(dbPicture);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //Get for search results. Is this the proper parameter to use here for a general search of the Tag table, and including the Picture table as well?
  app.get("/api/search/:query", function(req, res) {
    var query = req.body.query;
    db.Picture.findAll({
     attributes: [query]
      })
      .then(function(dbTag) {
        res.json(dbTag);
      })
      .catch(function(err) {
        res.json(err);
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

  //Get info for selected image from search page. Is id the proper parameter to use for a general search in the Picture table?
  app.get("/api/search/image/:id", function(req, res) {
    db.Picture.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Tag]
    })
      .then(function(dbPicture) {
        res.json(dbPicture);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
