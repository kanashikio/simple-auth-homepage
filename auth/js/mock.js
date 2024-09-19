$(document).ready(function () {
  const mockApi = {
    post: function (url, data) {
      if (url === apiURL) {
        const userStorage = JSON.parse(localStorage.getItem("users")) || [];
        userStorage.push(JSON.parse(data));
        localStorage.setItem("users", JSON.stringify(userStorage));
        return { success: true, user: JSON.parse(data) };
      }
      return { success: false };
    },
    get: function (url, query) {
      if (url === apiURL) {
        const userStorage = JSON.parse(localStorage.getItem("users")) || [];
        if (query.username && query.password) {
          const user = userStorage.find(
            (user) =>
              user.username === query.username &&
              user.password === query.password
          );
          if (user) {
            return { success: true, users: [user] };
          }
          return { success: false, message: "Invalid username or password." };
        } else {
          return { success: true, users: userStorage };
        }
      }
      return { success: false };
    },
  };

  $.ajax = function (options) {
    const { url, type, data, success, error } = options;

    let response;
    if (type === "POST") {
      response = mockApi.post(url, data);
    } else if (type === "GET") {
      const queryParams = new URLSearchParams(data);
      response = mockApi.get(url, Object.fromEntries(queryParams.entries()));
    }

    if (response && response.success) {
      success && success(response);
    } else {
      error && error(null, "error", response.message || "Error occurred");
    }
  };
});
