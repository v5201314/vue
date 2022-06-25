<template>
  <div class="home-container">
    <van-nav-bar title="黑马头条" fixed />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!--导入，注册，并使用 ArticleInfo 组件-->
        <!-- 如果在使用自定义属性名是小驼峰，则绑定属性的时候变 大写 为 小写 用 - 连接-->
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :pubdate="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入需要的组件
import ArticleInfo from '@/components/Article/Articleinfo.vue'

// 按需导入 API 接口
import { getArticleListAPI } from '@/api/articleAPI.js'

getArticleListAPI()

export default {
  name: 'myHome',
  data() {
    return {
      // 页码
      page: 1,
      // 每页显示多少条数据
      limit: 10,
      // 文章的数组
      artlist: [],
      // 是否正在加载下一页数据
      loading: true,
      // 数据是否加载完毕
      finished: false,
      // 是否正在下拉刷新
      isLoading: false
    }
  },
  created() {
    this.initArticlelist()
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticlelist(isRefresh) {
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      // 请求回来的数据若要使用，一定要存放到 data 里面
      if (isRefresh) {
        this.artlist = res
        this.isLoading = false
      } else {
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }

      if (res.length === 0) {
        this.finished = true
      }
    },
    onLoad() {
      this.page++
      this.initArticlelist()
    },
    onRefresh() {
      this.page++
      this.initArticlelist(true)
    }
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;

  .van-nav-bar {
    background-color: #007bff;
  }

  /deep/.van-nav-bar__title {
    color: white;
  }
}
</style>
