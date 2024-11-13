## Preparação

Para avaliar a performance de cada uma das funções, foi desenvolvido o função `executa` que recebe os seguintes parametros:

`quantidade`: quantidade de vezes que vamos executar a função passada  
`funcaoParametro`: a função que vamos repetir  
`...parametros`: args com todos os parametros necessarios para rodar a `funcaoParametro`  

```javascript
function executa(quantidade, funcaoParametro, ...parametros) {
    const nomeFuncao = funcaoParametro.name || 'função anônima';

    console.time(`Tempo de execução (${nomeFuncao})`);

    for (let i = 0; i < quantidade; i++) {
        funcaoParametro(...parametros);
    }

    console.timeEnd(`Tempo de execução (${nomeFuncao})`);
}
```

esse codigo permite executarmos 
```bash 
executa(1000000, gerarAleatoriosComVetor, 6);
```

que vai executar 1milhão de vezes a função `gerarAleatoriosComVetor(6)`

alem disso foi criado uma função para rodar todas as outras em sequencia, permitindo fazer todos os testes muito mais rapido:
```javascript
function fazTestes(quantidade) {
    executa(1000000, gerarAleatoriosComVetor, quantidade);
    executa(1000000, gerarAleatoriosComSet, quantidade);
    executa(1000000, gerarAleatoriosRemovendoItens, quantidade);
    executa(1000000, gerarAleatoriosComEmbaralhamento, quantidade);
}
```

com essa função conseguimos rodar o seguinte codigo:
```bash
fazTestes(6)
```
ele vai gerar 6 numeros aleatórios com cada um dos algoritmos analisados.

## Algoritmos
### Algoritmo do material
O primeiro algoritmo é o algoritmo final proposto pelo professor, retirando os logs para ficar mais otimizado:
```javascript
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
```
Esse algoritmo teve a seguinte performance(para cada quantidade de itens o tempo que demorou para executar 1Milhão de vezes em milisegundos)

| Quantidade de Itens | ms    |
|---------------------|-------|
| 6                   | 140   |
| 43                  | 3.363 |
| 50                  | 5.053 |

**Conclusão:** Bom algoritmo para gerar poucos números mas perde performance quando a quantidade de numeros aumenta

### Otimização chat gpt
Para facilitar a vida, primeiro pensamento foi pedir para o chat gpt otimizar o algoritmo e ele propos o seguinte código tendo o respectivo desempenho

```javascript
// Algoritmo do chat gpt
function gerarAleatoriosComSet(quantidade) {
    const vetor = new Set();

    while (vetor.size < quantidade) {
        const aleatorio = Math.floor(Math.random() * 60 + 1);
        vetor.add(aleatorio);
    }

    return Array.from(vetor);
}
```
| Quantidade de Itens | ms    |
|---------------------|-------|
| 6                   | 595   |
| 43                  | 4.651 |
| 50                  | 6.092 |

**Conclusão:** Perde para o algoritmo inicial em todos os cenários. Chat gpt provavelmente priorizou a legibilidade e deixou o desempenho de lado

### Otimização chat gpt embaralhamento
Uma contextualização ao chat gpt sobre o problema de sorteios duplicados e insistencia para redução no tempo de execução ele propos uma alternativa, criar uma lista de 60 numeros, embaralha-la e pegar a quantidade de itens desejada

```javascript
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
```
| Quantidade de Itens | ms    |
|---------------------|-------|
| 6                   | 3.403 |
| 43                  | 3.333 |
| 50                  | 3.334 |

**Conclusão:** Não tem diferença prática ao gerar poucos ou muitos itens, pois o custo desse algoritmo esta no embaralhamento que é inerente a quantidade de itens

### Algoritmo para remover numeros da lista
O problema do primeiro algoritmo era sortear números descartaveis(quando sorteia um numero repetido) para evitar gerar números descartáveis foi pensado em outra solução, criar uma lista com 60 numeros e sortear uma posição valida para remover um item. remover itens enquanto a lista estiver maior do que a pretendida.

Neste algoritmo todo numero sorteado sera usado, evitando desperdicio de recurso de processamento e tempo, segue o algoritmo e o desempenho:

```javascript
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
````
| Quantidade de Itens | ms    |
|---------------------|-------|
| 6                   | 6.369 |
| 43                  | 3.760 |
| 50                  | 3.281 |

**Conclusão:** Ele possui um desempenho inverso ao primeiro algoritmo, quanto mais itens menos tempo ele vai demorar removendo itens até chegar ao tamanho correto, mas para poucos itens ele é terrivelmente ruim.

### Analise final
Dado as minhas analises o melhor algoritmo varia de acordo com a quantidade de itens gerados, o `gerarAleatoriosComVetor` funciona muito bem com poucos numeros, mas quando a quantidade sobe os numeros repetidos se tornam um problema. O `gerarAleatoriosComEmbaralhamento` se mantem constante, ele perde para o `gerarAleatoriosComVetor` quando o objetivo é gerar poucos itens, mas conforme o `gerarAleatoriosComVetor` perde desempenho com o aumento da quantidade de números o `gerarAleatoriosComEmbaralhamento` se torna mais atrativo, tendo equilibrio quando se gera 43 números. O `gerarAleatoriosRemovendoItens` é bom para gerar muitos numeros, pois na realidade ele vai sortear poucos itens para excluir da lista

### Proposta
Como o desemprenho varia de acordo com a quantidade de numeros gerados o algoritmo otimizado vai usar o `gerarAleatoriosComVetor` enquanto a quantidade for menor que 45 e `gerarAleatoriosRemovendoItens` se a quantidade de itens for 45 ou mais:

```javascript
function gerarAleatoriosOtimizado(quantidade) {
    if(quantidade < 45) {
        return gerarAleatoriosComVetor(quantidade);
    } else {
        return gerarAleatoriosRemovendoItens(quantidade);
    }
}
```

