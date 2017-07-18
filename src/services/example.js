import request from '../utils/request';
import { host } from './config.js';

export { host };


export async function query() {
  return request(`${host}/db`);
}
export async function getProject(params) {
  return request(`${host}/${params.key}/db`);
}
export async function addNewProject(params) {
  return request(`${host}/adddatabase/${params.database.database}/add-database-now`);
}


export async function addNewTable(params) {
  let arr = JSON.stringify([{ test: 'test' }]);
  if (params.textarea) {
    console.log('typeof (params.textarea)', (typeof (params.textarea)) !== 'string');
    if ((typeof (params.textarea)) !== 'string') {
      arr = JSON.stringify(params.textarea);
    } else {
      arr = params.textarea;
    }
  }

  return request(`${host}/adddatatable/${params.database[0]}/${params.title}`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: arr,
  });
}


export async function postProject(params) {
  return request(`${host}/${params.projecttitle}/${params.project}/`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function deleteProject(params) {
  return request(`${host}/${params.projecttitle}/${params.project}/${params.id}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      done: true,
    }),
  });
}
export async function putProject(params) {
  const { id, data, title } = params;
  return request(`${host}/${params.projecttitle}/${params.project}/${id}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      id,
      jsonData: data,
    }),
  });
}
