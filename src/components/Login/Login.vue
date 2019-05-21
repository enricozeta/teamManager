<template>
  <div class="component min-h-100">
    <div class="col-md-6" v-if="!loading">
      <div class="content">
        <mdb-card cascade class="cascading-admin-card">
          <div class="admin-up">
            <mdb-icon icon="user-plus" fas class="primary-color"/>
            <div class="data">
              <p>NUOVO UTENTE</p>
            </div>
          </div>
          <mdb-card-body>
            <b-form
              class="form"
              v-if="!isSubmitted && !loading"
              @submit.prevent="submit"
              novalidate
            >
              <div class="form-group">
                <label for="username">Email *</label>
                <input
                  @blur="onFieldBlur('username')"
                  class="form-control"
                  id="username"
                  type="email"
                  v-model.lazy.trim="form.username"
                  v-bind:class="getFieldClasses('username')"
                >
                <div
                  v-if="isErrorField('username')"
                  class="invalid-feedback"
                >Campo Email obbligatorio!</div>
              </div>

              <div class="form-group">
                <label for="password">Password *</label>
                <input
                  @blur="onFieldBlur('password')"
                  class="form-control"
                  id="password"
                  type="password"
                  v-model.lazy.trim="form.password"
                  v-bind:class="getFieldClasses('password')"
                >
              </div>

              <div v-if="error" style="color:red">Autenticazione fallita!</div>

              <div class="form-group">
                <b-button :disabled="submitting" type="submit" variant="primary">
                  <span v-if="submitting">
                    <b-spinner small/>
                    <span class="sr-only">Submitting</span>
                  </span>
                  <span v-else>Login</span>
                </b-button>
              </div>
            </b-form>
          </mdb-card-body>
        </mdb-card>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <b-spinner variant="primary" label="spinning"></b-spinner>
    </div>
  </div>
</template>

<script src="./Login.js"></script>
<style src="../../assets/scss/component.scss" lang="scss"></style>

