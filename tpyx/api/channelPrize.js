import request from '@/utils/request';

export async function getChannelPrizeList(params) {
  return request(`/api/channelPrizes`, {
    method: 'get',
    params: params,
  });
}

export async function getChannelPrizeDetail(id, params) {
  return request(`/api/channelPrizes/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createChannelPrize(params) {
  return request(`/api/channelPrizes`, {
    method: 'post',
    data: params,
  });
}

export async function modifyChannelPrize(id, params) {
  return request(`/api/channelPrizes/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteChannelPrize(id) {
  return request(`/api/channelPrizes/${id}`, {
    method: 'delete',
  });
}
