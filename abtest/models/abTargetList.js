import { 
  getAbTargetList, 
  createAbTarget, 
  deleteAbTarget, 
  modifyAbTarget, 
}  from '@/services/api/abTarget'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'abTargetList',
  getListMethod: getAbTargetList,
  createMethod: createAbTarget,
  deleteMethod: deleteAbTarget,
  modifyMethod: modifyAbTarget,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)