import request from '@/utils/request';

export async function getAbTestList(params) {
  return request(`/api/admin/abTests`, {
    method: 'get',
    params: params,
  });
}

export async function getAbTestDetail(id, params) {
  return request(`/api/admin/abTests/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createAbTest(params) {
  return request(`/api/admin/abTests`, {
    method: 'post',
    data: params,
  });
}

export async function modifyAbTest(id, params) {
  return request(`/api/admin/abTests/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteAbTest(id) {
  return request(`/api/admin/abTests/${id}`, {
    method: 'delete',
  });
}
