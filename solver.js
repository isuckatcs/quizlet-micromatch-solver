document
    .querySelector('.UIButton--hero')
    .addEventListener('click', function () {
        setTimeout(bot, 8);
    });
var currentCards = [],
    current,
    word,
    def,
    k,
    j;
var terms = Quizlet.matchModeData.terms;
var length = terms.length;
var event = new PointerEvent('pointerdown');

function bot() {
    currentCards = document.querySelectorAll('.MatchModeQuestionGridTile');
    currentCards[0].dispatchEvent(event);
    current = currentCards[0].textContent;
    j(k());
    if (currentCards.length > 1) {
        setTimeout(bot, 500);
    }
    function k() {
        for (k = 0; k < length; k++) {
            if (terms[k].definition === current) {
                word = terms[k].word;
                return word;
            } else if (terms[k].word === current) {
                def = terms[k].definition;
                return def;
            }
        }
    }
    function j(val) {
        for (j = 0; j < currentCards.length; j++) {
            if (currentCards[j].textContent === val) {
                currentCards[j].dispatchEvent(event);
                break;
            }
        }
    }
}
