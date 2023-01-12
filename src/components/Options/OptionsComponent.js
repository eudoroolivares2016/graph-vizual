import React from 'react'
import { connect } from 'react-redux'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  TextField,
  Fab,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Tooltip
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import RefreshIcon from '@material-ui/icons/Refresh'
import _ from 'lodash'
import { JsonToTable } from 'react-json-to-table'
import { ACTIONS } from '../../constants'

function Options (props) {
  const testJson = {
    "Id": "0AF0BB4E-7455-FBB2-15C7-B5B7DE43AA6D",
    "Name": "Test Service but updated",
    "Description": "Testing Service",
    "Type":"SERVICE_IMPLEMENTATION",
    "InterfaceName":"EOSIDS Service Interface",
    "URL":"www.example.com",
    "MetadataSpecification": {
      "Name": "Service Entry",
      "Version": "1.0.0",
      "URL": "https://cdn.earthdata.nasa.gov/generics/service-entry/v1.0.0",
      "ContactMechanisms": [
        {
            "Type": "Email",
            "Value": "who@example.gov"
        },
        {
            "Type": "Email",
            "Value": "you@example.gov"
        }
    ]
    }}

  const onAddNodeLabel = () => {
    props.dispatch({ type: ACTIONS.ADD_NODE_LABEL })
  }

  const onEditNodeLabel = (index, nodeLabel) => {
    props.dispatch({ type: ACTIONS.EDIT_NODE_LABEL, payload: { id: index, nodeLabel } })
  }

  const onRemoveNodeLabel = (index) => {
    props.dispatch({ type: ACTIONS.REMOVE_NODE_LABEL, payload: index })
  }

  const onEditNodeLimit = (limit) => {
    props.dispatch({ type: ACTIONS.SET_NODE_LIMIT, payload: limit })
  }

  const onRefresh = () => {
    props.dispatch({ type: ACTIONS.REFRESH_NODE_LABELS, payload: props.nodeLabels })
  }

  const generateList = (list) => {
    return list.map(hist => <ListItem> 
      <ListItemText primary={hist}/></ListItem>)
  }

  const generateNodeLabelList = (nodeLabels) => {
    let index = -1
    return nodeLabels.map( nodeLabel => {
      index = index + 1
      nodeLabel.index = index
      // Create REACT element for each of the labels
      return React.cloneElement((
        <ListItem>
          <TextField id="standard-basic" label="Node Type" InputLabelProps={{ shrink: true }} value={nodeLabel.type} onChange={event => {
            const type = event.target.value
            const field = nodeLabel.field
            onEditNodeLabel(nodeLabel.index, { type, field })
          }}
          />
          <TextField id="standard-basic" label="Label Field" InputLabelProps={{ shrink: true }} value={nodeLabel.field} onChange={event => {
            const field = event.target.value
            const type = nodeLabel.type
            onEditNodeLabel(nodeLabel.index, { type, field })
          }}/>
          <IconButton aria-label="delete" size="small" onClick={() => onRemoveNodeLabel(nodeLabel.index)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItem>
      ), {
        key: index
      })
    })
  }
    let hasSelected = false
    let selectedType = null
    let selectedId = null 
    let selectedProperties = null
    let selectedHeader = null
    // If we have a node
    if (!_.isEmpty(props.selectedNode)) {
      hasSelected = true
      selectedType = props.selectedNode.type
      // selectedId = _.get(props.selectedNode, 'id')
      selectedId = props.selectedNode.id
      console.warn('do these properties do anything permitted Groups', props.selectedNode.properties.permittedGroups)
      // selectedProperties = _.get(props.selectedNode, 'properties')
      selectedProperties = props.selectedNode.properties

      // At this point the missing properties are gone
      console.warn('These are the selected properties before being stringified', selectedProperties)
      // stringifyObjectValues(selectedProperties)
      // console.warn('These are the selected properties', selectedProperties)
      selectedHeader = 'Node'
    } else if (!_.isEmpty(props.selectedEdge)) {
      hasSelected = true
      selectedType = props.selectedEdge.type
      // selectedType =  _.get(props.selectedEdge, 'type')
      // selectedId = _.get(props.selectedEdge, 'id')
      selectedId = props.selectedEdge.id
      // selectedProperties = _.get(props.selectedEdge, 'properties')
      selectedProperties = props.selectedEdge.properties
      selectedHeader = 'Edge'
      // stringifyObjectValues(selectedProperties)
    }
  
    return (
      <div className={'details'}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="panel1a-header">
                <Typography>Query History</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {generateList(props.queryHistory)}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="panel1a-header">
                <Typography>Node Label Controller</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Tooltip title="Number of max nodes from the query empty means no restrictions" aria-label="add">
                      <TextField label="Node Limit" type="Number" variant="outlined" value={props.nodeLimit} onChange={event => {
                        const limit = event.target.value
                        onEditNodeLimit(limit)
                      }} />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography>Node Labels</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <List dense={true}>
                      {generateNodeLabelList(props.nodeLabels)}
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Fab variant="extended" color="primary" size="small" onClick={onRefresh}>
                      <RefreshIcon />
                      Refresh
                    </Fab>
                    <Fab variant="extended" size="small" onClick={onAddNodeLabel}>
                      <AddIcon />
                      Add Node Label
                    </Fab>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {/* Below are the properties tab for nodes if it is selected which are clicked on */}
          {hasSelected}
          <Grid item xs={12} sm={12} md={12}>
            <h1>Type: {selectedHeader}</h1>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Table aria-label="simple" table size= "medium" >
                  <TableBody>
                    <TableRow key={'type'}>
                      <TableCell scope="row">Label</TableCell>
                      <TableCell align="left">{String(selectedType)}</TableCell>
                    </TableRow>
                    <TableRow key={'id'}>
                      <TableCell scope="row">Graph Generated ID</TableCell>
                      <TableCell align="left">{String(selectedId)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <JsonToTable json={selectedProperties}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
// TODO: upgrade to passing useState around eventually
export const OptionsComponent = connect((state)=>{
  return {
    host: state.gremlin.host,
    port: state.gremlin.port,
    network: state.graph.network,
    selectedNode: state.graph.selectedNode,
    selectedEdge: state.graph.selectedEdge,
    queryHistory: state.options.queryHistory,
    nodeLabels: state.options.nodeLabels,
    nodeLimit: state.options.nodeLimit,
    isPhysicsEnabled: state.options.isPhysicsEnabled
  }
})(Options)