import React from 'react';

import ReactDOM from 'react-dom';
import { of, mergeMap, map, subsribe, catchError, pipe, Observable, ajax } from 'rxjs';
import { createStore } from 'redux';
import { useSelector } from 'react-redux'



const initialState = { users: [{ login: 'waiting...' }] }

function stateReducer(state = initialState, action) {
  switch (action.type) {
    case 'clearUsers':
      return {}
    case 'setUsers':
      return {
        ...state,
        users: action.payload
      };
    default:
      return state
  }
}


const store = createStore(stateReducer)

function clc() {
  let requestStream = of("https://api.github.com/users?per_page=3");

  let responseStream = requestStream.pipe(
    mergeMap(val =>
      ajax.ajax(val)));
  responseStream.pipe(
    map(userResponse =>
    {
      console.log('st ' + store)

      store.dispatch({ type: 'setUsers', payload: userResponse.response });
    }),
    catchError(error => {
      console.log('errort: ', error);
      // return of(error);
    })).subscribe();
}

function Title(props) {
  return (<h1 className="">{props.label}</h1>)
}

function Paragraph(props) {
  return (
    <p className="">
      {props.text}
      </p>
  )
}

function ButtonX(props) {
  const myRef = React.useRef();
  return (<button ref={myRef} onClick={clc}>START</button>)
}

function Main(props) {
  const [state, stateCallback] = React.useState({ users: [{ login: 'press start' }] })
//  store.subscribe()

  return (
    <div className="">
        <Title label={state.users.length} />
        {  state.users.map( o=> 
          <Paragraph key={o.login} text={o.login} />
         ) }
          <ButtonX></ButtonX>
      </div>
  )
}

const container = document.getElementById('react-app')


const root = ReactDOM.createRoot(container);
root.render(<Main title="React" text="Caution: do not look into laser with remaining eye."></Main>);