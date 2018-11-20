//Runs Smarty Streets API to check that entered address is valid.
function verifyAddress(address) {
  var street = address[0];
  // var streetTwo = address[1];
  var city = address[1];
  var state = address[2];
  var zip = address[3];
  var url =
    "https://us-street.api.smartystreets.com/street-address?auth-id=f8ec66b5-0294-71bb-3648-851dcaad17c3&auth-token=71aUQkL6xMOtZEqLuYCE&candidates=1";
  // var url =
  //   "https://us-street.api.smartystreets.com/street-address?auth-id=" +
  //   process.env.KEY +
  //   "&candidates=1";
  var completeUrl =
    url +
    "&street=" +
    street +
    "&city=" +
    city +
    "&state=" +
    state +
    "&zipcode=" +
    zip;
  console.log(completeUrl);

  $.ajax({
    url: completeUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    if (response.length < 1 || response === undefined) {
      $("#invalidAddressError").modal("open");
      $("#street").attr("class", "validate invalid");
      $("#city").attr("class", "validate invalid");
      $("#state").attr("class", "validate invalid");
      $("#zip").attr("class", "validate invalid");
      console.log("running?");
      return false;
    } //else {
    //   geocode2(address);
    // }
  });
}

//intializes grabbing address input info from form. Then fires verifyAddress() function to ensure that an actual address was entered.
function geocode() {
  var street = $("#street")
    .val()
    .trim();
  console.log(street);
  // var streetTwo = document.getElementById("street-two-input").value;
  // console.log(streetTwo);
  var city = $("#city")
    .val()
    .trim();
  console.log(city);
  var state = $("#state")
    .val()
    .trim();
  console.log(state);
  var zip = $("#zip")
    .val()
    .trim();
  console.log(zip);

  var location = [street, city, state, zip];
  //geocode2(location);
  verifyAddress(location);
}

module.exports = geocode();
