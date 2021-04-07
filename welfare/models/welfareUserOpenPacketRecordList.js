import { 
  getWelfareUserOpenPacketRecordList, 
}  from '@/services/api/welfareUserOpenPacketRecord'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'welfareUserOpenPacketRecordList',
  getListMethod: getWelfareUserOpenPacketRecordList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)