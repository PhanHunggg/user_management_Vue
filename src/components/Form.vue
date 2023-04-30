<template>
    <div class="form w-75 mx-auto my-5">
        <RegisterForm />
        <UserManagementVue />
    </div>
</template>

<script>
import RegisterForm from './RegisterForm.vue';
import UserManagementVue from './UserManagement.vue';
export default {
    name: "FormV",
    components: {
        RegisterForm,
        UserManagementVue,
    }
}
</script>

<style></style>