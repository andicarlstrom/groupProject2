$(document).ready(function() {
  //materialize js intialization of components=================================================

  //for the modals
  $(".modal").modal();
  //for form selects
  $("select").formSelect();

  //Global Variables===========================================================================
  var userType;

  //set form modal states======================================================================
  //hide both forms and submit in account creation modal until a button is clicked
  $("#custSelectTypeSection").show();
  $("#allUsersInfo").hide();
  $("#artistOnlyInfo").hide();
  $("#createAcctSubmit").hide();

  //functions==================================================================================

  //reset the form
  function resetForm() {
    //show or hid e the applicable fields
    $("#custSelectTypeSection").show();
    $("#allUsersInfo").hide();
    $("#artistOnlyInfo").hide();
    $("#createAcctSubmit").hide();
    //reset fields
    $("#userType").val(" ");
    $("#firstNameCreate")
      .val("")
      .attr("class", "validate");
    $("#lastNameCreate")
      .val("")
      .attr("class", "validate");
    $("#phoneNumberCreate")
      .val("")
      .attr("class", "validate");
    $("#emailCreate")
      .val("")
      .attr("class", "validate");
    $("#passwordCreate")
      .val("")
      .attr("class", "validate");
    $("#locationNameCreate")
      .val("")
      .attr("class", "validate");
    $("#streetCreate")
      .val("")
      .attr("class", "validate");
    $("#cityCreate")
      .val("")
      .attr("class", "validate");
    $("#stateCreate")
      .val("")
      .attr("class", "validate");
    $("#zipCreate")
      .val("")
      .attr("class", "validate");
    $("#specializationCreate")
      .val("")
      .attr("class", "validate");
    $("#pricingCreate")
      .val("")
      .attr("class", "validate");
  }

  // Event Handlers============================================================================

  //password field to show or hide password for existing user login, need to get to work
  $("#showPassword").on("change", function(event) {
    event.preventDefault();
    //change the type field on the id loginPassword to "text"
    if ($("input[name='show']:checked")) {
      $("#loginPassword").attr("type", "text");
      //how to get it to go back if unchecked?
    } else if ($("input[name='show']:not checked")) {
      console.log("not checked");
      $("#loginPassword").attr("type", "password");
    }
  });

  //if user chooses customer, just the one form displays, if they choose artist, both forms display
  $("#custSelectTypeSection").on("change", "#userType", function(event) {
    event.preventDefault();
    userType = $("#userType").val();
    if (userType === "customer") {
      console.log("customer type selected");
      $("#custSelectTypeSection").hide();
      $("#allUsersInfo").show();
      $("#createAcctSubmit").show();
    } else {
      console.log("artist type selected");
      $("#custSelectTypeSection").hide();
      $("#allUsersInfo").show();
      $("#artistOnlyInfo").show();
      $("#createAcctSubmit").show();
    }
  });

  //send the info from the form fields to the controller when create new account button is clicked
  $("#createAcctSubmit").on("click", function(event) {
    event.preventDefault();
    //if all fields are complete post to db as a new data object
    if (userType === "customer") {
      //run form validation function to make sure no empty fields for customer only
      if (
        $("#firstNameCreate").val() === "" ||
        $("#lastNameCreate").val() === "" ||
        $("#phoneNumberCreate").val() === "" ||
        $("#emailCreate").val() === "" ||
        $("#passwordCreate").val() === ""
      ) {
        alert("empty field");
        // $("#emptyFieldError").modal("open");
        //return false;
        //if no blank fields create the cusotmer only data object
      } else {
        var customerInfoObj = {
          type: $("#userType")
            .val()
            .trim(),
          firstName: $("#firstNameCreate")
            .val()
            .trim(),
          lastName: $("#lastNameCreate")
            .val()
            .trim(),
          phone: $("#phoneNumberCreate")
            .val()
            .trim(),
          email: $("#emailCreate")
            .val()
            .trim(),
          password: $("#passwordCreate")
            .val()
            .trim()
        };
      }
      //if user type is artist
    } else {
      //check for blank fields
      if (
        $("#firstNameCreate").val() === "" ||
        $("#lastNameCreate").val() === "" ||
        $("#phoneNumberCreate").val() === "" ||
        $("#emailCreate").val() === "" ||
        $("#passwordCreate").val() === "" ||
        $("#locationNameCreate").val() === "" ||
        $("#streetCreate").val() === "" ||
        $("#cityCreate").val() === "" ||
        $("#stateCreate").val() === "" ||
        $("#zipCreate").val() === "" ||
        $("#specializationCreate").val() === "" ||
        $("#pricingCreate").val() === ""
      ) {
        alert("empty field");
        // $("#emptyFieldError").modal("open");
        //return false;
        //if not blanks create customer obj including artist data
      } else {
        var customerInfoObj = {
          type: $("#userType")
            .val()
            .trim(),
          firstName: $("#firstNameCreate")
            .val()
            .trim(),
          lastName: $("#lastNameCreate")
            .val()
            .trim(),
          phone: $("#phoneNumberCreate")
            .val()
            .trim(),
          email: $("#emailCreate")
            .val()
            .trim(),
          password: $("#passwordCreate")
            .val()
            .trim(),
          artistData: {
            specialization: $("#specializationCreate")
              .val()
              .trim(),
            pricing: $("#pricingCreate")
              .val()
              .trim(),
            location: $("#locationNameCreate")
              .val()
              .trim(),
            street: $("#streetCreate")
              .val()
              .trim(),
            city: $("#cityCreate")
              .val()
              .trim(),
            state: $("#stateCreate")
              .val()
              .trim(),
            zip: $("#zipCreate")
              .val()
              .trim()
          }
        };
      }
    }

    //testing
    console.log("User Info: " + JSON.stringify(customerInfoObj, null, 2));

    // post request to send info, will create customer info, then if user type is artist will also add artist info to that table
    $.post("/api/signup", customerInfoObj, function(dbData) {
      //if a customer redirect to the customer landing page
      console.log("dbdata", dbData);
      if (dbData !== "sorry suckka that user exists already") {
        if (dbData.type === "customer") {
          console.log("Customer Information Added");
          // return user id off of session and if customer send to applicable page
          location.href = "/user/" + dbData.id;
        }
        //redirect to the artist page
        else {
          console.log("Artist Information Added");
          // return user id off of session and if artist send to applicable page
          location.href = "/artist-profile/" + dbData.id;
          console.log("hi");
        }
      }

      //clear form inputs on submit click (only if data posts)
      resetForm();
    });
  });

  //reset form when cancel button is clicked
  $("#createAcctCancel").on("click", function(event) {
    event.preventDefault();
    resetForm();
  });

  // login functionality
  $("#loginSubmit").on("click", function(event) {
    event.preventDefault();
    var loginInfo = {
      email: $("#loginEmail")
        .val()
        .trim(),
      password: $("#loginPassword")
        .val()
        .trim()
    };
    $.post("/api/login", loginInfo).then(function(dbData) {
      console.log("this is dbdata " + JSON.stringify(dbData, null, 2));
      if (dbData.type === "customer") {
        console.log("loading customer page");
        // send to applicable page
        location.href = "/user/" + dbData.id;
      }
      //redirect to the artist page
      else {
        console.log("loading artist poage");
        // if artist send to applicable page
        location.href = "/artist-profile/" + dbData.id;
      }
    });
  });
});
