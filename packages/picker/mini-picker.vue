<template>
  <div class="mini-picker">
    <div class="mini-picker-input" @click.stop="HandleTogglePicker" :style="fontColor">
      <span>{{ initText }}</span>
    </div>
    <div class="mini-picker-bg" v-show="show" @click.stop="hidePicker"></div>
    <div class="mini-picker-con" v-show="show">
      <!-- confirm && cancel button -->
      <div class="mini-picker-btn">
        <span class="mini-picker-cancel" @click.stop="cancel">取消</span>
        <span class="mini-picker-confirm" @click.stop="confirm">确定</span>
      </div>

      <!-- picker list -->
      <div
        class="mini-picker-item"
        @touchstart="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <div class="selectBox"></div>
        <ul :style="animate">
          <li
            v-for="(item,index) in listItem"
            v-html="getText(item)"
            :key="index"
            :style="height"
            :class="{selected:index === currentIndex}"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { isObj } from "../utils/index.js";
export default {
  name: "MiniPicker",
  props: {
    valueKey: {
      type: String,
      default: "name"
    },
    listItem: {
      type: Array,
      default: () => {
        return [];
      }
    },
    duration: {
      type: Number,
      default: 200
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    Color: {
      type: String,
      default: "#333"
    }
  },
  data() {
    return {
      show: false,
      startY: 0,
      step: 0,
      stepY: 0,
      baseY: 0,
      initText: null,
      itemHeight: 76,
      currentIndex: this.defaultIndex
    };
  },
  computed: {
    count() {
      return this.listItem.length;
    },
    fontColor() {
      return {
        color: `${this.Color}`
      };
    },
    animate() {
      return {
        transition: `${this.duration}ms`,
        transform: `translate3d(0, ${this.baseY + this.stepY}px, 0)`
      };
    },
    height() {
      return {
        height: `${this.itemHeight}px`
      };
    }
  },
  methods: {
    onTouchStart(e) {
      this.startY = e.touches[0].clientY;
    },
    onTouchMove(e) {
      this.step = e.touches[0].clientY - this.startY;
      this.step = Math.round(this.step / this.itemHeight) * this.itemHeight;
      this.stepY = this.step;
    },
    onTouchEnd(e) {
      let totalHeight = (this.count - 1) * -this.itemHeight;
      if (this.baseY == (this.baseY += this.stepY)) {
        return false;
      }
      if (this.baseY > 0) {
        this.baseY = 0;
      } else if (this.baseY < totalHeight) {
        this.baseY = totalHeight;
      }
      this.currentIndex = Math.abs(this.baseY / this.itemHeight);
      this.stepY = 0;
    },
    getText(item) {
      return isObj(item) && this.valueKey in item ? item[this.valueKey] : item;
    },
    clearData(){
      this.initText = null;
    },
    HandleTogglePicker() {
      this.show = true;
    },
    hidePicker() {
      this.show = false;
    },
    cancel() {
      this.show = false;
      this.$emit("cancel");
    },
    confirm() {
      this.show = false;
      this.initText = isObj(this.listItem[this.currentIndex])
        ? this.listItem[this.currentIndex][this.valueKey]
        : this.listItem[this.currentIndex];
      this.$emit("confirm", this.currentIndex,this.listItem[this.currentIndex]);
    }
  }
};
</script>
<style lang='scss'>
@import "../theme/layout.scss";
.mini-picker {
  height: 30px;
  line-height: 30px;
  -webkit-text-size-adjust: 100%;
  @include flex;
  overflow: hidden;
  .mini-picker-input {
    padding: 6px;
    box-sizing:border-box;
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
      position: relative;
      text-align: center;
      color: #a8a8a8;
      overflow: hidden;
      padding-top:76px;
      .selectBox {
        position: absolute;
        top:86px;
        left: 50%;
        margin-left: -30px;
        width: 60px;
        height: 56px;
        border-top: 2px solid #1aad19;
        border-bottom: 2px solid #1aad19;
      }
      li {
        @include flex;
        justify-content: center;
        box-sizing: border-box;
        &.selected {
          color: #000;
        }
      }
    }
  }
}
</style>
