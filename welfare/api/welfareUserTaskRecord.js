import request from '@/utils/request';

export async function getWelfareUserTaskRecordList(params) {
  return request(`/api/welfareUserTaskRecords`, {
    method: 'get',
    params: params,
  });
}

export async function getWelfareUserTaskRecordDetail(id, params) {
  return request(`/api/welfareUserTaskRecords/${id}`, {
    method: 'get',
    params: params,
  });
}



