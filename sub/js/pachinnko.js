var run_btn = document.getElementById('run_button');

run_btn.onclick = runPachinnko;

function runPachinnko()
{
  var height = parseInt(document.getElementById('height').value, 10);
  var real_height = height + 1;
  var ball_number = parseInt(document.getElementById('ball_number').value, 10);
  var left_rate = parseFloat(document.getElementById('left_rate').value);
  var margin_x = 20;
  var margin_y = 50;
  var circle_radius = 3;

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');


  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw circles
  var gap_x = (canvas.width - 2 * margin_x) / height;
  var gap_y = (canvas.height - 2 * margin_y) / height;
  for(var i = 0; i < real_height; ++i)
  {
    for(var j = 0; j < real_height - i; ++j)
    {
      var centerX = margin_x + i * gap_x / 2 + j * gap_x;
      var centerY = canvas.height - margin_y - i * gap_y;
      context.beginPath();
      context.arc(centerX, centerY, circle_radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'rgba(0, 0, 100, 0.5)';
      context.fill();
    }
  }

  var result_array = Array(real_height).fill(0);

  // draw balls' path
  for(var i = 0; i < ball_number; ++i)
  {
    context.beginPath();
    var _x = canvas.width/2;
    var _y = 0;
    context.moveTo(_x, _y);
    _y = _y + margin_y;
    context.lineTo(_x, _y);
    for(var j = 0; j < height; ++j)
    {
      _x = _x - gap_x * getRandomLeft(left_rate) / 2;
      _y = _y + gap_y;
      context.lineTo(_x, _y);
    }
    context.lineWidth = 7;
    context.strokeStyle = 'rgba(100, 100, 100, 0.2)';
    context.stroke();
    var _index = Math.round((_x - margin_x)/gap_x);
    result_array[_index]++;
  }

  for(var i = 0; i< real_height; ++i)
  {
    var _font_size = 300/real_height;
    context.font = _font_size + "px Arial";
    context.fillText(result_array[i], margin_x + gap_x * i, canvas.height - margin_y/2);
  }

  // print output in the result table in HTML
  var result_table = document.getElementById('result_table');
  var row = result_table.insertRow(-1);
  for(var i = 0; i < real_height;++i)
  {
    var cell = row.insertCell(-1);
    cell.innerHTML = i+1;
    cell.className += "result_class";
  }
  row = result_table.insertRow(-1);
  for(var i = 0; i < real_height;++i)
  {
    var cell = row.insertCell(-1);
    cell.innerHTML = result_array[i];
    cell.className += "result_class";
  }
}

function getRandomLeft(_leftRate){
  if(Math.random() < _leftRate)
  {
    return 1;
  }
  else{
    return -1;
  }
}
