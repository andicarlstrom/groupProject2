//grabbing our sequelize models
var db = require("../models");
//bringing in the bcrypt npm module
var bcrypt = require("bcrypt");
// console.log(db, "this is db")
module.exports = function(app) {
  //login endpoint
  app.post("/api/login", function(req, res) {
    //will show our user data from front end
    console.log(req.body);
    //will see the currently formatted session object with user data
    console.log(req.session);
    //initalizing user data variable to an empty object. this will hold our user data on this endpoint
    var user = {};
    //using our users model to query our MySQL database for user info where ther username equals the username we passed in from the front end
    db.Customer.findOne({
      where: {
        email: req.body.email
      },
      include: [
        {
          model: db.Artist
        }
      ]
    }).then(function(dbData) {
      //if the database does not find a user with that username we will revice a null value from our database. null values are a little "special" in relation to JS.
      //this is how we would correctly do a check for a null value if recieved
      if (!dbData && typeof dbData === "object") {
        //this will send an error code to our front end for the user not existing
        res
          .status(204)
          .send("ohhh no, there is a problem with the username or password!");
      } else {
        //here we bring in bcrypt. bcrypt's compair method asks for a few things. it asks for the first parameter you send in a plain text password.
        //AKA: our users password coming in from the front end. the second parameter bcrypt wants us to pass in the hashed password that we stored in the db. lastly it wants a callback funtion
        //bcrypt will hash the pasword coming in from the front end and compaire it to the users hashed password from our database it will give us a boolean value to let us know if the
        //passwords were the same
        bcrypt.compare(req.body.password, dbData.dataValues.password, function(
          err,
          bcryptRes
        ) {
          // bcryptRes == true or false

          //if the response is false send an error to the front end letting the user know that the passwords did not match.
          if (!bcryptRes) {
            res
              .status(202)
              .send(
                "ohhh no, there is a problem with the username or password!"
              );
          } else {
            //if the response from bcrypt was true we know our users password matched and we can now format the user data coming from the database to be sent to the font end
            if (dbData.type === "customer") {
              var userObj = {
                id: dbData.dataValues.id,
                firstName: dbData.dataValues.firstName,
                lastName: dbData.dataValues.lastName,
                email: dbData.dataValues.email,
                phone: dbData.dataValues.phone,
                type: dbData.dataValues.type
              };
            } else {
              var userObj = {
                id: dbData.dataValues.id,
                firstName: dbData.dataValues.firstName,
                lastName: dbData.dataValues.lastName,
                email: dbData.dataValues.email,
                phone: dbData.dataValues.phone,
                type: dbData.dataValues.type,
                artistData: {
                  specialization:
                    dbData.dataValues.Artists[0].dataValues.specialization,
                  pricing: dbData.dataValues.Artists[0].dataValues.pricing,
                  location: dbData.dataValues.Artists[0].dataValues.location,
                  street: dbData.dataValues.Artists[0].dataValues.street,
                  city: dbData.dataValues.Artists[0].dataValues.city,
                  state: dbData.dataValues.Artists[0].dataValues.state,
                  zip: dbData.dataValues.Artists[0].dataValues.zip
                }
              };
            }
            //here the session's user object is updated with the users data. we can hit our /session endpoing witha  get request from the front end and get our user object.
            req.session.customer = userObj;
            //we update the loggedIn key to have a true value. we can use this value on the fron end to see if the user is logged in or not.
            req.session.customer.loggedIn = true;
            // res.status(200).send("Successful login");
            res.json(dbData);
          }
        });
      }
    });
  });

  // {
  //   "type": "customer",
  //   "firstName": "asdf",
  //   "lastName": "asdf",
  //   "phone": "asdf",
  //   "email": "asdf@asd.com",
  //   "password": "asdf"
  // }

  // {
  //   "type": "artist",
  //   "firstName": "asdf",
  //   "lastName": "asdf",
  //   "phone": "asdf",
  //   "email": "asdf@asdf.com",
  //   "password": "asdf",
  //   "artistData": {
  //     "specialization": "chicano",
  //     "pricing": "byPiece",
  //     "location": "asdf",
  //     "street": "asdf",
  //     "city": "asdf",
  //     "state": "asdf",
  //     "zip": "84121"
  //   }
  // }

  // signin enpoint logic
  app.post("/api/signup", function(req, res, next) {
    console.log(req.body);
    db.Customer.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(userCheck){
      if(!userCheck && typeof userCheck === 'object'){
        bcrypt.genSalt(10, function(err, salt) {
          //the bcrypt hash method will then
          bcrypt.hash(req.body.password, salt, function(err, hashedPassword) {
            // Store hashedPassword in your password DB.
            req.body.password = hashedPassword;

            if (req.body.type === "customer") {
              db.Customer.create(req.body).then(function(dbData) {
                var userObj = {
                  id: dbData.dataValues.id,
                  firstName: dbData.dataValues.firstName,
                  lastName: dbData.dataValues.lastName,
                  email: dbData.dataValues.email,
                  phone: dbData.dataValues.phone,
                  type: dbData.dataValues.type
                };
                req.session.customer = userObj;
                req.session.customer.loggedIn = true;
                res.json(dbData);
              });
            } else {
              var customerObj = {
                type: req.body.type,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password
              };
              console.log(customerObj);
              db.Customer.create(customerObj).then(function(customerData) {
                var artistData = {
                  specialization: req.body.artistData.specialization,
                  pricing: req.body.artistData.pricing,
                  location: req.body.artistData.location,
                  address: req.body.artistData.street,
                  city: req.body.artistData.city,
                  state: req.body.artistData.state,
                  zip: req.body.artistData.zip,
                  CustomerId: customerData.dataValues.id
                };
                db.Artist.create(artistData).then(function(artistData) {
                  var userObj = {
                    id: customerData.dataValues.id,
                    firstName: customerData.dataValues.firstName,
                    lastName: customerData.dataValues.lastName,
                    email: customerData.dataValues.email,
                    phone: customerData.dataValues.phone,
                    type: customerData.dataValues.type,
                    artistData: {
                      specialization: artistData.dataValues.specialization,
                      pricing: artistData.dataValues.pricing,
                      location: artistData.dataValues.location,
                      street: artistData.dataValues.street,
                      city: artistData.dataValues.city,
                      state: artistData.dataValues.state,
                      zip: artistData.dataValues.zip
                    }
                  };
                  req.session.customer = userObj;
                  req.session.customer.loggedIn = true;
                  res.json(userObj);
                });
              });
            }
          });
        });
      }else{
        res.send("sorry suckka that user exists already")
      }
    })
    //to store a hased password into the database we need to first salt our password. this will tell bcrypt how many time to pass through the users password to generate the hash

  });

  //get user info endpoint via query params
  app.get("/api/profile/:username", function(req, res, next) {
    console.log(req.param);
    db.users
      .findOne({
        where: {
          username: req.params.username
        }
      })
      .then(function(dbData) {
        console.log(dbData);
        var userObj = {
          id: dbData.dataValues.id,
          name: dbData.dataValues.name,
          username: dbData.dataValues.username,
          email: dbData.dataValues.email,
          profilePic: dbData.dataValues.profilePic
        };
        req.session.user.loggedIn = true;
        req.session.user.currentUser = userObj;
        res.json(userObj);
      });
  });
  //update profile route
  app.put("/api/update/:username", function(req, res, next) {
    req.session.user.currentUser = req.body;
    var loggedUser = req.session.user.currentUser;
    if (true) {
      db.users
        .update(
          {
            username: loggedUser.username,
            name: loggedUser.name,
            email: loggedUser.email,
            profilePic: loggedUser.profilePic
          },
          {
            where: {
              username: req.params.username
            }
          }
        )
        .then(function(dbData) {
          res.json(dbData.dataValues);
        });
    } else {
      res.status(404).json("please log in to update profile");
    }
  });

  //endpoint for grabbing session user object to be used accrossed entire app.
  app.get("/api/session", function(req, res, next) {
    res.json(req.session.customer);
  });
};
