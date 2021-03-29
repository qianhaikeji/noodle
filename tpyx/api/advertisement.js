import request from '@/utils/request';

export async function getAdvertisementList(params) {
  return request(`/api/advertisements`, {
    method: 'get',
    params: params,
  });
}

export async function getAdvertisementDetail(id, params) {
  return request(`/api/advertisements/${id}`, {
    method: 'get',
    params: params,
  });
}

export async function createAdvertisement(params) {
  return request(`/api/advertisements`, {
    method: 'post',
    data: params,
  });
}

export async function modifyAdvertisement(id, params) {
  return request(`/api/advertisements/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteAdvertisement(id) {
  return request(`/api/advertisements/${id}`, {
    method: 'delete',
  });
}
