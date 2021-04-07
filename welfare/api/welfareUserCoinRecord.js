import request from '@/utils/request';

export async function getWelfareUserCoinRecordList(params) {
  return request(`/api/welfareUserCoinRecords`, {
    method: 'get',
    params: params,
  });
}

export async function getWelfareUserCoinRecordDetail(id, params) {
  return request(`/api/welfareUserCoinRecords/${id}`, {
    method: 'get',
    params: params,
  });
}



