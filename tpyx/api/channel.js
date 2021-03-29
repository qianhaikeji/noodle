import request from '@/utils/request';

export async function getChannelList(params) {
  return request(`/api/channels`, {
    method: 'get',
    params: params,
  });
}

export async function getChannelDetail(id, params) {
  return request(`/api/channels/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createChannel(params) {
  return request(`/api/channels`, {
    method: 'post',
    data: params,
  });
}

export async function modifyChannel(id, params) {
  return request(`/api/channels/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteChannel(id) {
  return request(`/api/channels/${id}`, {
    method: 'delete',
  });
}
