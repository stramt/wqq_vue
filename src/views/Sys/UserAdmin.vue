<template>
  <a-table :columns="columns" :data-source="data">
    <!-- <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span> -->
    <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="
          tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
        "
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a>Invite 一 {{ record.name }}</a>
      <a-divider type="vertical" />
      <a>Delete</a>
      <a-divider type="vertical" />
      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    dataIndex: "序号",
    key: "id",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "id" },
  },
  {
    title: "账号",
    dataIndex: "account",
    key: "account",
  },
  {
    title: "姓名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "创建时间",
    key: "createTime",
    scopedSlots: { customRender: "createTime" },
  },
];

const data = [];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>
