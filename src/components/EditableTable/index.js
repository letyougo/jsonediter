import { Table, Popconfirm, Button, Icon } from 'antd';
import React from 'react';
import EditableCell from './EditableCell.js';
import styles from './index.css';

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = this.mapPropsToColumn(props);
    this.state = this.mapPropsToState(props);
  }
  componentWillReceiveProps(nextPorps) {
    this.columns = this.mapPropsToColumn(nextPorps);
    this.setState(this.mapPropsToState(nextPorps));
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({ dataSource });
  }
  mapPropsToState=(props) => {
    return {
      dataSource: props.data,
      count: props.data.length,
    };
  }
  mapPropsToColumn=(props) => {
    const returnArr = Object.keys(props.data[0]).map((item) => {
      return {
        title: item,
        dataIndex: item,
        render: (text, record, index) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(index, item)}
          />),
      };
    });
    returnArr.push({
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          this.state.dataSource.length > 1 ?
          (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
              <a href="">Delete</a>
            </Popconfirm>
          ) : null
        );
      },
    });
    return returnArr;
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {};
    Object.keys(dataSource[0]).forEach((item) => {
      newData[item] = '';
    });
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  handleChange=() => {
    const { change, item, project, changeURL, data } = this.props;
    const { dataSource } = this.state;
    if (change) {
      change({ database: project, title: item, textarea: dataSource });
    } else if (changeURL) {
      changeURL({ dataSource, data });
    }
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div className="projectTable">
        <p className={styles.table_button_goup} >
          <Button id="add_button" className={styles.editable_add_btn} onClick={this.handleAdd}><Icon type="plus" />增加</Button>
          <Button id="change_button" type="primary" className={styles.editable_add_btn} onClick={this.handleChange}><Icon type="save" />保存更改</Button>
          {this.props.changeJson ?
            <Button type="primary" className={styles.editable_add_btn} onClick={this.props.changeJson}><Icon type="edit" />整体编辑</Button> :
            <div />
          }
        </p>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
