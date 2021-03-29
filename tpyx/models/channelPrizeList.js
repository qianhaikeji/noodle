import { 
  getChannelPrizeList, 
  createChannelPrize, 
  deleteChannelPrize, 
  modifyChannelPrize, 
}  from '@/services/api/channelPrize'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'channelPrizeList',
  getListMethod: getChannelPrizeList,
  createMethod: createChannelPrize,
  deleteMethod: deleteChannelPrize,
  modifyMethod: modifyChannelPrize,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)