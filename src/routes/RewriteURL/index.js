import React, { Component } from 'react';
import { connect } from 'dva';

import EditableTable from '../../components/EditableTable';

const formatDataObjectToArr = (dataObjectParams) => {
  return Object.keys(dataObjectParams).map((item) => {
    return { url: item, project: dataObjectParams[item] };
  });
};
const formatArrToObject = (dataArr) => {
  const returnObject = {};
  dataArr.forEach((item) => {
    returnObject[item.url] = item.project;
  });
  return returnObject;
};

class RewriteURL extends Component {
  changeURL=({ dataSource }) => {
    const { dispatch } = this.props;
    dispatch({ type: 'rewriteurl/changeRewirte', payload: formatArrToObject(dataSource) });
  }
  render() {
    return (
      <div>
        <EditableTable
          data={formatDataObjectToArr(this.props.rewriteurl.data)}
          changeURL={this.changeURL}
        />
      </div>
    );
  }
}

export default connect(({ rewriteurl }) => ({ rewriteurl }))(RewriteURL);

