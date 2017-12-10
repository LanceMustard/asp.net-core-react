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
  _updateProgress = (message) => {
    if (this.props.onProgress) {
      this.props.onProgress(message) 
    } 
  }

  _changesExist() {
    return this.props.form.isFieldsTouched(this.props.fields)
  }

  _handleSave = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { form, onSubmit, fields } = this.props
        if (onSubmit) {
          // const hide = message.loading('Saving record..', 0);
          this._updateProgress('Saving record...')
          let record = Object.assign(this.props.record, values)
          console.log(JSON.stringify(record))
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
              // hide()
              this._updateProgress(null)
              message.success('Save complete')
            })
            .catch(err => {
              // hide()
              this._updateProgress(null)
              message.error(err)
              return
            })
        } else {
          console.error('No onSubmit event defined')
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
    confirm(confirmMessage, { title: "Delete confirmation" })
    .then((ok) => {
        if (onDelete) {
          if (record.id) {
          this._updateProgress('Deleting record...')
          let deletePromise =  new Promise((resolve, reject) => {
            try {
              const result = onDelete(record.id)
              resolve(result)
            } 
            catch (err) {
              reject(err)
            }
          })
          deletePromise
            .then((res) => {
              onSubmit(res.data, fields, 'delete')
              this._updateProgress(null)
              message.success('Delete complete')
            })
            .catch(err => {
              this._updateProgress(null)
              message.error(err)
            })
          } else {
            // no record to delete so just clear the form (same code as Clear/handleNew)
            // ToDO: manage the enabled state of the Delete button to only be available when a record exists
            this._handleReset()
            if (this.props.onNew) this.props.onNew(this.props.fields)
            this.props.onSubmit(undefined, this.props.fields, 'new')
          }
        } else {
          message.error('No delete event defined')
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
          this.props.onSubmit(undefined, this.props.fields, 'new')
        },
        (cancel) => { /* do nothing */ }
      )
    } else {
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

class FormHelper extends Component {
  render() {
    return (
      <div>
        <FormToolbar 
          onSubmit={this.props.onSubmit}
          onDelete={this.props.onDelete}
          onInsert={this.props.onInsert}
          onUpdate={this.props.onUpdate}
          onProgress={this.props.onProgress}
          record={this.props.record}
          form={this.props.form}
          />
        {this.props.children}
      </div>
    )
  }
}

export default FormHelper