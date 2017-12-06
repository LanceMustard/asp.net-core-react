import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Popconfirm, Tooltip } from 'antd';
import { fetchUser, fetchUsers, createUser, deleteUser, newUser, updateUser } from '../../actions/users';
import TableCell from './../../components/TableCell.js'
import TableButton from './../../components/TableButton.js'

class Users extends Component {
  state = {
    visible : false,
    editable : false,
    user : null
  }
  constructor(props) {
    super(props);
    this.editUser = this.editUser.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <TableCell value={text} editable={this.state.user === record} />,
        sorter: (a, b) => a.name.length - b.name.length,
      }, {
        title: 'OS User',
        dataIndex: 'osUser',
        key: 'osUser',
        render: (text, record) => <TableCell value={text} editable={this.state.user === record}/>,
        sorter: (a, b) => a.osUser.length - b.osUser.length,
      }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text, record) => <TableCell value={text} editable={this.state.user === record}/>,
        sorter: (a, b) => a.email.length - b.email.length,
      }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (text, record) => <TableCell value={text} editable={this.state.user === record}/>,
        filters: [
          { text: 'Admin', value: 'Admin' },
          { text: 'User', value: 'User' },
          { text: 'Read Only', value: 'Read Only' }
        ],
        onFilter: (value, record) => record.role.indexOf(value) === 0,
        sorter: (a, b) => a.role.length - b.role.length,
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip title="Edit record">
              <TableButton type="edit" hidden={this.state.user === record} onClick={() => this.setState({user: record})}/>
            </Tooltip>
            <Tooltip title="Undo changes">
              <Popconfirm 
                title="Confirm undo?" 
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                onConfirm={() => this.setState({user: null})}>
                <TableButton type="retweet" hidden={record !== this.state.user}/>
              </Popconfirm>
            </Tooltip>
            <Tooltip title="Save changes">
              <TableButton type="save" hidden={record !== this.state.user} />
            </Tooltip>
            
              <Popconfirm title="Confirm delete?">
              <Tooltip title="Delete record">
                <Icon type="delete" />
                </Tooltip>
              </Popconfirm>
            
          </span>
        ),
      }
    ];
  }
  handleVisibleChange = (visible) => {
    if (!visible) {
      this.setState({ visible });
      return;
    }
    // Determining if changes exist before showing the popconfirm.
    if (1 === 1) {
      // don't show the confirmation, just perform the undo
      this.setState({user: null});
      this.setState({ visible: false });
    } else {
      this.setState({ visible }); // show the popconfirm
    }
  }
  changesExist() {
    return false;
  }
  componentWillMount() {
    this.props.fetchUsers()
  }
  editUser(user) {
    // if (this.user === user) {
    //   this.user = null
    //   this.setState({selectedId: 0})
    // } else {
      //this.user = user
      //this.setState({user});
    //   this.setState({selectedId: user.id})
    // }
  }
  submitUser(values) {
    if (values.mode === 'delete') {
      this.props.deleteUser(values.id);
    } else if (values.mode === 'new') {
      this.props.newUser();
    } else {
      if (values.id === 0) {
        this.props.createUser(values);
      } else {
        this.props.updateUser(values);
      }
    }
  }

  render() {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.props.users.all}
          rowKey="id"
          pagination={{ pageSize: 50 }}
          scroll={{ y: 400 }}
          />
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users }
}

export default connect(mapStateToProps,
  { fetchUser,
    fetchUsers,
    createUser,
    deleteUser,
    newUser,
    updateUser
   })(Users)