Vue.component("card-maisinfo", {
  props: ['title', 'description'],
  template: `
  <div class="card mb-3 rounded border-0 shadow h-100 h-100-handler">
    <div class="border-purple-dark h-100">
      <div class="row">
        <div class="col-md-6 col-xl-12 col-lg-12 col-sm-6 rounded-top">
          <div class="card-header bg-purple-dark no-border-radius">
            <label class="h5 text-white mt-3 font-weight-bold letter-spacing-1">{{title}}</label>
            <br>
            <label class="text-white">{{description}}</label>
            <a href="#" class="btn btn-yellow w-100 font-weight-bold p-3 mt-4">Quero mais tempo pra advogar</a>
          </div>
        </div>
        <div class="col-md-6 col-xl-12 col-lg-12 col-sm-6 rounded-bottom">
          <div class="card-body no-border-radius pl-handler">
            <p class="card-text">
            <div class="row mb-2">
              <div class="col-2">
                <img src="assets/check.svg" class="mr-3">
              </div>
              <div class="col-10">Planos e valores especiais</div>
            </div>
            <div class="row mb-2">
              <div class="col-2">
                <img src="assets/check.svg" class="mr-3">
              </div>
              <div class="col-10">Número de usuários personalizado</div>
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