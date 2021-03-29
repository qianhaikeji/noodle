import { 
  getChannelList, 
  createChannel, 
  deleteChannel, 
  modifyChannel, 
}  from '@/services/api/channel'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'channelList',
  getListMethod: getChannelList,
  createMethod: createChannel,
  deleteMethod: deleteChannel,
  modifyMethod: modifyChannel,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)