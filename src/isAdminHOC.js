import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

export default function isAdminHOC (ChildComponent) {
  return class isAdmin extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        loading: true,
        admin: null
      }
    }
    componentDidMount() {
      axios.post('/auth/isAdmin')
        .then((response) => {
          if(!response.data.isAdmin){
            window.location.pathname = '/auth/google'
          }else{
            this.setState({admin: response.data.isAdmin, loading: false})
          }
        })
        .catch((error)=>{
          console.log(error)
        })
    }
    render(){
      const { loading, admin } = this.state
      let rendered
      if( loading == true && admin == null) rendered = <CircularProgress/>
      if( loading == false && admin == true) rendered = <ChildComponent size={50} style={{ marginTop: 60, marginLeft: 30}} {...this.props}/>

      return rendered
    }
  }
}
