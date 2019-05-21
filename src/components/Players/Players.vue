<template>
  <div class="component min-h-100">
    <div class="col-md-6" v-if="!loading">
      <div class="content">
        <mdb-card cascade class="cascading-admin-card">
          <div class="admin-up">
            <mdb-icon icon="list-alt" far class="primary-color"/>
            <div class="data">
              <p>GIOCATORI</p>
            </div>
          </div>
          <mdb-card-body class="mt-3">
            <div v-if="players.length > 0">
              <div class="filter">
                <b-form-input v-model="filter" placeholder="Filtra"></b-form-input>
                <b-button style="margin:0px" size="sm" :hidden="!filter" @click="filter = ''">Clear</b-button>
              </div>
              <b-table
                id="my-table"
                class="mb-3 mt-1"
                :fields="fields"
                :items="players"
                :per-page="perPage"
                :current-page="currentPage"
                :total-rows="rows"
                hover
                :small="true"
                selectable
                :select-mode="'single'"
                :filter="filter"
                @row-selected="rowSelected"
                @filtered="onFiltered"
              >
                <template slot="name" slot-scope="data">
                  {{data.item.name}} {{data.item.surname}}
                </template>
              </b-table>

              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                size="sm"
                align="right"
                aria-controls="my-table"
              ></b-pagination>
            </div>
            <div v-else>
              <p>Ancora nessuno giocatore presente</p>
              <b-button variant="primary" size="sm" router-link to="NewPlayer">Nuovo Giocatore</b-button>
            </div>
          </mdb-card-body>
        </mdb-card>
        <div>
          <b-button
            v-if="players.length > 0"
            class="button-plus"
            router-link
            to="NewPlayer"
            variant="primary"
          >
            <i class="fa fa-plus"></i>
          </b-button>
        </div>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <b-spinner variant="primary" label="spinning"></b-spinner>
    </div>
  </div>
</template>

<script src="./Players.js"></script>
<style src="../../assets/scss/component.scss" lang="scss"></style>

