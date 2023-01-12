import _, { forEach } from 'lodash'

const getRandomLabel = (obj) => {
  return Object.keys(obj)[0]
}

// Retrieve new nodes
export const getDiffNodes = (newList, oldList) => {
  const diffNodes = _.difference(newList, oldList)
  return diffNodes
}

// Retrieve new Edges based on the unique properties in from and to
export const getDiffEdges = (newList, oldList) => {
  const diffEdge = _.difference(newList, oldList)
  console.warn('diff edges' , diffEdge)
  return diffEdge
}

export const extractEdgesAndNodes = (nodeList, nodeLabels=[]) => {
  let edges = []
  const nodes = []

  // const nodeLabelMap =_.mapValues( _.keyBy(nodeLabels, 'type'), 'field')
  const nodeLabelMap =_.mapValues(nodeLabels.type, nodeLabels.field)

  // foreach node in node list apply
  _.forEach(nodeList, (node) => {
    const type = node.label
    // If the object is not in the nodeLabel map, then we assign a random field (the first) as the label
    if (!nodeLabelMap[type]) {
      const field = getRandomLabel(node.properties)
      const nodeLabel = { type, field }
      nodeLabels.push(nodeLabel)
      nodeLabelMap[type] = field
    }
    const labelField = nodeLabelMap[type]
    const label = labelField in node.properties ? node.properties[labelField] : type

    // Nodes to update the current state of the graph
    nodes.push({ id: node.id, label: String(label), group: node.label, properties: node.properties, type })
    
    // concat the current edges with the values in the nodes.edges
    edges = edges.concat(_.map(node.edges, edge => ({ ...edge, type: edge.label})))
  })
  // console.warn('nodes before extraction' ,nodes)
  console.log('nodes as they should be returning from extractor function', nodes)
  return { edges, nodes, nodeLabels }
}

export const findNodeById = (nodeList, id) => {
  const foundNode = nodeList.find(node => node.id === id)
  return foundNode
}