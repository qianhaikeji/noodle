import { 
  getWelfareUserList, 
}  from '@/services/api/welfareUser'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'welfareUserList',
  getListMethod: getWelfareUserList,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)