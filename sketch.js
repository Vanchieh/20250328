let seaweeds = []; // 儲存水草屬性的陣列
let colors = ['#7bdff2', '#b2f7ef', '#eff7f6', '#f7d6e0', '#f2b5d4']; // 水草顏色組合
let iframe; // 用於儲存 iframe 元素

function setup() {  
  // 創建 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('border', 'none');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('left', '0'); // 將 iframe 水平置中
  iframe.style('top', '0'); // 將 iframe 垂直置中
  iframe.style('z-index', '-1'); // 將 iframe 放在畫布的後面
  document.body.appendChild(iframe.elt); // 確保 iframe 被附加到 DOM 中

  // 創建畫布
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('z-index', '1'); // 將畫布放在 iframe 的上面
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件，確保 iframe 可操作

  initializeSeaweeds(); // 初始化水草屬性
}

function draw() {
  background(220);
  clear(); // 清除畫布
  blendMode(BLEND); // 啟用顏色混合模式

  for (let seaweed of seaweeds) {
    strokeWeight(seaweed.thickness); // 設定水草的粗細
    let seaweedColor = color(seaweed.color); // 取得水草顏色
    seaweedColor.setAlpha(150); // 設定透明度 (0-255)
    stroke(seaweedColor); // 設定水草的顏色
    noFill();

    beginShape();
    for (let y = 0; y > -seaweed.height; y -= 10) { // 從底部往上畫
      let sway = sin(seaweed.angle + y * 0.1 + frameCount * 0.01) * 20; // 減小整體搖晃幅度
      let swayFactor = map(y, 0, -seaweed.height, 0, 0.3); // 減小枝節的搖晃比例，從 0 到 0.3
      let x = seaweed.x + sway * swayFactor; // 搖動幅度隨高度變化
      vertex(x, height + y);
    }
    endShape();

    seaweed.angle += seaweed.swaySpeed * 0.5; // 更新角度，降低搖動速度
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 調整畫布大小
  initializeSeaweeds(); // 重新初始化水草屬性

  // 調整 iframe 的大小和位置
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('left', '10%');
  iframe.style('top', '10%');
}

function initializeSeaweeds() {
  seaweeds = []; // 清空水草陣列
  for (let i = 0; i < 100; i++) {
    seaweeds.push({
      x: random(width), // 水草的 x 座標
      height: random(150, 250), // 水草的高度
      thickness: random(15, 25), // 水草的粗細
      swaySpeed: random(0.05, 0.1), // 搖晃的頻率
      color: random(colors), // 隨機選擇顏色
      angle: random(TWO_PI) // 初始角度
    });
  }
}
