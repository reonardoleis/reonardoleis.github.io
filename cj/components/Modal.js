Vue.component("modal", {
props: ['close_me'],
template: `
<div>
  <div class="my-overlay" v-on:click="$emit('closed')"></div>
  <div class="my-modal">
    <div class="my-modal-content border-radius-primary">
      <span class="close" v-on:click="$emit('closed')"><i class="fas fa-times text-blue-darker"></i></span>
      <br>
      <div class="container p-3">
        <div class="container">
          <p class="h4 text-blue-darker font-weight-bold">Compare planos e funcionalidades</p>
          <div class="border-radius-primary bg-blue-lighter p-4 mt-5 row align-items-center">
            <div class="col-md-6 border">
              <p class="h5 text-blue-darker font-weight-bolder">Precisa de um plano maior?</p>
              <p class="h6 text-blue-darker">O CJ tem um plano do tamanho da sua necessidade</p>
            </div>
            <div class="col-md-6 text-center text-md-right">
              <a href="#" class="btn btn-darkblue py-3" style="font-size: 130%">Vamos conversar</a>
            </div>
          </div>
        </div>
        <div class="container table-fixed-head p-0 mt-3 table-responsive">
          <table class="table table-bordered border-radius-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div class="p-3">
                    <img src="../assets/varstacked1.svg">
                    <br>
                    <label class="h5 font-weight-bold text-blue-darker mt-2 mb-4">Essencial</label>
                    <br>
                    <a href="#" class="btn btn-yellow font-weight-bold text-blue-darker py-3">Quero descobrir o CJ</a>
                  </div>
                </th>
                <th scope="col">
                  <div class="p-3">
                    <img src="../assets/varstacked2.svg">
                    <br>
                    <label class="h5 font-weight-bold text-blue-darker mt-2 mb-4">Profissional</label>
                    <br>
                    <a href="#" class="btn btn-yellow font-weight-bold text-blue-darker py-3">Quero descobrir o CJ</a>
                  </div>
                </th>
                <th scope="col">
                  <div class="p-3">
                    <img src="../assets/varstacked3.svg">
                    <br>
                    <label class="h5 font-weight-bold text-blue-darker mt-2 mb-4">Especialista</label>
                    <br>
                    <a href="#" class="btn btn-yellow font-weight-bold text-blue-darker py-3">Quero descobrir o CJ</a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="text-blue-darker">
              <tr>
                <td scope="col" class="p-0 bg-blue-dark">
                  <div class="p-3 text-white h6">
                    <span style="font-size: 115%" class="font-weight-bold">10</span>
                    cálculos a cada mês
                  </div>
                </td>
                <td scope="col" class="p-0 bg-blue-dark">
                  <div class="p-3 text-white h6">
                    <span style="font-size: 115%" class="font-weight-bold">25</span>
                    cálculos a cada mês
                  </div>
                </td>
                <td scope="col" class="p-0  bg-blue-dark">
                  <div class="p-3 text-white h6">
                    <span style="font-size: 115%" class="font-weight-bold">50</span>
                    cálculos a cada mês
                  </div>
                </td>
              </tr>

              <tr>
                <td scope="col" class="p-0">
                  <div class="p-3">
                    <span style="font-size: 115%" class="font-weight-bold text-blue-darker">R$ 99</span>
                    por mês
                  </div>
                </td>
                <td scope="col" class="p-0">
                  <div class="p-3 h6">
                    <span style="font-size: 115%" class="font-weight-bold  text-blue-darker">R$ 199</span>
                    por mês
                  </div>
                </td>
                <td scope="col" class="p-0">
                  <div class="p-3 h6">
                    <span style="font-size: 115%" class="font-weight-bold  text-blue-darker">R$ 139</span>
                    por mês
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="col" class="p-0">
                  <div class="p-3">
                    <span style="font-size: 115%" class="font-weight-bold text-blue-darker">R$ 99</span>
                    por ano, à vista
                    <br>
                    <label class="bg-lightyellow p-1  text-left text-blue-darker font-weight-bold">
                      <i>2 meses OFF</i>
                    </label>
                  </div>
                </td>
                <td scope="col" class="p-0">
                  <div class="p-3">
                    <span style="font-size: 115%" class="font-weight-bold text-blue-darker">R$ 99</span>
                    por ano, à vista
                    <br>
                    <label class="bg-lightyellow p-1  text-left text-blue-darker font-weight-bold">
                      <i>2 meses OFF</i>
                    </label>
                  </div>
                </td>
                <td scope="col" class="p-0">
                  <div class="p-3">
                    <span style="font-size: 115%" class="font-weight-bold text-blue-darker">R$ 99</span>
                    por ano, à vista
                    <br>
                    <label class="bg-lightyellow p-1  text-left text-blue-darker font-weight-bold">
                      <i>2 meses OFF</i>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="col" class="p-0">
                  <div class="p-3">
                    <span style="font-size: 115%" class="font-weight-bold text-blue-darker">R$ 99</span>
                    a cada dois anos, à vista
                    <br>
                    <label class="bg-lightyellow p-1  text-left text-blue-darker font-weight-bold">
                      <i>4 meses OFF</i>
                    </label>
                  </div>
                </td>
                <td scope="col" class="p-0">
                  <div class="p-3">
                    <span style="font-size: 115%" class="font-weight-bold text-blue-darker">R$ 99</span>
                    a cada dois anos, à vista
                    <br>
                    <label class="bg-lightyellow p-1  text-left text-blue-darker font-weight-bold">
                      <i>4 meses OFF</i>
                    </label>
                  </div>
                </td>
                <td scope="col" class="p-0">
                  <div class="p-3">
                    <span style="font-size: 115%" class="font-weight-bold text-blue-darker">R$ 99</span>
                    a cada dois anos, à vista
                    <br>
                    <label class="bg-lightyellow p-1  text-left text-blue-darker font-weight-bold">
                      <i>4 meses OFF</i>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="col" class="p-0">
                  <div class="p-3">
                    3 usuários
                </td>
                <td scope="col" class="p-0">
                  <div class="p-3 h6">
                    5 usuários
                  </div>
                </td>
                <td scope="col" class="p-0">
                  <div class="p-3 h6">
                    10 usuários
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="bg-blue-lighter text-center font-weight-bold h5">Suporte</td>
              </tr>
              <tr v-for="item in ['Suporte dentro do programa', 'Analistas especializados', 'Central de Ajuda (Guia Prático)', 'Vídeos Tutoriais', 'Tour Guiado']">
                <td colspan="3" class="text-center h6"><i class="fas fa-check-circle"></i> {{item}}</td>
              </tr>

              <tr>
                <td colspan="3" class="bg-blue-lighter text-center font-weight-bold h5">Suporte</td>
              </tr>
              <tr v-for="item in ['Suporte dentro do programa', 'Analistas especializados', 'Central de Ajuda (Guia Prático)', 'Vídeos Tutoriais', 'Tour Guiado']">
                <td colspan="3" class="text-center h6"><i class="fas fa-check-circle"></i> {{item}}</td>
              </tr>

              <tr>
                <td colspan="3" class="bg-blue-lighter text-center font-weight-bold h5">Cálculos Previdenciários</td>
              </tr>
              <tr v-for="item in ['Tempo de contribuição', 'RMI', 'Valor da Causa', 'Liquidação da Sentença', 'Contribuições em Atraso',
                                  'Planejamento Previdenciário', 'E muito mais']">
                <td colspan="3" class="text-center h6"><i class="fas fa-check-circle"></i> {{item}}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
`,
});