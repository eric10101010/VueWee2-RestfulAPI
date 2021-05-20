const logIn = {
    doms:{
        nameInput: document.querySelector('#username'),
        passwordInput: document.querySelector('#password'),
        form: document.querySelector('#form'),
        logInButton: document.querySelector('.submit'),
    },
    data:{
        url: 'https://vue3-course-api.hexschool.io/',
    },
    eventsBinding(){
        const vm = this;
        vm.doms.logInButton.addEventListener('click', vm.methods.logIn);
    },
    methods:{
        logIn(e){
            e.preventDefault();
            const vm = logIn;
            let username = vm.doms.nameInput.value.trim();
            let password = vm.doms.passwordInput.value.trim();
            if (username === '' || password === '') return alert('尚有欄位未填');    
  
            axios.post(`${vm.data.url}admin/logIn`, { username, password })
                 .then(res=>{
                    console.log(res.data);
                    let token = res.data.token;
                    let expired = res.data.expired;
                    document.cookie = `yoyoToken=${token};expires=${new Date(expired)};`;;
                    location.assign("./vueweek2.html");
                 })
                 .catch(err=>{
                    console.dir(err);
                 })
            vm.doms.form.reset();
        }
    },
    init(){
        this.eventsBinding();
    }
  }
  logIn.init();