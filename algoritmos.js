// Algoritmo do professor
function gerarAleatoriosComVetor(quantidade) {
    var vetor = [];

    while(vetor.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * 60 +1);

        if(vetor.includes(aleatorio)) {
            continue;
        } else {
            vetor.push(aleatorio);
        }
    }

    return vetor;
}

// Algoritmo do chat gpt
function gerarAleatoriosComSet(quantidade) {
    const vetor = new Set();

    while (vetor.size < quantidade) {
        const aleatorio = Math.floor(Math.random() * 60 + 1);
        vetor.add(aleatorio);
    }

    return Array.from(vetor);
}

// A partir de uma lista com numeros de 1 a 60, 
// remove posicoes aleatoriamente
// remove até a lista ficar do tamanho esperado
function gerarAleatoriosRemovendoItens(quantidade) {
    const numeros = Array.from({ length: 60 }, (_, i) => i + 1);

    while (numeros.length > quantidade) {
        const aleatorio = Math.floor(Math.random() * numeros.length);
        numeros.splice(aleatorio, 1);
    }

    return numeros
}

// Cria lista com 60 numeros
// embaralha a lista
// pega as n primeiras posicoes
// Algoritmo Fisher-Yates gerado pelo chat gpt
function gerarAleatoriosComEmbaralhamento(quantidade) {
    const numeros = Array.from({ length: 60 }, (_, i) => i + 1);

    for (let i = numeros.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }

    return numeros.slice(0, quantidade);
}

function gerarAleatoriosOtimizado(quantidade) {
    if(quantidade < 45) {
        return gerarAleatoriosComVetor(quantidade);
    } else {
        return gerarAleatoriosRemovendoItens(quantidade);
    }
}

function executa(quantidade, funcaoParametro, ...parametros) {
    const nomeFuncao = funcaoParametro.name || 'função anônima';

    console.time(`Tempo de execução (${nomeFuncao})`);

    for (let i = 0; i < quantidade; i++) {
        funcaoParametro(...parametros);
    }

    console.timeEnd(`Tempo de execução (${nomeFuncao})`);
}

function fazTestes(quantidade) {
    executa(1000000, gerarAleatoriosComVetor, quantidade);
    executa(1000000, gerarAleatoriosComSet, quantidade);
    executa(1000000, gerarAleatoriosRemovendoItens, quantidade);
    executa(1000000, gerarAleatoriosComEmbaralhamento, quantidade);
    executa(1000000, gerarAleatoriosOtimizado, quantidade);
}
