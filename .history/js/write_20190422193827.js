"use strict";

var xm = new Vue({
  el: "#app",
  data: {
    show: false,
    show1: true,
    show2: false,
    tshow: true,
    ForumCate: [],
    //论坛分类
    changeRed: -1,
    Ptitle: '',
    //论坛标题
    Pcontent: '',
    //论坛内容
    Pcomment: '',
    //评论内容
    keyWords: '',
    //搜索关键词
    replyComment: '',
    //回复评论的内容,
    currentComment: {},
    //当前查看的评论,
    currentPostId: '',
    currentCommentId: '',
    selectedCatId: '',
    postIndex: -1,
    isCreated: false,
    //是否创建了富文本
    KindEditor: '',
    avtar: '',
    // text: '哈哈哈',
    ishide: false
  },
  methods: {
    fromShow: function fromShow() {
      this.show = !this.show;
    },
    btnChange: function btnChange(selectedCatId, index) {
      //写论坛 点击添加颜色
      this.changeRed = index;
      this.selectedCatId = selectedCatId;
    },
    pulishChange: function pulishChange() {
      var _this = this;

      //发布论坛
      if (this.Ptitle.trim() == '') {
        warn.alert('请输入标题!'); // this.text = "请输入标题"
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

      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/publishPost"),
        data: {
          info_id: this.selectedCatId,
          title: this.Ptitle,
          content: editor.html(),
          picture: this.avtar
        },
        dataType: 'json',
        success: function success(res) {
          _this.allList = res.data;
          _this.selectedCatId = '';
          _this.Ptitle = '';
          _this.Pcontent = '';
          window.location.href = "index.html";
        }
      });
    },
    upChange: function upChange(event) {
      $(event.target).find('input.invisible').click();
    },
    downImg: function downImg() {
      var that = this;
      var img1 = event.target.files[0];
      console.log(img1);
      var formData = new FormData();
      formData.append('file', img1);
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/postImage"),
        data: formData,
        processData: false,
        async: false,
        contentType: false,
        dataType: "json",
        success: function success(res) {
          if (res.code == 1) {
            that.show1 = false;
            that.show2 = true;
          }

          var image = res.res;
          image = image.replace(".", "");
          xm.avtar = "".concat(api).concat(image);
        }
      });
    },
    showChange: function showChange() {
      this.tshow = false;
    }
  },
  created: function created() {
    var _this2 = this;

    this.$nextTick(function () {
      KindEditor.ready(function (K) {
        _this2.KindEditor = K;
        window.editor = _this2.KindEditor.create('#Ftext', {
          allowImageRemote: false,
          resizeType: 0,
          uploadJson: './kindeditor/php/upload_json.php',
          fileManagerJson: './kindeditor/php/file_manager_json.php',
          allowFileManager: true,
          items: ['bold', 'italic', 'underline', 'image'],
          afterFocus: function afterFocus(e) {
            if (editor.html() == '请输入正文') {
              editor.html('');
              $('.ke-edit-iframe').contents().find('.ke-content').css('color', 'black');
            }
          },
          afterBlur: function afterBlur(e) {
            if (editor.html() == '<br/>' || editor.html() == '') {
              editor.html('请输入正文');
              $('.ke-edit-iframe').contents().find('.ke-content').css('color', 'rgba(159, 159, 159, 1)');
            }
          },
          afterCreate: function afterCreate(e) {
            this.html('请输入正文');
            $('.ke-edit-iframe').contents().find('.ke-content').css('color', 'rgba(159, 159, 159, 1)');
          }
        });
      });
    }); // 获取论坛分类

    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/getForumCate"),
      async: true,
      data: {},
      dataType: 'json',
      success: function success(res) {
        console.log(res);
        _this2.ForumCate = res.result;
      }
    });
  },
  components: {
    "cp-case": indexCase
  }
});