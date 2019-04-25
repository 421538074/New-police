var xm = new Vue({
    el: "#app",
    data: {
        userName: '',
        isbook: false,
        isplug: false,
        isshade: false,
        isanswer: false,
        isUser: false,
        isPage: true,
        istotur: false,
        ispass: false,
        plugList: [],
        bookList: [],
        tutorialList: [],
        musicList: [],
        musicList1: [],
        musicList2: [],
        list: [],
        musicSort: [], //音乐分类
        bookSort: [], //书籍分类
        tutorialSort: [], //教程分类
        tutorialList1: [], //研判工具
        current1: 0,
        number: 0,
        description: '',
        create_at: '',
        name: '',
        data_url: '',
        picture: '',
        download_status: '',
        Tdescription: '',
        Tname: '',
        Tpicture: '',
        Tdata_url: '',
        message: 1,
        Color: -1,
        total: 8, // 记录总条数
        // display: 8, // 每页显示条数
        current: 1, // 当前的页数
        totalone: 8, // 记录总条数
        currentone: 1, // 当前的页数
        Opsw: '',
        Npsw: '',
        Tpsw: '',
        hide: false,
        text: '',
        text1: '',
        //播放列表
        musicListSelf:['../music/灰色 - 绿茶.mp3','../music/玄觞、双笙 - 千梦.mp3'],
        currentMusicIndex:0,
        currentMusic:''
    },
    methods: {
        playMusic(){
            console.log(this.$refs.myPlayer);
            this.$refs.myPlayer.play();
        },
        nextMusic() {
            this.currentMusicIndex += 1;
            this.currentMusic = this.musicListSelf[this.currentMusicIndex];
            console.log(this.currentMusic);
            if(this.currentMusicIndex == this.musicListSelf.length) {
                this.$refs.myPlayer.src = this.musicListSelf[0];
            }
            else {
                this.$refs.myPlayer.src = this.musicListSelf[this.currentMusicIndex];
            }
        },
        goClose() { //关闭遮罩
            this.isshade = false
            this.ispass = false
            this.istotur = false
            this.isplug = false
            this.isbook = false
            $("body").removeClass("bod")
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
        goPass() { //修改密码
            this.isshade = true
            this.ispass = true
        },
        gouser() { //跳转我的主页
            window.location.href = "user.html"
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
        goname() { //个人信息
            $(".header_two").slideToggle("400");
        },
        goAnswer() { //通知
            $(".answer").slideToggle("400");
        },
        bookChange(book_id, index) { //书籍分类
            this.current1 = index
            $.ajax({
                type: "post",
                url: `${api}/index/api/bookList`,
                async: true,
                data: {
                    page: 1,
                    book_id: book_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.bookList = res.data
                    this.total = res.data.length
                    sessionStorage.setItem('book_id', book_id)
                }
            })
        },
        turtorChange(index, tutorial_id) { //教程分类
            this.number = index
            if (tutorial_id) {
                console.log(111)

                $.ajax({
                    type: "post",
                    url: `${api}/index/api/tutorialList`,
                    async: true,
                    data: {
                        page: 1,
                        tutorial_id: tutorial_id
                    },
                    dataType: 'json',
                    success: (res) => {
                        if(res.code == 0) {
                            warn.alert(res.msg);
                            return;
                        }
                        this.hide = true
                        this.tutorialList = res.data
                        this.totalone = res.data.length
                        sessionStorage.setItem('tutorial_id', tutorial_id)
                    }
                })
            } else {
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/pluginList`,
                    async: true,
                    data: {
                        page: 1,
                        tool_id: index + 4
                    },
                    dataType: 'json',
                    success: (res) => {
                        this.hide = false
                        this.tutorialList1 = res.data
                    }
                })
            }

        },
        openChange(index) { //插件详情页
            $.ajax({
                type: "post",
                url: `${api}/index/api/toolDetail`,
                async: true,
                data: {
                    tool_id: index
                },
                dataType: 'json',
                success: (res) => {
                    this.isshade = true
                    this.isplug = true
                    this.create_at = res.data.create_at
                    this.description = res.data.description
                    this.name = res.data.name
                    this.picture = res.data.picture
                    this.data_url = res.data.data_url
                    this.download_status = res.data.download_status
                    sessionStorage.setItem('url', JSON.stringify(res.data.data_url))
                }
            })
        },
        bookDown(index) { //书记闲情
            $.ajax({
                type: "post",
                url: `${api}/index/api/toolDetail`,
                async: true,
                data: {
                    tool_id: index
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.isshade = true
                    this.isbook = true
                    this.create_at = res.data.create_at
                    this.description = res.data.description
                    this.name = res.data.name
                    this.picture = res.data.picture
                    this.data_url = res.data.data_url
                    this.download_status = res.data.download_status
                    sessionStorage.setItem('url', JSON.stringify(res.data.data_url))
                }
            })
        },
        Tdown(index) { //教程详情页 
            $.ajax({
                type: "post",
                url: `${api}/index/api/tutorialDetail`,
                async: true,
                data: {
                    tutorial_id: index
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.isshade = true
                    this.istotur = true
                    this.Tdescription = res.data.description
                    this.Tname = res.data.tutorial_name
                    this.Tpicture = res.data.picture
                    this.Tdata_url = res.data.tutorial_url
                    this.Tdownload_status = res.data.download_status
                    sessionStorage.setItem('url', JSON.stringify(res.data.data_url))
                }
            })
        },
        upDown() {
            var url = sessionStorage.getItem('url')
            url = url.replace("\"", "").replace("\"", "");;
            console.log(url)
            var down = api + "/" + url
            console.log(down)
            var $form = $('<form></form>');
            $form.attr('action', down);
            $form.appendTo($('body'));
            $form.submit();
        },
        pagechange: function (currentPage) { //书籍分页
            var book_id = sessionStorage.getItem('book_id')
            console.log(book_id)
            $.ajax({
                type: "post",
                url: `${api}/index/api/bookList`,
                async: true,
                data: {
                    page: currentPage,
                    book_id: book_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.bookList = res.data
                    this.total = res.data.length
                }
            })
        },
        pagechangeOne: function (currentPage) { //教程
            var tutorial_id = sessionStorage.getItem('tutorial_id')
            $.ajax({
                type: "post",
                url: `${api}/index/api/tutorialList`,
                async: true,
                data: {
                    page: 1,
                    tutorial_id: tutorial_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.tutorialList = res.data
                    this.totalone = res.data.length
                }
            })
        },
        add(id) { //音乐下一页
            this.musicList
            var num = Math.ceil(this.musicList[1].length / 7)
            this.message++
            if (this.message > num) {
                this.message = num
                return
            }
            $.ajax({
                type: "post",
                url: `${api}/index/api/muisicList`,
                async: true,
                data: {
                    page: this.message,
                    music_id: id
                },
                dataType: 'json',
                success: (res) => {
                    this.musicList[id] = res.data
                }
            })
        },
        reduce(id) { //音乐上一页
            this.message--
            if (this.message < 1) {
                this.message = 1
                return
            }
            console.log(this.message)
            $.ajax({
                type: "post",
                url: `${api}/index/api/muisicList`,
                async: true,
                data: {
                    page: this.message,
                    music_id: id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.musicList[id] = res.data
                }
            })
        },
        musicDown(data_url) { //音乐下载
            console.log(data_url)
            //必须同源才能下载
            var alink = document.createElement("a");
            alink.href = this.imgs;
            alink.download = `${api}/${data_url}`;
            console.log(alink.download)
            alink.click();
        },
        ColorChange(index) {
            // console.log(id)
            console.log(index)
            this.Color = index
            // this.Color = this.Color == index ? -1 : index
        },
        Osearch() {
            $.ajax({
                type: "post",
                url: `${api}/index/api/toolSearch`,
                async: true,
                data: {
                    type: 1,
                    keyWords: this.text
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.bookList = res.data
                }
            })
        },
        Tsearch() {
            $.ajax({
                type: "post",
                url: `${api}/index/api/toolSearch`,
                async: true,
                data: {
                    type: 2,
                    keyWords: this.text1
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.tutorialList1 = res.data
                }
            })
        }
    },
    mounted() {
        this.currentMusic = this.musicListSelf[this.currentMusicIndex]
    },
    components: {
        "cp-page": indexPage,
        "cp-banner": indexBanner,
    },
    created() {
        $.ajax({
            type: "post",
            url: `${api}/index/api/toolCenter`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                this.plugList = res.data.plugin
                this.musicList = res.data.music.list
                this.musicSort = res.data.music.sort
                this.bookList = res.data.book.list
                this.bookSort = res.data.book.sort
                this.tutorialList = res.data.tutorial.list
                var temp = res.data.tutorial.sort
                temp.splice(0, 0, {
                    name: "研判工具"
                }, {
                    name: '技战法'
                })
                this.tutorialSort = temp;

                this.total = res.data.book.list.length
                if (this.total < 8) {
                    this.total = 8
                }
                this.totalone = res.data.tutorial.list.length
                if (this.totalone < 8) {
                    this.totalone = 8
                }
                sessionStorage.setItem('length', JSON.stringify(res.data.plugin.length))
            }
        })

        $.ajax({
            type: "post",
            url: `${api}/index/api/pluginList`,
            async: true,
            data: {
                page: 1,
                tool_id: 4
            },
            dataType: 'json',
            success: (res) => {
                this.hide = false
                this.tutorialList1 = res.data
            }
        })
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },
        filterImg(img) {
            if(img == null) {
                return 'img/logo.png';
            }
            return `${api}${img}`;
        }  
    },

})



$(function () {
    $(".nav_uu li").each(function (index) {
        $(this).click(function () {
            $("li.blue").removeClass("blue");
            $(this).addClass("blue");
        });
    })
});


$(".index_right span").each(function (index) {
    $(this).click(function () {
        $("span.BannerImg").removeClass("BannerImg");
        $(this).addClass("BannerImg");
    });
})



$('.nav_uu').on('click', 'li', function (e) {
    var target = e.target;
    var id = $(target).data("to");
    $('html,body').animate({
        scrollTop: $('#' + id).offset().top
    }, 800);
});



// 插件
var length = sessionStorage.getItem("length");
$(".zxf").createPage({
    pageNum: Math.ceil(length / 8),
    current: 1,
    backfun: function (e) {
        var page = e.current
        console.log(page)
        $.ajax({
            type: "post",
            url: `${api}/index/api/pluginList`,
            async: true,
            data: {
                page: page,
                tool_id: 1
            },
            dataType: 'json',
            success: (res) => {
                xm.plugList = res.data
            }
        })
    }
});