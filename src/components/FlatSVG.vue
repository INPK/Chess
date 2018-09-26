<template>
  <svg width="1200" height="1000" class="floor-schema" @click="updatePoints">
    <polygon :points="totalPoints" @contextmenu="removeMarkup"></polygon>
    <template v-for="(circle, i) in points">
      <circle
        :cx="circle.x"
        :cy="circle.y"
        r="6"
        :key="circle.x + '' + i"
        @contextmenu="rightClick"
        @mouseup="handleMouseUp"
        @mousedown="handleMouseDown"
      ></circle>
    </template>
  </svg>
</template>

<script>
export default {
  name: 'FlatSVG',
  data () {
    return {
      selectedPointIndex: '',
      points: []
    }
  },
  methods: {
    updatePoints (event) {
      this.setPoint(event.clientX, event.clientY)
    },
    checkSamePosition (nativeX, nativeY, clientX, clientY) {
      const differentStartClientX = Math.abs(nativeX - clientX)
      const differentStartClientY = Math.abs(nativeY - clientY)
      return (differentStartClientX <= 10 && differentStartClientY <= 10)
    },
    setPoint (x, y) {
      this.points.push({ x: x, y: y })
    },
    rightClick (event) {
      event.preventDefault()
      let clientX = event.clientX
      let clientY = event.clientY
      for (let i in this.points) {
        let item = this.points[i]
        let isSamePosition = this.checkSamePosition(item.x, item.y, clientX, clientY)
        if (isSamePosition) {
          this.points.splice(i, 1)
        }
      }
    },
    removeMarkup (event) {
      event.preventDefault()
      this.points = []
    },
    handleMouseDown (event) {
      if (event.button === 0) {
        this.selectedPointIndex = this.points.findIndex((item) => {
          let isSamePosition = this.checkSamePosition(item.x, item.y, event.clientX, event.clientY)
          return isSamePosition
        })
        document.addEventListener('mousemove', this.handleMouseMove)
      }
    },
    handleMouseUp (event) {
      if (event.button === 0) {
        document.removeEventListener('mousemove', this.handleMouseMove)
        this.selectedPointIndex = ''
      }
    },
    handleMouseMove (event) {
      let i = this.selectedPointIndex
      this.points[i].x = event.clientX
      this.points[i].y = event.clientY
    }
  },
  computed: {
    totalPoints: function () {
      let total = ''
      this.points.map(function (item) {
        total += ' ' + item.x + ',' + item.y
      })
      return total
    }
  }
}
</script>

<style scoped>
  circle {
    fill: #36a295;
    stroke: #3fbdb0;
    stroke-width: 2px;
  }

  polygon {
    fill: #42b983;
    opacity: .75;
    stroke: #545a6f;
  }

  .floor-schema {
    background-image: url("/static/img/plan.svg");
  }
</style>
