const numDivs = 36;
const maxHits = 10;

let hits = 1;
let firstHitTime = 0;
let miss = 0;

function round() {
  // + FIXME: надо бы убрать "target" прежде чем искать новый
  
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits);
 
  // + TODO: помечать target текущим номером
  if (hits === 1) {
    firstHitTime = getTimestamp();
    console.log(firstHitTime);
  }
  // + FIXME: тут надо определять при первом клике firstHitTime

}

function endGame() {
  // + FIXME: спрятать игровое поле сначала
  $(".game").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#missing").text(miss);
  
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // + FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    $(".game-field").removeClass("miss");
    $(event.target).removeClass("target").text("");
    hits = hits + 1;
    if (hits < 11) {
      round();  
    } else {
      

      endGame();
    }
    
  } else {
    $(".game-field").not(".target").addClass("miss");
    miss += 1;
  }
  // + TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // + TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    // location.reload();
    hits = 1;
    $(".game-field").removeClass("miss");
    $(".game").show();
    $('.game-field').removeClass("target").text("");
    
    round();
  });
  console.log("СКРИПТ ПРОГРУЗИЛСЯ");
}

$(document).ready(function() {
  $('.btn-dark').click(function(){
    $(".start").hide();
    init();
    hits = 1;
  })
});
