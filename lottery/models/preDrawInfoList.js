import { 
  getPreDrawInfoList, 
}  from '@/services/api/preDrawInfo'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'preDrawInfoList',
  getListMethod: getPreDrawInfoList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)