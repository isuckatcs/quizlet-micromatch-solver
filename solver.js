{
    let getTerms = function () {
        let def = [],
            word = [],
            terms = Quizlet.matchModeData.terms;

        for (let i = 0; i < terms.length; i++) {
            def[i] = terms[i].word;
            word[i] = terms[i].definition;
        }

        return {
            def: def,
            word: word,
        };
    };

    let getObjects = function () {
        let text = [],
            elem = document.querySelectorAll('.MatchModeQuestionGridTile');

        for (let i = 0; i < 12; i++) {
            text[i] = elem[i].innerText;
        }

        return {
            text,
            elem,
        };
    };

    let findPair = function (current, terms) {
        for (let i = 0; i < terms.def.length; i++) {
            if (current === terms.def[i]) return terms.word[i];
            else if (current === terms.word[i]) return terms.def[i];
        }
    };

    let bot = function (botTerms, botObjects) {
        let event = new PointerEvent('pointerdown'),
            clicked = [],
            x = 0;

        while (x < botObjects.text.length) {
            if (clicked.indexOf(x) === -1) {
                botObjects.elem[x].dispatchEvent(event);

                let index = botObjects.text.indexOf(
                    findPair(botObjects.text[x], botTerms)
                );
                clicked.push(index);

                botObjects.elem[index].dispatchEvent(event);
            }
            x++;
        }
    };

    let init = function () {
        let delay = parseInt(
            prompt(
                'What time (in milliseconds) do you want to achieve? (1s = 1000ms)',
                5400
            )
        );
        delay += 40;

        document
            .querySelector('.UIButton--hero')
            .addEventListener('click', function () {
                setTimeout(function () {
                    bot(getTerms(), getObjects());
                }, delay);
            });

        document.querySelector('.UIButton--hero').click();
    };

    init();
}
