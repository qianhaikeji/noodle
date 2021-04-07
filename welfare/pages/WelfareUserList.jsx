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
  getWelfareUserList, 
}  from '@/services/api/welfareUser'

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
    title: '昵称',
    dataIndex: 'nickName',
  },
  {
    title: 'unionId',
    dataIndex: 'unionId',
  },
  {
    title: 'openId',
    dataIndex: 'openId',
  },
  {
    title: '注册时间',
    dataIndex: 'registerDatetime',
    render: (text, record) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLoginDatetime',
    render: (text, record) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '用户头像',
    dataIndex: 'userIcon',
  },
  {
    title: '福币余额',
    dataIndex: 'coinBalance',
  },
  {
    title: '钱包余额',
    dataIndex: 'walletBalance',
  },
  {
    title: '累计获取福币',
    dataIndex: 'totalCoin',
  },
  {
    title: '累计获取红包',
    dataIndex: 'totalPacket',
  },
  {
    title: '剩余可抽取红包机会',
    dataIndex: 'leftPacketChanceCount',
  },
  {
    title: '用户绑定手机号',
    dataIndex: 'phone',
  },
  {
    title: '是否关注了公众号',
    dataIndex: 'isFollowedWxpub',
    render: (text, record) => <SwitchStatusTag status={text} />
  },
  {
    title: '连续签到天数',
    dataIndex: 'continousSigninCount',
  },
  {
    title: '是否为新用户',
    dataIndex: 'isNewUser',
    render: (text, record) => <SwitchStatusTag status={text} />
  },
  {
    title: '是否绑定手机号',
    dataIndex: 'isBindUserPhone',
    render: (text, record) => <SwitchStatusTag status={text} />
  },
  {
    title: '邀请者userId',
    dataIndex: 'invitorId',
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
    label: '昵称',
    field: 'nickName',
    component: <Input placeholder="请输入" />
  },
  {
    label: 'unionId',
    field: 'unionId',
    component: <Input placeholder="请输入" />
  },
  {
    label: 'openId',
    field: 'openId',
    component: <Input placeholder="请输入" />
  },
  {
    label: '用户绑定手机号',
    field: 'phone',
    component: <Input placeholder="请输入" />
  },
  {
    label: '是否为新用户',
    field: 'isNewUser',
    component: <StatusSelect statusList={ENUM_SWITCH_STATUS.getOptions()} />,
  },
  {
    label: '是否绑定手机号',
    field: 'isBindUserPhone',
    component: <StatusSelect statusList={ENUM_SWITCH_STATUS.getOptions()} />,
  },
  {
    label: '邀请者userId',
    field: 'invitorId',
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

const mapState = ({ welfareUserList, loading }) => ({
  list: welfareUserList.list,
  pagination: welfareUserList.pagination,
  loading: loading.models.welfareUserList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'welfareUserList/fetch',
    payload
  }),
})

export default connect(mapState, mapDispatch)(Widget)