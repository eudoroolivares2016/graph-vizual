import { extractEdgesAndNodes } from './utils'
import { ACTIONS } from '../constants'

// TOOD: remove we no longer need to pass the query
// TOOD The query is returning only a single value for properties with multiple notes in them
export const parseGremlinResponse = (result, query, oldNodeLabels, dispatch) => {
  const { nodes, edges, nodeLabels } = extractEdgesAndNodes(result.data, oldNodeLabels)
  console.warn('The full result of the query', result)

  dispatch({ type: ACTIONS.ADD_NODES, payload: nodes })
  dispatch({ type: ACTIONS.ADD_EDGES, payload: edges })
  dispatch({ type: ACTIONS.SET_NODE_LABELS, payload: nodeLabels })
  // console.log(nodeLabels)
  // console.warn(nodes)

  dispatch({ type: ACTIONS.ADD_QUERY_HISTORY, payload: query })
}