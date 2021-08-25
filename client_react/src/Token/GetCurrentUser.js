export default function GetCurrentUser() {
    let token = localStorage.getItem('access_token');

    return token;
}