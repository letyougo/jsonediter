import { addNewRewriter, getRewriterRequest } from '../services/rewrite.js';


export default {
  namespace: 'rewriteurl',
  state: {
    data: { '/aaaa/dddd/vvvv': '/db/db', '/aaaa/dddd/vvv': '/db/2222', '/aaaa/dddd/vv': '/db/projects' },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'getRewriters' });
    },
  },
  effects: {
    *changeRewirte({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(addNewRewriter, payload);
      yield put({ type: 'receivechangeRewirte', payload: data });
    },
    *getRewriters({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(getRewriterRequest);
      yield put({ type: 'receivegetRewriter', payload: data });
    },
  },
  reducers: {
    receivegetRewriter(state, action) {
      const { payload } = action;

      return { ...state, data: payload.data };
    },
  },
};
