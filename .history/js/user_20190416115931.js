Vue.filter('ellipsis', function (value) {
    if (!value) return ''
    if (value.length > 10) {
        return value.slice(0, 1000) + '...'
    }
    return value
})


var xm = new Vue({
    el: "#app",
    data: {
        userName: '',
        hide: '',
        isshade: false,
        ispass: false,
        isname: true,
        isent: true, //查看文章
        iscomment: false, //评论
        isreply: false, //回复
        isspeak: false, //查看回复
        isanswer: false, //通知
        isUser: false, //个人中心
        isGood: false, //删除
        isone: true, //发布
        isbox: false, //回复
        isnone: false, //没有回复，发布
        istwo: false, //没有回复，发布
        ispush: false, //
        isthree: false,
        isWrap: false, //排名切换
        titleList: [],
        list: [],
        comlist: [],
        userlist: [],
        seelist: [], //查看回复
        replayList: [], //回复
        replaylist: [],
        commentList: [], //回复
        msg: "阅读全文",
        num: "123",
        currentActive: -1,
        intergral: '', //总积分
        Pcomment: '', //评论内容
        postIndex: -1,
        commentActive: -1,
        currentIndex: 0,
        currentPostId: '',
        currentCommentId: '',
        oneIndex: -1,
        twoIndex: -1,
        pIndex: -1,
        isdetele: -1, //删除切换
        replyComment: '', //回复评论的内容,
        currentComment: {}, //当前查看的评论,
        Opsw: '',
        Npsw: '',
        Tpsw: '',
        login: '', //积分
        phraise: '',
        post: '',
        intergrals: '', //积分
        tgp: '按总积分排序',
        currentSort:3
    },
    // filters: {
    //     ellipsis(value) {
    //         if (!value) return ''
    //         if (value.length > 10) {
    //             return value.slice(0, 4) + '...'
    //         }
    //         return value
    //     }
    // }, 
    methods: {
        wrapChange(key) { //排名切换
            this.isWrap = !this.isWrap
        },
        gouser() { //跳转我的主页
            window.location.href = "user.html"
        },
        goPass() { //修改密码
            this.isshade = true
            this.ispass = true
        },
        editChange() { //修改密码
            if (this.Npsw == this.Tpsw) {
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/changePwd`,
                    async: true,
                    data: {
                        oldpassword: this.Opsw,
                        newPassword: this.Npsw
                    },
                    dataType: 'json',
                    success: (res) => {
                        console.log(res)
                        if (res.code == 1) {
                            this.isshade = false
                            this.ispass = false
                        } else {
                            warn.alert(res.msg)
                        }

                    }
                })
            } else {
                warn.alert("两次密码输入不一致")
            }
        },
        quitChange() { //退出登录
            $.ajax({
                type: "post",
                url: `${api}/index/api/logout`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    sessionStorage.clear()
                    if (res.code == 1) {
                        window.location.href = 'login.html';
                    } else {
                        warn.alert(res.msg);
                    }
                }
            })
        },
        TagDetele(index) { //删除切换
            if (this.isdetele != index) {
                this.isdetele = index;
            } else {
                this.isdetele = -1;
            }
        },
        cancel() {
            this.isdetele = -1;
        },
        goClose() { //关闭遮罩
            this.isshade = false
            this.ispass = false
            this.isspeak = false
            $("body").removeClass("bod")
        },
        readChange(item, index, e) { //产看文章
            if (this.postIndex != index) {
                this.postIndex = index;
            } else {
                this.postIndex = -1;
            }
            this.pIndex = this.pIndex == index ? -1 : index
        },
        goname() { //个人信息
            $(".header_two").slideToggle("400");
        },
        goAnswer() { //通知
            $(".answer").slideToggle("400");
            $.ajax({
                type: "post",
                url: `${api}/index/api/allReplay`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.list = res.data.comment;
                    this.replaylist = res.data.replay;
                }
            })
        },
        editName() {
            this.isname = !this.isname
        },
        comChange(index) { //查看评论
            this.commentActive = this.commentActive == index ? -1 : index
        },
        gospeak(index) { //回复
            this.currentActive = this.currentActive == index ? -1 : index;
        },
        gospeak1(index) { //查看回复  回复
            this.oneIndex = this.oneIndex == index ? -1 : index
        },
        gospeak2(index) {
            this.twoIndex = this.twoIndex == index ? -1 : index
        },
        lookchange(post_id, comment_id) { //查看回复
            this.currentPostId = post_id;
            this.currentCommentId = comment_id;
            this.currentComment = this.titleList.filter((posts) => {
                return posts.id == post_id
            })[0].comment_list.filter((comments) => {
                return comments.id == comment_id;
            })[0];
            this.isshade = true
            this.isspeak = true
            $.ajax({
                type: "post",
                url: `${api}/index/api/comments`,
                async: true,
                data: {
                    post_id: post_id,
                    comment_id: comment_id,
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res);
                    this.seelist = res.data;
                }
            })
        },
        deleteChange() { //删除
            this.isGood = !this.isGood
        },
        confire() { //修改昵称
            var up_text = document.getElementById("up_text");
            var editor = document.getElementById("editor");
            up_text.innerText = editor.value;
            this.isname = true;
        },
        agreeChange(index) { //回复
            if (this.currentActive == -1) {
                this.currentActive = index
            } else {
                this.currentActive = -1
            }
        },
        send() { //发送
            this.currentActive = -1
        },
        userTag() { //切换
            this.isone = !this.isone
        },
        commentChange(post_id, comment_id, uid, type) { //发布评论
            if (comment_id) {
                if (this.replyComment.trim() == '') {
                    warn.alert('请输入回复内容');
                    return false;
                }
                $.ajax({
                    url: `${api}/index/api/replayComment`,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        post_id: post_id,
                        comment_id: comment_id,
                        comment_uid: uid,
                        content: this.replyComment
                    },
                    success: (res) => {
                        this.replyComment = '';
                        if (type == 1) {
                            this.oneIndex = -1;
                            this.twoIndex = -1;
                            this.currentActive = -1
                            this.lookchange(this.currentPostId, this.currentCommentId);
                            $.ajax({
                                type: "post",
                                url: `${api}/index/api/myPage`,
                                async: true,
                                data: {},
                                dataType: 'json',
                                success: (res) => {
                                    this.commentList = res.data.comments.comment
                                    this.replayList = res.data.comments.replay
                                }
                            })
                        } else {
                            this.currentActive = -1;
                        }
                    },
                    error: (err) => {

                    }
                })
            } else {
                if (this.Pcomment !== "") {
                    $.ajax({
                        type: "post",
                        url: `${api}/index/api/publishComment`,
                        data: {
                            post_id: post_id,
                            content: this.Pcomment
                        },
                        dataType: 'json',
                        success: (res) => {
                            this.Pcomment = ""
                            this.bannerChange(this.currentIndex);
                        }
                    })
                } else {
                    warn.alert("请填写内容")
                }
            }

        },
        //文章点赞
        likePostOrComment(post_id, comment_id, type) {
            var data = {};
            $.ajax({
                url: `${api}/index/api/phraisePost`,
                type: 'post',
                dataType: 'json',
                data: {
                    post_id: post_id,
                    comment_id: comment_id
                },
                success: (res) => {
                    if (type == 1) {
                        //弹窗评论点赞
                        this.lookchange(this.currentPostId, this.currentCommentId);
                    } else {
                        // this.bannerChange(this.currentIndex);
                        $.ajax({
                            type: "post",
                            url: `${api}/index/api/myPage`,
                            async: true,
                            data: {},
                            dataType: 'json',
                            success: (res) => {
                                this.titleList = res.data.post
                            }
                        })
                    }
                },
                error: (err) => {

                }
            });
        },
        getCharaLength(str) {
            return str.replace(/[\u0391-\uFFE5]/g, "aa").length > 239;
        },
        filterImg(content) {
            return content.replace('作者', '啊啊啊啊===作者');
        },
        deteleChange(index) { //删除
            $.ajax({
                type: "post",
                url: `${api}/index/api/deletePost`,
                data: {
                    post_id: index,
                },
                dataType: 'json',
                success: (res) => {
                    this.isdetele = false
                    $.ajax({
                        type: "post",
                        url: `${api}/index/api/myPage`,
                        async: true,
                        data: {},
                        dataType: 'json',
                        success: (res) => {
                            console.log(res)
                            this.titleList = res.data.post
                            this.isdetele = -1
                        }
                    })
                }
            })
        },
        filterImg(value) {
            if (!value) return ''
            if (value.length > 300) {
                return value.slice(0, 300) + '...'
            }
            return value
        },
    },
    components: {
        "cp-banner": indexBanner,
    },
    created() {
        $.ajax({
            type: "post",
            url: `${api}/index/api/myPage`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                this.login = res.data.intergral.login == null ? 0 : res.data.intergral.login;
                this.phraise = res.data.intergral.phraise == null ? 0 : res.data.intergral.phraise;
                this.post = res.data.intergral.post == null ? 0 : res.data.intergral.post;
                this.intergrals = parseInt(this.login) + parseInt(this.phraise) + parseInt(this.post);
                this.titleList = res.data.post
                this.userlist = res.data.intergrals
                this.commentList = res.data.comments.comment
                this.replayList = res.data.comments.replay
                if (res.data.post == 0) {
                    this.isthree = true
                } else {
                    this.isthree = false
                }
                if (res.data.comments.comment == 0 &&
                    res.data.comments.replay == 0
                ) {
                    this.istwo = true
                } else {
                    this.istwo = false
                }



            }
        })

        this.userName = sessionStorage.getItem("username")
        if (getUrlKey("id") == 1) {
            this.isone = false
        }

    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        }
    },

})



$(".read").click(function () {
    $(".content_text").toggleClass("entable");
})


$(".wrap_ul li").each(function (index) {
    $(this).click(function () {
        $("li.Wrap_active").removeClass("Wrap_active");
        $(this).addClass("Wrap_active");
        xm.tgp = $(this).text()
        sortByCat($(this).attr('data-type'));
        xm.isWrap = false

    });
})

function sortByCat(key) {
    switch(key) {
        case '0':
            key = 'intergral';
            break;
        case '1':
            key = 'login';
            break;
        case '2':
            key = 'post';
            break;
        case '3':
            key = 'phraise';
        break;
    }
    xm.userlist.sort(function(a,b) {
        return b[key] - a[key];
    });
}