

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "UserManagement",
  computed: {
    ...mapGetters([
      'userList',
      'selectedUsers',

    ])
  },
  methods: {
    ...mapActions([
      "updateUser",
      "setUser",
      'deleteUser'
    ]),
    handleUpdate(user) {
      this.setUser(user)
    },
    handleDelete(id) {
      this.deleteUser(id)
      window.alert("Xóa thành công")
    }
  },


}
</script>

<template>
  <div class="user_management card p-0 mt-3">
    <div className="card-header font-weight-bold">USER MANAGEMENT</div>
    <div className="row mt-4 px-3 ">
      <div className="col-4">
        <div className="form-group mb-0">
          <input type="text" placeholder="Search by full name..." className="form-control" />
        </div>
      </div>
      <div className="col-3 ml-auto">
        <div className="form-group mb-0">
          <select className="form-control">
            <option>All</option>
            <option>Client</option>
            <option>Admin</option>
          </select>
        </div>
      </div>
    </div>
    <div className="card-body">
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ele in userList" :key="ele.id">
            <td>{{ ele.id }}</td>
            <td>{{ ele.userName }}</td>
            <td>{{ ele.fullName }}</td>
            <td>{{ ele.email }}</td>
            <td>{{ ele.phoneNumber }}</td>
            <td>{{ ele.type }}</td>
            <td>
              <button @click="() => handleUpdate(ele)" class="btn btn-primary">Cập nhật</button>
              <button @click="() => handleDelete(ele.id)" class="btn btn-warning ml-2">Xóa</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>