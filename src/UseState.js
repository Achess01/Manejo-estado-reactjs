import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, _setState] = React.useState({
    value: "",
    error: false,
    loading: false,
  });

  const setState = (state) => {
    _setState((prevState) => ({ ...prevState, ...state }));
  };

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState({
            error: true,
            loading: false,
          });
        } else {
          setState({
            error: false,
            loading: false,
          });
        }
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad</p>
      {!state.loading && state.error && <p>Error: El código es incorrecto</p>}
      {state.loading && <p>Cargando...</p>}
      <input
        placeholder="Código de seguridad"
        value={state.value}
        onChange={(event) => setState({ value: event.target.value })}
      />
      <button onClick={() => setState({ loading: true })}>Comprobar</button>
    </div>
  );
}

export { UseState };
