import request from '@/utils/request';

export async function getWelfareCoinRecordList(params) {
  return request(`/api/welfareCoinRecords`, {
    method: 'get',
    params: params,
  });
}

export async function getWelfareCoinRecordDetail(id, params) {
  return request(`/api/welfareCoinRecords/${id}`, {
    method: 'get',
    params: params,
  });
}



