const provinceTreeList = {
  name: "中国",
  children: [
    {
      name: "安徽",
      children: [
        { name: "合肥" },
        {
          name: "马鞍山",
          children: [
            { name: "雨山区" },
            { name: "花山区" },
            {
              name: "博望区",
              children: [
                { name: "博望镇" },
                { name: "丹阳镇" },
                { name: "新市镇" },
              ],
            },
            {
              name: "当涂县",
              children: [
                { name: "湖阳镇" },
                { name: "姑孰镇" },
                { name: "太白镇" },
                { name: "塘南镇" },
                { name: "石桥镇" },
                { name: "年陡镇" },
                { name: "乌溪镇" },
                { name: "江心乡" },
              ],
            },
            { name: "含山县" },
            { name: "和县" },
          ],
        },
        { name: "滁州" },
        { name: "芜湖" },
        { name: "黄山" },
        { name: "蚌埠" },
      ],
    },
    {
      name: "江苏",
      children: [
        {
          name: "南京",
          children: [
            { name: "江宁区" },
            { name: "玄武区" },
            { name: "雨花台区" },
            { name: "浦口区" },
            { name: "溧水区" },
            { name: "建邺区" },
            { name: "高淳区" },
          ],
        },
        { name: "常州" },
        { name: "苏州" },
        { name: "南通" },
      ],
    },
    {
      name: "浙江",
      children: [{ name: "杭州" }, { name: "宁波" }],
    },
    {
      name: "GET 英雄",
      children: [
        {
          name: "GET 秦始皇",
          children: [
            {
              name: 'DELETE 汉武帝'
            },
            {
              name: 'POST 光武帝'
            },
          ]
        },
        {
          name: 'PUT 唐太宗',
          children: [
            {
              name: 'POST 武则天'
            },
            {
              name: 'HEAD 唐高宗'
            }
          ]
        },
        {
          name: "HEAD 名将",
          children: [
            {
              name: 'PUT 廉颇'
            },
            {
              name: 'DELETE 李广'
            },
            {
              name: 'DELETE 白起'
            },
            {
              name: 'POST 王翦'
            },
          ]
        }
      ],
    },
  ],
}

export default provinceTreeList