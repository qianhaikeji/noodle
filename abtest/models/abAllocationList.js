import { 
  getAbAllocationList, 
  deleteAbAllocation, 
  modifyAbAllocation, 
}  from '@/services/api/abAllocation'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'abAllocationList',
  getListMethod: getAbAllocationList,
  deleteMethod: deleteAbAllocation,
  modifyMethod: modifyAbAllocation,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)