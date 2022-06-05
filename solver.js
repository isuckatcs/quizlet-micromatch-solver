{
    let htmlManip = function () {
        let html =
            '<h3 class="UIHeading--three" style="text-align: center; margin: 35px 0 15px 0; width: 90%; position: relative; left: 50%; transform: translateX(-50%);">What time do you wish to achieve?</h3><p style="text-align: center; margin: 0 0 35px 0; width: 90%; position: relative; left: 50%; transform: translateX(-50%);">Note that Quizlet can\'t store a time lower than 0.5s</p><input type="text" id="time" name="time" value="--" style="color: #455358; -webkit-appearance: none;-moz-appearance: none; appearance: none; border: solid #3ccfcf;border-radius: .25rem;display: inline-block;font: inherit;max-width: 100%;padding: .75rem 1.5rem; font-weight: 600; font-size: .875rem; line-height: 1.285714285714286; transition: all .12s cubic-bezier(.47,0,.745,.715); width: 80px; height:50px; position:relative; left:50%;transform:translateX(-50%); text-align:center; padding:0px;"></input>';
        document
            .querySelector('.UIModalBody')
            .insertAdjacentHTML('beforeend', html);
        document.getElementById('time').addEventListener('click', function (e) {
            e.target.value = '';
        });
    };

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

    let callBack = function () {
        let time = document.getElementById('time').value;

        if (time !== '--' && time !== '') {
            let delay = parseInt(time * 1000);
            delay += 40;

            setTimeout(function () {
                bot(getTerms(), getObjects());
            }, delay);
        }
    };

    let init = function () {
        htmlManip();

        document
            .querySelector('.UIButton--hero')
            .addEventListener('click', callBack);

        document
            .getElementById('time')
            .addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    document.querySelector('.UIButton--hero').click();
                }
            });
    };

    init();
}
