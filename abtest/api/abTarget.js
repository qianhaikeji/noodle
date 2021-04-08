import request from '@/utils/request';

export async function getAbTargetList(params) {
  return request(`/api/admin/abTargets`, {
    method: 'get',
    params: params,
  });
}

export async function getAbTargetDetail(id, params) {
  return request(`/api/admin/abTargets/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createAbTarget(params) {
  return request(`/api/admin/abTargets`, {
    method: 'post',
    data: params,
  });
}

export async function modifyAbTarget(id, params) {
  return request(`/api/admin/abTargets/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteAbTarget(id) {
  return request(`/api/admin/abTargets/${id}`, {
    method: 'delete',
  });
}
