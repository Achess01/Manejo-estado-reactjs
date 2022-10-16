import React from "react";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  // componentWillUnmount
  // componentDidMount
  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading && this.state.loading) {
      console.log("Entrando");
      setTimeout(() => {
        if (SECURITY_CODE !== this.state.value) {
          this.setState({ error: true, loading: false });
        } else {
          this.setState({ error: false, loading: false });
        }
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2> {/* Usando props */}
        <p>Por favor, escribe el código de seguridad</p>
        {!this.state.loading && this.state.error && (
          <p>Error: El código es incorrecto</p>
        )}
        {/* Usando el estado */}
        {this.state.loading && <p>Cargando...</p>}
        <input
          placeholder="Código de seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button onClick={() => this.setState({ loading: true })}>
          {/* Alterando el estado */}
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
