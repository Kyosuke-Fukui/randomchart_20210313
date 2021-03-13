var p1 = 50; //パラメータの設定
var p2 = 200; //パラメータの設定
var datanum = 2000; //データの個数

//原データ配列（乱数）を作成する関数
var getRawData = function () {
  var dataarr = [100]; //データを格納する配列の初期値
  for (let i = 1; i < datanum; i++) {
    var r = Math.random() * 100;

    dataarr.push(dataarr[i - 1] + (r - 50)); //平均が50になるように設定
  }
  return dataarr;
};

//原データの指数平滑移動平均値を返す関数
function EMACalc(mArray, mRange) {
  var k = 2 / (mRange + 1);
  // first item is just the same as the first item in the input
  emaArray = [mArray[0]];
  // for the rest of the items, they are computed with the previous one
  for (var i = 1; i < mArray.length; i++) {
    emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray;
}

//分析対象のデータ群を設定する関数
var getDataSet = function () {
  var data1 = getRawData();
  var data2 = EMACalc(data1, p1);
  var data3 = EMACalc(data1, p2);

  return [data1, data2, data3];
};

//二配列の差分を格納する配列を返す関数
var a = function (a, b) {
  var b_a = [];
  for (let i = 0; i < datanum; i++) {
    b_a.push(b[i] - a[i]);
  }
};

//静止グラフ作成
async function getGraph_S() {
  var dataArrs = getDataSet();
  // console.log(dataArrs);
  var d1 = dataArrs[0];
  var d2 = dataArrs[1];
  var d3 = dataArrs[2];

  var n1 = "random";
  var n2 = `EMA(${p1})`;
  var n3 = `EMA(${p2})`;

  await Plotly.plot("chart", [
    {
      y: d1,
      name: n1,
      // mode: "lines+markers",
      // marker: { color: "pink", size: 1 },
      line: { width: 1, color: "black" },
    },
    { y: d2, name: n2, line: { width: 1, color: "blue" } },
    { y: d3, name: n3, line: { width: 1, color: "red" } },
  ]);
}

getGraph_S();

$("#button1").on("click", function () {
  location.reload();
});
