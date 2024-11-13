# megasena-performatica
O professor Otávio pediu para seus alunos escrever uma função em javascript que gere 6 números aleatórios a fim de ficar milionário na mega sena. Ao esboçar a solução com os alunos, percebeu que o problema é uma questão bastante interessante da computação. 

Num primeiro momento, podemos gerar uma função simples que se encarrega da tarefa, que pode ser vista a seguir:

```javascript
function gerarAleatorios() {
    var vetor = [];

    while(vetor.length < 6) {
        var aleatorio = Math.floor(Math.random()*60+1);
        vetor.push(aleatorio);
    }

    return vetor;
}
```

Porém, essa função traz repetições entre os números gerados. Para deixar a solução mais acertiva, um caminho pode ser tomado, como segue:

```javascript
function gerarAleatorios() {
    var vetor = [];

    while(vetor.length < 6) {
        var aleatorio = Math.floor(Math.random()*60+1);
        
        if(vetor.includes(aleatorio)) {
            continue;
        } else {
            vetor.push(aleatorio);
        }
    }

    return vetor;
}
```

Agora, nossa função gera números aleatórios sem repetições. Porém, uma pergunta veio à mente. Se pedirmos para gerar mais números aleatórios, quantas "repetições inúteis" teremos feito? Chegamos então a uma variante do problema:

```javascript
function gerarAleatorios() {
    var vetor = [];
    var geracoes = [];

    while(vetor.length < 6) {
        var aleatorio = Math.floor(Math.random()*60+1);
        geracoes.push(aleatorio);

        if(vetor.includes(aleatorio)) {
            continue;
        } else {
            vetor.push(aleatorio);
        }
    }

    console.log("Geracoes:", geracoes);
    console.log("Finais:", vetor);

    return vetor;
}
```

Agora, conseguimos ver a quantidade de gerações e os números finais gerados na resposta do console. Para parametrizar ainda mais a solução, adequamos a mesma para receber qualquer quantidade de parâmetros, como segue abaixo:

```javascript
function gerarAleatorios(quantidade) {
    var vetor = [];
    var geracoes = [];

    while(vetor.length < quantidade) {
        var aleatorio = Math.floor(Math.random()*60+1);
        geracoes.push(aleatorio);

        if(vetor.includes(aleatorio)) {
            continue;
        } else {
            vetor.push(aleatorio);
        }
    }

    console.log("Geracoes:", geracoes);
    console.log("Finais:", vetor);

    return vetor;
}
```

Com isso, podemos, por exemplo, pedir para gerar 50 números aleatórios, obtendo o seguinte resultado:
```bash
geraçoes: (85)[9, 28, 45,28...]
finais: (50)[9, 28, 45,28...]
```

Para ver todos os metodos js [Veja o arquivo algoritmos.js](./algoritmos.js)
e para ver a analise completa [Veja o arquivo ProcessoOtimizacao.md](./ProcessoOtimizacao.md)
