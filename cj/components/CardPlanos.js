Vue.component("card-planos", {
props: ['icon', 'recommended', 'title', 'calculations_number',
'price', 'users'],
template: `
<div class="card mb-3 rounded border-0 shadow h-100 h-100-handler">
  <div class="border-blue h-100">
    <div class="row">
      <div class="col-md-6 col-xl-12 col-lg-12 col-sm-6 no-border-radius">
        <div class="p-3 bg-blue-light no-border-radius">
          <img :src=icon class="float-left border" style="border-color: rgba(0,0,0,0) !important">
          <small class="bg-white-real rounded-pill text-uppercase float-right px-2 font-weight-bold"
            v-if="recommended == 'true'">Recomendado</small>
          <div class="clearfix"></div>
          <label class="h5 text-white mt-3 font-weight-bold letter-spacing-1">{{title}}</label>
          <div class="text-white mt-4 d-flex">
            <div class="large-numbering h1 font-weight-bolder">
              {{calculations_number}}
            </div>
            <div class="some-heading text-left pl-0 ml-3 w-75" v-on:click="$emit('open_faq')">
              <strong>novos</strong> cálculos a<br> cada mês <i class="far fa-question-circle"></i>
            </div>
          </div>
          <a href="#" class="btn btn-yellow w-100 font-weight-bold p-3 mt-4">Quero mais tempo pra advogar</a>
        </div>
      </div>
      <div class="col-md-6 col-xl-12 col-lg-12 col-sm-6 rounded-bottom">
        <div class="card-body pl-handler">
          <div class="text-blue-darker">
            <span class="h5 font-weight-bold text-blue-dark">R$ {{price}}</span>
            por ano, pagamento
            <strong>à vista</strong>
          </div>
          <hr class="bg-blue-light">
          <p class="card-text">
          <div class="row mb-2">
            <div class="col-2">
              <img src="assets/check.svg" class="mr-3">
            </div>
            <div class="col-10">{{users}} usuários</div>
          </div>
          <div class="row mb-2">
            <div class="col-2">
              <img src="assets/check.svg" class="mr-3">
            </div>
            <div class="col-10 font-weight-bolder">
              Garantia de 15 dias
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              <img src="assets/check.svg" class="mr-3">
            </div>
            <div class="col-10">
              Todas as funcionalidades
            </div>
          </div>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
`,
});