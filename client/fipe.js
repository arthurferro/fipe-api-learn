const { createApp } = Vue;
var apiEndpoint = 'https://parallelum.com.br/fipe/api/v1';
var apiImagesEndpoint = 'http://localhost:3000';

const app = createApp({
  mounted() {
    // MÉTODOS QUE SERÃO EXECUTADOS QUANDO A PÁGINA FOR CARREGADA
    // this.getMarcas();
  },
  methods: {
    // MÉTODOS QUE SERÃO EXECUTADOS QUANDO FOR CHAMADO
    selecionarTipoVeiculo(tipoVeiculo) {
      this.tipoVeiculoSelecionado = tipoVeiculo;
      this.carregandoModelos = false;
      this.carregandoAnos = false;
      this.carregandoValor = false;
      this.marcaSelecionada = '';
      this.modeloSelecionado = '';
      this.anoSelecionado = '';
      this.marcas = [];
      this.modelos = [];
      this.anos = [];
      this.valor = null;
      this.getMarcas();
    },
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
      this.images = [];
      axios({
        method: 'get',
        url: `${apiEndpoint}/${this.tipoVeiculoSelecionado}/marcas`,
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
      this.images = [];
      axios({
        method: 'get',
        url: `${apiEndpoint}/${this.tipoVeiculoSelecionado}/marcas/${codMarca}/modelos`,
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
      this.images = [];
      axios({
        method: 'get',
        url: `${apiEndpoint}/${this.tipoVeiculoSelecionado}/marcas/${codMarca}/modelos/${codModelo}/anos`,
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
      this.images = [];
      axios({
        method: 'get',
        url: `${apiEndpoint}/${this.tipoVeiculoSelecionado}/marcas/${codMarca}/modelos/${codModelo}/anos/${codAno}`,
        responseType: 'json',
      }).then((response) => {
        if (response.data !== null) {
          this.valor = response.data;
          console.log(this.valor);
          this.getImages(
            `${this.valor.Marca} ${this.valor.Modelo} ${this.valor.AnoModelo}`
          );
          this.carregandoValor = false;
        }
      });
    },
    async getImages(modelo) {
      this.carregandoImagens = true;
      var response = await axios.get(`${apiImagesEndpoint}?modelo=${modelo}`);
      this.images = response.data.results;
      this.carregandoImagens = false;
    },
  },
  data() {
    return {
      applicationMessage: '',
      tipoVeiculos: [
        { descricao: 'Carros', codigo: 'carros' },
        { descricao: 'Motos', codigo: 'motos' },
        { descricao: 'Caminhões', codigo: 'caminhoes' },
      ],
      tipoVeiculoSelecionado: null,
      carregandoMarcas: false,
      carregandoModelos: false,
      carregandoAnos: false,
      carregandoValor: false,
      carregandoImagens: false,
      marcaSelecionada: '',
      modeloSelecionado: '',
      anoSelecionado: '',
      marcas: [],
      modelos: [],
      anos: [],
      images: [],
      valor: null,
      // DADOS QUE SERÃO UTILIZADOS NA PÁGINA
    };
  },
}).mount('#app');
