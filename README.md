# noodle
a smart code generator for qhkj project.



https://mozilla.github.io/nunjucks


## 介绍
### 编写设计文档
```
{
  "models": [
    {
      "name": "user",   // model名称
      "label": "用户",  // model文本名称
      "fields": [       // model数据库字段定义
        {
          "name": "id",         // 列名
          "type": "INTEGER",    // sequenlize列类型，[STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN]
          "primaryKey": true,   // sequenlize model属性
          "autoIncrement": true,
          "allowNull": false,
          "unique": true,
          "comment": "'字段注释说明'",
          "faker": "`faker.internet.userName()`",   // model mock函数，使用faker工具
          "editable": true,     // 字段是否可修改, service代码以及管理后台中都会使用
          "listable": true,     // 字段是否在表格中列出, 管理后台中会使用
          "filterable": false,  // 字段是否可过滤, service代码以及管理后台中都会使用
          "required": true,     // 字段在新建和修改时是否可必填, service代码以及管理后台中都会使用
          "creatable": true     // 字段是否需要创建, 管理后台中会使用
        },
        ...
      ],
      "creatable": true,  // model是否支持创建, service代码以及管理后台中都会使用
      "editable": true,   // model是否可修改, service代码以及管理后台中都会使用
      "deletable": true,  // model是否可删除, service代码以及管理后台中都会使用
      "exportable": true, // 是否可导出excel, 管理后台中都使用
      "importable": false,// 是否能够导入excel, 管理后台中都使用
      "batchable": false  // 是否支持批量修改, service代码以及管理后台中都会使用
    },
    ...
  ],
  "services": [
    {
      "name": "user",                    // service 名称
      "namespace": "common",             // service 所在的namespace
      "models": ["user", "admin", ...]   // 需要在某个service中实现方法的model
    },
    ...
  ],
  "controllers": [
    {
      "name": "user",                    // controller 名称
      "models": ["user", "admin", ...],  // 需要在某个controller中实现方法的model 
      "api": {                      
        "base": "",                      // api前缀
        "version": "1.0.0",              // api版本号
        "groupValue": "user",            // api分组
        "groupLabel": "用户"             // api分组标题
      }
    },
    ...
  ]
}
```


example:
```
{
  "models": [
    {
      "name": "user",
      "label": "用户",
      "fields": [
        {
          "name": "id",
          "type": "INTEGER",
          "primaryKey": true,
          "autoIncrement": true,
          "allowNull": false,
          "unique": true,
          "faker": "`faker.internet.userName()`",
          "comment": "'字段说明'",
          "editable": true,
          "listable": true,
          "filterable": false,
          "required": true,
          "creatable": true
        },
        {
          "name": "name",
          "type": "INTEGER",
          "allowNull": false,
          "unique": true,
          "faker": "`faker.internet.userName()`",
          "comment": "'字段说明'",
          "editable": false,
          "listable": true,
          "filterable": true,
          "required": false,
          "creatable": true
        }
      ],
      "creatable": true,
      "editable": true,
      "deletable": true,
      "exportable": true,
      "importable": false,
      "batchable": false
    },
    {
      "name": "admin",
      "label": "管理员",
      "fields": [
        {
          "name": "id",
          "type": "INTEGER",
          "primaryKey": true,
          "autoIncrement": true,
          "allowNull": false,
          "unique": true,
          "faker": "`faker.internet.userName()`",
          "comment": "'字段说明'",
          "editable": true,
          "listable": true,
          "filterable": false,
          "required": true,
          "creatable": true
        },
        {
          "name": "name",
          "type": "INTEGER",
          "allowNull": false,
          "unique": true,
          "faker": "`faker.internet.userName()`",
          "comment": "'字段说明'",
          "editable": false,
          "listable": true,
          "filterable": true,
          "required": false,
          "creatable": true
        }
      ],
      "creatable": true,
      "editable": true,
      "deletable": true,
      "exportable": true,
      "importable": false,
      "batchable": false
    }
  ],
  "services": [
    {
      "name": "user",
      "namespace": "common",
      "models": ["user", "admin"]
    }
  ],
  "controllers": [
    {
      "name": "user",
      "models": ["user", "admin"],
      "api": {
        "base": "",
        "version": "1.0.0",
        "groupValue": "user",
        "groupLabel": "用户" 
      }
    }
  ]
}
```

### 生成egg-server代码
包含：
model/*
service/*
controller/*
router.js
以及接口文档注释

```
yarn noodle egg-server router ./example/design.json ./test -c
yarn noodle egg-server model ./example/design.json ./test -c
yarn noodle egg-server service ./example/design.json ./test -c
yarn noodle egg-server controller ./example/design.json ./test -c
yarn noodle egg-server all ./example/design.json ./test -c
```
