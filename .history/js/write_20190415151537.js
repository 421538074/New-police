var xm = new Vue({
    el: "#app",
    data: {
        show: false,
        show1: true,
        show2: false,
        tshow: true,
        ForumCate: [], //论坛分类
        changeRed: -1,
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
        avtar: '',
        // text: '哈哈哈',
        ishide: false
    },
    methods: {
        fromShow() {
            this.show = !this.show
        },
        btnChange(selectedCatId, index) { //写论坛 点击添加颜色
            this.changeRed = index;
            this.selectedCatId = selectedCatId;
        },
        pulishChange() { //发布论坛
            if (this.Ptitle.trim() == '') {
                warn.alert('请输入标题!');

                // this.text = "请输入标题"
                // this.ishide = true
                // console.log(this.percentList)
                return false;
            } else if (editor.html().trim() == '') {
                warn.alert('请输入内容!');
                return false;
            } else if (this.selectedCatId == '') {
                warn.alert('请选择分类标签');
                return false;
            }
            var imgUrl = sessionStorage.getItem("img");
            imgUrl = imgUrl.replace('.', '')
            $.ajax({
                type: "post",
                url: `${api}/index/api/publishPost`,
                data: {
                    info_id: this.selectedCatId,
                    title: this.Ptitle,
                    content: editor.html(),
                    picture: imgUrl
                },
                dataType: 'json',
                success: (res) => {
                    this.allList = res.data;
                    this.selectedCatId = '';
                    this.Ptitle = '';
                    this.Pcontent = '';
                    sessionStorage.clear()
                    window.location.href = "index.html"
                }
            })
        },
        upChange: function upChange(event) {
            $(event.target).find('input.invisible').click();
        },
        downImg() {
            var that = this
            var img1 = event.target.files[0];
            console.log(img1);
            var formData = new FormData();
            formData.append('file', img1);
            $.ajax({
                type: "post",
                url: `${api}/index/api/postImage`,
                data: formData,
                processData: false,
                async: false,
                contentType: false,
                dataType: "json",
                success: function success(res) {
                    if (res.code == 1) {
                        that.show1 = false
                        that.show2 = true
                    }
                    sessionStorage.setItem("img", res.res);
                    var image = res.res
                    image = image.replace(".", "");
                    xm.avtar = `${api}${image}`
                },
            });
        },
        showChange() {
            this.tshow = false
        }
    },
    created() {
        this.$nextTick(() => {
            KindEditor.ready((K) => {
                this.KindEditor = K;
                window.editor = this.KindEditor.create('#Ftext', {
                    allowImageRemote: false,
                    resizeType: 0,
                    uploadJson: './kindeditor/php/upload_json.php',
                    fileManagerJson: './kindeditor/php/file_manager_json.php',
                    allowFileManager: true,
                    items: ['bold', 'italic', 'underline', 'image'],
                    afterFocus:function(e) {
                        if(editor.html() == '请输入正文') {
                            editor.html('');
                            $('.ke-edit-iframe').contents().find('.ke-content').css('color','black');
                        }
                    },
                    afterBlur:function(e) {
                        if(editor.html() == '<br/>' || editor.html() == '') {
                            editor.html('请输入正文');
                            $('.ke-edit-iframe').contents().find('.ke-content').css('color','rgba(159, 159, 159, 1)');                            
                        }
                    },
                    afterCreate:function(e) {
                        this.html('请输入正文');
                        $('.ke-edit-iframe').contents().find('.ke-content').css('color','rgba(159, 159, 159, 1)');      
                    }
                });
            });
        })

        // 获取论坛分类
        $.ajax({
            type: "post",
            url: `${api}/index/api/getForumCate`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                console.log(res)
                this.ForumCate = res.result;
            }
        });
    },
    components: {
        "cp-case": indexCase,
    },

})