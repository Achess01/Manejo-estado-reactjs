import React from "react";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: true,
      loading: false,
    };
  }

  // componentWillUnmount
  // componentDidMount
  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading && this.state.loading) {
      console.log("Entrando");
      setTimeout(() => {
        this.setState({ loading: false });
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2> {/* Usando props */}
        <p>Por favor, escribe el código de seguridad</p>
        {this.state.error && <p>Error: El código es incorrecto</p>}
        {/* Usando el estado */}
        {this.state.loading && <p>Cargando...</p>}
        <input placeholder="Código de seguridad" />
        <button onClick={() => this.setState({ loading: true })}>
          {/* Alterando el estado */}
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
