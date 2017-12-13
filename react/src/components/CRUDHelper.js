import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import {
  Spin,
  Icon,
  Input,
  Button,
  Table
} from 'antd'
import { addBreadcrumb, removeBreadcrumb } from './../actions/breadcrumbs'
import {
  Header,
  Title,
  Wrapper,
  Side,
  Body
} from './Layout'
import '../styles/site.css'

const Search = Input.Search

class CRUDWrapper extends Component {
  state = {
    search: this.props.search,
    filter: null,
    collapsed: this.props.params ? this.props.params.id : false
  }

  componentWillMount() {
    this.validateComponentSetup()
    this.props.removeBreadcrumb(this.props.path)
  }

  validateComponentSetup = () => {
    if (!this.props.form) console.warn('expecting {form} property assignment <-- suggest {this.props.form} where Form.create() used')
    if (!this.props.header) console.warn('expecting {header} property assignment')
    if (!this.props.fields) console.warn('expecting {fields} property assignment <-- suggest array of string')
    if (!this.props.path) console.warn('expecting {path} property assignment <-- suggest {this.props.location.pathname}')
    if (!this.props.currentRecord) console.warn('expecting {currentRecord} property assignment <-- suggest a "state" object')
    if (!this.props.onSelect) console.warn('expecting {onSelect} property assignment')
    if (!this.props.params) console.warn('expecting {params} property assignment <-- suggest {this.props.match.params}')
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

  handleSideToggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
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
          <Button onClick={this.handleSideToggle}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Title>{this.props.header}</Title>
        </Header>
        <Wrapper>
          { this.props.navigationTable || this.props.side ? (
          <Side inlineCollapsed={this.state.collapsed} sideWidth={this.props.sideWidth}>
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