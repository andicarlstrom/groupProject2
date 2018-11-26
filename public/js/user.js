$.get("/api/style/Japanese", function(data) {
  console.log(data);
});
console.log("Page Loaded");

var r = 1;
function appendPresearch(obj) {
  for (var z = 0; z < obj.length; z++) {
    if (z === 2 || z === 4) {
      r++;
    }

    var img = $("<img>");
    img.attr("src", obj[z].file);
    var div1 = $("<div>");
    div1.attr("class", "card-image presearch");
    var div2 = $("<div>");
    div2.attr("class", "card");
    var div3 = $("<div>");
    div3.attr("class", "col s6");
    // var br = $("<br>");
    div4 = $("<div>");
    div4.attr("class", "card-action black text-white");

    div4.text(obj[z].style);
    img.appendTo(div1);
    div1.appendTo(div2);
    div2.appendTo(div3);
    div4.appendTo(div2);
    div3.appendTo($("#row" + r));
    img.on("click", function() {
      $("#searchResults").html("");
      $.get("/api/style/" + obj[0].style, function(data) {
        search(data);
      });
    });
  }
}

$(document).ready(function() {
  $(".modal").modal();
  $.get("/api/user", function(data) {
    appendPresearch(data);
  });

  $("select").formSelect();

  $("#cat").on("change", function() {
    selected = $("#cat").val();
    console.log(selected);
    $("#searchResults").html("");
    $.get("/api/style/" + selected, function(data) {
      search(data);
    });
  });

  $("#bod").on("change", function() {
    selected = $("#bod").val();
    console.log(selected);
    $("#searchResults").html("");
    $.get("/api/placement/" + selected, function(data) {
      search(data);
    });
  });
});

function search(obj) {
  var placement;
  var y = 0;
  console.log(obj.length);
  for (var x = 0; x < obj.length; x++) {
    console.log("starting loop");

    if (x === 0 || x === 3 || x === 6 || x === 9) {
      y++;
      placement = 1;
      console.log("placement changed ");
    } else {
      placement = 2;
    }

    console.log(placement);
    if (placement === 1) {
      var a = $("<a>Artist Info</a>");
      a.attr("class", "waves-effect waves-light btn  modal-trigger black");
      a.attr("href", "#modal" + x);
      var img = $("<img>");
      img.attr("src", obj[x].file);

      img.attr("class", "materialboxed");

      var div1 = $("<div>");
      div1.attr("class", "card-image black");

      var div2 = $("<div>");
      div2.attr("class", "card");
      var div3 = $("<div>");
      div3.attr("class", "col s8");
      // var br = $("<br>");
      div4 = $("<div>");
      div4.attr("class", "row");
      div4.attr("id", "row" + y);
      var div6 = $("<div>");
      div6.attr("class", "modal");
      div6.attr("id", "modal" + x);

      $("<p>text</p>").appendTo(div6);

      img.appendTo(div1);
      a.appendTo(div1);
      div1.appendTo(div2);
      div2.appendTo(div3);

      div3.appendTo(div4);
      div4.appendTo("#searchResults");
      div6.appendTo("#searchResults");
      $(".materialboxed").materialbox();
      $(".modal").modal();
    }
    if (placement === 2) {
      var a = $("<a>Artist Info</a>");
      a.attr("class", "waves-effect waves-light btn  black modal-trigger");
      a.attr("href", "#modal" + x);
      var img = $("<img>");
      img.attr("src", obj[x].file);
      img.attr("class", "materialboxed");
      var div1 = $("<div>");
      div1.attr("class", "card-image black");
      var div2 = $("<div>");
      div2.attr("class", "card");
      var div3 = $("<div>");
      div3.attr("class", "col s4");
      var br = $("<br>");
      var div6 = $("<div>");
      div6.attr("class", "modal");
      div6.attr("id", "modal" + x);
      $("<p>text</p>").appendTo(div6);

      img.appendTo(div1);
      a.appendTo(div1);
      div1.appendTo(div2);
      div2.appendTo(div3);

      div3.appendTo($("#row" + y));
      div4.appendTo("#searchResults");
      div6.appendTo("#searchResults");
      $(".materialboxed").materialbox();
      $(".modal").modal();
    }
  }
}
