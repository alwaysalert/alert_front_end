import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function CheckBox(props) {
    
   
    
     
return (
    <div>
      <Dialog
        open={props.Open}
        TransitionComponent={Transition}
        onClose={props.cancelButton}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.contents}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.cancelButton}>취소</Button>
          <Button onClick={props.checkButton} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>


  )
}

export default CheckBox