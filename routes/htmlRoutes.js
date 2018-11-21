var db = require("../models");

module.exports = function(app) {
  // Load index/login page
  app.get("/", function(req, res) {
    console.log(req.session);
    res.render("index", {});
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

  // html route that generates the tattoo artists profile
  app.get("/artist-profile/:id", function(req, res) {
    console.log("hit");
    db.Artist.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Customer]
    }).then(function(dbArtist, err) {
      console.log(dbArtist);
      const dbObject = dbArtist.dataValues;

      const {
        location,
        address,
        city,
        state,
        zip,
        pricing,
        specialization,
        photos,
        CustomerId,
        Customer
      } = dbObject;

      const { firstName, lastName, type } = Customer.dataValues;

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
        lastName,
        showAdd: showAdd,
        photos: photos
      });
    });
  });

  // ----- Here is where the images routes will go -----

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
