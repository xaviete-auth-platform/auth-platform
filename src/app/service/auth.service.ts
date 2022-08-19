
export function setUser(user: any, rememberMe: boolean = false) {

    if (isAuthenticated()) {
        return;
    }

    if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
        return;
    }

    sessionStorage.setItem('user', JSON.stringify(user));

}

export function isAuthenticated() {
    return !!getUser();
}

export function getUser() {
    const user = sessionStorage.getItem('user') || localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// TODO: Validar que cosa eliminar no eliminar a boleo
export function logout() {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
}




