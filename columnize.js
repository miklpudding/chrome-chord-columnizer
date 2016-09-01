var ContentSelectors = {
  'ja.chordwiki.org': ".main",
  'chordsketch.com': ".song_body",
  'gakufu.gakki.me': "#code_area",
  'www.ufret.jp': "#blyodnijb"
};

/**
 *
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
 * 広告表示の切り替え
 */
function showAds(display)
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
      MozColumnCount = columnCount = (count == '1') ? '' : count; // column count 1 for reset
      MozColumnGap = columnGap = '10px';
    }
  }
}
