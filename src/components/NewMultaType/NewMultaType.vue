<template>
  <div class="component min-h-100">
    <div class="col-md-6" v-if="!loading">
      <div class="content">
        <mdb-card cascade class="cascading-admin-card">
          <div class="admin-up">
            <mdb-icon icon="grin-alt" far class="primary-color"/>
            <div class="data">
              <p>{{title}}</p>
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
                <label for="descrizione">Descrizione *</label>
                <input
                  @blur="onFieldBlur('descrizione')"
                  class="form-control"
                  id="descrizione"
                  type="text"
                  v-model.lazy.trim="form.descrizione"
                  v-bind:class="getFieldClasses('descrizione')"
                >
                <div
                  v-if="isErrorField('descrizione')"
                  class="invalid-feedback"
                >Campo Descrizione obbligatorio!</div>
              </div>

              <div class="form-group">
                <label for="valore">Valore *</label>
                <input
                  @blur="onFieldBlur('valore')"
                  class="form-control"
                  id="valore"
                  type="number"
                  v-model.lazy.trim="form.valore"
                  v-bind:class="getFieldClasses('valore')"
                >
                <div
                  v-if="isErrorField('valore')"
                  class="invalid-feedback"
                >Campo Valore obbligatorio!</div>
              </div>

              <div class="form-group">
                <b-button :disabled="submitting" type="submit" variant="primary">
                  <span v-if="submitting">
                    <b-spinner small/>
                    <span class="sr-only">Submitting</span>
                  </span>
                  <span v-else>Salva</span>
                </b-button>

                <b-button v-if="updating" variant="danger" v-b-modal.modal-1>Elimina</b-button>

                <b-modal id="modal-1" hide-footer title="Elimina">
                  <p class="my-4">Confermi di voler eliminare la multa {{ form.descrizione }}?</p>
                  <a
                    v-b-modal.modal-1
                    href="#"
                    class="btn btn-warning"
                    @click.prevent="remove()"
                  >Elimina</a>
                </b-modal>
              </div>
            </b-form>
            <div v-if="isSubmitted" class="mt-3">
              <p class="alert alert-success">{{save}}</p>
              <b-button variant="primary" router-link to="multeType">Ok</b-button>
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

<script src="./NewMultaType.js"></script>
<style src="../../assets/scss/component.scss" lang="scss"></style>

