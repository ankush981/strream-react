import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null }

  componentDidMount() {
    // ask Google to load additional JS
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '506833782535-5nnt35hjuog1inuvshrvdjl88ehupj66.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        // listen to auth status changes
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  onSignIn = () => {
    this.auth.signIn();
  }

  onSignOut = () => {
    this.auth.signOut();
  }

  renderAuthButton = () => {
    switch(this.state.isSignedIn) {
      case true:
        return (
          <button onClick={this.onSignOut} className="ui red google button">
            <i className="google icon"/>
            Sign Out
          </button>
        );
      case false:
        return (
          <button onClick={this.onSignIn} className="ui red google button">
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
 
export default GoogleAuth;