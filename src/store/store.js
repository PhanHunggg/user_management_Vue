import { createStore } from "vuex";

export default createStore({
  state: {
    // trạng thái của ứng dụng\
    userList: [
      {
        id: 1,
        userName: "PhanHung",
        fullName: "PhanQuocHung",
        password: "123",
        phoneNumber: "1231654",
        email: "hung@gmail.com",
        type: "Client",
      },
      {
        id: 2,
        userName: "YenTram",
        fullName: "DangThiYenTram",
        password: "123",
        phoneNumber: "1231654",
        email: "tramLun@gmail.com",
        type: "Admin",
      },
    ],
    selectedUsers: null,
  },
  mutations: {
    // hàm thực hiện thay đổi trạng thái của ứng dụng
    addUser(state, user) {
      user.id = state.userList.length + 1;
      state.userList.push(user);
    },
    setUser(state, user) {
      state.selectedUsers = user;
    },
    updateUser(state, user) {
      const data = [...state.userList];
      const idx = data.findIndex((ele) => ele.id === user.id);
      data[idx] = user;
      state.userList = data;
      state.selectedUsers = null;
    },
    deleteUser(state, id) {
      const data = [...state.userList];
      const idx = data.findIndex((ele) => ele.id === id);
      data.splice(idx, 1);
      state.userList = data;
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit("addUser", user);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    updateUser({ commit }, user) {
      commit("updateUser", user);
    },
    deleteUser({ commit }, id) {
      commit("deleteUser", id);
    },
  },
  getters: {
    userList(state) {
      return state.userList;
    },
    selectedUsers(state) {
      return state.selectedUsers;
    },
  },
});
