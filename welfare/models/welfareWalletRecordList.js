import { 
  getWelfareWalletRecordList, 
}  from '@/services/api/welfareWalletRecord'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'welfareWalletRecordList',
  getListMethod: getWelfareWalletRecordList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)