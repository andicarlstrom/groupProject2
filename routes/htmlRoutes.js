var db = require("../models");

module.exports = function(app) {
  // Load index/login page
  app.get("/", function(req, res) {
    console.log(req.session);
    res.render("index", {});
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

      // console.log("customer.datavalues: ", Customer.dataValues);
      let showAdd;
      if (type === "artist") {
        showAdd = true;
      } else {
        showAdd = false;
      }

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
