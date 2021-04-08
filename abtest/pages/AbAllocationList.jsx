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
  getAbAllocationList, 
}  from '@/services/api/abAllocation'

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
    title: '用户标识',
    dataIndex: 'clientId',
  },
  {
    title: '实验ID',
    dataIndex: 'abTestId',
  },
  {
    title: '实验名称',
    dataIndex: 'abTestName',
  },
  {
    title: '对照组ID',
    dataIndex: 'abGroupId',
    render: (text, record) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '对照组名称',
    dataIndex: 'abGroupName',
  },
  {
    title: '自定义字段',
    dataIndex: 'customFields',
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
    label: '用户标识',
    field: 'clientId',
    component: <Input placeholder="请输入" />
  },
  {
    label: '实验ID',
    field: 'abTestId',
    component: <Input placeholder="请输入" />
  },
  {
    label: '对照组ID',
    field: 'abGroupId',
    component: <RangePicker placeholder="选择范围" format='YYYY-MM-DD' />,
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
    label: '用户标识',
    field: 'clientId',
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
    label: '实验ID',
    field: 'abTestId',
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
    label: '实验名称',
    field: 'abTestName',
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
    label: '对照组ID',
    field: 'abGroupId',
    component: <DatePicker placeholder="选择日期" />,
    options: {
      rules: [
        {
          required: true,
        }
      ],
    }
  },
  {
    label: '对照组名称',
    field: 'abGroupName',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
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
    label: '用户标识',
    field: 'clientId',
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
    label: '实验ID',
    field: 'abTestId',
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
    label: '实验名称',
    field: 'abTestName',
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
    label: '对照组ID',
    field: 'abGroupId',
    component: <DatePicker placeholder="选择日期" />,
    options: {
      rules: [
        {
          required: true,
        }
      ],
    }
  },
  {
    label: '对照组名称',
    field: 'abGroupName',
    component: <Input placeholder="请输入" />,
    options: {
      rules: [
        {
          required: true,
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
  createItem,
  history
}) => {
  const [queryParams, setQueryParams] = useState({})
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(() => {
    loadList({
      page: pagination.current,
      pageSize: pagination.pageSize,
    })
  }, [])

  const batchOp = async () => {
    const ids = selectedRows.map(ele => ele.id)
    editForm({
      title: '批量编辑', 
      items: updateFormItems,
      onSubmit: async (data) => {
        await modifyItem({...data, ids})

        loadList({
          page: pagination.current,
          pageSize: pagination.pageSize,
        })
      },
    })
  }

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
    if (params.abGroupId && params.abGroupId.length === 2) {
      const dates = convertDateRangeForQuery(params.abGroupId)
      params.startDate = dates[0]
      params.endDate = dates[1]
    }

    delete params.abGroupId
    

    setQueryParams(params)
    const cond = {
      page: 1,
      pageSize: pagination.pageSize,
      ...params,
    }

    loadList(cond)
  }

  const onExport = async (params) => {
    if (params.abGroupId && params.abGroupId.length === 2) {
      const dates = convertDateRangeForQuery(params.abGroupId)
      params.startDate = dates[0]
      params.endDate = dates[1]
    }

    delete params.abGroupId


    toast.show({message: '正在导出数据...'})
    try {
      const allData = await downloadAllPage(getAbAllocationList, params)
      excel.exportJsonToXlsx('AB测试分配记录', _.map(allData, ele => {
        return {
          '用户标识': ele.clientId,
          '实验ID': ele.abTestId,
          '实验名称': ele.abTestName,
          '对照组ID': moment(ele.abGroupId).format('YYYY-MM-DD HH:mm:ss'),
          '对照组名称': ele.abGroupName,
          '自定义字段': ele.customFields,
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
              title: '编辑AB测试分配记录', 
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
          { 
            selectedRows.length > 0 && (
              <Button onClick={() => batchOp()}>批量操作</Button>
            ) 
          }
        </div>
        <TableList
          enableSelect
          onSelectRow={setSelectedRows}
          selectedRows={selectedRows}
          loading={loading}
          data={ {list, pagination} }
          columns={[...columns, ...opColums]}
          onChange={handleTableChange}
        />
      </Card>
    </PageHeaderWrapper>
  )
}

const mapState = ({ abAllocationList, loading }) => ({
  list: abAllocationList.list,
  pagination: abAllocationList.pagination,
  loading: loading.models.abAllocationList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'abAllocationList/fetch',
    payload
  }),
  deleteItem: (id) => dispatch({
    type: 'abAllocationList/deleteItem',
    payload: {id}
  }),
  modifyItem: (id, data) => dispatch({
    type: 'abAllocationList/modifyItem',
    payload: {id, data}
  })
})

export default connect(mapState, mapDispatch)(Widget)