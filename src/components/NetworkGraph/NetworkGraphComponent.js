import React, { useEffect, useRef } from 'react'
import {connect} from 'react-redux'
import { Network } from 'vis-network'
import { ACTIONS } from '../../constants'

function NetworkGraph (props) {
  const container = useRef(null)
  // If the props change then use these settings default is empty array
  useEffect(() => {
    const data = {
          nodes: props.nodeHolder,
          edges: props.edgeHolder
        }
        const options = props.networkOptions
    const network =
      container.current &&
      new Network(container.current, data, options)
      network.on('selectNode', (params) => {
          const nodeId = params.nodes && params.nodes.length > 0 ? params.nodes[0] : null
          props.dispatch({ type: ACTIONS.SET_SELECTED_NODE, payload: nodeId })
          })
      network.on("selectEdge", (params) => {
        // Not add Nodes have Edges
        const edgeId = params.edges && params.edges.length === 1 ? params.edges[0] : null
        const isNodeSelected = params.nodes && params.nodes.length > 0
        if (!isNodeSelected && edgeId !== null) {
          props.dispatch({ type: ACTIONS.SET_SELECTED_EDGE, payload: edgeId })
        }
  }) }, [props])
    return (<div ref={container} className={'mynetwork'} />)
}
export const NetworkGraphComponent = connect((state)=>{
  return {
    nodeHolder: state.graph.nodeHolder,
    edgeHolder: state.graph.edgeHolder,
    networkOptions: state.options.networkOptions
  }
})(NetworkGraph)