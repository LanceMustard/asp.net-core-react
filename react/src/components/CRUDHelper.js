import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import {
  Spin,
  Icon,
  Input,
  Table
} from 'antd'
import { addBreadcrumb, removeBreadcrumb } from './../actions/breadcrumbs'
import {
  Header,
  Wrapper,
  Side,
  Body
} from './Layout'
import '../styles/site.css'

const Search = Input.Search

class CRUDWrapper extends Component {
  state = {
    search: this.props.search,
    filter: null
  }

  componentWillMount() {
    this.props.removeBreadcrumb(this.props.path)
  }

  handleSearch = (e) => {
    let searchField = this.props.searchField || 'name'
    let search = e.target.value
    const reg = new RegExp(search, 'gi')
    let filter = this.props.navigationTable.dataSource.filter(x => x[searchField].match(reg))
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

  handleRowClassName = (record, index) => {
    return record[this.props.rowKey] === this.props.currentRecord[this.props.rowKey] ? 'SelectedRow'  : null;
  }

  handleRowClick = (record, index, event) => {
    if (this.props.onSelect) {
      this.props.onSelect(record, index, event)
    }
  }

  render() {
    const searchPrefix = this.state.search ? <Icon type="close-circle" onClick={this.handleResetSearch} /> : null
    // set properties of any child elements within the Body section
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        fields: this.props.fields,
        form: this.props.form
      })
    })
    return (
      <Spin tip={this.props.wrapperMessage} spinning={this.props.wrapperMessage ? true : false}>
        <Header>
          <h1>{this.props.header}</h1>
        </Header>
        <Wrapper>
          { this.props.navigationTable || this.props.side ? (
          <Side>
            { this.props.navigationTable ? (
              <Spin tip={this.props.sideMessage} spinning={this.props.sideMessage ? true : false}>
                <Search
                  prefix={searchPrefix} 
                  placeholder={this.props.searchText ? this.props.searchText : "Search"}
                  value={this.state.search}
                  onChange={this.handleSearch}
                  onPressEnter={this.handleSearch}/>
                <Table
                  columns={this.props.navigationTable.columns}
                  dataSource={this.state.filter || this.props.navigationTable.dataSource}
                  rowKey={this.props.rowKey ? this.props.rowKey : "id"}
                  pagination={this.props.navigationTable.rowKey ? this.props.navigationTable.pagination : { pageSize: 10 }}
                  onRowClick={this.handleRowClick}
                  rowClassName={this.handleRowClassName}
                />
              </Spin>
            ) : null }
            { this.props.side ? (this.props.side) : null }
          </Side>) : null }
          <Body>
            <Spin tip={this.props.bodyMessage} spinning={this.props.bodyMessage ? true : false}>
              {children}
             </Spin>
          </Body>
        </Wrapper>
      </Spin>
    )
  }
}

function mapStateToProps(state) {
  return { breadcrumbs: state.breadcrumbs }
}

export default connect(mapStateToProps, {
  addBreadcrumb,
  removeBreadcrumb
})(CRUDWrapper)