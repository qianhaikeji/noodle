import request from '@/utils/request';

export async function getActivityList(params) {
  return request(`/api/activitys`, {
    method: 'get',
    params: params,
  });
}

export async function getActivityDetail(id, params) {
  return request(`/api/activitys/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createActivity(params) {
  return request(`/api/activitys`, {
    method: 'post',
    data: params,
  });
}

export async function modifyActivity(id, params) {
  return request(`/api/activitys/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteActivity(id) {
  return request(`/api/activitys/${id}`, {
    method: 'delete',
  });
}
