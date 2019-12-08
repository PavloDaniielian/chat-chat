const styles = () => ({
  chatPage:{
    backgroundColor:'#D5D4D0'
  },

  formBodyWrapper:{
    marginTop:20,
    padding:40
  },

  formBody:{
    height:400,
    padding:30
  },
  
  margin:{
    marginTop:40
  },

  marginLarge:{
    marginTop: 80
  },

  messagesBox:{
  	minHeight:'300px',
  	maxHeight:'300px',
  	overflow:'auto',
  	padding:20,
  	borderStyle:'inset',
  	backgroundColor:'white',
  },

  messagesBoxBorder:{
   paddingLeft:10,
   paddingRight:10,
   paddingTop:20,
   paddingBottom:10,
   backgroundColor:'#D5D4D0'
  },

  message:{
   marginBottom:10
  },

  chatBox:{
   backgroundColor:'white',
   borderStyle:'inset',
   minHeight:'150px',
   maxHeight:'150px',
  },

  chatBoxBorder:{   
   paddingLeft:10,
   paddingRight:10,
   paddingTop:10,   
   backgroundColor:'#D5D4D0'
  },

  chatBoxTextField:{
  	border:"none",
  	resize: "none",
  	outline: "none",
  	fontSize: 20,
  	padding:10,
  	width:720,
  	height:130
  },

  chatBoxToolBarBorder:{
  	padding:10,
  	backgroundColor:'#D5D4D0'
  },

  chatBoxToolBar: {
  	height:60,
  	border:'1px solid white',
  	outline:'2px solid #b0b0b0',
  	backgroundColor:'#D5D4D0'
  },

  sendButtonWrapper:{
    height: 55,
    float: 'right'
  },

  fakeSettings:{
    height: 27
  },

  fakeEditorTools:{
    height: 50,
    marginLeft: 60
  },

  sendButton:{
    padding:0
  },

  sendButtonImage:{
    height: 59,
  },

  fakeTools:{
    height: 57,
    marginLeft: 10
  }
});

export default styles;