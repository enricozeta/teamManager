<template>
  <div class="component min-h-100">
    <div class="col-md-6" v-if="!loading">
      <div class="content">
        <mdb-card cascade class="cascading-admin-card">
          <div class="admin-up">
            <mdb-icon icon="user" far class="primary-color"/>
            <div class="data">
              <strong>{{player.name}} {{player.surname}}</strong>
              <p class="mt-3">
                Multe pagate
                <strong>{{player.multePagate}}€</strong>
              </p>
            </div>
          </div>
          <mdb-card-body v-if="multe.length > 0">
            <b-progress class="mt-2 mr-3 ml-3" :max="100">
              <b-progress-bar :value="paid" variant="blue"></b-progress-bar>
            </b-progress>
            <mdb-card-text
              v-if="player.multeNonPagate > 0"
              class="mt-2 mb-2"
            >Ha ancora da pagare {{player.multeNonPagate}}€!!</mdb-card-text>
            <mdb-card-text v-else class="mt-2 mb-2">Tutte le multe sono state pagate, top!!</mdb-card-text>
          </mdb-card-body>
        </mdb-card>
        <mdb-card cascade class="cascading-admin-card mt-5">
          <div class="admin-up">
            <div class="data">
              <p>Lista multe</p>
            </div>
          </div>
          <mdb-card-body>
            <div v-if="multe.length > 0">
              <b-table
                thead-class="hidden_header"
                id="my-table"
                class="mb-3"
                :fields="fields"
                :items="multe"
                :per-page="perPage"
                :current-page="currentPage"
                :total-rows="rows"
                hover
                :small="true"
                selectable
                :select-mode="'single'"
                @row-selected="rowSelected"
              >
                <template slot="pagata" slot-scope="data">
                  <b-button
                    v-if="!data.item.pagata"
                    class="button-pagare"
                    @click="isPagata(data.item)"
                    variant="primary"
                  >
                    <i style="margin: 1px -4px 0px -3px" class="fas fa-times"></i>
                  </b-button>
                  <b-button
                    v-else
                    class="button-pagata"
                    @click="isPagata(data.item)"
                    variant="primary"
                  >
                    <i style="margin: 1px 2px 0px -4px" class="fas fa-check"></i>
                  </b-button>
                </template>
              </b-table>
              <div class="inLine">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  size="sm"
                  align="left"
                  aria-controls="my-table"
                ></b-pagination>
                <b-button
                  v-b-tooltip.hover
                  title="Nuova multa"
                  class="button-plus"
                  @click="newMulta()"
                  variant="primary"
                >
                  <i class="fa fa-plus"></i>
                </b-button>
              </div>
            </div>
            <div v-else>
              <p>Nessuna multa presente</p>
              <p>Forse è il caso di aggiungerla :)</p>
              <b-button
                  v-b-tooltip.hover
                  title="Nuova multa"
                  class="button-plus"
                  @click="newMulta()"
                  variant="primary"
                >
                  <i class="fa fa-plus"></i>
                </b-button>
            </div>
          </mdb-card-body>
        </mdb-card>
        <b-button
          v-b-tooltip.hover
          title="Elimina giocatore"
          class="button-delete"
          variant="danger"
          v-b-modal.modal-1
        >Elimina</b-button>
        <b-modal id="modal-1" hide-footer title="Elimina">
          <p
            class="my-4"
          >Confermi di voler eliminare il giocatore {{ player.name }} {{ player.surname }}?</p>
          <p v-if="player.multeNonPagate > 0" class="my-4">
            <strong>Attenzione!! Il giocatore non ha pagato alcune multe. Se lo elimini le perderai</strong>
          </p>
          <p class="my-4">
            <strong>Attenzione!! L'eliminazione completa elimina anche tutte le sue multe togliendole così dal conteggio totale</strong>
          </p>
          <a
            v-b-modal.modal-1
            href="#"
            class="btn btn-warning"
            size="sm"
            @click.prevent="disable()"
          >Elimina</a>
          <a
            v-b-modal.modal-1
            href="#"
            class="btn btn-danger"
            size="sm"
            @click.prevent="remove()"
          >Eliminazione completa</a>
        </b-modal>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <b-spinner variant="primary" label="spinning"></b-spinner>
    </div>
  </div>
</template>

<script src="./Player.js"></script>
<style src="../../assets/scss/component.scss" lang="scss"></style>
<style src="./Player.scss" lang="scss"></style>


