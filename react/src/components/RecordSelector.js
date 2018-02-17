import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Input,
  Table,
  Icon,
  Checkbox
} from 'antd'

const Search = Input.Search

const RecordSelectorDiv = styled.div`
  width: ${props => props.width || '400px'};
`

class RecordSelector extends Component {
  state = {
    search: this.props.search,
    filter: null
  }

  handleSearch = (e) => {
    let searchField = this.props.searchField || 'name'
    let search = e.target.value
    const reg = new RegExp(search, 'gi')
    let filter = this.props.dataSource.filter(x => x[searchField].match(reg))
    // let filter = this.props.navigationTable.dataSource.filter(x => x.name.match(reg))
    this.setState({ search, filter })
    //ToDO: if a delete or insert (initialted by the Toolbar happens) the new or deleted record will not be reflected in the filtered list
  }

  handleResetSearch = () => {
    this.setState({
      search: '',
      filter: null
    })
  }

  handleRowClick = (record, index, event) => {
    if (this.props.onSelect) {
      this.props.onSelect(record, index, event)
    }
  }

  handleSelect = (e) => {
    if (this.props.targetDataSource && this.props.onChange) {
      let users = this.props.targetDataSource
      let user = e.target.options[0]
      if (e.target.checked) {
        // Add object to target data source
        users.push(user)
      } else {
        // Remove object from target data source
        users = users.filter(u => u !== user)
      }
      this.props.onChange(users)
    }
  }
          
  render() {
    const searchPrefix = this.state.search ? <Icon type="close-circle" onClick={this.handleResetSearch} /> : null
    let columns = this.props.columns
    // insert a select column if one does not already exist
    if (!columns.find(x => x.key ==='select')) {
      columns.unshift(
        {
          title: 'Select',
          key: 'select',
          render: (record) => (
            <Checkbox 
              onChange={this.handleSelect} 
              disabled={this.props.selectDisabled}
              options={[ record ]}
            />
          )
        }
      )
    }
    // pagination={this.props.pageSize ? { pageSize: this.props.pageSize } : { pageSize: 10 }}
    return (
      <RecordSelectorDiv width={this.props.width || '100%'}>
        <Search
          prefix={searchPrefix} 
          placeholder={this.props.searchText ? this.props.searchText : "Search"}
          value={this.state.search}
          onChange={this.handleSearch.bind(this)}
          onPressEnter={this.handleSearch.bind(this)}/>
        <Table
          footer={this.props.footer}
          header={this.props.header}
          columns={this.props.columns}
          dataSource={this.state.filter || this.props.dataSource}
          pagination={this.props.pagination || { pageSize: 5 }}
          size={this.props.size || 'default'}
          rowKey={this.props.rowKey ? this.props.rowKey : "id"}
          scroll={this.props.scroll || { x: null, y: null}}
          onRowClick={this.handleRowClick}/>
      </RecordSelectorDiv>
    )
  }
}

export default RecordSelector;