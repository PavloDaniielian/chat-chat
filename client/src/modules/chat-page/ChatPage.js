import React, { Component } from 'react';

//styling
import { withStyles } from '@material-ui/core';
import styles from './styles/ChatPage';
import fakeFeatureTools from'./images/fake-features.png';
import fakeEditorTools from'./images/fake-editor-tools.png';
import sendButton from'./images/send-btn.png';
import fakeSettings from'./images/fake-windows-settings.png';

//customs
import ErrorState from './ErrorState';

//material-UI components
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//api imports
import { connectToChatServer,sendMessage } from '../../api/user.actions';

//utils
import random from 'random-key-generator';

const ENTER_CHAR_CODE = 13;

const renderChatMessages = (messages, classes) => {
 if(!messages){
  return
 }
 return (
  <div>
   {messages.map((messageObj,index) => (
     <React.Fragment key={index}>
       <ListItem className={classes.message}>        
         <ListItemAvatar>
           <Avatar src={messageObj.profile.avatar} alt={`user ${index}`} />

         </ListItemAvatar>
          <Tooltip title={messageObj.timestamp} placement="bottom-end">
          <ListItemText 
            primary={messageObj.username}
            secondary={messageObj.message}
           />
         </Tooltip>
       </ListItem>
     </React.Fragment>
   ))}   
  </div>
 );
}

class ChatPage extends Component {

  constructor(props) {
   super(props);
   this.state={
    chatMessages:[],
    chatInput:'',
    completedSetup: false,
    profileForm:{
      username:'',
      avatar:''
    }
   }

   this.handleServer = this.handleServer.bind(this);
   this.onType = this.onType.bind(this);
   this.handleKeys = this.handleKeys.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
   this.onSubmitProfile = this.onSubmitProfile.bind(this);
  }

  componentDidMount(){
    this.setState({
      chatPerson:{
        username: 'Username Placeholder',
        avatarUrl: 'url'
      }
    },() => {
      connectToChatServer({}, this.handleServer);
      this.scrollToBottom();
    });
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  scrollToBottom(){
    if(this.listBottom){
      this.listBottom.scrollIntoView();     
    }
  }

  handleServer(responsePacket){
    if(responsePacket.handshakeSucceeded){
      alert(' You have connected to the server!');
      this.setState({
        chatMessages: responsePacket.chatMessages
      });
    }
 
    else if(responsePacket.chatMessages){
      this.setState({
        chatMessages: responsePacket.chatMessages
      });
    }
    
    else if(responsePacket.errors){
      alert(' You have failed to connect to the server!');
      this.setState({
        errors: true
      })
    }
 
    else if(responsePacket.serverGreetingMessage){
    }
  }

  onSubmit(){
    const { chatInput , chatPerson } = this.state;
    if(chatInput !== ''){
      sendMessage({
        person:{
          username: chatPerson.username,
          id: chatPerson.id,
          avatar: chatPerson.avatar
        },
        message: chatInput
      },(messages)=>{
       this.setState({
        chatInput: ''
       });
      });
    }
  }

  onType(event){
   if(event.target.value !== '\n'){
    this.setState({
       chatInput: event.target.value
    });
   }
  }

  handleKeys(event){
    if(event.charCode === ENTER_CHAR_CODE){
      this.onSubmit();
    }
  }

  onSubmitProfile(){
    const { profileForm } = this.state;
    this.setState({
      chatPerson:{
        username: profileForm.username,
        avatar: profileForm.avatar,
        id: random(12)
      },
      completedSetup: true, 
    });
  }


  handleProfileFormChange = name => ({target: {value}}) => {   
    this.setState({ 
      profileForm:{
        ...this.state.profileForm,
        [name]: value 
      } 
    });
  }

  renderRequiredForm(classes){
    const { profileForm } = this.state;
    return(
     <div className={classes.formBodyWrapper}>      
      <Paper className={classes.formBody}>
      <Typography variant="h4" gutterBottom>
        Who do you think you are?
      </Typography>
        
        <FormControl fullWidth className={classes.margin}>
          <TextField value={profileForm.username} onChange={this.handleProfileFormChange('username')} required label="Chat Username" />
         </FormControl>

         <FormControl fullWidth className={classes.margin}>
          <TextField value={profileForm.avatar} onChange={this.handleProfileFormChange('avatar')} required label="Avatar Url" />
         </FormControl>

          <Button 
           fullWidth 
           variant="outlined" 
           size="large" 
           color="primary" 
           className={classes.marginLarge}
           onClick={this.onSubmitProfile}
           >
             I'm Done..
          </Button>        
      </Paper>
      </div>
    );
  }

  render() {
   const { classes } = this.props;
   const { chatMessages, errors, chatInput, completedSetup } = this.state;

   if(!completedSetup){
    return(
      this.renderRequiredForm(classes)
    );
   }
   
   if(errors){
     return(
      <ErrorState />
     );
   }

   return (
    <div className={classes.chatPage}>
     <img src={fakeSettings} alt="fake-settings" className={classes.fakeSettings}/>
     <div className={classes.messagesBoxBorder} >
      <List className={ classes.messagesBox }>
       { renderChatMessages(chatMessages, classes) }
       <div ref={(el) => { this.listBottom = el; }}/>
      </List>
     </div>
     
     <img src={fakeEditorTools} alt="fake-editor-tools" className={classes.fakeEditorTools} />


     <div className={classes.chatBoxBorder} >
       <Paper
         className={classes.chatBox}
       >
       <textarea onChange={this.onType} onKeyPress={this.handleKeys} value={chatInput} className={classes.chatBoxTextField} />
       </Paper>
     </div>

     <div className={classes.chatBoxToolBarBorder}>
       <div className={classes.chatBoxToolBar}>  
         <img src={fakeFeatureTools} alt="fake-tools" className={classes.fakeTools} />
         <div className={classes.sendButtonWrapper}>
         <button className={classes.sendButton}>
          <img src={sendButton} alt="submit-btn" className={classes.sendButtonImage} onClick={this.onSubmit} />
         </button>        
         </div>

       </div>
     </div>
    </div>
   );
  }
}

export default withStyles(styles)(ChatPage);