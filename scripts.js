var app = new Vue({
  el: '#app',
  data: {
    ledColors: [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]],
    activeLed: 0,
    activeColorIndex: 0,
    delay:     25,
    loopNumber: 1,
    timerId: null,
  },
  computed: {
    led1CssColor: function() {
      return `rgb(${this.ledColors[0][0]},${this.ledColors[0][1]},${this.ledColors[0][2]})`;
    },
    led2CssColor: function() {
      return `rgb(${this.ledColors[1][0]},${this.ledColors[1][1]},${this.ledColors[1][2]})`;
    },
    led3CssColor: function() {
      return `rgb(${this.ledColors[2][0]},${this.ledColors[2][1]},${this.ledColors[2][2]})`;
    },
    led4CssColor: function() {
      return `rgb(${this.ledColors[3][0]},${this.ledColors[3][1]},${this.ledColors[3][2]})`;
    },
    led5CssColor: function() {
      return `rgb(${this.ledColors[4][0]},${this.ledColors[4][1]},${this.ledColors[4][2]})`;
    },
  },
  methods: {
    startTimer: function () {
      this.timerId = setInterval(() => {
        let red   = this.ledColors[this.activeLed][0];
        let green = this.ledColors[this.activeLed][1];
        let blue  = this.ledColors[this.activeLed][2];
        let activeColor = this.ledColors[this.activeLed][this.activeColorIndex];
        let prevColor   = !!this.activeColorIndex ? this.ledColors[this.activeLed][this.activeColorIndex - 1] : null;
        let newColors = [...this.ledColors]

        activeColor += 4.25;
        if(prevColor !== null) prevColor -= 4.25

        let newColor = [red, green, blue]
        newColor[this.activeColorIndex] = activeColor
        if(prevColor !== null && this.loopNumber < 5) {
          newColor[this.activeColorIndex - 1] = prevColor
        }
        newColors[this.activeLed] = newColor

        this.ledColors = newColors
        if(activeColor >= 255) this.activeLed = this.activeLed + 1
        if(this.activeLed > 4) {
          this.loopNumber++;
          this.activeLed = 0;
          this.activeColorIndex = this.activeColorIndex == 2 ? 0 : this.activeColorIndex + 1;
        }
        if(this.loopNumber == 6) {
          clearInterval(this.timerId)
          this.startBlinkMode()
          console.log(this.ledColors)
        }
      }, this.delay)
    },
    startBlinkMode: function () {
      setInterval(() => {
        let newColors = [...this.ledColors].map(
          (led) => led[0] > 0 ? [0,0,0] : [255,255,255]
        )
        console.log(newColors)
        this.ledColors = newColors;

      }, 500)
    }
  },
  mounted: function () {
    this.startTimer()
  }
})
