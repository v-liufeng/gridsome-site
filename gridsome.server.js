// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // 获取用户信息
    const user = addCollection('User')
    let githubUsername = 'GitHub-Laziji'
    const userData  = await axios.get(`https://api.github.com/users/${githubUsername}`)
    user.addNode({
      login: userData.data.login,
      id: userData.data.id,
      followers: userData.data.followers,
      following: userData.data.following
    })

    // 获取最新动态
    const blog = addCollection('Blog')
    const { data } = await axios.get(`https://api.github.com/users/${githubUsername}/gists?page=1&per_page=1`)
    const blogRes = await axios.get(`https://api.github.com/gists/${data[0]["id"]}`)

    for (const item in blogRes.data.files) {
      blog.addNode({
        id: data[0]["id"],
        title: item,
        content: blogRes.data.files[item]["content"],
        description: blogRes.data["description"],
        createTime: blogRes.data["created_at"] ,
        updateTime: blogRes.data["updated_at"]
      })
    }
    
    // 粉丝列表
    const followers = addCollection('Followers')
    const followersRes = await axios.get(`https://api.github.com/users/${githubUsername}/followers?page=1&per_page=${userData.data.followers}`)
    for (const item of followersRes.data) {
      followers.addNode({
        id: item.id,
        name: item.login,
        htmlUrl: item.html_url,
        avatarUrl: item.avatar_url
      })
    }

    // 我的关注
    const followings = addCollection('Followings')
    const followingsRes = await axios.get(`https://api.github.com/users/${githubUsername}/following?page=1&per_page=${userData.data.following}`)
    for (const item of followingsRes.data) {
      followings.addNode({
        id: item.id,
        name: item.login,
        htmlUrl: item.html_url,
        avatarUrl: item.avatar_url
      })
    }
  })

  api.createPages(({ createPage }) => {
    // createPage({
    //   path: '/social/details/:name',
    //   component: './src/templates/Details.vue'
    // })
  })
}
