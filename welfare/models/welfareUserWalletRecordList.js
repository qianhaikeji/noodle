import { 
  getWelfareUserWalletRecordList, 
}  from '@/services/api/welfareUserWalletRecord'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'welfareUserWalletRecordList',
  getListMethod: getWelfareUserWalletRecordList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)