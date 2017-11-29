import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Popconfirm } from 'antd';
import { fetchUser, fetchUsers, createUser, deleteUser, newUser, updateUser } from '../../actions/users';
import styled, { css }  from 'styled-components';

const ActionIcon = styled(Icon)`
  padding: 0 20px 0 0;

  ${props => props.hidden && css`
    visibility: hidden;
    width: 0px;
    padding: 0px;
  `}
`

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
    sorter: (a, b) => a.name.length - b.name.length,
  }, {
    title: 'OS User',
    dataIndex: 'osUser',
    key: 'osUser',
    sorter: (a, b) => a.osUser.length - b.osUser.length,
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
  }, {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
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
        <ActionIcon type="edit" hidden={record === this.user} />
        <ActionIcon type="save" hidden={record !== this.user} />
        <Popconfirm title="Sure to delete?">
          <ActionIcon type="delete" />
        </Popconfirm>
      </span>
    ),
  }
];

class Users extends Component {
  constructor(props) {
    super(props);

    this.submitUser = this.submitUser.bind(this);
  }
  componentWillMount() {
    this.props.fetchUsers();
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
          columns={columns} 
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
  return { users };
}

export default connect(mapStateToProps,
  { fetchUser,
    fetchUsers,
    createUser,
    deleteUser,
    newUser,
    updateUser
   })(Users);
   
  //  const data = [{
  //    key: '1',
  //    name: 'John Brown',
  //    age: 32,
  //    address: 'New York No. 1 Lake Park',
  //  }, {
  //    key: '2',
  //    name: 'Jim Green',
  //    age: 42,
  //    address: 'London No. 1 Lake Park',
  //  }, {
  //    key: '3',
  //    name: 'Joe Black',
  //    age: 32,
  //    address: 'Sidney No. 1 Lake Park',
  //  }];
   