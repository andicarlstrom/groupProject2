var db = require("../models");

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

  //Get artist profile page. Can this be based off of email, if we do not have an id?
  app.get("/api/artist-profile/:email", function(req, res) {
    db.Artist.findOne({
      where: {
        email: req.params.email
      },
      include: [db.User]
    })
      .then(function(dbArtist) {
        res.json(dbArtist);
      })
      .catch(function(err) {
        res.json(err);
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
    var query = req.params.query;
    db.Tag.findAll({
      where: {
        style: { [Op.like]: ["%" + query] },
        description: { [Op.like]: ["%" + query] },
        placement: { [Op.like]: ["%" + query] }
      },
      limit: 10,
      include: [db.Picture] //or {[model: Picture]}
    })
      .then(function(dbTag) {
        res.json(dbTag);
      })
      .catch(function(err) {
        res.json(err);
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