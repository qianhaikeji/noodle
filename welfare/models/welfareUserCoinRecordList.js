import { 
  getWelfareUserCoinRecordList, 
}  from '@/services/api/welfareUserCoinRecord'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'welfareUserCoinRecordList',
  getListMethod: getWelfareUserCoinRecordList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)