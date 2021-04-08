import request from '@/utils/request';

export async function getAbGroupList(params) {
  return request(`/api/admin/abGroups`, {
    method: 'get',
    params: params,
  });
}

export async function getAbGroupDetail(id, params) {
  return request(`/api/admin/abGroups/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createAbGroup(params) {
  return request(`/api/admin/abGroups`, {
    method: 'post',
    data: params,
  });
}

export async function modifyAbGroup(id, params) {
  return request(`/api/admin/abGroups/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteAbGroup(id) {
  return request(`/api/admin/abGroups/${id}`, {
    method: 'delete',
  });
}
