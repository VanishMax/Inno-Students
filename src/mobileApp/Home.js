import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = {
  paper: {
    margin: "auto",
    marginTop: 20,
    width: "90%",
    padding: 15
  },
  btnLeft: {
    marginRight: 20
  }
}

class Home extends React.Component{
  constructor(){
    super()
  }
  render(){
    return (
      <div>
        <Header/>
        <Helmet>
          <title>VaMax Mobile</title>
          <meta name="description" content="VaMax Mobile App" />
        </Helmet>
        <Paper elevation={4} style={styles.paper} align="center">
          <Typography variant="h5">Watta hell?</Typography>
        </Paper>
      </div>
    )
  }
}

export default Home
