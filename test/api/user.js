import request from '@/utils/request';

export async function getUserList(params) {
  return request(`/api/users`, {
    method: 'get',
    params: params,
  });
}

export async function getUserDetail(id, params) {
  return request(`/api/users/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createUser(params) {
  return request(`/api/users`, {
    method: 'post',
    data: params,
  });
}

export async function modifyUser(id, params) {
  return request(`/api/users/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteUser(id) {
  return request(`/api/users/${id}`, {
    method: 'delete',
  });
}
