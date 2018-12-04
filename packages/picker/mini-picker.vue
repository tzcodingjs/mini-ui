<template>
  <div class="mini-picker">
    <div class="mini-picker-input" @click.stop="HandleTogglePicker">
      <span>{{ initNum }}</span>
    </div>
    <div class="mini-picker-bg" v-show="show" @click.stop="hidePicker"></div>
    <div class="mini-picker-con" v-show="show">
      <!-- 按钮 -->
      <div class="mini-picker-btn">
        <span class="mini-picker-cancel" @click.stop="cancel">取消</span>
        <span class="mini-picker-confirm" @click.stop="confirm">确定</span>
      </div>

      <!-- picker条目 -->
      <div
        class="mini-picker-item"
        @touchstart="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <ul :style="animate">
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
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      }
    },
    duration: {
      type: Number,
      default: 200
    },
    itemHeight:{
      type:Number,
      default:76
    }
  },
  data() {
    return {
      show: false,
      startY: 0,
      stepY: 0,
      baseY: 0,
      selectItem: ""
    };
  },
  mounted(){
    this.baseY = this.itemHeight
  },
  computed: {
    animate() {
      return {
        transition: `${this.duration}ms`,
        transform: `translate3d(0, ${this.baseY + this.stepY}px,0)`
      };
    }
  },
  methods: {
    onTouchStart(e) {
      this.startY = e.touches[0].clientY;
    },
    onTouchMove(e) {
      this.stepY = e.touches[0].clientY - this.startY;
    },
    onTouchEnd(e) {
      if (this.base == (this.baseY += this.stepY)) {
        return false
      }
      this.stepY = 0;
    },
    HandleTogglePicker() {
      this.show = true;
    },
    hidePicker(){
      this.show = false
    },
    cancel() {
      this.show = false;
      this.$emit("cancel");
    },
    confirm() {
      this.show = false;
      this.$emit("confirm", this.selectItem);
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
  -webkit-text-size-adjust: 100%;
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
    z-index: 1991 - 1;
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
    z-index: 1991;
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
      overflow: hidden;
      li {
        @include flex;
        justify-content: center;
        box-sizing: border-box;
        height:76px;
      }
    }
  }
}
</style>
