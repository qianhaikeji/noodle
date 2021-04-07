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
  getWelfareUserTaskRecordList, 
}  from '@/services/api/welfareUserTaskRecord'

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
    title: '用户id',
    dataIndex: 'userId',
  },
  {
    title: '任务时间',
    dataIndex: 'taskDate',
    render: (text, record) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '任务日期',
    dataIndex: 'taskDateStr',
  },
  {
    title: '任务类型',
    dataIndex: 'taskType',
  },
  {
    title: '任务描述',
    dataIndex: 'taskDesc',
  },
  {
    title: '任务状态: 1-待处理, 2-处理成功, 3-处理失败',
    dataIndex: 'status',
  },
  {
    title: '失败原因',
    dataIndex: 'errors',
  },
  {
    title: '是否奖励',
    dataIndex: 'awarded',
    render: (text, record) => <SwitchStatusTag status={text} />
  },
  {
    title: '奖励处理的描述，比如当超出了奖励上限时，可记录不给用户奖励的原因',
    dataIndex: 'awardDesc',
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
    label: '用户id',
    field: 'userId',
    component: <Input placeholder="请输入" />
  },
  {
    label: '任务日期',
    field: 'taskDateStr',
    component: <Input placeholder="请输入" />
  },
  {
    label: '任务类型',
    field: 'taskType',
    component: <Input placeholder="请输入" />
  },
  {
    label: '任务状态: 1-待处理, 2-处理成功, 3-处理失败',
    field: 'status',
    component: <Input placeholder="请输入" />
  },
  {
    label: '是否奖励',
    field: 'awarded',
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
  ]

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <QueryForm 
          items={queryFormItems} onSubmit={onQuery} 
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

const mapState = ({ welfareUserTaskRecordList, loading }) => ({
  list: welfareUserTaskRecordList.list,
  pagination: welfareUserTaskRecordList.pagination,
  loading: loading.models.welfareUserTaskRecordList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'welfareUserTaskRecordList/fetch',
    payload
  }),
})

export default connect(mapState, mapDispatch)(Widget)