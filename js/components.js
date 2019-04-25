"use strict";

//首页banner
var indexBanner = {
  name: 'cp-banner',
  template: "\n    <div class=\"index_header\">\n        <div class=\"index_content\">\n            <div class=\"index_left pointer\" @click=\"goHome\">\n            </div>\n            <div class=\"index_right\">\n                <span  v-for=\"(item,index) in showList\" @click=\"goIndex(index)\"\n                :class=\"{BannerImg:index == currentIndex}\">\n                {{item}}\n                </span>\n            </div>\n        </div>\n    </div>\n    ",
  data: function data() {
    return {
      showList: ['首页', '应用中心', '个人中心'],
      currentIndex: 1,
      userName: sessionStorage.getItem('userName')
    };
  },
  methods: {
    goIndex: function goIndex(index) {
      console.log(index);
      sessionStorage.setItem('id', index);

      if (index == 0) {
        window.location.href = "index.html";
      } else if (index == 1) {
        window.location.href = "heart.html";
      } else if (index == 2) {
        if (this.userName) {
          window.location.href = "user.html";
        } else {
          warn.alert("请先登录");
        }
      }
    },
    goLogin: function goLogin() {
      this.$emit("go-login");
    },
    goHome: function goHome() {
      window.location.href = "index.html";
    }
  },
  created: function created() {
    this.currentIndex = sessionStorage.getItem('id');
  }
}; //分页

var indexPage = {
  name: 'cp-page',
  template: "\n    <nav>\n    <ul class=\"pagination\">\n      <li class=\"one\" :class=\"{'disabled': current == 1}\"><a href=\"javascript:;\" @click=\"setCurrent(current - 1)\">\u4E0A\u4E00\u9875</a></li>\n    \n      <li v-for=\"p in grouplist\" :class=\"{'active': current == p.val}\" >\n         <span class=\"page_test\" @click=\"setCurrent(p.val)\">{{ p.text }}</span>   \n      </li>\n   \n      <li class=\"one\" :class=\"{'disabled': current == page}\"><a href=\"javascript:;\" @click=\"setCurrent(current + 1)\">\u4E0B\u4E00\u9875</a></li>\n    </ul>\n  </nav>\n    ",
  data: function data() {
    return {
      current: this.currentPage
    };
  },
  props: {
    total: {
      // 数据总条数
      type: Number,
      default: 0
    },
    display: {
      // 每页显示条数
      type: Number,
      default: 8
    },
    currentPage: {
      // 当前页码
      type: Number,
      default: 1
    },
    pagegroup: {
      // 分页条数
      type: Number,
      default: 5,
      coerce: function coerce(v) {
        v = v > 0 ? v : 5;
        return v % 2 === 1 ? v : v + 1;
      }
    }
  },
  computed: {
    page: function page() {
      // 总页数
      return Math.ceil(this.total / this.display);
    },
    grouplist: function grouplist() {
      // 获取分页页码
      var len = this.page,
          temp = [],
          list = [],
          count = Math.floor(this.pagegroup / 2),
          center = this.current;

      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({
            text: this.page - len,
            val: this.page - len
          });
        }

        ;
        return temp;
      }

      while (len--) {
        temp.push(this.page - len);
      }

      ;
      var idx = temp.indexOf(center);
      idx < count && (center = center + count - idx);
      this.current > this.page - count && (center = this.page - count);
      temp = temp.splice(center - count - 1, this.pagegroup);

      do {
        var t = temp.shift();
        list.push({
          text: t,
          val: t
        });
      } while (temp.length);

      if (this.page > this.pagegroup) {
        this.current > count + 1 && list.unshift({
          text: '...',
          val: list[0].val - 1
        });
        this.current < this.page - count && list.push({
          text: '...',
          val: list[list.length - 1].val + 1
        });
      }

      return list;
    }
  },
  methods: {
    setCurrent: function setCurrent(idx) {
      if (this.current != idx && idx > 0 && idx < this.page + 1) {
        this.current = idx;
        this.$emit('pagechange', this.current);
      }
    }
  }
}; //警告

var indexCase = {
  name: 'cp-case',
  prop: ['text'],
  template: "\n    <div class=\"pBox\">\n        <div class=\"tBox\">\n            <span>\u8B66\u544A</span>\n        </div>\n        <div class=\"mBox\">\n            <span>{{text}}</span>\n        </div>\n        <div class=\"bBox\">\n            <span @click=\"back\">\u786E\u8BA4</span>\n        </div>\n    </div>\n    ",
  methods: {
    data: function data() {},
    back: function back() {
      this.$emit("back");
    }
  },
  created: function created() {}
};