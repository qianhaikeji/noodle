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
  getAbTestList, 
}  from '@/services/api/abTest'

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
    title: '实验名称',
    dataIndex: 'name',
  },
  {
    title: '实验描述',
    dataIndex: 'description',
  },
  {
    title: '实验类型(客户端实验、服务端实验)',
    dataIndex: 'type',
  },
  {
    title: '指标',
    dataIndex: 'targets',
  },
  {
    title: '是否启用',
    dataIndex: 'enable',
    render: (text, record) => <SwitchStatusTag status={text} />
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
    label: '实验名称',
    field: 'name',
    component: <Input placeholder="请输入" />
  },
  {
    label: '实验类型(客户端实验、服务端实验)',
    field: 'type',
    component: <Input placeholder="请输入" />
  },
  {
    label: '是否启用',
    field: 'enable',
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
    label: '实验名称',
    field: 'name',
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
    label: '实验描述',
    field: 'description',
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
    label: '实验类型(客户端实验、服务端实验)',
    field: 'type',
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
    label: '指标',
    field: 'targets',
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
    label: '是否启用',
    field: 'enable',
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
    label: '实验名称',
    field: 'name',
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
    label: '实验描述',
    field: 'description',
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
    label: '实验类型(客户端实验、服务端实验)',
    field: 'type',
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
    label: '指标',
    field: 'targets',
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
    label: '是否启用',
    field: 'enable',
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

    setQueryParams(params)
    const cond = {
      page: 1,
      pageSize: pagination.pageSize,
      ...params,
    }

    loadList(cond)
  }

  const onExport = async (params) => {

    toast.show({message: '正在导出数据...'})
    try {
      const allData = await downloadAllPage(getAbTestList, params)
      excel.exportJsonToXlsx('AB测试实验', _.map(allData, ele => {
        return {
          '实验名称': ele.name,
          '实验描述': ele.description,
          '实验类型(客户端实验、服务端实验)': ele.type,
          '指标': ele.targets,
          '是否启用': ele.enable ? '是' : '否',
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
              title: '编辑AB测试实验', 
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
          <Button style={ {marginRight: '10px'} } icon="plus" type="primary" onClick={() => editForm({
              title: '新建AB测试实验', 
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

const mapState = ({ abTestList, loading }) => ({
  list: abTestList.list,
  pagination: abTestList.pagination,
  loading: loading.models.abTestList,
})

const mapDispatch = (dispatch) => ({
  loadList: (payload) => dispatch({
    type: 'abTestList/fetch',
    payload
  }),
  deleteItem: (id) => dispatch({
    type: 'abTestList/deleteItem',
    payload: {id}
  }),
  createItem: (data) => dispatch({
    type: 'abTestList/createItem',
    payload: {data}
  }),
  modifyItem: (id, data) => dispatch({
    type: 'abTestList/modifyItem',
    payload: {id, data}
  })
})

export default connect(mapState, mapDispatch)(Widget)