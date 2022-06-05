{
    let htmlManip = () => {
        let defaultTime = 5.4;

        let html =
            '<h3 class="UIHeading--three" style="text-align: center; margin: 35px 0 15px 0; width: 90%; position: relative; left: 50%; transform: translateX(-50%);">What time do you wish to achieve?</h3><p style="text-align: center; margin: 0 0 35px 0; width: 90%; position: relative; left: 50%; transform: translateX(-50%);">Note that Quizlet can\'t store a time lower than 0.5s</p><input type="text" id="time" name="time" value="%default%" style="color: #455358; -webkit-appearance: none;-moz-appearance: none; appearance: none; border: solid #3ccfcf;border-radius: .25rem;display: inline-block;font: inherit;max-width: 100%;padding: .75rem 1.5rem; font-weight: 600; font-size: .875rem; line-height: 1.285714285714286; transition: all .12s cubic-bezier(.47,0,.745,.715); width: 80px; height:50px; position:relative; left:50%;transform:translateX(-50%); text-align:center; padding:0px; margin: 0 0 0 0"></input>';

        html = html.replace('%default%', defaultTime);

        document
            .querySelector('.UIModalBody')
            .insertAdjacentHTML('beforeend', html);

        document
            .getElementById('time')
            .addEventListener('click', e => (e.target.value = ''));
    };

    let getTerms = () => {
        let def = [],
            word = [],
            terms = Quizlet.matchModeData.terms;

        terms.forEach((el, index) => {
            def[index] = el.definition;
            word[index] = el.word;
        });

        return {
            def: def,
            word: word,
        };
    };

    let getObjects = () => {
        let text,
            elem = document.querySelectorAll('.MatchModeQuestionGridTile');

        text = Array.prototype.map.call(elem, x => x.innerText);

        return {
            text,
            elem,
        };
    };

    let findPair = (current, terms) => {
        for (let i = 0; i < terms.def.length; i++) {
            if (current === terms.def[i]) return terms.word[i];
            else if (current === terms.word[i]) return terms.def[i];
        }
    };

    let bot = (botTerms, botObjects, delay, x = 0, clicked = []) => {
        let event = new PointerEvent('pointerdown');

        if (clicked.indexOf(x) === -1) {
            botObjects.elem[x].dispatchEvent(event);

            let index = botObjects.text.indexOf(
                findPair(botObjects.text[x], botTerms)
            );

            if (delay > 0 && clicked.length < 6) {
                setTimeout(() => {
                    botObjects.elem[index].dispatchEvent(event);

                    clicked.push(index);

                    x++;
                    setTimeout(function () {
                        bot(botTerms, botObjects, delay, x, clicked);
                    }, delay / 12);
                }, delay / 12);
            } else {
                botObjects.elem[index].dispatchEvent(event);

                clicked.push(index);

                x++;
                bot(botTerms, botObjects, delay, x, clicked);
            }
        } else if (clicked.length < 6) {
            x++;
            bot(botTerms, botObjects, delay, x, clicked);
        }
    };

    let callBack = time => {
        let delay = parseInt(time * 1000);

        setTimeout(() => bot(getTerms(), getObjects(), delay), delay / 12);
    };

    let init = () => {
        htmlManip();

        let defaultTime = document.getElementById('time').value;

        let time = document
            .getElementById('time')
            .addEventListener(
                'keyup',
                () => (time = document.getElementById('time').value)
            );

        document.getElementById('time').addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                document.querySelector('.UIButton--hero').click();
            }
        });

        const target = document.querySelector('body');

        let config = {
            attributes: true,
        };

        let triggered = false;
        let observer = new MutationObserver(() => {
            if (time >= 0) {
                defaultTime = time;
            }

            if (!triggered) {
                triggered = true;

                callBack(defaultTime);
            }
        }).observe(target, config);
    };

    init();
}
