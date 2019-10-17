import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./styles.css";
import { store } from "./store";
import * as actions from "./store/actions";

function mapStateToProps(state, ownProps) {
  return {
    todo: state.todo,
    list: state.list,
    start: state.start
  };
}

function mapActionToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function Child(props) {
  const handleClick = function() {
    const last = props.todo[props.todo.length - 1];
    props.actions.addTodo(last + 1);
  };

  const getTopics = function() {
    // redux-thunk 需要传入 dispatch
    // props.actions.getTopicsByThunk();
    // redux-promise 无法发出 loading 态
    // props.actions.getTopicsByPromise();
    // diy-redux-promise
    // props.actions.getTopicsByDiyPromise();
    // redux-saga  generator
    props.actions.getTopicsBySaga();
  };
  return (
    <>
      <button onClick={handleClick}>add todo</button>
      <p>{props.todo.join("/")}</p>
      <button onClick={getTopics}>get topics</button>
      {props.start && <p>loading...</p>}
      <ul>
        {props.list.map(({ id, title }) => {
          return <li key={id}>{title}</li>;
        })}
      </ul>
    </>
  );
}

const ChildStoreComp = connect(
  mapStateToProps,
  mapActionToProps
)(Child);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <ChildStoreComp />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
