var xm = new Vue({
    el: "#app",
    data: {
        isrole: false, //选择登录角色
        ispolice: true, //警员登录
        ismatron: false, //管理登录
        isorder: false, //接单员登录
        isregister:false, //注册
        Oname: '',
        Opsw: '',
        ip: '127.0.0.1',
        Pname: '',
        Ppsw: '',
        //注册
        Gname:'',
        Gpsw:'',
        Ggpsw:'',
    },
    methods: {
        goBack: function () {
            this.ispolice = false
            this.ismatron = false
            this.isorder = false
            this.isrole = true
        },
        goEnter(){ //跳转登录
            this.isregister =false
            this.ispolice =true
        },
        goRegister(){ //跳转注册
            this.isregister =true
            this.ispolice =false
        },
        goOrder: function () {
            this.isrole = false
            this.isorder = true
        },
        goPolice: function () {
            this.isrole = false
            this.ispolice = true
        },
        goMatron: function () {
            window.location.href=`http://police.pzhkj.cn/index/admin/login.html`
        },
        orderEnter: function () { //接单员登录
            $.ajax({
                type: "post",
                url: `${api}/index/api/receiverLogin`,
                async: true,
                data: {
                    name: this.Oname,
                    password: this.Opsw
                },
                dataType: 'json',
                success: function (res) {
                    if(res.code == 1) {
                        window.location.href = 'order.html';
                    }
                    else {
                        warn.alert(res.msg);
                    }
                }
            })
        },
        policeEnter: function () { //警员登录
            var that =this
            $.ajax({
                type: "post",
                url: `${api}/index/api/policeLogin`,
                async: true,
                data: {
                    ip: this.ip,
                    name: this.Pname,
                    password: this.Ppsw
                },
                dataType: 'json',
                success: function (res) {
                    sessionStorage.setItem("username",that.Pname)
                    if(res.code == 1) {
                        window.location.href = 'index.html';
                    }
                    else {
                        warn.alert(res.msg);
                    }
                }
            })
        }
    },
    created() {
        // getIpAdd((ip) => {
        //     this.ip = ip;
        //     console.log(ip)
        // });
    }
})