var app = new Vue({
  el: '#app',
  data: {
    ledColors: [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]],
    led1Colors: [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]],
    activeLed: 0,
    activeLed1: 0,
    activeColorIndex1: 0,
    activeColorIndex: 0,
    loopNumber: 1,
    loopNumber1: 1,
    delay:     1000,
    timerId: null,
    timerId1: null,
    blinkTimerId: null,
    blinkTimerId1: null,
    minutesDelimeter: 1
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
    led11CssColor: function() {
      return `rgb(${this.led1Colors[0][0]},${this.led1Colors[0][1]},${this.led1Colors[0][2]})`;
    },
    led12CssColor: function() {
      return `rgb(${this.led1Colors[1][0]},${this.led1Colors[1][1]},${this.led1Colors[1][2]})`;
    },
    led13CssColor: function() {
      return `rgb(${this.led1Colors[2][0]},${this.led1Colors[2][1]},${this.led1Colors[2][2]})`;
    },
    led14CssColor: function() {
      return `rgb(${this.led1Colors[3][0]},${this.led1Colors[3][1]},${this.led1Colors[3][2]})`;
    },
    led15CssColor: function() {
      return `rgb(${this.led1Colors[4][0]},${this.led1Colors[4][1]},${this.led1Colors[4][2]})`;
    },
  },
  methods: {
    restartTimers: function () {
      clearInterval(this.timerId);
      clearInterval(this.timerId1);
      clearInterval(this.blinkTimerId);
      clearInterval(this.blinkTimerId1);
      this.ledColors = [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]],
      this.led1Colors = [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]],
      this.activeLed = 0,
      this.activeLed1 = 0,
      this.activeColorIndex1 = 0,
      this.activeColorIndex = 0,
      this.loopNumber = 1,
      this.loopNumber1 = 1,
      this.startTimer();
      this.startTimer1();
    },
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
          clearInterval(this.timerId);
          console.log("startBlinkMode");
          this.startBlinkMode();
        }
      }, this.delay/this.minutesDelimeter)
    },
    startTimer1: function () {
      this.timerId1 = setInterval(() => {
        let red   = this.led1Colors[this.activeLed1][0];
        let green = this.led1Colors[this.activeLed1][1];
        let blue  = this.led1Colors[this.activeLed1][2];
        let activeColor = this.led1Colors[this.activeLed1][this.activeColorIndex1];
        let prevColor   = !!this.activeColorIndex1 ? this.led1Colors[this.activeLed1][this.activeColorIndex1 - 1] : null;
        let newColors = [...this.led1Colors]

        activeColor += 4.25;
        if(prevColor !== null) prevColor -= 4.25

        let newColor = [red, green, blue]
        newColor[this.activeColorIndex1] = activeColor
        if(prevColor !== null && this.loopNumber1 < 5) {
          newColor[this.activeColorIndex1 - 1] = prevColor
        }
        newColors[this.activeLed1] = newColor

        this.led1Colors = newColors
        if(activeColor >= 255) {
          this.activeColorIndex1 = this.activeColorIndex1 == 2 ? 0 : this.activeColorIndex1 + 1;
          this.loopNumber1++;
        }
        if(this.loopNumber1 > 5 && this.activeLed1 < 4) {
          this.activeLed1++;
          this.activeColorIndex1 = 0;
          this.loopNumber1 = 1;
        }
        if(this.loopNumber1 > 5 && this.activeLed1 == 4) {
          clearInterval(this.timerId1)
          console.log("startBlinkMode1")
          this.startBlinkMode1()
        }
      }, this.delay/this.minutesDelimeter)
    },
    startBlinkMode: function () {
      this.blinkTimerId = setInterval(() => {
        let newColors = [...this.ledColors].map(
          (led) => led[0] > 0 ? [0,0,0] : [255,255,255]
        )
        this.ledColors = newColors;

      }, 500)
    },
    startBlinkMode1: function () {
      this.blinkTimerId1 = setInterval(() => {
        let newColors = [...this.led1Colors].map(
          (led) => led[0] > 0 ? [0,0,0] : [255,255,255]
        )
        this.led1Colors = newColors;
      }, 500)
    },
  },
  mounted: function () {
    this.startTimer()
    this.startTimer1()
  }
})
