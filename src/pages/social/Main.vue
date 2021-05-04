<template>
   <Layout>
        <div>
            <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px">
                <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
                    <el-tab-pane :label="'粉丝 '+ user.followers" name="followers" style="padding: 5px">
                        <div>
                            <div v-if="followersList.length">
                                <el-row style="min-height: 200px; ">
                                    <el-col :span="8" v-for="(item,index) in followersList" :key="item.node.id" style="padding: 10px">
                                        <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                                            <i class="el-icon-star-off"></i>&emsp;
                                            <g-link :to="`/users/${item.node.name}`" style="text-decoration:none;cursor:pointer">{{item.node.name}}</g-link>
                                            <br>
                                            <i class="el-icon-message"></i>&emsp;
                                            <a :href="item.node.htmlUrl" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                                            <br>
                                            <img :src="item.node.avatarUrl" style="width: 100%;border-radius:5px;margin-top: 5px">
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <div style="text-align: center;margin-top: 10px">
                                    <Pager :info="$page.allFollowers.pageInfo"/>
                                </div>
                            </div>
                            <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
                                <font style="font-size: 30px;color:#dddddd ">
                                    <b>(￢_￢) 没有一个粉丝</b>
                                </font>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="'关注 '+ user.following" name="following" style="padding: 5px">
                        <div>
                            <div v-if="followingList.length">
                                <el-row style="min-height: 200px; ">
                                    <el-col :span="8" v-for="(item,index) in followingList" :key="item.node.id" style="padding: 10px">
                                        <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                                            <i class="el-icon-star-off"></i>&emsp;
                                            <g-link :to="`/users/${item.node.name}`" style="text-decoration:none;cursor:pointer">{{item.node.name}}</g-link>
                                            <br>
                                            <i class="el-icon-message"></i>&emsp;
                                            <a style=" text-decoration:none;cursor:pointer">TA的主页</a>
                                            <br>
                                            <img :src="item.node.avatarUrl" style="width: 100%;border-radius:5px;margin-top: 5px">
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <div style="text-align: center;margin-top: 10px">
                                     <Pager :info="$page.allFollowings.pageInfo"/>
                                </div>
                            </div>
                            <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
                                <font style="font-size: 30px;color:#dddddd ">
                                    <b>(￢_￢) 还没有关注一个人</b>
                                </font>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </Layout>
</template>
<page-query>
query ($page: Int) {
  allUser{
    edges {
      node {
        id
        login
        followers
        following
      }
    }
  }
  allFollowers(perPage:9, page:$page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        htmlUrl
        avatarUrl
      }
    }
  }
  allFollowings(perPage:9, page:$page) @paginate {
    pageInfo {
        totalPages
        currentPage
    }
    edges {
        node {
            id
            name
            htmlUrl
            avatarUrl
        }
    }
  }
}
</page-query> 
<script>
import { Pager } from 'gridsome'
export default {
    components: {
        Pager
    },
    data() {
        return {
            activeTab: "followers",
            followers: {
                query: {}
            },
            following: {
                query: {}
            },
        }
    },
    computed: {
        user () {
            return this.$page.allUser.edges[0].node
        },
        followersList () {
            return this.$page.allFollowers.edges
        },
        followingList () {
            return this.$page.allFollowings.edges
        }
        
    },
    mounted() {
        this.onSelect()
    },
    methods: {
        onSelect() {
            switch (this.activeTab) {
                case "followers":
                    break
                case "following":
                    break
                default:
                    break
            }
        }
    }
}
</script>