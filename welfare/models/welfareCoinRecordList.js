import { 
  getWelfareCoinRecordList, 
}  from '@/services/api/welfareCoinRecord'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'welfareCoinRecordList',
  getListMethod: getWelfareCoinRecordList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)