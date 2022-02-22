// Pegar instância do input de nome do usuário
var inputUserName = document.getElementById('userName'); // if were to .value as it is called in the beg of the code would return an empty string
var usersRanking = [];
var randomFruit = '';
showPage('firstPage');
var countErrors = 0;
let startTime;
let endTime;
let scoreTime;
let points;

const fruits = [
    'fig',
    'mad'
    // 'coconut',
    // 'pineapple',
    // 'strawberry',
    // 'pomegranate'
];

function startGame() {
    var userName = inputUserName.value;
    startTime = Date.now();
    // instancio variavel aqui pois para confirmar que existe no localStorage tenho que ter ela criada para confirmar, entao por enquanto retorna null
    var localStorageRanking = localStorage.getItem('ranking');
    if (localStorageRanking) {
        usersRanking = JSON.parse(localStorageRanking);
    }
    // Guardar o username no localStorage
    // Deixar para o final, depois que termina de jogar
    // usersRanking.push({
    //     userName: userName,
    //     ranking: 0
    // })
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
            textUnderlines = replaceAt(textUnderlines, i, chr)
            console.log(textUnderlines);
            foundChar = true;
            if (!textUnderlines.includes('_')) {
                endTime = Date.now();
                showPage('wonPage');
                break;
            }
        }
    }

    const bodyPieces = ['head', 'body', 'armL', 'armR', 'legL', 'legR'];
    if (!foundChar) {
        document
            .getElementById(bodyPieces[countErrors])
            .classList.remove('figure-part');

        if (countErrors === 5) {
            // function gameover() ...
            endTime = Date.now();
            setTimeout(function () {
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

function getPoints() {
    scoreTime = endTime - startTime / 100;
    switch (true) {
        case scoreTime <= 10:
            points = 100;
            break;

        case scoreTime > 10 <= 20:
            points = 80;
            break;

        case scoreTime > 20 <= 30:
            points = 60;
            break;

        case scoreTime > 30 <= 40:
            points = 40;
            break;

        case scoreTime > 40 < 50:
            points = 20;
            break;

        case scoreTime > 50 <= 60:
            points = 10;
            break;

        case scoreTime > 60 <= 70:
            points = 10;
            break;

        default:
            points = 0;
            break;
    }
    return;
}

// var userName = getUserName()
// function getUserName() {
//     return document.getElementById('userName').value
// }

// Mostrar pontuaçao do jogador tempo de jogo + numero de letras
    // letra vale 1
    // contador de tempo
    // tempo final menos inical 
    // cada 10s -1 ponto


// Nas pags lost e won ter o btn jogar novamente


// Aumentar o nivel de dificuldade do jogo a cada rodada