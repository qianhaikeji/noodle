import request from '@/utils/request';

export async function getActivityPlayerList(params) {
  return request(`/api/activityPlayers`, {
    method: 'get',
    params: params,
  });
}

export async function getActivityPlayerDetail(id, params) {
  return request(`/api/activityPlayers/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createActivityPlayer(params) {
  return request(`/api/activityPlayers`, {
    method: 'post',
    data: params,
  });
}

export async function modifyActivityPlayer(id, params) {
  return request(`/api/activityPlayers/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteActivityPlayer(id) {
  return request(`/api/activityPlayers/${id}`, {
    method: 'delete',
  });
}
