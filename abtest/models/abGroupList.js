import { 
  getAbGroupList, 
  createAbGroup, 
  deleteAbGroup, 
  modifyAbGroup, 
}  from '@/services/api/abGroup'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'abGroupList',
  getListMethod: getAbGroupList,
  createMethod: createAbGroup,
  deleteMethod: deleteAbGroup,
  modifyMethod: modifyAbGroup,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)