const checkForToken = () => {
  const auth = localStorage.getItem("token") ? true : false;
  return auth;
};

const authorizeToken = async () => {
  if (!checkForToken()) return false;

  const token = localStorage.getItem("token");

  const authorize = await fetch("http://localhost:8000/auth/authenticate", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await authorize.json();

  const auth = { name: data.user.name, auth: data.message };

  return auth;
};

export { authorizeToken };
