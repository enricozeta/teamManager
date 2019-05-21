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
            <div v-if="multeTypes.length > 0 && players.length > 0">
              <b-form
                class="form"
                v-if="!isSubmitted && !loading"
                @submit.prevent="submit"
                novalidate
              >
                <div class="form-group">
                  <div class="form-group">
                    <label for="playerId">Giocatore *</label>
                    <select
                      id="playerId"
                      class="form-control"
                      v-model="form.playerId"
                      @blur="onFieldBlur('playerId')"
                      v-bind:class="getFieldClasses('playerId')"
                    >
                      <option
                        v-for="player in players"
                        v-bind:key="player.id"
                        v-bind:value="player.id"
                      >{{ player.name }} {{ player.surname }}</option>
                    </select>
                    <div
                      v-if="isErrorField('playerId')"
                      class="invalid-feedback"
                    >Campo Giocatore obbligatorio</div>
                  </div>

                  <label for="multeType">Multa *</label>
                  <select
                    v-if="!multaTypeIsDisable"
                    id="multeType"
                    class="form-control"
                    v-model="form.multeType"
                    @blur="onFieldBlur('multeType')"
                    @change="setValue()"
                    v-bind:class="getFieldClasses('multeType')"
                  >
                    <option
                      v-for="multeType in multeTypes"
                      v-bind:key="multeType.id"
                      v-bind:value="multeType"
                    >{{ multeType.descrizione }}</option>
                  </select>
                  <input
                    v-else
                    class="form-control"
                    type="string"
                    v-model.lazy.trim="multaTypeDisable.descrizione"
                    disabled
                  >
                  <div
                    v-if="isErrorField('multeType')"
                    class="invalid-feedback"
                  >Campo Multa obbligatorio</div>
                </div>

                <div class="form-group">
                  <label for="valore">Valore € *</label>
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
                  <label for="data">Data *</label>
                  <input
                    @blur="onFieldBlur('data')"
                    class="form-control"
                    id="data"
                    type="date"
                    v-model.lazy.trim="form.data"
                    v-bind:class="getFieldClasses('data')"
                  >
                  <div v-if="isErrorField('data')" class="invalid-feedback">Campo data obbligatorio!</div>
                </div>

                <div class="form-group">
                  <label for="pagata">Pagata</label>
                  <select
                    id="pagata"
                    class="form-control"
                    v-model="form.pagata"
                    @blur="onFieldBlur('pagata')"
                    v-bind:class="getFieldClasses('pagata')"
                  >
                    <option v-bind:value="true">Pagata</option>
                    <option v-bind:value="false">Non Pagata</option>
                  </select>
                  <div
                    v-if="isErrorField('pagata')"
                    class="invalid-feedback"
                  >Campo pagata obbligatorio!</div>
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
                    <p class="my-4">Confermi di voler eliminare la multa?</p>
                    <a
                      v-b-modal.modal-1
                      href="#"
                      class="btn btn-warning"
                      @click.prevent="remove()"
                    >Elimina</a>
                  </b-modal>
                </div>
              </b-form>
            </div>
            <div class="mt-2" v-if="multeTypes.length <= 0">
              <p>Ancora nessuna tipologia di multa presente</p>
              <b-button
                variant="primary"
                size="sm"
                router-link
                to="NewMultaType"
              >Nuovo tipo di multa</b-button>
            </div>
            <div class="mt-5" v-if="players.length <= 0">
              <p>Ancora nessuno giocatore presente</p>
              <b-button variant="primary" size="sm" router-link to="NewPlayer">Nuovo Giocatore</b-button>
            </div>
            <div class="mt-3" v-if="isSubmitted">
              <p class="alert alert-success">{{save}}</p>
              <b-button variant="primary" v-on:click="goTo">Ok</b-button>
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

<script src="./NewMulta.js"></script>
<style src="../../assets/scss/component.scss" lang="scss"></style>

