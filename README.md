# noodle
a smart code generator for qhkj project.



https://mozilla.github.io/nunjucks


## 介绍
### 编写设计文档
```
[
  {
    "modelName": "user",
    "modelText": "用户",
    "modelFields": [
      {
        "name": "id",
        "type": "INTEGER",
        "primaryKey": true,
        "autoIncrement": true,
        "allowNull": false,
        "unique": true,
        "faker": "`faker.internet.userName()`",
        "comment": "字段说明",
        "editable": false,
        "listable": true,
        "filterable": false,
        "required": false,
        "creatable": false
      }
    ],
    "creatable": true,
    "editable": true,
    "deletable": true,
    "exportable": true,
    "importable": false,
    "batchable": false,
    "service": {
      "name": "user",
      "namespace": "common"
    },
    "controller": {
      "name": "user",
    },
    "api": {
      "base": "",
      "doc": {
        "version": "1.0.0",
        "groupValue": "user",
        "groupLabel": "用户" 
      }
    }
  }
]
```

### 生成egg-server代码
包含：
model/*
service/*
controller/*
router.js
以及接口文档注释
