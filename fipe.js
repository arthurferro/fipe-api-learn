const { createApp } = Vue;
var apiEndpoint = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

const app = createApp({
  mounted() {
    // MÉTODOS QUE SERÃO EXECUTADOS QUANDO A PÁGINA FOR CARREGADA
    this.getMarcas();
  },
  methods: {
    // MÉTODOS QUE SERÃO EXECUTADOS QUANDO FOR CHAMADO
    getMarcas() {
      (this.carregandoMarcas = true),
        (this.carregandoModelos = false),
        (this.carregandoAnos = false),
        (this.carregandoValor = false),
        (this.marcaSelecionada = ''),
        (this.modeloSelecionado = ''),
        (this.anoSelecionado = ''),
        (this.marcas = []),
        (this.modelos = []),
        (this.anos = []),
        (this.valor = null);
      axios({
        method: 'get',
        url: apiEndpoint,
        responseType: 'json',
      }).then((response) => {
        if (response.data !== null) {
          this.marcas = response.data;
          this.carregandoMarcas = false;
        }
      });
    },
    getModelos(codMarca) {
      (this.carregandoModelos = true),
        (this.carregandoAnos = false),
        (this.carregandoValor = false),
        (this.anoSelecionado = ''),
        (this.anos = []),
        (this.valor = null);
      axios({
        method: 'get',
        url: apiEndpoint + `/${codMarca}/modelos`,
        responseType: 'json',
      }).then((response) => {
        if (response.data !== null) {
          this.modelos = response.data.modelos;
          this.carregandoModelos = false;
        }
      });
    },
    getAnos(codMarca, codModelo) {
      (this.carregandoAnos = true),
        (this.carregandoValor = false),
        (this.valor = null);
      axios({
        method: 'get',
        url: apiEndpoint + `/${codMarca}/modelos/${codModelo}/anos`,
        responseType: 'json',
      }).then((response) => {
        if (response.data !== null) {
          this.anos = response.data;
          this.carregandoAnos = false;
        }
      });
    },
    getValor(codMarca, codModelo, codAno) {
      this.carregandoValor = true;
      axios({
        method: 'get',
        url: apiEndpoint + `/${codMarca}/modelos/${codModelo}/anos/${codAno}`,
        responseType: 'json',
      }).then((response) => {
        if (response.data !== null) {
          this.valor = response.data;
          console.log(this.valor);
          this.carregandoValor = false;
        }
      });
    },
  },
  data() {
    return {
      applicationMessage: '',
      carregandoMarcas: true,
      carregandoModelos: false,
      carregandoAnos: false,
      carregandoValor: false,
      marcaSelecionada: '',
      modeloSelecionado: '',
      anoSelecionado: '',
      marcas: [],
      modelos: [],
      anos: [],
      valor: null,
      // DADOS QUE SERÃO UTILIZADOS NA PÁGINA
    };
  },
}).mount('#app');
