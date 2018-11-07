import React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions/DialogActions"
import Button from "@material-ui/core/Button/Button"
import Dialog from "@material-ui/core/Dialog/Dialog"

class MyDialog extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const {created, dialogClose, title} = this.props
    return(
      <Dialog open={created} onClose={dialogClose}>
        <DialogTitle>News "{title}" is sucessfully created</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please, close this window, click on edit, select your news and finish it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

MyDialog.propTypes = {
  created: PropTypes.bool.isRequired,
  dialogClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
export default MyDialog