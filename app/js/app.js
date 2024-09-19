$(document).ready(function () {
  $.ajax({
    url: "app/template/homepage.html",
    method: "GET",
    dataType: "html",
    success: function (template) {
      homePage = $(template).filter("#homepage-template").html();

      Path.map("#/homepage").to(function () {
        console.log("homepage");
        checkIfLoggedIn();
        const homepageData = {
          homePage: true,
          Homepage: "Homepage",
          Logout: "Log Out",
          logout: "#/login",
          greet: "Welcome!",
          p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacus nisl, sollicitudin eget dui non, ullamcorper luctus turpis. Nulla consequat dolor non sollicitudin rhoncus. Nam vehicula quam eu justo porttitor, ut euismod odio consectetur. Aenean non imperdiet neque. Donec in mauris imperdiet, feugiat lacus id, consectetur leo. Praesent malesuada tempus interdum. Vivamus tincidunt sit amet urna vel porttitor. Suspendisse pretium ac nibh vitae sollicitudin. Etiam consequat orci id lectus porta hendrerit. Pellentesque iaculis est ac diam volutpat sagittis.",
          p2: "Mauris ac luctus est. Aliquam lorem risus, accumsan sit amet augue at, congue pharetra ligula. Fusce vitae pulvinar tellus, quis pellentesque lorem. Nulla at vulputate eros. Donec pretium odio non ligula dignissim, eu scelerisque odio aliquam. Phasellus elementum sapien quis faucibus tincidunt. Nullam vel mauris nisl. Maecenas metus magna, convallis ullamcorper sapien vitae, venenatis consectetur sapien. Mauris volutpat pellentesque quam nec fermentum. Sed at velit volutpat, aliquam sem non, faucibus dolor. Phasellus ultricies ullamcorper ex eu vestibulum. Nam sodales orci eu sapien aliquam, at varius quam posuere.",
          p3: "Nulla pellentesque vehicula massa, quis iaculis nulla pellentesque eu. Integer posuere semper nunc sed porta. Proin et purus non sapien lacinia fermentum. Pellentesque sollicitudin malesuada consequat. Proin pellentesque quam a nibh dictum venenatis. Aliquam lectus nisi, accumsan eget odio et, imperdiet aliquam sapien. In nec convallis nisi. Aliquam fringilla magna non lacus malesuada vehicula.",
          p4: "Quisque venenatis dui at enim ornare semper. Maecenas vitae nulla elit. Nunc vulputate vitae lacus nec mattis. Nulla diam nulla, dignissim vitae faucibus sit amet, sagittis non felis. Mauris at mauris sit amet sem gravida ullamcorper ut eu est. Integer sit amet ex tristique, viverra enim vehicula, egestas nunc. Vivamus vestibulum commodo sapien eget ullamcorper. Praesent malesuada venenatis quam, vitae congue eros faucibus fringilla. Vestibulum pulvinar tincidunt tempor. In at odio tellus. Nulla pellentesque accumsan tincidunt. In ac tellus elit. Mauris hendrerit felis sit amet sagittis efficitur.",
          p5: "Nullam in iaculis magna. Quisque luctus velit ut sodales consequat. Etiam eu lacinia ante. Phasellus eget malesuada justo, pharetra mattis mi. Pellentesque vehicula ex et elit tristique, imperdiet molestie enim bibendum. Sed pretium erat et urna posuere, ac cursus nunc molestie. Vivamus suscipit eu lorem sed aliquam. Vivamus sem metus, ultricies vitae blandit non, sollicitudin ac felis. Cras euismod, arcu porta tempor dapibus, risus est rhoncus justo, eu dapibus augue neque sed neque. Phasellus eu sem et nunc fermentum venenatis. Pellentesque congue sem ac justo euismod hendrerit. Nulla nec finibus nunc. Fusce in dui bibendum, cursus dui quis, convallis magna. Mauris vel porttitor ligula. Sed faucibus, nulla et sollicitudin ullamcorper, nulla eros sagittis ex, sit amet venenatis lacus turpis non enim. Mauris tincidunt posuere pulvinar.",
        };

        $("#target").html(Mustache.render(homePage, homepageData));
        $("#logoutBtn").on("click", handleLogout);
      });
    },
  });
});
