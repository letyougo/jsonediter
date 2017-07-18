import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.css';

export default class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className={styles.editable_cell} id="styles.projectTableitem" onDoubleClick={this.edit}>
        {
          editable ?
            <div className={styles.editable_cell_input_wrapper}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                onBlur={this.check}
              />
              <Icon
                type="edit"
                className={styles.editable_cell_icon_check}
                onClick={this.check}
              />
            </div>
            :
            <div className={styles.editable_cell_text_wrapper}>
              {(typeof (value) === 'object' ? JSON.stringify(value) : value) || ' '}
              <Icon
                type="edit"
                className={styles.editable_cell_icon}
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}
