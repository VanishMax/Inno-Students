import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Loadable from "react-loadable"
import Loading from '&/Loading'

const AsyncMain = Loadable({
  loader: () => import(/* webpackChunkName: "AdminEditContent" */ './Main'),
  loading: () => null
})
const AsyncContent = Loadable({
  loader: () => import(/* webpackChunkName: "AdminEditContent" */ './Content'),
  loading: () => null
})
const AsyncMeta = Loadable({
  loader: () => import(/* webpackChunkName: "AdminEditMeta" */ './Meta'),
  loading: () => null
})
const AsyncPreview = Loadable({
  loader: () => import(/* webpackChunkName: "AdminEditPreview" */ './Preview'),
  loading: () => null
})

export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event, value){
    this.setState({ value })
  }

  render(){
    const { value } = this.state
    return(
      <React.Fragment>
        <AppBar position="static">
          <Tabs centered value={value} onChange={this.handleChange}>
            <Tab label="Main" />
            <Tab label="Content" />
            <Tab label="Meta"/>
            <Tab label="Preview"/>
          </Tabs>
        </AppBar>
        {value === 0 &&
        <AsyncMain>
          <Button variant="contained" color="primary" onClick={(e) => this.handleChange(e, 1)}>
            Next
          </Button>
        </AsyncMain>}
        {value === 1 &&
        <AsyncContent>
          <Button variant="contained" color="primary" onClick={(e) => this.handleChange(e, 2)}>
            Next
          </Button>
        </AsyncContent>}
        {value === 2 &&
        <AsyncMeta>
          <Button variant="contained" color="primary" onClick={(e) => this.handleChange(e, 3)}>
            Next
          </Button>
        </AsyncMeta>}
        {value === 3 && <AsyncPreview/>}
      </React.Fragment>
    )
  }
}