<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form method="post" v-on:submit.prevent="submit()">
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  class="form-control"
                  placeholder="Enter email"
                  type="text"
                  name="email"
                  id="email"
                  v-model="email"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input
                  class="form-control"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  v-model="password"
                />
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {

      email: "",
      password: "",
      message: "",
      errors: [],

    };
  },

  methods: {

    submit() {

      this.message = "";
      this.errors = [];

      window.axios.default.get("/sanctum/csrf-cookie").then((response) => {

				window.axios.default.post("/api/login", {email: this.email, password: this.password}).then(response => {
					
					console.info(response.data.user);

				}).catch(errors => {

					this.message = errors.response.data.message;

					for(let key in errors.response.data.errors) {

						this.errors.push(errors.response.data.errors[key][0]);
					}
				});

			});
    },
  },
};
</script>