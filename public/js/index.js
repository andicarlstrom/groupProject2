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
    $("#userType").val("");
    $("#firstNameCreate").val("");
    $("#lastNameCreate").val("");
    $("#phoneNumberCreate").val("");
    $("#locationNameCreate").val("");
    $("#streetCreate").val("");
    $("#cityCreate").val("");
    $("#stateCreate").val("");
    $("#zipCreate").val("");
    $("#specializationCreate").val("");
    $("#pricingCreate").val("");
  }

  // Event Handlers============================================================================

  //password field to show or hide password for existing user login
  $("#showPassword").on("change", function(event) {
    event.preventDefault();
    //change the type field on the id loginPassword to "text"
    if ($("#showPassword").attr("checked") === "checked") {
      $("#loginPassword").attr("type", "text");
    } else {
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
    //run form validation function to make sure no empty fields
    //if all fields are complete post to db as a new data object
    if (userType === "customer") {
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

    //testing
    console.log("Customer Info: " + JSON.stringify(customerInfoObj, null, 2));

    // post request to send info, will create customer info, then if user type is artist will aslo add artist info to that table
    $.post("/api/customers", customerInfoObj, function() {
      //if a customer redirect to the customer landing page
      if (userType === "customer") {
        console.log("Customer Information Added");
        // return user id off of session and if customer send to applicable page
        location.href("/customer/id");
      }
      //redirect to the artist page
      else {
        console.log("Artist Information Added");
        // return user id off of session and if artist send to applicable page
        location.href("/artist/id");
      }

      //clear form inputs on submit click
      resetForm();
    });
  });

  //reset form when cancel button is clicked
  $("#createAcctCancel").on("click", function(event) {
    event.preventDefault();
    resetForm();
  });

  // Get references to page elements
  var $exampleText = $("#example-text");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
  var $exampleList = $("#example-list");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function(example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },
    getExamples: function() {
      return $.ajax({
        url: "api/examples",
        type: "GET"
      });
    },
    deleteExample: function(id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshExamples = function() {
    API.getExamples().then(function(data) {
      var $examples = data.map(function(example) {
        var $a = $("<a>")
          .text(example.text)
          .attr("href", "/example/" + example.id);

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": example.id
          })
          .append($a);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");

        $li.append($button);

        return $li;
      });

      $exampleList.empty();
      $exampleList.append($examples);
    });
  };

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var example = {
      text: $exampleText.val().trim(),
      description: $exampleDescription.val().trim()
    };

    if (!(example.text && example.description)) {
      alert("You must enter an example text and description!");
      return;
    }

    API.saveExample(example).then(function() {
      refreshExamples();
    });

    $exampleText.val("");
    $exampleDescription.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteExample(idToDelete).then(function() {
      refreshExamples();
    });
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);
});
