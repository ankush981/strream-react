import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // ask Google to load additional JS
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '506833782535-5nnt35hjuog1inuvshrvdjl88ehupj66.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        // listen to auth status changes
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => { // true or false sent by Google callback
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton = () => {
    switch(this.props.isSignedIn) {
      case true:
        return (
          <button onClick={this.onSignOutClick} className="ui red google button">
            <i className="google icon"/>
            Sign Out
          </button>
        );
      case false:
        return (
          <button onClick={this.onSignInClick} className="ui red google button">
            <i className="google icon"/>
            Sign In with Google
          </button>
        );
      default:
        return null;
    }
  }

  render() { 
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
}
 
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);