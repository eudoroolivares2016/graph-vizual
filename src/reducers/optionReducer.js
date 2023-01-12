import _ from 'lodash'
import { ACTIONS } from '../constants'
// https://visjs.github.io/vis-network/docs/network/ vis-network docs
// This just sets the value for the physics engine that the network uses
const initialState = {
  nodeLabels: [],
  queryHistory: [],
  nodeLimit: 10,
  networkOptions: {
    autoResize: true,
    // https://visjs.github.io/vis-network/docs/network/physics.html
    physics: {
      barnesHut: {
        avoidOverlap: 100
      },
      maxVelocity: 10,
      solver: 'barnesHut',
      timestep: 0.35,
      stabilization: {
        enabled: true,
        iterations: 50,
        updateInterval: 25
      }
    },
    //https://visjs.github.io/vis-network/docs/network/nodes.html
    nodes: {
      shape: "circle",
      size: 100,
      borderWidth: 2,
      font: {
        size: 12
      },
      shadow: true
    },
    // https://visjs.github.io/vis-network/docs/network/edges.html
    edges: {
      width: 2,
      font: {
        size: 12
      },
      shadow: true
    }
  }
}

// Take current state append the new values to the new state property
export const reducer =  (state=initialState, action)=>{
  switch (action.type){

    case ACTIONS.ADD_QUERY_HISTORY: {
      return { ...state, queryHistory: [ ...state.queryHistory, action.payload] }
    }
    case ACTIONS.CLEAR_QUERY_HISTORY: {
      return { ...state, queryHistory: [] }
    }
    case ACTIONS.SET_NODE_LABELS: {
      const nodeLabels = action.payload
      return { ...state, nodeLabels }
    }
    case ACTIONS.ADD_NODE_LABEL: {
      const nodeLabels = [...state.nodeLabels, {}]
      return { ...state, nodeLabels }
    }
    case ACTIONS.EDIT_NODE_LABEL: {
      const editIndex = action.payload.id
      const editedNodeLabel = action.payload.nodeLabel

      if (state.nodeLabels[editIndex]) {
        // python style slicing start at the index above
        const nodeLabels = [...state.nodeLabels.slice(0, editIndex), editedNodeLabel, ...state.nodeLabels.slice(editIndex+1)]
        return { ...state, nodeLabels }
      }
      return state
    }
    case ACTIONS.REMOVE_NODE_LABEL: {
      const removeIndex = action.payload
      // remove should not be negative
      if (removeIndex < state.nodeLabels.length) {
        const nodeLabels = [...state.nodeLabels.slice(0, removeIndex), ...state.nodeLabels.slice(removeIndex+1)]
        return { ...state, nodeLabels }
      }
      return state
    }
    case ACTIONS.SET_NODE_LIMIT: {
      const nodeLimit = action.payload
      return { ...state, nodeLimit }
    }
    default:
      return state
  }
}
