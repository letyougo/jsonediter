import request from '../utils/request';
import { host } from './config.js';

export async function getRewriterRequest() {
  return request(`${host}/getRewriter`);
}

export async function addNewRewriter(params) {
  return request(`${host}/addNewRewriter`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

