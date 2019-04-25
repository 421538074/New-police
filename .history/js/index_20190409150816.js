var xm = new Vue({
    el: "#app",
    data: {
        pIndex: -1,
        show: false,
        isshow1: true,
        hide: false,
        isshade: false,
        isent: -1, //查看文章
        isnum: true, //通知显示数字
        ismore: false, //更多
        isforum: false, //论坛
        isCase: false, //报备
        isauditing: false, //审核中
        isall: false, //全部报备
        iscomment: false, //评论
        isreply: false, //回复
        isspeak: false, //查看回复
        ispass: false, //修改密码
        isshow: false, //报备TAG
        isNone: false, //未搜索到
        isstar: false, //所有报备
        ForumCate: [], //论坛分类
        titleList: [], //论坛列表
        allList: [], //报备列表
        list: [], //报备列表
        seelist: [], //查看回复
        repairSorts: [], //保修类型
        repairList: [], //所有报备
        replaylist: [],
        current: 0,
        changeRed: -1,
        currentActive: -1,
        oneIndex: -1,
        twoIndex: -1,
        currentIndex: 0,
        numIndex: -1,
        commentActive: -1,
        Ptitle: '', //论坛标题
        Pcontent: '', //论坛内容
        Pcomment: '', //评论内容
        keyWords: '', //搜索关键词
        replyComment: '', //回复评论的内容,
        currentComment: {}, //当前查看的评论,
        currentPostId: '',
        currentCommentId: '',
        selectedCatId: '',
        postIndex: -1,
        isCreated: false, //是否创建了富文本
        KindEditor: '',
        userName: '',
        Opsw: '',
        Npsw: '',
        Tpsw: '',
        length: '', // 回复评论条数
    },
    methods: {
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
        goClose() { //关闭遮罩
            this.isshade = false
            this.isforum = false
            this.isCase = false
            this.isCreat = false
            this.isCroom = false
            this.iscommonly = false
            this.isall = false
            this.isshade = false
            this.isChatting = false
            this.isspeak = false
            $("body").removeClass("bod")
        },
        appChange() {
            sessionStorage.setItem('id', 1)
        },
        gouser() { //跳转我的主页
            sessionStorage.setItem('id', 2)
            window.location.href = "user.html"
        },
        readChange(item, index, e) { //产看文章
            if (this.postIndex != index) {
                this.postIndex = index;
            } else {
                this.postIndex = -1;
            }
            this.pIndex = this.pIndex == index ? -1 : index
        },
        comChange(index) { //查看评论
            this.commentActive = this.commentActive == index ? -1 : index
        },
        goname() { //个人信息
            $(".header_two").slideToggle(200);
            $(".answer").slideUp(200);
        },
        goAnswer() { //通知
            $(".answer").slideToggle(200);
            $(".header_two").slideUp(200);
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
        goPass() { //修改密码
            this.isshade = true
            this.ispass = true
        },
        writeReply() { //写论坛
            window.location.href = "write.html"
        },
        reportChange() { //打开报备
            this.isshade = true
            this.isCase = true
            $.ajax({
                type: "post",
                url: `${api}/index/api/repairSorts`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    this.repairSorts = res.data;
                }
            })
        },
        reChange() { //报备
            var userContent = $(".wishContent").val();
            $.ajax({
                type: "post",
                url: `${api}/index/api/publishRepair`,
                async: true,
                data: {
                    repair_sort: 1,
                    content: userContent
                },
                dataType: 'json',
                success: (res) => {
                    this.isshade = false
                    this.isCase = false
                    this.roomList = res.data;
                }
            })
        },
        allChange() { //所有报备
            this.isshade = true
            this.isall = true
            $.ajax({
                type: "post",
                url: `${api}/index/api/repairLists`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.repairList = res.data;
                }
            })

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
        btnChange(selectedCatId, index) { //写论坛 点击添加颜色
            this.changeRed = index;
            this.selectedCatId = selectedCatId;
        },
        tagChange() { //我的报备
            this.isshow = !this.isshow
            if (this.isshow) {
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/myRepair`,
                    data: {},
                    dataType: 'json',
                    success: (res) => {
                        console.log(res)
                        this.allList = res.data
                    }
                })
            } else {
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/repairList`,
                    data: {},
                    dataType: 'json',
                    success: (res) => {
                        console.log(res)
                        this.allList = res.data
                    }
                })
            }
        },
        banner(index) {
            this.currentIndex = 3;
            this.ismore = false
            if (index != this.numIndex) {
                this.numIndex = index;
            }
            var num = index + 4;
            var list = this.ForumCate
            var id = list[num].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/getForumList`,
                data: {
                    cate_id: id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.titleList = res.result
                    this.postIndex = -1
                    this.commentActive = -1
                    // this.numIndex = -1
                    if (this.titleList.length == 0) {
                        this.isNone = true;
                    } else {
                        this.isNone = false;
                    }
                }
            })
        },
        bannerChange(index) { // 获取论坛分类
            if (index != this.currentIndex && index != 3) {
                this.currentIndex = index;
            }
            if (index == 3) {
                this.ismore = true
                return
            } else {
                this.ismore = false
            }
            var list = this.ForumCate
            var id = list[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/getForumList`,
                data: {
                    cate_id: id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.postIndex = -1
                    this.commentActive = -1
                    this.numIndex = -1
                    this.titleList = res.result;
                    if (this.titleList.length == 0) {
                        this.isNone = true;
                    } else {
                        this.isNone = false;
                    }
                }
            })
        },
        pulishChange() { //发布论坛
            if (this.Ptitle.trim() == '') {
                warn.alert('请输入标题!');
                return false;
            } else if (editor.html().trim() == '') {
                warn.alert('请输入内容!');
                return false;
            } else if (this.selectedCatId == '') {
                warn.alert('请选择分类标签');
                return false;
            }
            $.ajax({
                type: "post",
                url: `${api}/index/api/publishPost`,
                data: {
                    info_id: this.selectedCatId,
                    title: this.Ptitle,
                    content: editor.html()
                },
                dataType: 'json',
                success: (res) => {
                    this.allList = res.data;
                    this.bannerChange(this.currentIndex);
                    this.selectedCatId = '';
                    this.Ptitle = '';
                    this.Pcontent = '';
                    this.goClose();
                }
            })
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
                            this.lookchange(this.currentPostId, this.currentCommentId);
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
        searchChange() { //搜素
            $.ajax({
                type: "post",
                url: `${api}/index/api/postSearch`,
                data: {
                    keyWords: this.keyWords
                },
                dataType: 'json',
                success: (res) => {
                    this.titleList = res.data;
                    if (res.msg == "暂无数据！") {
                        this.isNone = true
                    } else {
                        this.isNone = false
                    }
                }
            })
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
                        this.bannerChange(this.currentIndex);
                    }
                },
                error: (err) => {

                }
            });
        },
        onli() {
            this.isstar = !this.isstar
            this.show = !this.show
            $.ajax({
                type: "post",
                url: `${api}/index/api/repairLists`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.list = res.data
                }
            })
        },
        on() {
            this.isstar = !this.isstar
            this.show = !this.show
            $.ajax({
                type: "post",
                url: `${api}/index/api/myRepairs`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.list = res.data
                }
            })
        },
        getCharaLength(str) {
            return str.replace(/[\u0391-\uFFE5]/g, "aa").length > 239;
        },
        filterImg(content) {
            return content.replace('作者', '啊啊啊啊===作者');
        },
        goUser() { //通知跳转
            window.location.href = "user.html?id=1"
        },

    },
    created() {
        getNotice();
        KindEditor.ready((K) => {
            this.KindEditor = K;
        });
        // 获取论坛分类
        $.ajax({
            type: "post",
            url: `${api}/index/api/getForumCate`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                var temp = res.result;
                temp.splice(3, 0, {
                    title: "更多"
                })
                this.ForumCate = temp;
                this.bannerChange(0);
            }
        });

        // 所有报备
        $.ajax({
            type: "post",
            url: `${api}/index/api/repairList`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                this.allList = res.data
            }
        })
        // 聊天
        $.ajax({
            type: "post",
            url: `${api}/index/api/chatroomList`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                this.chatList = res.data
            }
        })

        // 通知
        $.ajax({
            type: "post",
            url: `${api}/index/api/allReplay`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                this.length = res.data.comment.length + res.data.replay.length
            }
        })



        this.userName = sessionStorage.getItem("username")
        if (this.userName == null) {
            window.location.href = "login.html"
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
    }
})


//封装一个限制字数方法
var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
}

//监听输入
$(".wishContent").on('input propertychange', function () {
    var userDesc = $(this).val();
    var len;
    if (userDesc) {
        len = checkStrLengths(userDesc, 60);
    } else {
        len = 0
    }
    $(".wordsNum").html('60字以内' + len + '/60');
});

function getNotice() {
    $.ajax({
        type: "post",
        url: `${api}/index/api/allReplay`,
        async: true,
        dataType: 'json',
        success: (res) => {
            xm.list = res.data.comment;
            xm.replaylist = res.data.replay;
        }
    });
}