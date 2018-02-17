import React, {
  Component
} from 'react'
import {
  Table,
  Button,
  Icon,
  Modal
} from 'antd'
import styled from 'styled-components'

export const TableFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

class MaximiseButton extends Component {
  handleMaximise = () => {
    if (this.props.onMaximise) {
      this.props.onMaximise()
    }
  }
  
  render() {
    return (
      <Button style={{float: 'right'}} onClick={this.handleMaximise}>
        <Icon type='scan' />
      </Button>
    )
  }
}

class AutofitTable extends Component {
  state = {
    maximised: false
  }

  toggleMaximised = () => {
    this.setState({pageSize: undefined})
    this.setState({maximised: !this.state.maximised})
  }

  renderTable = () => {
    let pagination= this.props.pagination || { pageSize: 10} 
    // if the parentElement has been assigned, attempt to auto calc the pageSize based on available space
    if (this.state.parentElement) {
      if (this.state.pageSize === undefined) {  
        // search height: 28px
        // header row height: 39px
        // pagination height: 20px
        // footer height: 48px
        // padding: 20px <-- guess
        // default row height: 31px <-- can be set in props
        const  availableHeight = this.state.parentElement.clientHeight - 28 - 39 - 20 - 48 - 20
        if (availableHeight > 0) {
          let pageSize = Math.trunc(availableHeight / this.props.rowHeight || 31)
          pagination = { pageSize }
          this.setState({pageSize})
        }
      } else {
        pagination = { pageSize: this.state.pageSize }
      }
    }
    return (
      <div style={this.props.style} ref={ parentElement => !this.state.parentElement && this.setState({ parentElement }) }>
      <Table
        columns={this.props.columns}
        size={this.props.size || 'small'}
        scroll={this.props.size || {y: null, x: null}}
        pagination={pagination}
        dataSource={this.props.dataSource}
        rowKey={this.props.rowKey || "id"}
        onRowClick={this.props.onRowClick}
        rowClassName={this.props.rowClassName}
        footer={(data => 
          <TableFooter>
            <div>
              {this.props.footer ? this.props.footer() : null}
            </div>
            <MaximiseButton onMaximise={this.toggleMaximised} />
          </TableFooter>
        )}
      />
    </div>
    )
  }

  render() {
    if (this.state.maximised) {
      let style = {
        height: 'calc(100vh - 85px)'
      }
      return (
        <Modal
          title={this.props.title}
          footer={null}
          style={{top: 0}}
          width='100vw'
          bodyStyle={style}
          visible={true}
          onCancel={this.toggleMaximised}>
          {this.renderTable()}
        </Modal>
      )
    } else {
      return this.renderTable()
    }
  }
}

export default AutofitTable