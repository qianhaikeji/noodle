import request from '@/utils/request';

export async function getWelfareTaskRecordList(params) {
  return request(`/api/welfareTaskRecords`, {
    method: 'get',
    params: params,
  });
}

export async function getWelfareTaskRecordDetail(id, params) {
  return request(`/api/welfareTaskRecords/${id}`, {
    method: 'get',
    params: params,
  });
}



