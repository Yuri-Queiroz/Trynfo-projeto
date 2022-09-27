import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      cartasEstado: [],
      filtro: '',
      filtroRaro: 'todas',
      filterCheck: false,
    };
    this.salvar = this.salvar.bind(this); this.mudar = this.mudar.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.excluir = this.excluir.bind(this); this.filtrar = this.filtrar.bind(this);
    this.filtroCheck = this.filtroCheck.bind(this);
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, cartasEstado } = this.state;
    const cartas = {
      cardName,
      cardDescription: [cardDescription],
      cardAttr1: [cardAttr1],
      cardAttr2: [cardAttr2],
      cardAttr3: [cardAttr3],
      cardImage: [cardImage],
      cardRare: [cardRare],
      cardTrunfo: [cardTrunfo],
    };
    cartasEstado.push(cartas);
    this.setState(() => ({
      cartasEstado,
    }));
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  salvar({ target }) {
    const valor = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: valor,
    }, () => this.mudar());
  }

  mudar() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare } = this.state;
    const entradas = cardName.length > 0
    && cardDescription.length > 0
    && cardImage.length > 0
    && cardRare.length > 0;
    const limite = 210;
    const limiteIndividual = 90;
    const soma = parseInt(cardAttr1, 10)
    + parseInt(cardAttr2, 10)
    + parseInt(cardAttr3, 10) <= limite;
    const valorIndividual = parseInt(cardAttr1, 10) <= limiteIndividual
    && parseInt(cardAttr2, 10) <= limiteIndividual
    && parseInt(cardAttr3, 10) <= limiteIndividual;
    const valorMinimo = parseInt(cardAttr1, 10) >= 0
    && parseInt(cardAttr2, 10) >= 0
    && parseInt(cardAttr3, 10) >= 0;
    const habilitar = entradas && soma && valorIndividual && valorMinimo;
    this.setState({ isSaveButtonDisabled: !habilitar });
  }

  excluir(event) {
    const { cartasEstado } = this.state;
    const chave = event.target.name;
    const guardar = cartasEstado.find((el) => el.cardName !== chave);
    cartasEstado.splice(0, 1);
    cartasEstado.push(guardar);
    cartasEstado.splice(0, 1);
    this.setState({
      cartasEstado,
    });
  }

  filtrar(event) {
    this.setState({
      filtro: event.target.value,
    });
  }

  // filtraRaridade(value) {
  //   this.setState({
  //     filtroRaro: value,
  //   });
  // }

  filtroCheck(a) {
    const { cartasEstado } = this.state;
    const buscar = cartasEstado.filter((elemento) => elemento.cardTrunfo[0] === true);
    console.log(buscar);
    this.setState({
      filterCheck: a,
      cartasEstado: buscar,
    });
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, cartasEstado, filtro, filterCheck } = this.state;
    const s = cartasEstado.filter((ele) => ele.cardTrunfo[0] === true).length > 0;

    const cartasFiltradas = cartasEstado.filter((elemento) => {
      const nome = elemento.cardName;
      return nome.includes(filtro);
    });

    const exibindo = cartasFiltradas.map((elemento) => (
      <div key={ elemento.cardName }>
        <Card
          cardName={ elemento.cardName }
          cardDescription={ elemento.cardDescription }
          cardAttr1={ elemento.cardAttr1 }
          cardAttr2={ elemento.cardAttr2 }
          cardAttr3={ elemento.cardAttr3 }
          cardImage={ elemento.cardImage }
          cardRare={ elemento.cardRare }
        />
        <button
          data-testid="delete-button"
          name={ elemento.cardName }
          onClick={ this.excluir }
          type="submit"
        >
          Excluir
        </button>
      </div>
    ));

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.salvar }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ s }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <div>
          <fieldset>
            <legend>Meu Baralho</legend>
            <input
              type="text"
              placeholder="pesquise sua carta"
              data-testid="name-filter"
              onChange={ this.filtrar }
              disabled={ filterCheck }
            />

            <select
              onChange={ (event) => this.filtraRaridade(event.target.value) }
              data-testid="rare-filter"
              disabled={ filterCheck }
            >
              <option
                value="todas"
              >
                todas
              </option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option
                value="muito Raro"
              >
                muito raro
              </option>
            </select>
            <label htmlFor="Super Trunfo">
              <input
                data-testid="trunfo-filter"
                type="checkbox"
                onChange={ (event) => this.filtroCheck(event.target.checked) }
              />
            </label>
            { exibindo }
          </fieldset>
        </div>
      </div>
    );
  }
}
export default App;
