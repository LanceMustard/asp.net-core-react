import React, { Component } from 'react'
import { Icon, Button, Popconfirm, message } from 'antd'
import styled  from 'styled-components'

/*-----------------------------------------------------------------------------
  FormItem validations (redux-form-ant)
-----------------------------------------------------------------------------*/

export const required = value => value ? undefined : 'This is a required value'
export const email = (value) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return value && !re.test(value) ? 'Please enter a valid email address?' : undefined
}

/*-----------------------------------------------------------------------------
  Toolbar button events
-----------------------------------------------------------------------------*/

export const handleFormSubmit = (values, form) => {
  if (values.mode === 'delete') {
    const hide = message.loading('Deleting record..', 0);
    form.props.deleteRecord(values.id)
    .then((data) => {
      hide()
      message.success('User deleted')
    })
  } else if (values.mode === 'new') {
    form.props.newRecord();
  } else {
    if (values.id === 0) {
      const hide = message.loading('Creating new record..', 0);
      form.props.createRecord(values)
      .then((data) => { 
        hide()
        if (data.error) {
          console.log(data.payload)
          message.error(`Error creating record [${data.payload.message}]`)  
        } else
        {
          message.success('Save complete')
        }
      })
      .catch((err) => {
        hide()
        message.error(`Error creating record [${err}]`)
      })
    } else {
      const hide = message.loading('Updating record..', 0);
      form.props.updateRecord(values)
      .then(() => { 
        hide()
        message.success('Save complete')
      })
    }
  }
}

/*-----------------------------------------------------------------------------
  Components
-----------------------------------------------------------------------------*/

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

class FormToolbar extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting, onSubmit } = this.props
    return  (
      <Wrapper>
        <Button 
          type="button" 
          disabled={submitting} 
          onClick={handleSubmit(values => onSubmit({...values, mode: 'new'}, this))}>
          <Icon type="file-add"/>New
        </Button>
        <Button 
          type="button" 
          disabled={pristine || submitting} 
          onClick={handleSubmit(values => onSubmit({...values, mode: 'save'}, this))}>
          <Icon type="save"/>Save
        </Button>
        <Button 
          type="button" 
          disabled={pristine || submitting} 
          onClick={reset}>
          <Icon type="retweet"/>Clear
        </Button>
        <Popconfirm 
          title="Confirm delete?" 
          onConfirm={handleSubmit(values => onSubmit({...values, mode: 'delete'}, this))}>
          <Button 
            type="button" 
            disabled={submitting}>
            <Icon type="delete"/>Delete
          </Button>
        </Popconfirm>
      </Wrapper>
    )
  }
}

export default FormToolbar