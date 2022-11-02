import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm });
  };

  const onError = () => {
    dispatch({ type: actionTypes.error });
  };

  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  };

  const onReset = () => {
    dispatch({ type: actionTypes.reset });
  };

  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value });
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

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  delete: "DELETE",
  reset: "RESET",
  write: "WRITE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { UseReducer };
