export const userService = {
    login,
    logout,
    register
}

function login(username, password) {
    const formData = new FormData()
    formData.append('username', username);
    formData.append('password', password)
    const requestOptions = {
        method: 'POST',
        body: formData
    }

    return fetch(`http://localhost:8000/api/token/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user)
            // login successful if there's a jwt token in the response
            if (user.access) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function register(username, email, password) {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    const requestOptions = {
        method: 'POST',
        body: formData
    }

    return fetch(`http://localhost:8000/api/register/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user)
            // login successful if there's a jwt token in the response
            if (user.access) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
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