import React, { Component } from 'react';
import { Menu, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import styles from './IndexPage.css';


class IndexPage extends Component {
  handlePageRouter=(e) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(e.key));
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <div>
          <Menu
            mode={'horizontal'}
            defaultSelectedKeys={['json-editor']}
            theme="dark"
            onClick={this.handlePageRouter}
          >
            <Menu.Item key="json-editor">json编辑器</Menu.Item>
            <Menu.Item key="rewirite-url">自定义路由</Menu.Item>
          </Menu>
          <Button className={styles.menu_button} id="demonstration">使用演示</Button>

        </div>

        {children}
      </div>
    );
  }
}

export default connect(({ indexpage }) => ({ indexpage }))(IndexPage);
