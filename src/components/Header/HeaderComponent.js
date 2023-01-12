import React from 'react'
import { connect} from 'react-redux'
import { Button, TextField }  from '@material-ui/core'
import axios from 'axios'
import { ACTIONS, QUERY_ENDPOINT, COMMON_GREMLIN_ERROR } from '../../constants'
import { parseGremlinResponse } from '../../utils/parseGremlinResponse'

function Header(props) {

  const clearGraph = () => {
    props.dispatch({ type: ACTIONS.CLEAR_GRAPH })
  }

  const clearQueryHistory = () => {
    props.dispatch({ type: ACTIONS.CLEAR_QUERY_HISTORY })
  }
  // Send the gremlin query to the server
  const sendQuery = (e) => {
    e.preventDefault()
    props.dispatch({ type: ACTIONS.CLEAR_GRAPH })
    props.dispatch({ type: ACTIONS.SET_ERROR, payload: null })
    axios.post(
      QUERY_ENDPOINT,
      { host: props.host, port: props.port, query: props.query, nodeLimit: props.nodeLimit },
      { headers: { 'Content-Type': 'application/json' } }
    ).then((response) => {
      parseGremlinResponse(response, props.query, props.nodeLabels, props.dispatch)
    }).catch((error) => {
      props.dispatch({ type: ACTIONS.SET_ERROR, payload: COMMON_GREMLIN_ERROR })
    })
  }

  const onHostChanged = (host) => {
    props.dispatch({ type: ACTIONS.SET_HOST, payload: host })
  }

  const onPortChanged = (port) => {
    props.dispatch({ type: ACTIONS.SET_PORT, payload: port })
  }

  const onQueryChanged = (query) => {
    props.dispatch({ type: ACTIONS.SET_QUERY, payload: query })
  }
    return (
      <div className={'header'}>
        <form noValidate autoComplete="off">
          <TextField value={props.host} onChange={(event => onHostChanged(event.target.value))} id="standard-basic" label="host" style={{width: '10%'}} />
          <TextField value={props.port} onChange={(event => onPortChanged(event.target.value))} id="standard-basic" label="port" style={{width: '10%'}} />
          <TextField value={props.query} onChange={(event => onQueryChanged(event.target.value))} id="standard-basic" label="gremlin query example: g.V()" style={{width: '50%'}} />
          <Button variant="contained"  color="primary" onClick={sendQuery} style={{width: '150px'}}> Execute Query</Button>
          <Button variant="contained" color="secondary" onClick={clearGraph} style={{width: '150px'}}> Clear Graph</Button>
          <Button variant="contained" onClick={clearQueryHistory}> Clear Query History</Button>
        </form>
        <br />
        <div>{props.error}</div>
      </div>
    )
}

export const HeaderComponent = connect((state)=>{
  return {
    host: state.gremlin.host,
    port: state.gremlin.port,
    query: state.gremlin.query,
    error: state.gremlin.error,
    nodes: state.graph.nodes,
    edges: state.graph.edges,
    nodeLabels: state.options.nodeLabels,
    nodeLimit: state.options.nodeLimit
  }
})(Header)