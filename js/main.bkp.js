// Pegar instância do input de nome do usuário
var inputUserName = document.getElementById('userName'); // if were to .value as it is called in the beg of the code would return an empty string
var usersRanking = [];
var randomFruit = '';
showPage('firstPage');
var countErrors = 0;
let startTime;
let endTime;

const fruits = [
    'fig',
    'apple',
    'banana'
    // 'coconut',
    // 'pineapple',
    // 'strawberry',
    // 'pomegranate'
];

// Inicia o jogo quando o jogador clicar no botão
function startGame() {
    // Pegar nome do usuário porque já o nome/valor qnd chama a funçao/clica btn start
    var userName = inputUserName.value;

    // time counter
    startTime = Date.now();
    console.log(startTime);


    // Pegar pontuaçao do user

    // false = null, '', 0, undefined, NaN
    // true = 1, ' ', [], {}
    // instancio variavel aqui pois para confirmar que existe no localStorage tenho que ter ela criada para confirmar, entao por enquanto retorna null
    var localStorageRanking = localStorage.getItem('ranking');

    // Parse na string que vem do localStorage
    if (localStorageRanking) {
        usersRanking = JSON.parse(localStorageRanking);
    }

    // Guardar o username no localStorage

    // Deixar para o final, depois que termina de jogar
    // usersRanking.push({
    //     userName: userName,
    //     ranking: 0
    // })

    // Levar a pagina do jogo
    showPage('gamePage');

    // Mostrar a palavra randomicamente, exemplo:
    //                       floor:     .99       x    7 = 6
    //                       floor:     .5        x    7 = 3
    //                       floor:     0         x    7 = 0
    const randomIndex = Math.floor(Math.random() * fruits.length);

    // Exemplo: fruit[3] => "coconut"
    randomFruit = fruits[randomIndex];

    var textUnderlines = '';

    //   inicial;    condição;       executa depois do loop
    for (var i = 1; i <= randomFruit.length; i++) {
        textUnderlines += '_';
    }

    //          0   1   2   3   4
    // var arr = [10, 20, 50, 30, 120]
    // var i = 0
    // var total = 0
    // while (total < 100) {
    //     total += arr[i] // 110
    //     i++
    // }
    // total = total
    // i = 4
    //  ======  .split()  retorna uma array de uma string (transforma string and array)
    // randomFruit = 'abacate'
    // randomFruit.split('a') // ['', 'b', 'c', 'te']
    // randomFruit.split('ca') // ['aba', 'te']
    // randomFruit.split('') // ['a', 'b', 'a', 'c', 'a', 't', 'e']
    // randomFruit.split('').forEach(() => {
    //     textUnderlines += "_ "
    // })

    const divUnderlines = document.getElementById('underline');
    divUnderlines.textContent = textUnderlines;
}

// A cada letra clicada apagar/shadow letra
function selectChar(chr) {
    // randomFruit.split('').find(x => x === char)
    // randomFruit.includes(char)

    // const underlines = document.querySelectorAll -> pegar underlines
    const divUnderlines = document.getElementById('underline');
    let textUnderlines = divUnderlines.textContent;

    let foundChar = false;
    // Se letra certa mostrar/substituir underline por letra
    for (var i = 0; i < randomFruit.length; i++) {
        // console.log(randomFruit.charAt(i));
        // console.log(chr);

        if (randomFruit.charAt(i) === chr) {
            // textUnderlines.textContent ...
            textUnderlines = replaceAt(textUnderlines, i, chr);
            // button.setAttribute('disabled', 'disabled') // Google: html button disabled
            foundChar = true;
            // Se ganhar jogo levar para página WON

            if (!textUnderlines.includes('_')) {
                endTime = Date.now();
                console.log(endTime);

                showPage('wonPage');
                break;
            }
        }
    }

    const bodyPieces = ['head', 'body', 'armL', 'armR', 'legL', 'legR'];

    if (!foundChar) {
        // Mostra parte do corpo do boneco
        document
            .getElementById(bodyPieces[countErrors])
            .classList.remove('figure-part');

        // Mostra página de gameover
        if (countErrors === 5) {
            // function gameover() ...
            endTime = Date.now();
            console.log(endTime);

            setTimeout(function () {
                showPage('lostPage');
            }, 2000);
        }

        // switch (countErrors) {
        //     case 0:
        //         document.getElementById('head').classList.remove('figure-part');
        //         break;

        //     case 1:
        //         document.getElementById('body').classList.remove('figure-part');
        //         break;

        //     case 2:
        //         document.getElementById('armL').classList.remove('figure-part');
        //         break;
        //     case 3:
        //         document.getElementById('armR').classList.remove('figure-part');
        //         break;
        //     case 4:
        //         document.getElementById('legL').classList.remove('figure-part');
        //         break;
        //     case 5:
        //         document.getElementById('legR').classList.remove('figure-part');
        //         setTimeout(function () {
        //             showPage('lostPage');
        //         }, 2000);
        //         break;
        // }

        // Aumenta o contador de erro
        countErrors++;
    }

    divUnderlines.textContent = textUnderlines;
}

// replaceAt('abacate', 3, 'b')
// 'aba' + 'b' + 'ate' => 'ababate'

function replaceAt(str, index, chr) {
    if (index > str.length - 1) return str; // return no meio da funçao "mata" ela, para de executar

    return str.substring(0, index) + chr + str.substring(index + 1);
    // console.log(str.substring(0, index));
    // console.log(str);

    // return str.substring(0, index) + chr + str.substring(index + 1);
}

// Adicionar um comentário aqui
function showPage(pageClass) {
    // Trocar classes por ID
    // Esconde as páginas
    document.getElementById('firstPage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('wonPage').style.display = 'none';
    document.getElementById('lostPage').style.display = 'none';

    // Mostrar a página selecionada
    document.getElementById(pageClass).style.display = 'block';
}

// Pegar valor usando função¨

function getPoints() {
    let wordChrs = 1
    
    
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