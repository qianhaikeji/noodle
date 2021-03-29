import { 
  getDrawPrizeList, 
  createDrawPrize, 
  deleteDrawPrize, 
  modifyDrawPrize, 
}  from '@/services/api/drawPrize'
import { extendServerList } from '@/utils/extendListModel'
import _ from 'lodash'

const baseModel = extendServerList({
  namespace: 'drawPrizeList',
  getListMethod: getDrawPrizeList,
  createMethod: createDrawPrize,
  deleteMethod: deleteDrawPrize,
  modifyMethod: modifyDrawPrize,
})

const Model = {
  state: {
    sort: 'id',
    sortDirection: 'desc'
  },
}
export default _.merge(baseModel, Model)