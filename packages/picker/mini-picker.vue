<template>
  <div class="mini-picker">
    <div class="mini-picker-input" @click.stop="HandleTogglePicker">
      <span>{{ initNum }}</span>
    </div>
    <div class="mini-picker-bg" v-show="show"></div>
    <div class="mini-picker-con" v-show="show">
      <!-- 按钮 -->
      <div class="mini-picker-btn">
        <span class="mini-picker-cancel" @click.stop="cancel">取消</span>
        <span class="mini-picker-confirm" @click.stop="confirm">确定</span>
      </div>

      <!-- picker条目 -->
      <div class="mini-picker-item">
        <ul>
          <li v-for="(item,index) in num" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniPicker",
  props: {
    initNum: {
      type: Number,
      default: 1
    },
    num: {
      type: Array,
      default: () => {
        return [1,2,3,4,5,6,7,8,9,10];
      }
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    HandleTogglePicker() {
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    confirm() {
      this.show = false;
    }
  }
};
</script>
<style lang='scss'>
@import "../theme/layout.scss";
.mini-picker {
  width: 80px;
  height: 30px;
  line-height: 30px;
  @include flex;
  overflow: hidden;
  .mini-picker-input {
    padding-left: 6px;
  }
  .mini-picker-bg {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index:1991 - 1;
  }
  .mini-picker-con {
    @include flex;
    flex-wrap: nowrap;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 300px;
    background: #fff;
    overflow: hidden;
    z-index:1991;
    .mini-picker-btn {
      @include flex(row);
      padding: 20px 30px;
      justify-content: space-between;
      .mini-picker-cancel {
        color: #808080;
      }
      .mini-picker-confirm {
        color: #1aad19;
      }
    }
    .mini-picker-item {
      text-align: center;
      color: #808080;
      overflow-x: hidden;
      overflow-y: auto;
      li {
        padding: 20px;
      }
    }
  }
}
</style>
