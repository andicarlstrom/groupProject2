$(document).ready(function() {
  $(".modal").modal();
  $("select").formSelect();

  var submit = $("#submit");

  submit.on("click", submitPhotoToDB);

  function submitPhotoToDB(event) {
    event.preventDefault();
    var artistId = userId;
    console.log(artistId);

    var newPhoto = {
      file: $(".uploadedPhoto").val(),
      description: $("#autocomplete-input")
        .val()
        .trim(),
      style: $(".tattooStyle").val(),
      placement: $("#placement").val()
    };

    $.post("/api/image-form/" + artistId, {
      newPhoto
    }).then(function() {
      console.log(newPhoto);
      alert("Working");
      location.reload();
    });
  }
});