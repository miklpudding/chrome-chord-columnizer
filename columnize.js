
/**
 * 広告表示の切り替え
 */
function showAds(display)
{
  var ads = null;

  // サイトに応じた要素の所得
  switch (location.hostname) {
  case 'ja.chordwiki.org':
    ads = ["#side", "#header", ".footer", "#key", "#bottomadarea", "#zenback-widget-loader"];
    break;
  case 'chordsketch.com':
    // TODO: ads のリストアップ
    break;
  case 'gakufu.gakki.me':
    // TODO: ads のリストアップ
    break;
  case 'www.ufret.jp':
    // TODO: ads のリストアップ
    break;
  default:
    break;
  }

  if (ads) {
    ads.map(function(selector){
      var el = document.querySelector(selector);
      if (el) {
        el.style.display = display;
      }
    });
  }
}

/**
 * 余白を切り詰める
 */
function trimSpaces()
{
　 var selectors = ["html", "body"];

  // サイトに応じた要素の所得
  switch (location.hostname) {
  case 'ja.chordwiki.org':
    selectors.push(".main");
    break;
  case 'chordsketch.com':
    selectors.push(".song_body");
    break;
  case 'gakufu.gakki.me':
    selectors.push("#code_area");
    break;
  case 'www.ufret.jp':
    selectors.push("#blyodnijb");
    break;
  default:
  }

  selectors.forEach(function(selector){
    with (document.querySelector(selector).style) {
      margin = "0px";
      padding = "10px";
    }
  });
}

/**
 * 段組み設定
 */
function columnize(count)
{
  var content = null;

  // サイトに応じた要素の所得
  switch (location.hostname) {
  case 'ja.chordwiki.org':
    content = document.querySelector(".main");
    break;
  case 'chordsketch.com':
    content = document.querySelector(".song_body");
    break;
  case 'gakufu.gakki.me':
    content = document.querySelector("#code_area");
    break;
  case 'www.ufret.jp':
    content = document.querySelector("#blyodnijb");
    break;
  default:
  }

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
      columns = (count == '1') ? '' : count; // column count 1 for reset
      columnGap = '10px';
      // breakInside = 'avoid-column';
    }
  }
}
