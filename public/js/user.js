$.get("/api/search/thigh", function(data) {
  console.log(data);
});

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
    var br = $("<br>");
    div4 = $("<div>");
    div4.attr("class", "card-action black text-white");

    div4.text(obj[z].style);
    img.appendTo(div1);
    div1.appendTo(div2);
    div2.appendTo(div3);
    div4.appendTo(div2);
    div3.appendTo($("#row" + r));
  }
}

var example = [
  {
    url:
      "https://images.unsplash.com/photo-1473106995954-101fc128abc3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ddfb9b9baf94385db2191b9b3ef1e07&auto=format&fit=crop&w=1650&q=80",
    tag: "Wrist"
  },
  {
    url:
      "https://images.unsplash.com/photo-1473106995954-101fc128abc3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ddfb9b9baf94385db2191b9b3ef1e07&auto=format&fit=crop&w=1650&q=80",
    tag: "Wrist"
  },
  {
    url:
      "https://images.unsplash.com/photo-1473106995954-101fc128abc3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ddfb9b9baf94385db2191b9b3ef1e07&auto=format&fit=crop&w=1650&q=80",
    tag: "Wrist"
  },
  {
    url:
      "https://images.unsplash.com/photo-1473106995954-101fc128abc3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ddfb9b9baf94385db2191b9b3ef1e07&auto=format&fit=crop&w=1650&q=80",
    tag: "Wrist"
  },
  {
    url:
      "https://images.unsplash.com/photo-1473106995954-101fc128abc3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ddfb9b9baf94385db2191b9b3ef1e07&auto=format&fit=crop&w=1650&q=80",
    tag: "Wrist"
  },
  {
    url:
      "https://images.unsplash.com/photo-1473106995954-101fc128abc3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ddfb9b9baf94385db2191b9b3ef1e07&auto=format&fit=crop&w=1650&q=80",
    tag: "Wrist"
  }
];

$(document).ready(function() {
  $(".modal").modal();
  $.get("/api/user", function(data) {
    console.log(data[0].file);
    appendPresearch(data);
  });

  $("select").formSelect();

  $("#cat").on("change", function() {
    selected = $("#cat").val();
    console.log(selected);
    $("#searchResults").html("");
    search(selected, example);
  });

  $("#bod").on("change", function() {
    selected = $("#bod").val();
    console.log(selected);
    $("#searchResults").html("");
    search(selected, example);
  });
});

function search(selected, obj) {
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
      img.attr("src", obj[x].url);

      img.attr("class", "materialboxed");

      var div1 = $("<div>");
      div1.attr("class", "card-image black");

      var div2 = $("<div>");
      div2.attr("class", "card");
      var div3 = $("<div>");
      div3.attr("class", "col s8");
      var br = $("<br>");
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
      img.attr("src", obj[x].url);
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
