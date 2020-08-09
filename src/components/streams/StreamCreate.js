import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    );
  }

  renderError = ({ error, touched }) => {
    if(touched && error) {
      return(
        <div className="ui error message">
          <div className="header">
            {error}
          </div>
        </div>
      );
    }
  }

  onSubmit = formValues => {
    this.props.createStream(formValues);
  }

  render() { 
    return (
      // on submit, we call the redux-form function, which calls our function 
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className="ui form error"
      >
        {/* Remember, label here is the prop we passed for label content */}
        <Field 
          name="title" 
          component={this.renderInput} 
          label="Enter Title"
        />
        <Field 
          name="description" 
          component={this.renderInput} 
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  
  if(!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if(!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors; // errors get passed to the renderInput function automatically
};
 
export default connect(null, { createStream })(reduxForm({
  form: 'createStream', //name of the form
  validate, // validation function name
})(StreamCreate));