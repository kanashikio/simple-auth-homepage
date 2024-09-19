$(document).ready(function () {
  $.ajax({
    url: "auth/template/auth.html",
    method: "GET",
    dataType: "html",
    success: function (template) {
      login = $(template).filter("#login-template").html();
      signup = $(template).filter("#signup-template").html();

      Path.map("#/login").to(function () {
        console.log("login");
        checkIfLoggedIn();
        const loginData = {
          loginPage: true,
          header: "Account Log In",
          usernameLabel: "Username",
          usernamePlaceholder: "Username",
          passwordLabel: "Password",
          passwordPlaceholder: "Password",
          loginButton: "Log In",
          signupPrompt: "Don't have an account yet?",
          signupLink: "#/signup-form",
          signupLinkText: "Sign Up Now!",
        };

        $("#target").html(Mustache.render(login, loginData));
      });

      Path.map("#/signup-form").to(function () {
        console.log("signup");
        checkIfLoggedIn();
        const signupData = {
          signupPage: true,
          header: "Account Sign Up",
          FullName: "Full Name",
          FirstName: "First Name",
          LastName: "Last Name",
          Nickname: "Nickname",
          NicknamePH: "Nickname",
          bday: "Date of Birth",
          format: "mm-dd-yy/yy-mm-dd",
          PhoneNumber: "Phone Number",
          formatCP: "e.g. 09XXXXXXXXX",
          Address: "Address",
          SB: "Street/Barangay",
          City: "City",
          Province: "Province",
          CreateUN: "Create Username",
          Username: "Username",
          Email: "E-mail",
          EMformat: "e.g. abc123@gmail.com",
          CreatePW: "Create Password",
          Password: "Password",
          Submit: "Submit",
          confirm: "Already have an account?",
          link: "#/login",
          Log: "Log In",
        };

        $("#target").html(Mustache.render(signup, signupData));

        displayUsers();
      });

      Path.root("#/login");
      Path.listen();
    },
    error: function (err) {
      console.error("Failed to load template:", err);
    },
  });
});
