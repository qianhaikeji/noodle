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
import {downloadAllPage} from '@/utils/utils'
import TableList from '@/components/TableList'
import editForm from '@/components/Dialog/EditForm'
import QueryForm from '@/components/QueryForm'
import toast from '@/components/Toast'
import {ENUM_SWITCH_STATUS} from '@/enum'
import StatusSelect from '@/widgets/StatusSelect'
import SwitchStatusTag from '@/widgets/SwitchStatusTag'
import QueryRangePicker from '@/widgets/QueryRangePicker'
import { 
  getUserList, 
}  from '@/services/api/user'

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
    title: '字段说明',
    dataIndex: 'id',
  },
  {
    title: '字段说明',
    dataIndex: 'name',
  },
  {
    title: '日期',
    dataIndex: 'date',
    render: (text, record) => moment(text).format('YYYY-MM-DD HH:mm:ss')
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
    label: '字段说明',
    field: 'name',
    component: <Input placeholder="请输入" />
  },
  {
    label: '日期',
    field: 'date',
    component: <QueryRangePicker placeholder="选择范围" format='YYYY-MM-DD' />
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
  {
    label: '字段说明',
    field: 'id',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
        }
      ],
    }
  },
  {
    label: '字段说明',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: false,
        }
      ],
    }
  },
  {
    label: '日期',
    field: 'date',
    component: <DatePicker placeholder="选择日期" />,
    options: {
      rules: [
        {
          required: false,
        }
      ],
    }
  },
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
  {
    label: '字段说明',
    field: 'id',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
        }
      ],
    }
  },
  {
    label: '日期',
    field: 'date',
    component: <DatePicker placeholder="选择日期" />,
    options: {
      rules: [
        {
          required: false,
        }
      ],
    }
  },
]

const Widget = ({
  loading,
  list,
  pagination,
  loadList,
  deleteItem,
  modifyItem,
  createItem
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
    if (params.date && params.date.length === 2) {
      params.startDate = params.date[0]
      params.endDate = params.date[1]
      delete params.date
    }

    setQueryParams(params)
    const cond = {
      page: 1,
      pageSize: pagination.pageSize,
      ...params,
    }

    loadList(cond)
  }

  const onExport = async (params) => {
    if (params.date && params.date.length === 2) {
      params.startDate = params.date[0]
      params.endDate = params.date[1]
      delete params.date
    }

    toast.show({message: '正在导出数据...'})
    try {
      const allData = await downloadAllPage(getUserList, params)
      excel.exportJsonToXlsx('用户', _.map(allData, ele => {
        return {
          '字段说明': ele.id,
          '字段说明': ele.name,
          '日期': moment(ele.date).format('YYYY-MM-DD HH:mm:ss'),
        }
      }))
    } catch (err) {
      console.log(err)
      notification.error({
        message: `导出excel失败`,
        description: err.message,
      })
    }
    toast.hide()
  }

  const opColums = [
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => {
            editForm({
              title: '编辑用户', 
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
          onExport={onExport} exportable
        ></QueryForm>
        <div style={ {marginBottom: 10} }>
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

const mapState = ({ userList, loading }) => ({
  list: userList.list,
  pagination: userList.pagination,
  loading: loading.models.userList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'userList/fetch',
    payload
  }),
  deleteItem: (id) => dispatch({
    type: 'userList/deleteItem',
    payload: {id}
  }),
  createItem: (data) => dispatch({
    type: 'userList/createItem',
    payload: {data}
  }),
  modifyItem: (id, data) => dispatch({
    type: 'userList/modifyItem',
    payload: {id, data}
  })
})

export default connect(mapState, mapDispatch)(Widget)