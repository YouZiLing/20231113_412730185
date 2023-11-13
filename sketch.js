var sound1;

function preload() {
  sound1 = loadSound("47538_feveran_strong_rock.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(sound1);
}

var w = 100; // 大圓的寬
var s_w = 50; // 小圓的寬
var fc, fc1;
var color1, color2;

function draw() {
  // 背景色彩根據音樂振幅動態變化
  background("#e9edc9");
  rectMode(CENTER);
  noFill();

  if (sound1.isPlaying()) {
    background("#f7ede2");
    fc = map(analyzer.getLevel(), 0, 1, 0, 100);
    fc1 = map(analyzer.getLevel(), 0, 1, 0, 200);
  } else {
    background("#e9edc9"); //不播放音樂時變更背景
    fc = map(mouseX, 0, width, 0, 100);
    fc1 = map(mouseY, 0, width, 0, 200);
  }

  // 圓形變化
  for (var y = 50; y <= height + w / 2; y = y + w) {
    for (var x = 50; x <= width + w / 2; x = x + w) {
      stroke("#a9def9"); //圖形邊框顏色
      strokeWeight(5); //圖形邊框粗細
      ellipse(x, y, w + fc); //畫大園

      stroke("#ffafcc");
      strokeWeight(3);
      rect(x, y, w + fc); //畫方框

      stroke("#4a5759");
      strokeWeight(3);
      ellipse(x + 50, y + 50, s_w + fc); //畫小園

      stroke("#8d99ae");
      strokeWeight(3);
      triangle(x - w / 2+20 + fc , y + w / 2-30, x + w / 2-20, y + w / 2-30, x, y - w / 2+20 + fc); //畫朝上正三角形

      //第1點的x+隨滑鼠變動,y(左下點),第2點的x,y(右下點),第3點的x,y+隨滑鼠變動(上點)

      stroke("#e7c6ff");
      strokeWeight(3);
      triangle(x + w / 2-20, y - w / 2+30 + fc, x - w / 2+20, y - w / 2+30 + fc, x, y + w / 2-20+ fc); //畫朝下正三角形

        //第1點的x,y+隨滑鼠變動,第2點的x,y隨滑鼠變動+,第3點的x,y+隨滑鼠變動

    }
  }

  // 文字大小隨音樂頻率變化
  textSize(fc + map(analyzer.getLevel(), 0, 1, 0, 50));
  stroke("#ff85a1");
  strokeWeight(3);
  text("412730185游子伶", width / 2-200, height / 2-100);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(sound1);
  color1 = color("#e9edc9");
  color2 = color("#ff85a1");
}

// 按下滑鼠播放音樂
function mousePressed() {
  if (sound1.isPlaying()) {
    sound1.stop();
  } else {
    sound1.play();
  }
}
