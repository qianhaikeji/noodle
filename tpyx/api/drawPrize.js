import request from '@/utils/request';

export async function getDrawPrizeList(params) {
  return request(`/api/drawPrizes`, {
    method: 'get',
    params: params,
  });
}

export async function getDrawPrizeDetail(id, params) {
  return request(`/api/drawPrizes/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createDrawPrize(params) {
  return request(`/api/drawPrizes`, {
    method: 'post',
    data: params,
  });
}

export async function modifyDrawPrize(id, params) {
  return request(`/api/drawPrizes/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteDrawPrize(id) {
  return request(`/api/drawPrizes/${id}`, {
    method: 'delete',
  });
}
