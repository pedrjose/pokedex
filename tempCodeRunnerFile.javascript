const aPromise = new Promise((resolve, reject) => {
    const aNumber = 37;
    resolve(aNumber);
    // reject(aNumber);
})

// then é o método responsável por receber uma resposta de sucesso da Ajax
// then pode ser encadeado com outros then, gerando uma cadeia de respostas
// catch será usado para um retorno negativo da Ajax
aPromise
    // o primeiro value é recebido de resolve
    // esse mesmo valor é retornado como parâmetro para o próximo then
    // o then que está encadeado, recebe esse valor que é passado para uma função
    .then(value => value)
    .then(value => {
        console.log(`Then: ${value}`);
    })
    // catch só é acionado em duas ocasiões: 
    // 1. quando o reject, dentro da promise, é invocado
    // 2. quando o código dentro de algum then lança um error
    .catch(rejectValue => {
        console.log(`Catch: ${rejectValue}`);
    })