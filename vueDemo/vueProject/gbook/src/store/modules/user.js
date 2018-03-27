// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  userInfo: null, //用户信息
  loginState: false,//是否登录
}

// getters
const getters = {
  loginState: state => state.loginState
}

// actions
const actions = {
  login ({ commit }) {
    commit(types.RECORD_USERINFO)
  }
}

// mutations
const mutations = {
// 记录用户信息
  [types.RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.loginState = true;
    let validity = 30;
    let now = new Date();
    now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
    document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
    document.cookie = "SID=CeRxBZalHSiKuGI49DL2DhXMrOakCzQNcJFg" + ";expires=" + now.toGMTString();
  },
  //获取用户信息存入vuex
  [types.GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    };
    if (!state.loginState) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info};
      let validity = 30;
      let now = new Date();
      now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
      document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
      document.cookie = "SID=CeRxBZalHSiKuGI49DL2DhXMrOakCzQNcJFg" + ";expires=" + now.toGMTString();
    } else {
      state.userInfo = null;
    }
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
