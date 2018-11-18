$(document).ready(function() {
  $(".modal").modal();
  $("select").formSelect();

  var submit = $("#submit");

  submit.on("click", submitPhotoToDB);

  function submitPhotoToDB(event) {
    event.preventDefault();
    var artistID = userId;

    var newPhoto = {
      file: $(".uploadedPhoto").val(),
      description: $("#autocomplete-input")
        .val()
        .trim(),
      style: $(".tattooStyle").val(),
      placement: $("#placement").val()
    };

    $.post(`/api/image-form/${artistID}`, {
      newPhoto
    }).then(function() {
      location.reload();
    });
  }
});
