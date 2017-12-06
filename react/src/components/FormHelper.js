import React, { Component } from 'react'
import { Icon, Button, message } from 'antd'
import styled  from 'styled-components'
import confirm from './confirm'

/*-----------------------------------------------------------------------------
  to replace FormHelper, for us with antd Forms
-----------------------------------------------------------------------------*/

export const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 16 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const Toolbar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 20px;
`

class FormToolbar extends Component {

  _changesExist() {
    return this.props.form.isFieldsTouched(this.props.fields)
  }

  _handleSave = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { form, onSubmit, fields } = this.props
        if (onSubmit) {
          const hide = message.loading('Saving record..', 0);
          let record = Object.assign(this.props.record, values)
          let update = false
          let apiCall= undefined
          if (record.id) {
            update = true
            apiCall= this.props.onUpdate
          } else {
            update = false
            apiCall = this.props.onInsert
          }
          (
            new Promise(function (resolve, reject) {
              if (apiCall) {
                apiCall(record)
                  .then(res => {
                    resolve({
                      data: res.data, 
                      update
                    })
                  })
                  .catch(err => {
                    reject(err.message)
                  })
              } else {
                reject(`No ${update ? 'update' : 'insert'} method defined`)
              }
            })
          )
            .then((res) => {
              onSubmit(res.data, fields, res.update ? 'update' : 'insert')
              form.resetFields(fields)
              hide()
              message.success('Save complete')
            })
            .catch(err => {
              hide()
              message.error(err)
              return
            })
        }
      } else {
        message.error(err)
        return
      }
    })
  }

  _handleReset = () => {
    this.props.form.resetFields(this.props.fields)
    if (this.props.onReset) this.props.onReset(this.props.fields)
  }

  _handleDelete = () => {
    let confirmMessage = this.props.deleteMessage || 'Please confirm that you want to delete this record'
    const { onDelete, onSubmit, record, fields } = this.props
    confirm(confirmMessage, { title: "Delete confirmation" }).then(
      (ok) => {
        if (onDelete) {
          const hide = message.loading('Deleting record..', 0);
          (
            new Promise(function (resolve, reject) {
              onDelete(record.id)
                .then(res => {
                  resolve({
                    data: res.data, 
                  })
                })
                .catch(err => {
                  reject(err)
                })
            })
          )
          .then((res) => {
            onSubmit(res.data, fields, 'delete')
            hide()
            message.success('Delete complete')
          })
          .catch(err => {
            hide()
            message.error(err)
            return
          })
        } else {
          message.error('No delete method defined')
        }
      },
      (cancel) => { /* do nothing */ }
    )
  }

  _handleNew = () => {
    if (this._changesExist()) {
      let confirmMessage = this.props.newMessage || 'Changes will be lost, please confirm before proceeding'
      confirm(confirmMessage).then(
        (ok) => {
          this._handleReset()
          if (this.props.onNew) this.props.onNew(this.props.fields)
          this.props.onSubmit(undefined, this.props.fields, 'new')
        },
        (cancel) => { /* do nothing */ }
      )
    } else {
      if (this.props.onNew) this.props.onNew(this.props.fields)
      this.props.onSubmit(undefined, this.props.fields, 'new')
    }
  }

  render() {
    return (
      <Toolbar>
        <Button 
          type="button"
          onClick={this._handleNew}>
          <Icon type="file-add"/>New
        </Button>
        <Button 
          type="button"
          htmlType="submit"
          onClick={this._handleSave} >
          <Icon type="save"/>Save
        </Button>
        <Button 
          type="button"
          onClick={this._handleReset}>
          <Icon type="retweet" />Clear
        </Button>
        <Button 
          type="button"
          onClick={this._handleDelete} >
          <Icon type="delete"/>Delete
        </Button>
      </Toolbar>
    )
  }
}

export default FormToolbar