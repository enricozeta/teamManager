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
                <label for="name">Nome *</label>
                <input
                  @blur="onFieldBlur('name')"
                  class="form-control"
                  id="name"
                  type="text"
                  v-model.lazy.trim="form.name"
                  v-bind:class="getFieldClasses('name')"
                >
                <div v-if="isErrorField('name')" class="invalid-feedback">Campo Nome obbligatorio!</div>
              </div>

              <div class="form-group">
                <label for="surname">Cognome *</label>
                <input
                  @blur="onFieldBlur('surname')"
                  class="form-control"
                  id="surname"
                  type="text"
                  v-model.lazy.trim="form.surname"
                  v-bind:class="getFieldClasses('surname')"
                >
                <div
                  v-if="isErrorField('surname')"
                  class="invalid-feedback"
                >Campo Cognome obbligatorio!</div>
              </div>

              <div class="form-group">
                <label for="email">Email *</label>
                <input
                  @blur="onFieldBlur('email')"
                  class="form-control"
                  id="email"
                  type="email"
                  v-model.lazy.trim="form.email"
                  v-bind:class="getFieldClasses('email')"
                >
                <div
                  v-if="isErrorField('email')"
                  class="invalid-feedback"
                >Campo Email obbligatorio!</div>
              </div>

              <div class="form-group">
                <label for="team">La tua squadra *</label>
                <input
                  @blur="onFieldBlur('team')"
                  class="form-control"
                  id="team"
                  type="text"
                  v-model.lazy.trim="form.team"
                  v-bind:class="getFieldClasses('team')"
                >
                <div
                  v-if="isErrorField('team')"
                  class="invalid-feedback"
                >Campo Squadra obbligatorio!</div>
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
                <div
                  v-if="isErrorField('password')"
                  class="invalid-feedback"
                >Deve essere di almeno 5 caratteri!</div>
              </div>

              <div class="form-group">
                <label for="confirmPassword">Conferma Password *</label>
                <input
                  @blur="onFieldBlur('confirmPassword')"
                  class="form-control"
                  id="confirmPassword"
                  type="password"
                  v-model.lazy.trim="form.confirmPassword"
                  v-bind:class="getFieldClasses('confirmPassword')"
                >
                <div
                  v-if="isErrorField('confirmPassword')"
                  class="invalid-feedback"
                >Deve corrispondere alla password!</div>
              </div>

              <div class="form-group">
                <b-button :disabled="submitting" type="submit" variant="primary">
                  <span v-if="submitting">
                    <b-spinner small/>
                    <span class="sr-only">Submitting</span>
                  </span>
                  <span v-else>Salva</span>
                </b-button>
              </div>
            </b-form>
            <div v-if="isSubmitted" class="mt-3">
              <p class="alert alert-success">Registrazione avvenuta con successo</p>
              <b-button variant="primary" router-link to="Login">Ok</b-button>
            </div>
          </mdb-card-body>
        </mdb-card>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <b-spinner variant="primary" label="spinning"></b-spinner>
    </div>
  </div>
</template>

<script src="./Registration.js"></script>
<style src="../../assets/scss/component.scss" lang="scss"></style>

