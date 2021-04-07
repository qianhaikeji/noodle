import request from '@/utils/request';

export async function getWelfareUserOpenPacketRecordList(params) {
  return request(`/api/welfareUserOpenPacketRecords`, {
    method: 'get',
    params: params,
  });
}

export async function getWelfareUserOpenPacketRecordDetail(id, params) {
  return request(`/api/welfareUserOpenPacketRecords/${id}`, {
    method: 'get',
    params: params,
  });
}



