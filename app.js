import React from 'react';
import ReactDOM from 'react-dom';
import { of, mergeMap, map, subsribe, catchError, pipe, Observable, ajax } from 'rxjs';
import { createStore } from 'redux';


const initialState = { users: [{ login: 'waiting...' }] }

// Create a "reducer" function that determines what the new state
// should be when something happens in the app
function stateReducer(state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case 'clearUsers':
      return {}
    case 'setUsers':
      return {
        ...state,
        users: action.payload
      };
    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state
  }
}

// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic


const store = createStore(stateReducer)

function clc() {
  let requestStream = of("https://api.github.com/users?per_page=3");

  let responseStream = requestStream.pipe(
    mergeMap(val =>
      ajax.ajax(val)));
  responseStream.pipe(
    map(userResponse =>
    {
      console.log('st '+store)

      store.dispatch({ type: 'setUsers', payload: userResponse.response });
    }),
    catchError(error => {
      console.log('errort: ', error);
      // return of(error);
    })).subscribe();
}

class Title extends React.Component {
  render() {
    return (<h1 className="">{this.props.label}</h1>)
  }
}

class Paragraph extends React.Component {
  render() {
    return (
      <p className="">
      {this.props.text}
      </p>
    )
  }
}

class ButtonX extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    // console.log(createStore)
  }
  render() {
    return (
      <button ref={this.myRef} onClick={clc}>START</button>)
  }
}
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [{login:'press start'}] }
    store.subscribe(this.updateState.bind(this))
  }
  updateState()
  {
   //console.log(this)
  this.setState(store.getState())
  }

  render() {
    //  const state = store.getState();
    console.log('state ' + this.state.users)
    return (
      <div className="">
        <Title label={this.state.users.length} />
        {  this.state.users.map( o=> 
          <Paragraph key={o.login} text={o.login} />
         ) }
          <ButtonX></ButtonX>
      </div>
    )
  }

}

const container = document.getElementById('react-app')


const root = ReactDOM.createRoot(container);
root.render(<Main title="React" text="Caution: do not look into laser with remaining eye."></Main>);