

<script>
import { computed, ref, watchEffect } from 'vue'
import { mapActions, mapGetters, useStore } from 'vuex'
export default {
  name: "RegisterForm",
  computed: {
    ...mapGetters([
      'selectedUsers',
      'userList'
    ])
  },
  methods: {
    ...mapActions([
      "addUser",
      "updateUser"
    ]),

    handleSubmit(event) {
      event.preventDefault();
      const isValid = event.target.checkValidity();
      console.log(isValid);
      if (!isValid) {
        window.alert("Vui lòng nhập đầy đủ và đúng định dạng")
        return;
      }

      if (this.selectedUsers) {
        this.updateUser(this.form.values)
        window.alert("Update thành công")

      } else {
        this.addUser(this.form.values)
        window.alert("Thêm thành công")

      }

      this.form.values = {
        userName: "",
        fullName: "",
        password: "",
        phoneNumber: "",
        email: "",
        type: "",
      }
    },
    resetForm() {
      this.$refs.myForm.reset()
    },

  },

  setup() {
    const store = useStore();
    const selectedUsers = computed(() => store.getters.selectedUsers);
    const form = ref({
      values: {
        userName: "",
        fullName: "",
        password: "",
        phoneNumber: "",
        email: "",
        type: "Client",
      },
      errors: {
        userName: "",
        fullName: "",
        password: "",
        phoneNumber: "",
        email: "",
        type: "",
      },
    });


    watchEffect(() => {
      if (selectedUsers.value) {

        form.value.values = selectedUsers.value
      }

    }, [selectedUsers]);


    const handleBlur = (event) => {
      let message = ""

      const { name, validity, title, minLength, maxLength } = event.target;
      const { valueMissing, tooLong, tooShort, patternMismatch } = validity;

      if (!valueMissing) message = ''
      if (valueMissing) message = `${title} cần nhập `

      if (tooShort || tooLong) {
        message = `${title} từ ${minLength}-${maxLength} ký tự`;
      }

      if (patternMismatch) {
        message = `${title} sai định dạng`;
      }

      if (patternMismatch && name === "password") {
        message = `${title} có ít nhất 1 ký tự thường, hoa, số và 1 ký tự đặc biệt`;
      }

      form.value = {
        ...form.value,
        errors: {
          ...form.value.errors,
          [name]: message
        }
      }
    };

    const patternVietnamese = ref("^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôôốồồốộộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùùúúụụủủũưừứựửữỳýỵỷỹđ]*)*$")



    return {
      form,
      handleBlur,
      patternVietnamese,
      selectedUsers
    }
  }
}
</script>

<template>
  <div class="register_form card p-0">
    <div className="card-header bg-warning text-white font-weight-bold">
      REGISTER FORM
    </div>
    <div className="card-body">
      <form ref="myForm" @submit="handleSubmit" noValidate>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>Username</label>
              <input required minlength="6" maxLength="18" @blur="handleBlur" v-model="form.values.userName"
                name="userName" title="User Name" type="text" className="form-control" />
              <span className="text-danger">{{ form.errors.userName }}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Full Name</label>
              <input :pattern="patternVietnamese" required @blur="handleBlur" v-model="form.values.fullName"
                title="Full name" name="fullName" type="text" className="form-control" />
              <span className="text-danger">{{ form.errors.fullName }}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Password</label>
              <input pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*=+_?]).{8,12}$" required @blur="handleBlur"
                v-model="form.values.password" title="Password" name="password" type="password"
                className="form-control" />
              <span className="text-danger">{{ form.errors.password }}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Phone Number</label>
              <input pattern="^(03|05|07|08|09|01[2689])([0-9]{8})$" required @blur="handleBlur"
                v-model="form.values.phoneNumber" title="Phone Number" name="phoneNumber" type="text"
                className="form-control" />
              <span className="text-danger">{{ form.errors.phoneNumber }}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Email</label>
              <input pattern="[a-z0-9._%\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required @blur="handleBlur"
                v-model="form.values.email" title="Email" name="email" type="text" className="form-control" />
              <span className="text-danger">{{ form.errors.email }}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Type</label>
              <select required @blur="handleBlur" v-model="form.values.type" title="Type" name="type"
                className="form-control">
                <option>Client</option>
                <option>Admin</option>
              </select>
              <span className="text-danger">{{ form.errors.type }}</span>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          <button v-if="selectedUsers" class="btn btn-primary">Update</button>
          <button v-else class="btn btn-success">ADD</button>
          <button type="reset" @click="resetForm()" className="btn btn-outline-dark ml-2">
            RESET
          </button>


        </div>
      </form>
    </div>
  </div>
</template>

<style></style>