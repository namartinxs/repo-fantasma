

/*do array*/ 
let indexPergunta = 0;
let timer;
let timeLeft = 15;


startadora.innerHTML =
`
   <img src="./Imagens/Avengers.PNG" alt="capa de início">
    <h1 class="titulo"> Seja Bem Vindo(a) ao Quiz Squad </h1> 
`;
let nomeUser = window.prompt("Insira seu nome"); 
if (nomeUser!=" "){
    startadora.classList.remove("hide");
    containerGeral.classList.remove("hide");
    rulesContainer.classList.remove("hide");
    buttonStart.addEventListener("click", startGame);
    nextQuestion.addEventListener("click", displayNextQuestion);

}else{
    while (nomeUser == "") {
       
        let nomeUser = window.prompt("Insira seu nome"); 
    }
}



/*rulesContainer.classList.remove("hide");
buttonStart.addEventListener("click", startGame);
nextQuestion.addEventListener("click", displayNextQuestion);*/




function startGame(){
    buttonStart.classList.add("hide");
    rulesContainer.classList.add("hide");
    questionsContainer.classList.remove("hide");

    displayNextQuestion()
} 

function displayNextQuestion(){
    resetState()
    // Reseta o tempo e inicia o cronômetro
    timeLeft = 15;
    timerDisplay.textContent = `Tempo restante: ${timeLeft}s`;
    startTimer();


    /*contador*/
    spnQtd.innerHTML = `${indexPergunta + 1}/${perguntas.length}`;

    /*verifica se o jogo chegou ao fim*/
    if (perguntas.length==indexPergunta)
       return fimDoJogo();

    questionText.textContent = perguntas[indexPergunta].quest;
    /*para cada uma das respostas do array*/
    perguntas[indexPergunta].resp.forEach(resp => {
        /*um elemento button para cada uma*/
        const respReplace = document.createElement("button");
        respReplace.classList.add("button", "resp");
        respReplace.textContent =resp.option;
        /*resposta correta ou nao*/
        /*verifica se o objeto resp tem a correct ==true*/
        if(resp.correct){
            respReplace.dataset.correct = resp.correct;
        }
        answersContainer.appendChild(respReplace);
        /*sabermos se a certa foi selecionada*/
        respReplace.addEventListener("click", selectAnserw);
    });
}

function resetState(){
    /*remove os filhos*/
    while(answersContainer.firstChild){
        answersContainer.removeChild(answersContainer.firstChild);
    }
    /*esconde o botao se a pergunta nao for selecionada*/
    nextQuestion.classList.add("hide");
    
    // Para o cronômetro quando mudar de pergunta
    clearInterval(timer);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Tempo restante: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            reStart(); // Recomeça o jogo se o tempo acabar
        }
    }, 1000); // A cada segundo, diminui 1 do tempo
}

function selectAnserw(event){
    /*salva qual foi clicado*/
    const answersClicked = event.target;
    /*verifica se o dataset é igual a true*/
    let isCorrect = answersClicked.dataset.correct;

    document.querySelectorAll(".resp").forEach(button=>{
        if(button.dataset.correct){
            button.classList.add("correct");
        }else{
            button.classList.add("incorrect");
            
        }
        button.disabled = true;
    });

    if(isCorrect){
        nextQuestion.classList.remove("hide");
        indexPergunta++;
    }else{
        
        reStart();
    }
    
   // Para o cronômetro quando a resposta é selecionada
   clearInterval(timer);
}



function reStart(){
    
    document.getElementById("imgSuperior").src ="./Imagens/hulk-bravo.png"
    document.getElementById("imgInferior").src ="./Imagens/hulk-soco.png"
    questionsContainer.innerHTML = 
    `
        <ul class="erro-list">
                <li>
                    Você errou!
                </li>
                <li>

                </li>
        </ul>
        
        <button onclick = window.location.reload()>
            Recomeçar Quiz
        </button>

    `;

}





/*const perguntas*/
const perguntas = [
    /*a*/
    {
        quest: "No filme 'Vingadores: Ultimato', lançado em 2019, qual dos seguintes heróis sacrifica sua vida para obter a Joia da Alma?",
        resp: [
            {option: "Thor",correct:false},
            {option: "Hulk",correct:false},
            {option: "Viúva Negra",correct: true},
            {option: "Capitão América",correct:false}

        ]
    }, 
    /*b*/
    {
        quest: "Na obra 'Vingadores: Guerra Infinita', de 2018, qual é o motivo de Thanos coletar as Joias do Infinito?",
        resp:[
            {option: "Criar uma arma para destruir os Vingadores ",correct:false},
            {option: "Aumentar seu poder para se tornar imortal ",correct:false},
            {option: "Restaurar o equilíbrio no universo eliminando metade da vida ",correct: true},
            {option: "Conquistar todos os planetas do sistema solar",correct:false}
        ]
    },
    /*c*/
    {
        quest:"No longa-metragem 'Os Vingadores', lançado em 2012, qual é o principal objetivo de Loki ao chegar à Terra?",
        resp:[
            {option: "Destruir o planeta com a ajuda dos Chitauri",correct:false},
            {option: "Capturar o Homem de Ferro",correct:false},
            {option: "Roubar a tecnologia dos Vingadores ",correct: false},
            {option: "Governar a Terra usando o Tesseract",correct:true}
        ]
    },
    /*d*/
    {
        quest:"Durante o filme 'Vingadores: Ultimato', de 2019, quem empunha o Mjolnir além de Thor durante a batalha final contra Thanos?",
        resp:[
            {option: "Hulk",correct:false},
            {option: "Capitão América",correct:true},
            {option: "Viúva Negra",correct: false},
            {option: "Homem de Ferro",correct:false}
        ]
    }
]
