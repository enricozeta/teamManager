import Vue from 'vue'

export const userService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${Vue.config.ApiUrl}/api/auth/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.accessToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('token', user.accessToken)
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('token');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
