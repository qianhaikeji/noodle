import { 
  getWelfareOpenPacketRecordList, 
}  from '@/services/api/welfareOpenPacketRecord'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'welfareOpenPacketRecordList',
  getListMethod: getWelfareOpenPacketRecordList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)