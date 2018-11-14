import React from 'react'
import Header from '../Header'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

import config from '#/admin'
import Loadable from "react-loadable"
import Loading from '&/Loading'

const AsyncMenu = Loadable({
  loader: () => import(/* webpackChunkName: "AdminMenu" */ './Menu'),
  loading: () => null
})
const AsyncEdit = Loadable({
  loader: () => import(/* webpackChunkName: "AdminEdit" */ './Edit/'),
  loading: () => null
})
export default class Admin extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      loaded: false,
      isAdmin: false
    }
  }
  componentDidMount(){
    axios.post('/auth/isAdmin')
      .then((response) => {
        if(!response.data.isAdmin){
          window.location.pathname = '/auth/google'
        }else{
          this.setState({isAdmin: response.data.isAdmin, loaded: true})
        }
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  render(){
    const {lang, edit} = this.props
    if(this.state.loaded === false){
      return(
        <div>
          <Header lang={lang} title={config.header[lang]}/>
          <CircularProgress size={75} style={{margin: "auto", width: 100}}/>
        </div>
      )
    }else{
      if(this.state.isAdmin === true){
        return (
          <React.Fragment>
            <Helmet>
              <title>{config.header[lang]}</title>
              <meta name="description" content="VaMax app" />
            </Helmet>
            <Header lang={lang} title={config.header[lang]}/>
            {edit ? <AsyncEdit/> : <AsyncMenu/>}
          </React.Fragment>
        )
      }
    }
  }
}