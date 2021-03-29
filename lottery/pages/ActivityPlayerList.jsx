import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  TimePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
  Typography,
  Alert,
  Modal,
  notification,
  Switch,
} from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import React, { userEffect, useState, Fragment, useEffect } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import _ from 'lodash'
import excel from '@/services/excel'
import {downloadAllPage, convertDateRangeForQuery} from '@/utils/utils'
import TableList from '@/components/TableList'
import editForm from '@/components/Dialog/EditForm'
import QueryForm from '@/components/QueryForm'
import toast from '@/components/Toast'
import {ENUM_SWITCH_STATUS} from '@/enum'
import StatusSelect from '@/widgets/StatusSelect'
import SwitchStatusTag from '@/widgets/SwitchStatusTag'
import { 
  getActivityPlayerList, 
}  from '@/services/api/activityPlayer'

const {Text} = Typography
const FormItem = Form.Item
const { Option } = Select
const { confirm } = Modal
const { TextArea } = Input
const { RangePicker } = DatePicker

/**
 * columns 此处写入列数据
{
  title: '项目名',
  dataIndex: 'name',
  sorter: true,
},
*/
const columns = [
  {
    title: '活动id',
    dataIndex: 'activityId',
  },
  {
    title: '用户id',
    dataIndex: 'playerId',
  },
  {
    title: '用户名',
    dataIndex: 'playerName',
  },
  {
    title: '用户头像',
    dataIndex: 'playerIcon',
  },
  {
    title: '助力二维码',
    dataIndex: 'assistWXACode',
  },
  {
    title: '助力数',
    dataIndex: 'assistCount',
  },
  {
    title: '是否中奖',
    dataIndex: 'isWinner',
    render: (text, record) => <SwitchStatusTag status={text} />
  },
  {
    title: '是否真实用户',
    dataIndex: 'isRealUser',
    render: (text, record) => <SwitchStatusTag status={text} />
  },
  {
    title: '中奖等级',
    dataIndex: 'prizeLevel',
  },
  {
    title: '奖品信息',
    dataIndex: 'prize',
  },
];

/**
 * queryFormItems 此处设计查询条件form
  {
    label: '模糊搜索',
    field: 'fuzzy',
    component: <Input placeholder="请输入" />
  }
*/
const queryFormItems = [
  {
    label: '活动id',
    field: 'activityId',
    component: <Input placeholder="请输入" />
  },
  {
    label: '用户id',
    field: 'playerId',
    component: <Input placeholder="请输入" />
  },
  {
    label: '用户名',
    field: 'playerName',
    component: <Input placeholder="请输入" />
  },
  {
    label: '是否中奖',
    field: 'isWinner',
    component: <StatusSelect statusList={ENUM_SWITCH_STATUS.getOptions()} />,
  },
  {
    label: '是否真实用户',
    field: 'isRealUser',
    component: <StatusSelect statusList={ENUM_SWITCH_STATUS.getOptions()} />,
  },
  {
    label: '中奖等级',
    field: 'prizeLevel',
    component: <Input placeholder="请输入" />
  },
]

/**
 * createFormItems 此处设计新建窗口属性
  {
    label: '项目名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
          message: '请输入至少五个字符的规则描述！',
          min: 5,
        }
      ],
    }
  }
*/
const createFormItems = [
]

/**
 * updateFormItems 此处设计编辑窗口属性
  {
    label: '项目名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
          message: '请输入至少五个字符的规则描述！',
          min: 5,
        }
      ],
    }
  }
*/
const updateFormItems = [
]

const Widget = ({
  loading,
  list,
  pagination,
  loadList,
  deleteItem,
  modifyItem,
  createItem,
  history
}) => {
  const [queryParams, setQueryParams] = useState({})

  useEffect(() => {
    loadList({
      page: pagination.current,
      pageSize: pagination.pageSize,
    })
  }, [])


  const handleTableChange = (pagination, filters, sorter) => {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...queryParams,
      ...filters,
      ...sorter
    }

    loadList(params)
  }

  const onQuery = (params) => {

    setQueryParams(params)
    const cond = {
      page: 1,
      pageSize: pagination.pageSize,
      ...params,
    }

    loadList(cond)
  }


  const opColums = [
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => {
            editForm({
              title: '编辑参与抽奖用户记录', 
              items: _.map(updateFormItems, ele => {
                if (record[ele.field] !== undefined) {
                  ele.options.initialValue = record[ele.field]
                }
                return ele
              }),
              onSubmit: async (data) => {
                await modifyItem({...data, ids: [record.id]})
                loadList({
                  page: pagination.current,
                  pageSize: pagination.pageSize,
                })
              },
            })
          }}>编辑</a>
          <a style={ {marginLeft: '15px'} } onClick={ () => {
            confirm({
              title: '确定删除此纪录吗？',
              content: '删除后不可恢复',
              okText: '删除',
              okType: 'danger',
              cancelText: '取消',
              onOk: async() => {
                deleteItem(record.id)
              },             
            })
          } }>删除</a>
        </Fragment>
      ),
    },
  ]

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <QueryForm 
          items={queryFormItems} onSubmit={onQuery} 
        ></QueryForm>
        <div style={ {marginBottom: 10} }>
          <Button style={ {marginRight: '10px'} } icon="plus" type="primary" onClick={() => editForm({
              title: '新建参与抽奖用户记录', 
              items: createFormItems,
              onSubmit: async (data) => {
                await createItem(data)
                loadList({
                  page: 1,
                  pageSize: pagination.pageSize,
                })
              }
            })}>
            新建
          </Button>
        </div>
        <TableList
          loading={loading}
          data={ {list, pagination} }
          columns={[...columns, ...opColums]}
          onChange={handleTableChange}
        />
      </Card>
    </PageHeaderWrapper>
  )
}

const mapState = ({ activityPlayerList, loading }) => ({
  list: activityPlayerList.list,
  pagination: activityPlayerList.pagination,
  loading: loading.models.activityPlayerList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'activityPlayerList/fetch',
    payload
  }),
  deleteItem: (id) => dispatch({
    type: 'activityPlayerList/deleteItem',
    payload: {id}
  }),
  createItem: (data) => dispatch({
    type: 'activityPlayerList/createItem',
    payload: {data}
  }),
  modifyItem: (id, data) => dispatch({
    type: 'activityPlayerList/modifyItem',
    payload: {id, data}
  })
})

export default connect(mapState, mapDispatch)(Widget)