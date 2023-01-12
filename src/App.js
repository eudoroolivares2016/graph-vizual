import React from 'react'
import { Grid }  from '@material-ui/core'
import { NetworkGraphComponent } from './components/NetworkGraph/NetworkGraphComponent'
import { HeaderComponent } from './components/Header/HeaderComponent'
import { OptionsComponent } from './components/Options/OptionsComponent'

function App (){
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <HeaderComponent />
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <NetworkGraphComponent />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <OptionsComponent />
          </Grid>
        </Grid>
      </div>
      )
}
export default App