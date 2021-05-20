const form = document.querySelector('#form');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const api = 'https://vue3-course-api.hexschool.io';
const path ='item666';
function login (e) {
    e.preventDefault();
    const url = `${api}/admin/signin`;
    const user = {
        username: username.value,
        password: password.value,
    }
    console.log(url)
    console.log(user)
    axios.post(url, user).then((res) => {
        if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `yoyo = ${token}; expires = ${new Date(expired)}; path=/`;
            window.location = './vueweek2.html';
        } else {
            alert(res.data.message);
        }
    }).catch((error) => {
        console.log(error);
        return alert(`登入失敗`);
    })

}

form.addEventListener('submit', login);