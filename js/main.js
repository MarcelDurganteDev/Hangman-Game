var randomFruit = '';
showPage('firstPage');
var countErrors = 0;
let startTime;
let endTime;
let scoreTime;
let points;
const startGameBtn = document.getElementById('startGame');
var userName;
var localStorageRanking = localStorage.getItem('playerData');
if (localStorageRanking) {
    var usersRanking = JSON.parse(localStorageRanking);
    usersRanking.forEach(element => {
        const firstTable = document.getElementById('Users');
        firstTable.innerHTML += `<span class="bold" >${element.userName}</span>
                    <div id="scores"><span>${element.ranking}</span><span>seconds</span></div>`;
    });
}

const fruits = [
    'fig',
    'mad',
    'coconut',
    'pineapple',
    'strawberry',
    'pomegranate'
];
var inputUserName = document.getElementById('userNameInput'); 
startGameBtn.addEventListener('click', e => {
    e.preventDefault();
    startGame();
    inputUserName.value = "";
});

function startGame() {
    startTime = Date.now();
    userName = inputUserName.value;
    // instancio variavel aqui pois para confirmar que existe no localStorage tenho que ter ela criada para confirmar, entao por enquanto retorna null
    var localStorageRanking = localStorage.getItem('playerData');

    const data = document.getElementById('currentPlayer');
    data.innerText = userName;
    if (localStorageRanking) {
        usersRanking = JSON.parse(localStorageRanking);
        const verified = usersRanking.find(
            element => element.userName == userName
        );
        if (!verified) {
            usersRanking.push({
                userName: userName,
                ranking: 0
            });
            localStorage.setItem('playerData', JSON.stringify(usersRanking));
        }
    } else {
        usersRanking = [
            {
                userName: userName,
                ranking: 0
            }
        ];

        localStorage.setItem('playerData', JSON.stringify(usersRanking));
    }

    showPage('gamePage');

    const randomIndex = Math.floor(Math.random() * fruits.length);
    randomFruit = fruits[randomIndex];
    var textUnderlines = '';
    for (var i = 1; i <= randomFruit.length; i++) {
        textUnderlines += '_';
    }
    const divUnderlines = document.getElementById('underline');
    divUnderlines.textContent = textUnderlines;
}

function selectChar(chr) {
    const divUnderlines = document.getElementById('underline');
    let textUnderlines = divUnderlines.textContent;
    let foundChar = false;
    for (var i = 0; i < randomFruit.length; i++) {
        if (randomFruit.charAt(i) === chr) {
            textUnderlines = replaceAt(textUnderlines, i, chr);
            console.log(textUnderlines);
            foundChar = true;
            if (!textUnderlines.includes('_')) {   //  WON BREAKPOINT
                endTime = Date.now();
                const points = getPoints(startTime, endTime);

                var localStorageRanking = localStorage.getItem('playerData');
                if (localStorageRanking) {
                    usersRanking = JSON.parse(localStorageRanking);
                    console.log(usersRanking);
                    console.log(userName);

                    usersRanking.forEach(element => {
                        if (element.userName == userName) {
                            element.ranking = points;
                        }
                    });

                    localStorage.setItem(
                        'playerData',
                        JSON.stringify(usersRanking)
                    );
                }

                console.log(points);

                const winner = document.getElementById('winner');
                winner.textContent = userName;

                usersRanking.forEach(element => {
                    const firstTable = document.getElementById('playersRanking');
                    firstTable.innerHTML += `<span class="bold" >${element.userName}</span>
                    <div id="scores"><span>${element.ranking}</span><span>seconds</span></div>`;
                });

                showPage('wonPage');
            }
        }
    }

    const bodyPieces = ['head', 'body', 'armL', 'armR', 'legL', 'legR'];
    if (!foundChar) {
        document
            .getElementById(bodyPieces[countErrors])
            .classList.remove('figure-part');

        if (countErrors === 5) {      //  LOST BREAKPOINT
            endTime = Date.now();
            const loserPlayerName = document.getElementById('loserPlayerName');
            loserPlayerName.textContent = userName;
            setTimeout(function () {
                usersRanking.forEach(element => {
                    const firstTable =
                        document.getElementById('playersRankingLostPage');
                    firstTable.innerHTML += `<span class="bold" >${element.userName}</span>
                    <div id="scores"><span>${element.ranking}</span></div>`;
                });

                showPage('lostPage');
            }, 1000);
        }
        countErrors++;
    }
    divUnderlines.textContent = textUnderlines;
}

function replaceAt(str, i, chr) {
    return str.substring(0, i) + chr + str.substring(i + 1);
}

function showPage(pageClass) {
    document.getElementById('firstPage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('wonPage').style.display = 'none';
    document.getElementById('lostPage').style.display = 'none';
    document.getElementById(pageClass).style.display = 'block';
}

function getPoints(startTime, endTime) {
    const start = startTime / 1000;
    const end = endTime / 1000;
    scoreTime = end - start;
    console.log(start, end, scoreTime);
    const newscore = Math.floor(scoreTime);
    switch (true) {
        case newscore <= 10:
            points = 100;
            break;

        case newscore > 10 && newscore <= 20:
            points = 80;
            break;

        case newscore > 20 && newscore <= 30:
            points = 60;
            break;

        case newscore > 30 && newscore <= 40:
            points = 40;
            break;

        case newscore > 40 && newscore < 50:
            points = 20;
            break;

        case newscore > 50 && newscore <= 60:
            points = 10;
            break;

        case scoreTime > 60:
            points = 10;
            break;

        default:
            points = 0;
            break;
    }
    return points;
}

const playAgain = document.querySelectorAll('.play-again');
playAgain.forEach(element => {
    element.addEventListener('click', () => window.location.reload());
});

