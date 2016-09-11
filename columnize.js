var ContentSelectors = {
  'ja.chordwiki.org': ".main",
  'chordsketch.com': ".song_body",
  'gakufu.gakki.me': "#code_area",
  'www.ufret.jp': "#blyodnijb"
};

/**
 * 要素を最上位に移動
 */
function moveToTop_(body, el) {
  // move to top
  body.insertBefore(
    el.parentNode.removeChild(el),
    body.firstElementChild
  );
  // remove rest nodes
  while (body.lastElementChild != body.firstElementChild) {
    body.removeChild(body.lastElementChild);
  }
}


/**
 * 余分な要素を排除
 */
function trimAds()
{
  var content = getContent(location.hostname);
  if (content) {
    moveToTop_(document.body, content);
  }
}

/**
 * 余白を切り詰める
 */
function trimSpaces()
{
　 var selectors = ["html", "body", ContentSelectors[location.hostname]];

  selectors.forEach(function(selector){
    if (selector) {
      with (document.querySelector(selector).style) {
        margin = "0px";
        padding = "10px";
        textAlign = 'left';
      }
    }
  });
}


/**
 * サイトに応じた要素の所得
 */
function getContent(hostname)
{
  return document.querySelector(ContentSelectors[hostname]);
}

/**
 * コードと歌詞が別れないように、折り返し位置を抑制
 *
 * - chordwiki/ufret では、ポジションが マイナス値なので、コードが前の行に重なっていた。
 *   line-heightで行間を開けてたところを、padding-topで行の高さを確保するように変更。
 * - chordsketch は対策必要なし。
 * - gakkime では、コードと歌詞が別の行なので、共通の親要素を持つように纏める。
 */
function breakInside()
{
  // fallback for FF NodeList.forEach
  var _forEach = function(xs, f) {
    if (xs.forEach)
      xs.forEach(f)
    else
      [].forEach.call(xs, f)
  };
  var bgColor = "#eeeeff";

  switch (location.hostname) {
  case "ja.chordwiki.org":
    document.querySelector("div.main").style.lineHeight = "";
    _forEach(document.querySelectorAll("div.main p"), function(e){
      with (e.style) {
        backgroundColor = bgColor;
        breakInside = 'avoid-column';
        paddingTop = '1em';
        margin = "0px";
      }
    });
    break;
  case "www.ufret.jp":
    _forEach(document.querySelectorAll("div#blyodnijb p.atfolhyds"), function(e){
      with (e.style) {
        backgroundColor = bgColor;
        breakInside = 'avoid-column';
        paddingTop = '20px';
        margin = "0px";
      }
    });
    break;
  case "chordsketch.com":
    /* no need */
    break;
  case "gakufu.gakki.me":
    document.querySelector("#divStayTopLeft").style.display = 'none';

    var x = getContent(location.hostname);
    if (x.paired) // ２回以上実行してしまわないようにするフラグ
      return;
    x.setAttribute('paired', true);

    var xs = x.querySelectorAll("p, br");
    var xs_length = xs.length;
    var children = []
    for (var i=0; i<xs_length; i+=2) {
      var div = document.createElement("div");
      with (div.style) {
        backgroundColor = bgColor;
        breakInside = 'avoid-column';
        padding = "2px";
      }
      div.appendChild(xs[i]);
      div.appendChild(xs[i+1]);
      children.push(div)
    }

    while (x.firstChild) {
      x.removeChild(x.firstChild);
    }
    children.forEach(function(e){
      x.appendChild(e);
    });
    break;
  }
}


/**
 * 段組み設定
 */
function columnize(count)
{
  var content = getContent(location.hostname);

  // スタイル・プロパティの適応
  if (content) {
    ["html", "body"].forEach(function(selector){
      with (document.querySelector(selector).style) {
        height = '100%';
      }
    });

    with (content.style) {
      width = '100%';
      height = '100%';
      webkitColumnCount = MozColumnCount = columnCount = (count == '1') ? '' : count; // column count 1 for reset
      webkitColumnGap = MozColumnGap = columnGap = '10px';
    }

    trimAds();
    trimSpaces();
    breakInside();
  }
}
