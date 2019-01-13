import React from 'react'
import { Helmet } from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '&/redux/actions'

import Header from '../Header'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const styles = {
  paper: {
    margin: "auto",
    marginTop: 200,
    width: "40%",
    padding: 15
  },
  btnLeft: {
    marginRight: 20
  }
}

class Index extends React.Component{
  constructor(){
    super()
    this.increase = this.increase.bind(this)
    this.decrease = this.decrease.bind(this)
  }
  increase(){
    this.props.actions.increase()
  }
  decrease(){
    this.props.actions.decrease()
  }
  render(){
    return (
      <div>
        <Helmet>
          <title>MWA - Home</title>
          <meta name="description" content="Modern Web App - Home Page" />
        </Helmet>
        <Header/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  count: state.count
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
