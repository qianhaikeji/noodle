import request from '@/utils/request';

export async function getAbAllocationList(params) {
  return request(`/api/admin/abAllocations`, {
    method: 'get',
    params: params,
  });
}

export async function getAbAllocationDetail(id, params) {
  return request(`/api/admin/abAllocations/${id}`, {
    method: 'get',
    params: params,
  });
}


export async function modifyAbAllocation(id, params) {
  return request(`/api/admin/abAllocations/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteAbAllocation(id) {
  return request(`/api/admin/abAllocations/${id}`, {
    method: 'delete',
  });
}
