import request from '@/utils/request';

export async function getWelfareUserWalletRecordList(params) {
  return request(`/api/welfareUserWalletRecords`, {
    method: 'get',
    params: params,
  });
}

export async function getWelfareUserWalletRecordDetail(id, params) {
  return request(`/api/welfareUserWalletRecords/${id}`, {
    method: 'get',
    params: params,
  });
}



