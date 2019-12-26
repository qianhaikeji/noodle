import { 
  getUserList, 
  createUser, 
  deleteUser, 
  modifyUser, 
}  from '@/services/api/user'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'userList',
  getListMethod: getUserList,
  createMethod: createUser,
  deleteMethod: deleteUser,
  modifyMethod: modifyUser,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)