import request from '@/utils/request';

export async function getWelfareUserList(params) {
  return request(`/api/welfareUsers`, {
    method: 'get',
    params: params,
  });
}

export async function getWelfareUserDetail(id, params) {
  return request(`/api/welfareUsers/${id}`, {
    method: 'get',
    params: params,
  });
}



