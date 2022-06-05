var de = [],
    hu = [],
    terms = Quizlet.matchModeData.terms,
    event = new PointerEvent('pointerdown');

for (var i = 0; i < terms.length; i++) {
    de[i] = terms[i].word;
    hu[i] = terms[i].definition;
}

document
    .querySelector('.UIButton--hero')
    .addEventListener('click', function () {
        setTimeout(function () {
            var currentCards = getItems().currentList,
                currentElements = getItems().elements,
                clicked = [],
                x = 0;

            var bot = function () {
                if (clicked.indexOf(x) === -1) {
                    currentElements[x].dispatchEvent(event);

                    var pair = findPair(currentElements[x].innerText);

                    var index = currentCards.indexOf(pair);

                    currentElements[index].dispatchEvent(event);

                    clicked.push(index);
                }

                x++;
                bot();
            };

            bot();
        }, delay);
    });

var delay = parseInt(
    prompt(
        'What time (in milliseconds) do you want to achieve? (1s = 1000ms)',
        5400
    )
);

delay += 40;

document.querySelector('.UIButton--hero').click();

var getItems = function () {
    var elements,
        currentList = [];

    elements = document.querySelectorAll('.MatchModeQuestionGridTile');

    for (var i = 0; i < elements.length; i++) {
        currentList[i] = elements[i].innerText;
    }

    return {
        currentList,
        elements,
    };
};

var findPair = function (current) {
    for (var i = 0; i < terms.length; i++) {
        if (current === de[i]) return hu[i];
        else if (current === hu[i]) return de[i];
    }
};
