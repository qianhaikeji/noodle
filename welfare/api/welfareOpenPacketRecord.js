import request from '@/utils/request';

export async function getWelfareOpenPacketRecordList(params) {
  return request(`/api/welfareOpenPacketRecords`, {
    method: 'get',
    params: params,
  });
}

export async function getWelfareOpenPacketRecordDetail(id, params) {
  return request(`/api/welfareOpenPacketRecords/${id}`, {
    method: 'get',
    params: params,
  });
}



