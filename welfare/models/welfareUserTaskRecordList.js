import { 
  getWelfareUserTaskRecordList, 
}  from '@/services/api/welfareUserTaskRecord'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'welfareUserTaskRecordList',
  getListMethod: getWelfareUserTaskRecordList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)