<template>
  <h1>Logged in successfully!</h1>
</template>

<script>

export default {
  name: 'Auth',
  components: {
  },
  data: () => ({
  }),
  mounted() {
    // eslint-disable-next-line prefer-destructuring
    const token = this.$route.query.token;
    if (token) {
      this.$dao.user.setToken(token);
      this.$router.push({ path: '/servers' });
    }
  },
};
</script>

<style scoped>

</style>
