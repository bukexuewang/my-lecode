const arr = [
  {
    children: [
      {
        id: 3,
        menuCode: '102',
        menuName: '线索管理',
        moduleCode: 1,
        permissionCode: 'clew:get',
        permissionName: '单个线索查询',
        requiredPermission: 2
      },
      {
        id: 6,
        menuCode: '105',
        menuName: '线索管理',
        moduleCode: 1,
        permissionCode: 'clew:dek',
        permissionName: '线索列表，增删查',
        requiredPermission: 2
      },
      {
        id: 7,
        menuCode: '106',
        menuName: '线索管理',
        moduleCode: 1,
        permissionCode: 'clew:addFollow',
        permissionName: '跟进记录列表',
        requiredPermission: 2
      },
      {
        id: 10,
        menuCode: '109',
        menuName: '线索管理',
        moduleCode: 1,
        permissionCode: 'clew:listAffiliation',
        permissionName: '查询线索的经理归属记录',
        requiredPermission: 2
      }
    ],
    menuCode: '1',
    name: '线索管理'
  },
  {
    children: [
      {
        id: 14,
        menuCode: '201',
        menuName: '客户中心',
        moduleCode: 2,
        permissionCode: 'client:add',
        permissionName: '公司：增改',
        requiredPermission: 2
      },
      {
        id: 15,
        menuCode: '202',
        menuName: '客户中心',
        moduleCode: 2,
        permissionCode: 'client:get',
        permissionName: '公司详情TAB',
        requiredPermission: 2
      },
      {
        id: 20,
        menuCode: '207',
        menuName: '客户中心',
        moduleCode: 2,
        permissionCode: 'client:getFollow',
        permissionName: '跟进记录TAB',
        requiredPermission: 2
      },
      {
        id: 47,
        menuCode: '214',
        menuName: '客户中心',
        moduleCode: 2,
        permissionCode: 'client:list',
        permissionName: '公司列表',
        requiredPermission: 2
      },
      {
        id: 48,
        menuCode: '215',
        menuName: '客户中心',
        moduleCode: 2,
        permissionCode: 'client:listAffiliation',
        permissionName: '公司的经理归属记录',
        requiredPermission: 2
      },
      {
        id: 72,
        menuCode: '231',
        menuName: '客户中心',
        moduleCode: 2,
        permissionCode: 'emailParse:get',
        permissionName: '邮件信息TAB',
        requiredPermission: 2
      }
    ],
    menuCode: '2',
    name: '客户中心'
  },
  {
    children: [
      {
        id: 55,
        menuCode: '500',
        menuName: '产品定价',
        moduleCode: 3,
        permissionCode: 'price:page',
        permissionName: '查看',
        requiredPermission: 2
      },
      {
        id: 58,
        menuCode: '503',
        menuName: '产品定价',
        moduleCode: 3,
        permissionCode: 'price:priceUpdate',
        permissionName: '增删改',
        requiredPermission: 2
      }
    ],
    menuCode: '3',
    name: '产品定价'
  },
  {
    children: [
      {
        id: 50,
        menuCode: '620',
        menuName: '服务数据统计',
        moduleCode: 4,
        permissionCode: 'data:list',
        permissionName: '服务数据统计',
        requiredPermission: 2
      }
    ],
    menuCode: '4',
    name: '服务数据统计'
  },
  {
    children: [
      {
        id: 40,
        menuCode: '602',
        menuName: '合同管理',
        moduleCode: 5,
        permissionCode: 'contract:createOrUpdate',
        permissionName: '增删改',
        requiredPermission: 2
      },
      {
        id: 43,
        menuCode: '605',
        menuName: '合同管理',
        moduleCode: 5,
        permissionCode: 'contract:list',
        permissionName: '查看',
        requiredPermission: 2
      }
    ],
    menuCode: '5',
    name: '合同管理'
  },
  {
    children: [
      {
        id: 77,
        menuCode: '1001',
        menuName: '内容管理',
        moduleCode: 6,
        permissionCode: 'dl:page',
        permissionName: '应用下载',
        requiredPermission: 2
      },
      {
        id: 59,
        menuCode: '400',
        menuName: '内容管理',
        moduleCode: 6,
        permissionCode: 'question:page',
        permissionName: '帮助中心',
        requiredPermission: 2
      },
      {
        id: 64,
        menuCode: '430',
        menuName: '内容管理',
        moduleCode: 6,
        permissionCode: 'rich:get',
        permissionName: '功能相关全部',
        requiredPermission: 2
      },
      {
        id: 83,
        menuCode: '431',
        menuName: '内容管理',
        moduleCode: 6,
        permissionCode: 'rich:login',
        permissionName: '登录相关',
        requiredPermission: 2
      }
    ],
    menuCode: '6',
    name: '内容管理'
  },
  {
    children: [
      {
        id: 67,
        menuCode: '950',
        menuName: '操作日志',
        moduleCode: 7,
        permissionCode: 'operation:search',
        permissionName: '操作日志',
        requiredPermission: 2
      }
    ],
    menuCode: '7',
    name: '操作日志'
  },
  {
    children: [
      {
        id: 84,
        menuCode: '1101',
        menuName: '联系人管理',
        moduleCode: 8,
        permissionCode: 'contact:get',
        permissionName: '联系人列表',
        requiredPermission: 2
      }
    ],
    menuCode: '8',
    name: '联系人管理'
  },
  {
    children: [
      {
        id: 85,
        menuCode: '1201',
        menuName: '系统管理',
        moduleCode: 9,
        permissionCode: 'project:list',
        permissionName: '项目用户管理',
        requiredPermission: 2
      },
      {
        id: 35,
        menuCode: '702',
        menuName: '系统管理',
        moduleCode: 9,
        permissionCode: 'user:list',
        permissionName: '用户管理',
        requiredPermission: 2
      },
      {
        id: 29,
        menuCode: '801',
        menuName: '系统管理',
        moduleCode: 9,
        permissionCode: 'role:list',
        permissionName: '角色管理',
        requiredPermission: 2
      }
    ],
    menuCode: '9',
    name: '系统管理'
  }
];

const resfn = () => {
  let str = '';
  arr.forEach(({ children, name, menuCode }) => {
    str += `${name}:${menuCode}\n`;
    children.forEach((child) => {
      str += `${child.permissionName}:${child.menuCode}\n`;
    });
  });
  console.log(str);
};

resfn();
