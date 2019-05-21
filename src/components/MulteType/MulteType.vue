<template>
  <div class="component min-h-100">
    <div class="col-md-6" v-if="!loading">
      <div class="content">
        <mdb-card cascade class="cascading-admin-card">
          <div class="admin-up">
            <mdb-icon icon="list-alt" far class="primary-color"/>
            <div class="data">
              <p>TIPOLOGIA MULTE</p>
            </div>
          </div>
          <mdb-card-body class="mt-3">
            <div v-if="multeTypes.length > 0">
              <b-table
                v-if="multeTypes.length > 0"
                id="my-table"
                class="mb-3"
                :fields="fields"
                :items="multeTypes"
                :per-page="perPage"
                :current-page="currentPage"
                :total-rows="rows"
                hover
                :small="true"
                selectable
                :select-mode="'single'"
                @row-selected="rowSelected"
              ></b-table>

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
              <p>Ancora nessuna tipologia di multa presente</p>
              <b-button
                variant="primary"
                size="sm"
                router-link
                to="NewMultaType"
              >Nuovo tipo di multa</b-button>
            </div>
          </mdb-card-body>
        </mdb-card>
        <div  v-if="multeTypes.length > 0">
          <b-button class="button-plus" router-link to="NewMultaType" variant="primary"><i class="fa fa-plus"></i></b-button>
        </div>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <b-spinner variant="primary" label="spinning"></b-spinner>
    </div>
  </div>
</template>

<script src="./MulteType.js"></script>
<style src="../../assets/scss/component.scss" lang="scss"></style>

