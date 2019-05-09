var vm = avalon.define({
    $id: "app",
    isrole: false,
    //选择登录角色
    ispolice: true,
    //警员登录
    ismatron: false,
    //管理登录
    isorder: false,
    //接单员登录
    isregister: false,
    //注册
    Oname: '',
    Opsw: '',
    ip: '127.0.0.1',
    Pname: '',
    Ppsw: '',
    //注册
    Gname: '',
    Gpsw: '',
    Ggpsw: '',
    goBack: function goBack() {
        this.ispolice = false;
        this.ismatron = false;
        this.isorder = false;
        this.isrole = true;
    },
    goEnter: function goEnter() {
        //跳转登录
        this.isregister = false;
        this.ispolice = true;
    },
    goRegister: function goRegister() {
        //跳转注册
        this.isregister = true;
        this.ispolice = false;
    },
    goOrder: function goOrder() {
        this.isrole = false;
        this.isorder = true;
    },
    goPolice: function goPolice() {
        this.isrole = false;
        this.ispolice = true;
    },
    goMatron: function goMatron() {
        window.location.href = "".concat(api, "/index/admin/login.html");
    },
    orderEnter: function orderEnter() {
        //接单员登录
        $.ajax({
            type: "post",
            url: "".concat(api, "/index/api/receiverLogin"),
            async: true,
            data: {
                name: this.Oname,
                password: this.Opsw
            },
            dataType: 'json',
            success: function success(res) {
                if (res.code == 1) {
                    window.location.href = 'order.html';
                } else {
                    warn.alert(res.msg);
                }
            }
        });
    },
    policeEnter: function policeEnter() {
        //警员登录
        var that = this;
        $.ajax({
            type: "post",
            url: "".concat(api, "/index/api/policeLogin"),
            async: true,
            data: {
                ip: this.ip,
                name: this.Pname,
                password: this.Ppsw
            },
            dataType: 'json',
            success: function success(res) {
                sessionStorage.setItem("username", that.Pname);

                if (res.code == 1) {
                    window.location.href = 'index.html';
                } else {
                    warn.alert(res.msg);
                }
            }
        });
    },
    poloceRegister: function () {
        var that = this;
        if (this.Gpsw == this.Ggpsw) {
            $.ajax({
                type: "post",
                url: "".concat(api, "/index/api/getRegister"),
                async: true,
                data: {
                    nickname: this.Gname,
                    password: this.Gpsw
                },
                dataType: 'json',
                success: function success(res) {
                    console.log(res)
                    if (res.code == 1) {
                        that.Gname=''
                        that.Gpsw=''
                        that.Ggpsw=''
                        // window.location.href = 'index.html';
                        warn.alert(res.msg);
                    }else{
                        warn.alert(res.msg);
                    }
                }
            });
        } else {
            warn.alert("密码不一致");
        }

    }
});
jQuery.support.cors = true






