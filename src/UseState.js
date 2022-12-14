import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, _setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const setState = (state) => {
    _setState((prevState) => ({ ...prevState, ...state }));
  };

  const onConfirm = () => {
    setState({
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      error: true,
      loading: false,
    });
  };

  const onWrite = (event) => {
    setState({ value: event.target.value });
  };

  const onCheck = () => {
    setState({ loading: true });
  };

  const onDelete = () => {
    setState({ deleted: true });
  };

  const onReset = () => {
    setState({ confirmed: false, deleted: false, value: "" });
  };

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {!state.loading && state.error && <p>Error: El código es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={onWrite}
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>¿Seguro que quiéres eliminar el componente?</p>
        <button onClick={onDelete}>Sí, eliminar</button>
        <button onClick={onReset}>No, regresar</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>UseState Eliminado</h2>
        <button onClick={onReset}>Regresar</button>
      </React.Fragment>
    );
  }
}

export { UseState };
