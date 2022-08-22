
export function setUser(user: any, rememberMe: boolean = false) {

    if (isAuthenticated()) {
        return;
    }

    if (rememberMe) {
        localStorage.setItem('auth-uid', user._id);
        return;
    }

    sessionStorage.setItem('auth-uid', user._id);

}

export function isAuthenticated() {
    return !!getUser();
}

export function getUser() {
    const uid = sessionStorage.getItem('auth-uid') || localStorage.getItem('auth-uid');
    return uid ? uid : null;
}

// TODO: Validar que cosa eliminar no eliminar a boleo
export function logout() {
    sessionStorage.removeItem('auth-uid');
    localStorage.removeItem('auth-uid');
}




