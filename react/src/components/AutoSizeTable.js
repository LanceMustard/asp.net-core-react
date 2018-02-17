import React, {
  Component
} from 'react'
import {
  Table
} from 'antd'

class AutoSizeTable extends Component {
  state = {}

  render() {
    let pagination= this.props.pagination || { pageSize: 10} 
    
    // if the parentElement has been assigned, attempt to auto calc the pageSize based on available space
    if (this.props.parentElement) {
      // only calculate the once. does not handle resizing :(
      if (!this.state.pageSize) {
        // search height: 28px
        // header row height: 39px
        // pagination height: 20px
        // row height: 31px
        // padding: 20px <-- guess
        const  availableHeight = this.props.parentElement.clientHeight - 28 - 39 - 20 - 20
        let pageSize = Math.trunc(availableHeight / 31)
        this.setState({pageSize})
        pagination = { pageSize }
      } else {
        pagination = { pageSize: this.state.pageSize }
      }
      
    } 

    return (
      <Table
        columns={this.props.columns}
        size={this.props.size || 'small'}
        scroll={this.props.size || {y: null, x: null}}
        pagination={pagination}
        dataSource={this.props.dataSource}
        rowKey={this.props.rowKey || "id"}
        onRowClick={this.props.onRowClick}
        rowClassName={this.props.rowClassName}/>
    )
  }
}

export default AutoSizeTable