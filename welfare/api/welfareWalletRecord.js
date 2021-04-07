import request from '@/utils/request';

export async function getWelfareWalletRecordList(params) {
  return request(`/api/welfareWalletRecords`, {
    method: 'get',
    params: params,
  });
}

export async function getWelfareWalletRecordDetail(id, params) {
  return request(`/api/welfareWalletRecords/${id}`, {
    method: 'get',
    params: params,
  });
}



