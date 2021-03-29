import { 
  getAdvertisementList, 
  createAdvertisement, 
  deleteAdvertisement, 
  modifyAdvertisement, 
}  from '@/services/api/advertisement'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'advertisementList',
  getListMethod: getAdvertisementList,
  createMethod: createAdvertisement,
  deleteMethod: deleteAdvertisement,
  modifyMethod: modifyAdvertisement,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)