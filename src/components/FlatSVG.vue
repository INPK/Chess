<template>
  <svg width="1200" height="1000" class="floor-schema" @click="updatePoints">
    <polygon :points="points.total"></polygon>
    <template v-for="circle in circlePoints">
      <circle :cx="circle.x" :cy="circle.y" r="5" :key="circle.x + circle.y"></circle>
    </template>
  </svg>
</template>

<script>
export default {
  name: 'FlatSVG',
  data () {
    return {
      points: {
        total: '',
        startX: '',
        startY: ''
      },
      circlePoints: []
    }
  },
  methods: {
    updatePoints (event) {
      console.info(123)
      let clientX = event.clientX
      let clientY = event.clientY

      const differentStartClientX = Math.abs(this.points.startX - clientX)
      const differentStartClientY = Math.abs(this.points.startY - clientY)
      if (!this.points.startX && !this.points.startY) {
        this.setStartPoints(clientX, clientY)
      } else if (differentStartClientX <= 10 && differentStartClientY <= 10) {
        clientX = this.points.startX
        clientY = this.points.startY
        this.clearAllPoints()
      }
      this.points.total += ' ' + clientX + ',' + clientY
      this.setPoint(clientX, clientY)
    },
    setStartPoints (x, y) {
      if (!this.points.startX && !this.points.startY) {
        this.points.startX = x
        this.points.startY = y
        this.points.total = ''
      }
    },
    clearAllPoints () {
      if (this.points.startX) {
        this.points.startX = ''
        this.points.startY = ''
      }
    },
    setPoint (x, y) {
      this.circlePoints.push({ x: x, 'y': y })
    }
  }
}
</script>

<style scoped>
  circle {
    fill: #3fbdb0;
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
