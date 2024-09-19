const apiURL = "http://ali.com/api/"; //sample API

function checkIfLoggedIn() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const currentPage = window.location.hash;

  if (
    loggedInUser &&
    (currentPage === "#/login" || currentPage === "#/sign-up")
  ) {
    window.location.hash = "#/homepage";
  }
}

function handleSignInFormSubmission() {
  const formInputs = {
    firstName: $("#firstname").val().trim(),
    lastName: $("#lastname").val().trim(),
    nickname: $("#nickname").val().trim(),
    bday: $("#bday").val().trim(),
    cp: $("#cpn").val().trim(),
    street: $("#street").val().trim(),
    city: $("#city").val().trim(),
    province: $("#province").val().trim(),
    username: $("#uname").val().trim(),
    email: $("#e-mail").val().trim(),
    password: $("#password").val().trim(),
  };

  let alertMessage = "";

  $.each(formInputs, function (key, value) {
    if (!value) {
      alertMessage += `Alert: ${key.replace(
        /([A-Z])/g,
        " $1"
      )} field is required and cannot be blank.\n`;
    }
  });

  const textFields = ["firstName", "lastName", "nickname", "city", "province"];
  textFields.forEach((field) => {
    if (/\d/.test(formInputs[field])) {
      alertMessage += `Alert: ${field.replace(
        /([A-Z])/g,
        " $1"
      )} is invalid.\n`;
    }
  });

  const phonePattern = /^(09)\d{9}$/;
  if (!phonePattern.test(formInputs.cp)) {
    alertMessage += "Alert: Phone number is invalid.\n";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(formInputs.email)) {
    alertMessage += "Alert: Invalid email address.\n";
  }

  const userStorage = JSON.parse(localStorage.getItem("users")) || [];
  const usernameExists = userStorage.some(
    (user) => user.username === formInputs.username
  );

  if (usernameExists) {
    alertMessage += "Alert: Username already exists.\n";
  }

  if (formInputs.bday && isNaN(Date.parse(formInputs.bday))) {
    alertMessage += "Alert: Date of Birth must be a valid date.\n";
  }

  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  if (alertMessage) {
    alert(alertMessage);
  } else {
    const newUser = {
      fullName: `${formInputs.firstName} ${formInputs.lastName}`,
      nickname: formInputs.nickname,
      birthday: formInputs.bday,
      age: calculateAge(formInputs.bday),
      phoneNumber: formInputs.cp,
      address: `${formInputs.street}, ${formInputs.city}, ${formInputs.province}`,
      username: formInputs.username,
      email: formInputs.email,
      password: formInputs.password,
    };

    $.ajax({
      url: apiURL,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(newUser),
      success: function (response) {
        console.log("User successfully registered via API:", response);
        alert("Account created!");
        $("#signUP")[0].reset();
      },
      error: function (error) {
        console.error("Error registering user:", error);
        alert("Error saving data.");
      },
    });
  }
}
function handleLoginFormSubmission() {
  const loginInputs = {
    username: $("#loginUsername").val().trim(),
    password: $("#loginPassword").val().trim(),
  };

  $.ajax({
    url: apiURL,
    type: "GET",
    data: {
      username: loginInputs.username,
      password: loginInputs.password,
    },
    success: function () {
      const userStorage = JSON.parse(localStorage.getItem("users")) || [];
      const user = userStorage.find(
        (user) =>
          user.username === loginInputs.username &&
          user.password === loginInputs.password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.hash = "#/homepage";
      }
    },
    error: function (error) {
      console.error("Error logging in:", error);
      alert("Log In failed. " + error);
    },
  });
  $("#loginform")[0].reset();
}

function handleLogout() {
  localStorage.removeItem("loggedInUser");
  window.location.hash = "#/login";
}

function displayUsers() {
  $.ajax({
    url: apiURL,
    type: "GET",
    success: function (response) {
      let usersListHtml = "";

      if (response.users && response.users.length > 0) {
        usersListHtml += '<h3 class="text-center mt-5">Registered Users:</h3>';
        response.users.forEach(function (user, index) {
          usersListHtml += `
            <p class="count"><strong>User ${index + 1}:</strong></p>
            <p><strong>Full Name:</strong> ${user.fullName}</p>
            <p><strong>Nickname:</strong> ${user.nickname}</p>
            <p><strong>Birthday:</strong> ${user.birthday} (${
            user.age
          } years old)</p>
            <p><strong>Phone Number:</strong> ${user.phoneNumber}</p>
            <p><strong>Address:</strong> ${user.address}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Password:</strong> ${user.password}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
            <hr>`;
        });
      }

      $("#users-list").html(usersListHtml);
    },
    error: function (error) {
      console.error("Error fetching users:", error);
      alert("Error retrieving users.");
    },
  });
}

function removeUser(index) {
  const userStorage = JSON.parse(localStorage.getItem("users")) || [];
  userStorage.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(userStorage));
  displayUsers();
}

$(document).on("submit", "#signUP", function (event) {
  event.preventDefault();
  handleSignInFormSubmission();
  displayUsers();
});

$(document).on("submit", "#loginform", function (event) {
  event.preventDefault();
  handleLoginFormSubmission();
});

$(document).on("click", ".remove-btn", function () {
  const index = $(this).data("index");
  removeUser(index);
});
