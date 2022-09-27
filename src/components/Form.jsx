import React from 'react';
import propTyes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <div>
        <form action="">
          <label htmlFor="nome">
            <input
              data-testid="name-input"
              placeholder="Digite o nome da carta"
              type="text"
              name="cardName"
              id=""
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="descricao">
            <textarea
              data-testid="description-input"
              name="cardDescription"
              id=""
              cols="20"
              rows="5"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="atributo1">
            <input
              value={ cardAttr1 }
              onChange={ onInputChange }
              data-testid="attr1-input"
              type="number"
              name="cardAttr1"
              id=""
            />
          </label>

          <label htmlFor="atributo2">
            <input
              value={ cardAttr2 }
              onChange={ onInputChange }
              data-testid="attr2-input"
              type="number"
              name="cardAttr2"
              id=""
            />
          </label>

          <label htmlFor="atributo3">
            <input
              value={ cardAttr3 }
              onChange={ onInputChange }
              data-testid="attr3-input"
              type="number"
              name="cardAttr3"
              id=""
            />
          </label>

          <label htmlFor="imagem">
            <input
              value={ cardImage }
              onChange={ onInputChange }
              data-testid="image-input"
              type="text"
              name="cardImage"
              id=""
            />
          </label>

          <label htmlFor="raridade">
            <select
              value={ cardRare }
              onChange={ onInputChange }
              data-testid="rare-input"
              name="cardRare"
              id=""
            >
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>

          {hasTrunfo === false ? (
            <label htmlFor="superTrunfo">
              <input
                checked={ cardTrunfo }
                onChange={ onInputChange }
                data-testid="trunfo-input"
                type="checkbox"
                name="cardTrunfo"
                id=""
              />
            </label>
          ) : (
            'Você já tem um Super Trunfo em seu baralho'
          )}

          <button
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
            type="submit"
            data-testid="save-button"
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: propTyes.string.isRequired,
  cardDescription: propTyes.string.isRequired,
  cardAttr1: propTyes.string.isRequired,
  cardAttr2: propTyes.string.isRequired,
  cardAttr3: propTyes.string.isRequired,
  cardImage: propTyes.string.isRequired,
  cardRare: propTyes.string.isRequired,
  cardTrunfo: propTyes.bool.isRequired,
  hasTrunfo: propTyes.bool.isRequired,
  isSaveButtonDisabled: propTyes.bool.isRequired,
  onInputChange: propTyes.func.isRequired,
  onSaveButtonClick: propTyes.func.isRequired,
};

export default Form;
