import { 
  getAbTestList, 
  createAbTest, 
  deleteAbTest, 
  modifyAbTest, 
}  from '@/services/api/abTest'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'abTestList',
  getListMethod: getAbTestList,
  createMethod: createAbTest,
  deleteMethod: deleteAbTest,
  modifyMethod: modifyAbTest,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)