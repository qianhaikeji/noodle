import { 
  getActivityList, 
  createActivity, 
  deleteActivity, 
  modifyActivity, 
}  from '@/services/api/activity'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'activityList',
  getListMethod: getActivityList,
  createMethod: createActivity,
  deleteMethod: deleteActivity,
  modifyMethod: modifyActivity,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)