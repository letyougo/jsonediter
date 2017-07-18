import { query, postProject, deleteProject, putProject, addNewProject, getProject, addNewTable } from '../services/example.js';

export default {

  namespace: 'example',

  state: {
    text: 'example',
    projectRefresh: 0,
    tableRefresh: 0,
    visible: false,
    visibleChange: false,
    newvisible: false,
    confirmLoading: false,
    ModalText: 'ModalTextModalTextModalTextModalText',
    changeId: '',
    changeTitle: '',
    project: ['db'],
    projects: ['db', 'json-server'],
    projectItem: '',
    TableItem: 'projects',
    data: {
      projects: [
        {
          id: 2,
          title: 'json-server1',
          src: '1001',
        },
        {
          id: 3,
          title: 'json-server2',
          src: '101',
        },
      ],
    },
    itemdata: 'projects',
    datas: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'fetchGetReq' });
      dispatch({ type: 'getProject', payload: { key: 'db' } });
    },
  },

  effects: {
    *addNewProject({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(addNewProject, payload);
      yield put({ type: 'receiveAddNewProject', payload: data });
    },
    *addNewTable({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(addNewTable, payload);
      yield put({ type: 'receiveAddNewTable', payload: data });
    },
    *getProject({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(getProject, payload);
      yield put({ type: 'receiveGetProject', payload: data, itemdata: payload.key });
    },
    *fetchGetReq({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(query);
      yield put({ type: 'receiveGetReq', payload: data });
    },
    *fetchPostReq({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(postProject, payload);
      yield put({ type: 'receivePostReq', payload: data });
    },
    *fetchDeleteReq({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(deleteProject, payload);
      yield put({ type: 'receivePostReq', payload: data });
    },
    *putProject({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(putProject, payload);
      yield put({ type: 'receivePostReq', payload: data });
    },

  },

  reducers: {
    getProjectItem(state, action) {
      return { ...state, itemdata: action.payload.item };
    },
    changeTableItem(state, action) {
      return { ...state, TableItem: action.payload.key };
    },
    receiveAddNewProject(state) {
      return { ...state, projectRefresh: state.projectRefresh + 1 };
    },
    receiveAddNewTable(state) {
      return { ...state, tableRefresh: state.tableRefresh + 1 };
    },
    receiveGetReq(state, action) {
      const projects = action.payload.data.filter((item) => {
        if (item === 'server.js' ||
        item === 'projects' ||
        item === 'json-server' ||
        item === 'favicon.ico'
        ) {
          return false;
        }
        return item;
      });
      return { ...state, projects };
    },
    receiveGetProject(state, action) {
      const { payload } = action;
      return { ...state, data: payload.data, TableItem: Object.keys(payload.data)[0] };
    },
    getProject(state, action) {
      const key = action.payload.key;
      return { ...state, project: [key] };
    },
    onClickNewObject(state, action) {
      return { ...state, visible: action.payload.visible };
    },
    flipOverModalBox(state, action) {
      if (action.payload.type === 'visible') {
        return { ...state, visible: action.payload.visible };
      } else if (action.payload.type === 'newvisible') {
        return { ...state, newvisible: action.payload.newvisible };
      }

      return { ...state, visibleChange: action.payload.visibleChange };
    },
    changeProjectText(state, action) {
      return { ...state,
        changeId: action.payload.id,
        changeTitle: action.payload.title };
    },
  },

};
