export function authHeader() {
  // return authorization header with jwt token
  let token = JSON.parse(sessionStorage.token);

  if (user && user.token) {
      return { 'Authorization': 'Bearer ' + user.token };
  } else {
      return {};
  }
}
