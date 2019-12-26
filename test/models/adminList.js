import { 
  getAdminList, 
  createAdmin, 
  deleteAdmin, 
  modifyAdmin, 
}  from '@/services/api/admin'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'adminList',
  getListMethod: getAdminList,
  createMethod: createAdmin,
  deleteMethod: deleteAdmin,
  modifyMethod: modifyAdmin,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)