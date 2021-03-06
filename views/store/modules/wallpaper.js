import * as api from '../../api'

export default {
  namespaced: true,
  state: {
    copyright: null,
    url: ''
  },
  mutations: {
    SET_VALUE (state, payload) {
      state.url = payload.url
      state.copyright = payload.copyright
    }
  },
  actions: {
    FETCH ({ commit }) {
      let url
      let copyright
      return api.util.wallpaper().then((res) => {
        const data = res.data.data[0]
        if (res.data.type === 'bing') {
          url = /\.com/.test(data.url) ? data.url : 'https://cn.bing.com' + data.url
          copyright = {
            name: 'Bing',
            link: data.copyrightlink
          }
        } else { // unsplash
          url = data.urls.raw + '?w=2200'
          copyright = {
            name: data.user.name,
            profileImage: data.user.profile_image.small,
            link: data.user.links.html
          }
        }
        commit('SET_VALUE', { url, copyright })
      })
    }
  }
}
