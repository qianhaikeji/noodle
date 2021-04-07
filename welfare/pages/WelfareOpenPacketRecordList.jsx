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
  getWelfareOpenPacketRecordList, 
}  from '@/services/api/welfareOpenPacketRecord'

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
    title: '红包中奖类型',
    dataIndex: 'awardType',
  },
  {
    title: '红包中奖内容（现金值、福币值、谢谢参与字符串等）',
    dataIndex: 'awardValue',
  },
  {
    title: '开红包时间',
    dataIndex: 'datetime',
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
    label: '用户id',
    field: 'userId',
    component: <Input placeholder="请输入" />
  },
  {
    label: '红包中奖类型',
    field: 'awardType',
    component: <Input placeholder="请输入" />
  },
  {
    label: '红包中奖内容（现金值、福币值、谢谢参与字符串等）',
    field: 'awardValue',
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

const mapState = ({ welfareOpenPacketRecordList, loading }) => ({
  list: welfareOpenPacketRecordList.list,
  pagination: welfareOpenPacketRecordList.pagination,
  loading: loading.models.welfareOpenPacketRecordList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'welfareOpenPacketRecordList/fetch',
    payload
  }),
})

export default connect(mapState, mapDispatch)(Widget)