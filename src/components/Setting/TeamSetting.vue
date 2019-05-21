<template>
  <mdb-card cascade class="cascading-admin-card">
    <div class="admin-up">
      <mdb-icon icon="futbol" fas class="primary-color"/>
      <div class="data">
        <p>Modifica dati della squadra</p>
      </div>
    </div>
    <mdb-card-body>
      <b-form class="form" v-if="!isSubmitted && !loading" @submit.prevent="submit" novalidate>
        <div class="form-group">
          <label for="descrizione">Nome squadra *</label>
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
          <label for="valore">Fondo Cassa </label>
          <input
            @blur="onFieldBlur('fondoCassa')"
            class="form-control"
            id="fondoCassa"
            type="number"
            v-model.lazy.trim="form.fondoCassa"
            v-bind:class="getFieldClasses('fondoCassa')"
          >
          <div v-if="isErrorField('fondoCassa')" class="invalid-feedback">Campo Cognome obbligatorio!</div>
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
        <p class="alert alert-success">Squadra aggiornata</p>
        <b-button variant="primary" @click="saved()">Ok</b-button>
      </div>
    </mdb-card-body>
    <div class="loading" v-if="loading">
      <b-spinner variant="primary" label="spinning"></b-spinner>
    </div>
  </mdb-card>
</template>

<script src="./TeamSetting.js"></script>
<style src="../../assets/scss/component.scss" lang="scss"></style>

