import request from '@/utils/request';

export async function getPreDrawInfoList(params) {
  return request(`/api/preDrawInfos`, {
    method: 'get',
    params: params,
  });
}

export async function getPreDrawInfoDetail(id, params) {
  return request(`/api/preDrawInfos/${id}`, {
    method: 'get',
    params: params,
  });
}



