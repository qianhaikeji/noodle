import { 
  getWelfareTaskRecordList, 
}  from '@/services/api/welfareTaskRecord'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'welfareTaskRecordList',
  getListMethod: getWelfareTaskRecordList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)