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
  getActivityList, 
}  from '@/services/api/activity'

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
    title: '活动标题',
    dataIndex: 'title',
  },
  {
    title: '活动开奖类型，ENUM_ACTIVITY_TYPE',
    dataIndex: 'type',
  },
  {
    title: '开奖时间，当类型为按时间开奖时有效',
    dataIndex: 'lotteryTime',
    render: (text, record) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '是否启用活动',
    dataIndex: 'valid',
    render: (text, record) => <SwitchStatusTag status={text} />
  },
  {
    title: '是否作为推荐活动',
    dataIndex: 'recommend',
    render: (text, record) => <SwitchStatusTag status={text} />
  },
  {
    title: '是否已开奖',
    dataIndex: 'finished',
    render: (text, record) => <SwitchStatusTag status={text} />
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
    label: '活动标题',
    field: 'title',
    component: <Input placeholder="请输入" />
  },
  {
    label: '活动开奖类型，ENUM_ACTIVITY_TYPE',
    field: 'type',
    component: <Input placeholder="请输入" />
  },
  {
    label: '是否启用活动',
    field: 'valid',
    component: <StatusSelect statusList={ENUM_SWITCH_STATUS.getOptions()} />,
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
    label: '活动标题',
    field: 'title',
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
    label: '活动说明',
    field: 'intro',
    component: <TextArea rows={4} placeholder="填写内容" />,
    options: {
      rules: [
        {
          required: false,
        }
      ],
    }
  },
  {
    label: '列表题图',
    field: 'thumbImage',
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
    label: '活动开奖类型，ENUM_ACTIVITY_TYPE',
    field: 'type',
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
    label: '活动详情图',
    field: 'detailImages',
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
    label: '活动画廊图',
    field: 'galleryImages',
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
    label: '奖品列表',
    field: 'prizes',
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
    label: '开奖时间，当类型为按时间开奖时有效',
    field: 'lotteryTime',
    component: <DatePicker placeholder="选择日期" />,
    options: {
      rules: [
        {
          required: false,
        }
      ],
    }
  },
  {
    label: '开奖人数，当类型为按人数开奖时有效',
    field: 'lotteryPlayerCount',
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
    label: '是否启用活动',
    field: 'valid',
    component: <Switch></Switch>,
    options: {
      rules: [
        {
          required: false,
        }
      ],
      valuePropName: 'checked'
    }
  },
  {
    label: '是否作为推荐活动',
    field: 'recommend',
    component: <Switch></Switch>,
    options: {
      rules: [
        {
          required: false,
        }
      ],
      valuePropName: 'checked'
    }
  },
  {
    label: '是否已开奖',
    field: 'finished',
    component: <Switch></Switch>,
    options: {
      rules: [
        {
          required: false,
        }
      ],
      valuePropName: 'checked'
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
    label: '活动标题',
    field: 'title',
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
    label: '活动说明',
    field: 'intro',
    component: <TextArea rows={4} placeholder="填写内容" />,
    options: {
      rules: [
        {
          required: false,
        }
      ],
    }
  },
  {
    label: '列表题图',
    field: 'thumbImage',
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
    label: '活动开奖类型，ENUM_ACTIVITY_TYPE',
    field: 'type',
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
    label: '活动详情图',
    field: 'detailImages',
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
    label: '活动画廊图',
    field: 'galleryImages',
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
    label: '奖品列表',
    field: 'prizes',
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
    label: '开奖时间，当类型为按时间开奖时有效',
    field: 'lotteryTime',
    component: <DatePicker placeholder="选择日期" />,
    options: {
      rules: [
        {
          required: false,
        }
      ],
    }
  },
  {
    label: '开奖人数，当类型为按人数开奖时有效',
    field: 'lotteryPlayerCount',
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
    label: '是否启用活动',
    field: 'valid',
    component: <Switch></Switch>,
    options: {
      rules: [
        {
          required: false,
        }
      ],
      valuePropName: 'checked'
    }
  },
  {
    label: '是否作为推荐活动',
    field: 'recommend',
    component: <Switch></Switch>,
    options: {
      rules: [
        {
          required: false,
        }
      ],
      valuePropName: 'checked'
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
              title: '编辑抽奖活动', 
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
              title: '新建抽奖活动', 
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

const mapState = ({ activityList, loading }) => ({
  list: activityList.list,
  pagination: activityList.pagination,
  loading: loading.models.activityList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'activityList/fetch',
    payload
  }),
  deleteItem: (id) => dispatch({
    type: 'activityList/deleteItem',
    payload: {id}
  }),
  createItem: (data) => dispatch({
    type: 'activityList/createItem',
    payload: {data}
  }),
  modifyItem: (id, data) => dispatch({
    type: 'activityList/modifyItem',
    payload: {id, data}
  })
})

export default connect(mapState, mapDispatch)(Widget)