// Pegar instância do input de nome do usuário
var inputUserName = document.getElementById('userName') // string
var usersRanking = []

// Inicia o jogo quando o jogador clicar no botão
function startGame() {
    // Pegar nome do usuário
    var userName = inputUserName.value

    // Pegar pontuaçao do user
    var lsRanking = localStorage.getItem('ranking')

    // false = null, '', 0, undefined, NaN
    // true = 1, ' ', [], {}
    // Parse na string que vem do localStorage
    if (lsRanking) {
        usersRanking = JSON.parse(lsRanking)
    }

    // Guardar o username no localStorage
    // Deixar para o final, depois que termina de jogar
    // usersRanking.push({
    //     userName: userName,
    //     ranking: 0
    // })

    // Levar a pagina do jogo
    showPage('.game-page')
}

// Adicionar um comentário aqui
function showPage(pageClass) {
    // Trocar classes por ID
    // Esconde as páginas
    document.querySelector('.first-page').style.display = 'none'
    document.querySelector('.game-page').style.display = 'none'
    document.querySelector('.won-page').style.display = 'none'
    document.querySelector('.lost-page').style.display = 'none'

    // Mostrar a página selecionada
    document.querySelector(pageClass).style.display = 'block'
}

// Pegar valor usando função
// var userName = getUserName()
// function getUserName() {
//     return document.getElementById('userName').value
// }

// Iniciar jogo
// Mostrar a palavra randomicamente
// Aumentar o nivel de dificuldade do jogo a cada rodada
// A cada letra clicada apagar/shadow letra
// Se letra certa mostrar/substituir hifén por letra
// Se letra errada mostrar parte do desenho
// Se ganhar jogo levar para página WON
// Se perder levar pagina lost
// Nas pags lost e won ter o btn jogar novamente
// Mostrar pontuaçao do jogador
// Mostrar pontuacao dos jogadores em todas a paginasE//