import { 
  getActivityPlayerList, 
  createActivityPlayer, 
  deleteActivityPlayer, 
  modifyActivityPlayer, 
}  from '@/services/api/activityPlayer'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'activityPlayerList',
  getListMethod: getActivityPlayerList,
  createMethod: createActivityPlayer,
  deleteMethod: deleteActivityPlayer,
  modifyMethod: modifyActivityPlayer,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)