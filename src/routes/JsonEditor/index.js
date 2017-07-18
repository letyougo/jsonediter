import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Input, Menu, Icon, Tabs, Alert } from 'antd';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/snippets/json';
import 'brace/theme/monokai';

import JSONViewer from 'react-json-viewer';

import styles from './index.css';
import EditableTable from '../../components/EditableTable';
import { host } from '../../services/example.js';

const TabPane = Tabs.TabPane;

class JsonEditor extends React.Component {

  state={ tree: { err: 'Json format error or null' }, json: '{"":""}' }

  componentWillReceiveProps(nextPorps) {
    const { dispatch, example } = this.props;

    const { TableItem, projectRefresh, tableRefresh } = example;
    if (nextPorps.example.TableItem !== TableItem) {
      this.setState({
        [nextPorps.example.TableItem]:
        JSON.stringify(nextPorps.example.data[nextPorps.example.TableItem]) });
    }
    if (nextPorps.example.projectRefresh !== projectRefresh) {
      dispatch({ type: 'example/fetchGetReq' });
    }
    if (nextPorps.example.tableRefresh !== tableRefresh) {
      dispatch({ type: 'example/getProject', payload: { key: nextPorps.example.project[0] } });
    }
  }
  onClickNewObject=(e) => {
    const { dispatch, example } = this.props;
    const { group } = e.currentTarget.dataset;
    const inputData = this.inputValue[group];
    const projectvalue = this.project;
    const title = inputData.title;
    let textarea = inputData.textarea;
    textarea = JSON.parse(textarea);
    if (inputData &&
    title &&
    textarea
    ) {
      // dispatch({ type: 'example/fetchPostReq',
      // payload: { title, jsonData: JSON.stringify(JSON.parse(textarea)),
      //  projecttitle: example.project[0] } });
      dispatch({ type: 'example/fetchPostReq',
        payload:
        { title,
          jsonData: textarea,
          project: projectvalue,
          projecttitle: example.project[0] } });
      this.flipOverModalBox();
    }
  }

  onClickChangeProject=(e) => {
    const { dispatch } = this.props;
    const { id, title, project } = e.currentTarget.dataset;
    dispatch({ type: 'example/changeProjectText', payload: { id, project, title } });
    this.flipOverModalBox(false);
  }
  onClickDeleteProject=(e) => {
    const { dispatch, example } = this.props;
    const { id, project } = e.currentTarget.dataset;
    dispatch({ type: 'example/fetchDeleteReq', payload: { id, project, projecttitle: example.project[0] } });
  }


  onaddNewProject=() => {
    const { dispatch } = this.props;
    const database = this.inputValue.database;
    dispatch({ type: 'example/addNewProject', payload: { database } });
  }

  onaddNewTable=() => {
    this.flipOverModalBox(false, true);
  }

  onOpenChangeProject=(e) => {
    const { dispatch } = this.props;
    const key = e[0];
    if (key) {
      dispatch({ type: 'example/getProject', payload: { key } });
    }
  }
  onChangeTableJsonChange=(newValue) => {
    const { TableItem } = this.props.example;
    this.setState({ [TableItem]: newValue });
    this.handleInputChange({ target: { dataset: { group: 'change', type: 'textarea' }, value: newValue } });
  }
  onNewTableJsonChange=(newValue) => {
    this.setState({ json: newValue });
    this.handleInputChange({ target: { dataset: { group: 'newTable', type: 'textarea' }, value: newValue } });
  }
  getProject=(e) => {
    const { dispatch } = this.props;
    const key = e.key;
    if (key) {
      dispatch({ type: 'example/getProject', payload: { key } });
    }
  }


  getDispatch =() => {
    const { dispatch, example } = this.props;
    dispatch({ type: 'example/getProject', payload: { key: example.project[0] } });
  }

  changeTableItem=(e) => {
    const { dispatch } = this.props;
    dispatch({ type: 'example/changeTableItem', payload: { key: e } });
  }
  addNewTable=() => {
    const { dispatch, example } = this.props;
    const { title, textarea } = this.inputValue.newTable;
    dispatch({ type: 'example/addNewTable', payload: { title, database: example.project, textarea } });
    this.flipOverModalBox(false, true);
  }
  changeTableByJson=() => {
    const { dispatch, example } = this.props;
    const { TableItem } = example;

    dispatch({ type: 'example/addNewTable', payload: { title: example.TableItem, database: example.project, textarea: this.state[TableItem] } });
    this.flipOverModalBox();
  }
  changeTable=(params) => {
    const { dispatch } = this.props;
    dispatch({ type: 'example/addNewTable', payload: params });
  }
  handleCancelChange=() => {
    this.flipOverModalBox(false);
  }
  handleOkChange=(e) => {
    const { dispatch, example } = this.props;
    const { group } = e.currentTarget.dataset;

    const inputData = this.inputValue[group];
    const textarea = inputData.textarea;
    const { changeId, changeTitle } = this.props.example;
    dispatch({ type: 'example/putProject', payload: { id: changeId, title: changeTitle, data: textarea, projecttitle: example.project[0] } });
  }
  flipOverModalBox=(params = true, key = false) => {
    const { dispatch, example } = this.props;
    let changedVisible = {
      type: 'changedVisible',
      visibleChange: !example.visibleChange,
    };
    if (params) {
      changedVisible = {
        type: 'visible',
        visible: !example.visible,
      };
    }
    if (key) {
      changedVisible = {
        type: 'newvisible',
        newvisible: !example.newvisible,
      };
    }
    dispatch({ type: 'example/flipOverModalBox',
      payload: changedVisible,
    });
  }
  handleInputChange=(e) => {
    const { dataset, value } = e.target;
    const { group, type } = dataset;
    if (!this.inputValue) {
      this.inputValue = {};
    }
    if (!(this.inputValue[group])) {
      this.inputValue[group] = {};
    }
    this.inputValue[group][type] = value;
    if (group === 'newTable' && type === 'textarea') {
      this.formatInputToJson(value);
    }
  }


  formatInputToJson=(value) => {
    try {
      JSON.parse(value);
    } catch (e) {
   // statements to handle any exceptions
      console.log(e);
      this.setState({ tree: { err: 'Json format error or null' } });
      return;
    }
    if (value !== '{}') {
      this.setState({ tree: JSON.parse(value) });
    }
  }
  addNewData=(project) => {
    this.project = project;
    this.flipOverModalBox();
  }


  modalFooter=(params, ok, cancle = true, newcancle = false, disabled) => {
    return (<div>
      <Button
        data-group={params}
        onClick={() => { return this.flipOverModalBox(cancle, newcancle); }}
      >取消</Button>
      <Button data-group={params} type="primary" onClick={ok} disabled={disabled}>确认</Button>
    </div>);
  }
  jsonTreeData=() => {
    return this.state.tree;
  }
  JSONViewer=(data) => {
    return (
      <div>
        <Button type="primary" onClick={this.flipOverModalBox}><Icon type="edit" />整体编辑</Button>
        <div className={styles.jsonViewBox}>
          <JSONViewer json={data} />
        </div>
      </div>

    );
  }
  formatChangeJson=() => {
    const { TableItem } = this.props.example;
    const stateValue = this.state[TableItem];

    try {
      JSON.stringify(JSON.parse(stateValue), null, 2);
    } catch (e) {
   // statements to handle any exceptions
      console.log(e);
      return stateValue || '';
    }
    return stateValue ? JSON.stringify(JSON.parse(stateValue), null, 2) : '';
  }
  render() {
    const { data,
            TableItem,
            visible,
            confirmLoading,
            newvisible,
            projects,
            project } = this.props.example;
    return (
      <div>

        <div className={styles.normal}>
          <div className={styles.rightSideBox}>
            <div id="projectInput" className={styles.projectInput}>
              <Input placeholder="添加的项目名" data-type="database" data-group="database" onChange={this.handleInputChange} />
              <Button className={styles.projectInput_button} key="button"type="primary" onClick={this.onaddNewProject}>新增新项目</Button>
            </div>
            <Menu
              onClick={this.getProject}
              mode="inline"
              className={styles.indexmenu}
              selectedKeys={project}
            >
              {projects.map(item => <Menu.Item key={item}>{item}</Menu.Item>)}
            </Menu>
          </div>
          <div className={styles.container}>
            <div className={styles.newtable} id="projectNewTable">
              {/* <Button type="primary" onClick={this.onaddNewTable}>添加新数据表</Button>*/}

              <Tabs
                onChange={this.changeTableItem}
                activeKey={TableItem || projects[0]}
                type="editable-card"
                onEdit={this.onaddNewTable}
              >
                {
                Object.keys(data).map(item => <TabPane
                  tab={item}
                  key={item}
                  closable={false}
                />)
              }
              </Tabs>
            </div>
            <div className={styles.collapse_container}>
              <div className={styles.projectBox}>
                <div className="projectAlert">
                  数据表地址：<a href={`${host}/${project[0]}/${TableItem}`} target="view_window">{`${host}/${project[0]}/${TableItem}`}</a>
                </div>
              </div>
              {!(data[TableItem] instanceof Array) ? this.JSONViewer(data[TableItem]) :
              <EditableTable
                data={data[TableItem]}
                project={project}
                change={this.changeTable}
                item={TableItem}
                changeJson={this.flipOverModalBox}
              />}
            </div>
            <Modal
              title="更改数据"
              visible={visible}
              footer={this.modalFooter('new', this.changeTableByJson)}
              confirmLoading={confirmLoading}
              value={'asd'}
              closable={false}
            >
              <Alert message={`您要更改：${TableItem} 的数据`} type="warning" />
              <AceEditor
                mode="json"
                theme="monokai"
                name="change"
                onChange={this.onChangeTableJsonChange}
                fontSize={14}
                showPrintMargin
                showGutter
                highlightActiveLine
                value={this.formatChangeJson()}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />

            </Modal>
            <Modal
              title="新建数据表"
              visible={newvisible}
              footer={this.modalFooter('newTable',
              this.addNewTable,
              false,
              true,
              !(!this.state.tree.err && (this.inputValue.newTable.title)))}
              confirmLoading={confirmLoading}
              value={'asd'}
              closable={false}
            >
              <Input
                addonBefore="数据表名称"
                data-type="title"
                data-group="newTable"
                onChange={this.handleInputChange}
              />
              <AceEditor
                mode="json"
                theme="monokai"
                name="new"
                onChange={this.onNewTableJsonChange}
                fontSize={14}
                showPrintMargin
                showGutter
                highlightActiveLine
                value={this.state.json}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            </Modal>
          </div>
        </div>

      </div>

    );
  }
}


export default connect(({ example }) => ({ example }))(JsonEditor);
