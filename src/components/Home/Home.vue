<template>
  <div class="component min-h-100">
    <div class="col-md-6" v-if="!loading">
      <div class="content">
        <mdb-card cascade class="cascading-admin-card">
          <div class="admin-up">
            <mdb-icon icon="money-bill-alt" far class="primary-color"/>
            <div class="data">
              <strong>{{team.name}}</strong>
            </div>
          </div>
          <mdb-card-body>
            <div v-if="team.players.length > 0">
              <div class="card-home">
                <p class="mt-3">
                  <i class="fas fa-cash-register"></i>
                  Cassa
                  <strong>{{team.paid}}€</strong>
                </p>
                <p class="mt-3">
                  <i class="fas fa-hand-holding-usd"></i>
                  Da pagare
                  <strong>{{team.noPaid}}€</strong>
                </p>
              </div>
              <mdb-line-chart :data="lineChartData" :options="lineChartOptions" :height="200"/>
            </div>
            <div v-else class="mb-3">
              <p class="mt-3">Nessun giocatore presente nella squadra!</p>
              <b-button variant="primary" size="m" router-link to="NewPlayer">Nuovo Giocatore</b-button>
            </div>
          </mdb-card-body>
        </mdb-card>
        <mdb-card v-if="team.players.length > 0" cascade class="cascading-admin-card mt-5">
          <div class="admin-up">
            <mdb-icon icon="angry" far class="primary-color"/>
            <div class="data">
              <p>
                <strong>I peggiori</strong>
              </p>
            </div>
          </div>
          <mdb-card-body>
            <b-table
              id="table-worst"
              class="mb-3"
              :fields="fields"
              :items="worst"
              :per-page="3"
              :current-page="currentPageWorst"
              :total-rows="rows"
              hover
              :small="true"
              selectable
              :select-mode="'single'"
              @row-selected="rowSelected"
            >
              <template slot="name" slot-scope="data">
                <a>{{data.item.name}} {{data.item.surname}}</a>
              </template>
            </b-table>
            <b-pagination
              v-model="currentPageWorst"
              :total-rows="rows"
              :per-page="3"
              size="sm"
              align="right"
              aria-controls="table-worst"
            ></b-pagination>
          </mdb-card-body>
        </mdb-card>
        <mdb-card v-if="team.players.length > 0" cascade class="cascading-admin-card mt-5">
          <div class="admin-up">
            <mdb-icon icon="smile" far class="primary-color"/>
            <div class="data">
              <p>
                <strong>I migliori</strong>
              </p>
            </div>
          </div>
          <mdb-card-body>
            <b-table
              id="table-best"
              class="mb-3"
              :fields="fields"
              :items="bests"
              :per-page="3"
              :current-page="currentPageBest"
              :total-rows="rows"
              hover
              :small="true"
              selectable
              :select-mode="'single'"
              @row-selected="rowSelected"
            >
              <template slot="name" slot-scope="data">
                <a>{{data.item.name}} {{data.item.surname}}</a>
              </template>
            </b-table>
            <b-pagination
              v-model="currentPageBest"
              :total-rows="rows"
              :per-page="3"
              size="sm"
              align="right"
              aria-controls="table-best"
            ></b-pagination>
          </mdb-card-body>
        </mdb-card>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <b-spinner variant="primary" label="spinning"></b-spinner>
    </div>
  </div>
</template>

<script src="./Home.js"></script>
<style src="../../assets/scss/component.scss" lang="scss"></style>


