var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log(req.session);
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });

    res.render("index", {
      msg: "Welcome!",
      examples: []
    });
  });

  //Get artist profile page. Is this necessary based on HTML route for same page above? Will this pull the images?

  //HTML route for templating the image form modal.
  app.get("/image-form", function(req, res) {
    res.render("image-form");
  });

  //Create a new image by artist. Does this make it so that it is associated with correct artist?
  app.post("/api/image-form/:id", function(req, res) {
    var newImage = req.body;
    console.log(res.body);
    res.json("good job!!"); //This is not real for production

    db.Picture.create(newImage, { include: [db.Tag] })
      .then(function(dbPicture) {
        res.json(dbPicture);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
