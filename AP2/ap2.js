// const objetivo = [
//     [-5, -5],
//     [-3, -2],
//     [-5, 5],
//     [-1, 4],
//     [2, 4],
//     [5, 5],
//     [4, 2],
//     [1, 0],
//     [3, -3],
//     [-2, -3]
// ];

// const objetivo = 40.15

const intervaloEstagnacao = 100;
const limiteMudanca = 0.01;

const tamanhoPopulacao = 700
const mutationRate = 0.01
const geracoes = 10000

function calculoDistanciaCaixeiroViajante(cidadeA, cidadeB) {
    let d = Math.sqrt(Math.pow((cidadeB[0] - cidadeA[0]), 2) + Math.pow((cidadeB[1] - cidadeA[1]), 2))

    return d

}

const cidades = [
    [-5, -5],
    [-2, -3],
    [3, -3],
    [-3, -2],
    [1, 0],
    [4, 2],
    [5, 5],
    [2, 4],
    [-1, 4],
    [-5, 5],
]

// Função para criar um novo indivíduo

// individuo = [cidades[0], cidades[9], cidades[1], cidades[8], ...]
// distacia = 2 + 3 + 1

function criarIndividuo(cidades) {
    return cidades.slice().sort(() => Math.random() - 0.5)
}


function calcularDistanciaTotal(individuo) {
    let distanciaTotal = 0;

    for (let i = 0; i < individuo.length - 1; i++) {
        distanciaTotal += calculoDistanciaCaixeiroViajante(individuo[i], individuo[i + 1])

    }
    distanciaTotal += calculoDistanciaCaixeiroViajante(individuo[individuo.length - 1], individuo[0])

    return distanciaTotal;

}

// Função de aptidão (fitness)
function aptidao(individuo) {
    const distanciaTotal = calcularDistanciaTotal(individuo);
    return 1 / (distanciaTotal + 1);
}


function criarPopulacao(tamanho) {
    const populacao = []
    for (let i = 0; i < tamanho; i++) {
        populacao.push(criarIndividuo(cidades))
    }
    return populacao
}


function selecao(populacao) {

    const somaAptidao = populacao.reduce((soma, individuo) => soma + aptidao(individuo), 0);

    const probabilidades = populacao.map(individuo => aptidao(individuo) / somaAptidao);

    const selecionado1 = escolhaPorProbabilidade(populacao, probabilidades);
    const selecionado2 = escolhaPorProbabilidade(populacao, probabilidades);

    return [selecionado1, selecionado2];
}

function escolhaPorProbabilidade(populacao, probabilidades) {
    const r = Math.random();
    let acumulado = 0;
    for (let i = 0; i < populacao.length; i++) {
        acumulado += probabilidades[i];
        if (r <= acumulado) return populacao[i];
    }
}

function cruzamento(individuo1, individuo2) {
    const pontoDeCorte = Math.floor(Math.random() * cidades.length)

    const filho = individuo1.slice(0, pontoDeCorte)

    for (let i = 0; i < individuo2.length; i++) {
        if (!filho.includes(individuo2[i])) {
            filho.push(individuo2[i])
        }
    }

    for (let i = 0; i < cidades.length; i++) {
        // const cidade = pai1[i];
        if (!filho.includes(cidades[i])) {
            filho.push(cidades[i]);
        }
    }
    return filho
}

function mutacao(individuo) {
    let individuoMutante = individuo.slice()

    if (Math.random() < mutationRate) {
        const i = Math.floor(Math.random() * individuoMutante.length);
        const j = Math.floor(Math.random() * individuoMutante.length);
        [individuoMutante[i], individuoMutante[j]] = [individuoMutante[j], individuoMutante[i]];
    }
    return individuoMutante
}

// function escolhaAleatoria(array) {
//     return array[Math.floor(Math.random() * array.length)]
// }

function algoritmoGenetico() {

    let populacao = criarPopulacao(tamanhoPopulacao)
    let melhorDistanciaAnterior = Infinity;
    let geracoesEstagnadas = 0;

    for (let geracao = 0; geracao < geracoes; geracao++) {
        populacao.sort((a, b) => aptidao(b) - aptidao(a))

        const melhorIndividuo = populacao[0];
        const distanciaTotal = calcularDistanciaTotal(melhorIndividuo);

        console.log(`Geração atual: ${geracao}\n`);
        if (geracao % 100 === 0) {
            console.log(`Geração atual: ${geracao}`);
            console.log(`Melhor indivíduo: ${melhorIndividuo}`);
            console.log(`Aptidão: ${aptidao(melhorIndividuo)}`);
            console.log(`Distância total: ${distanciaTotal}`);
        }

        const mudancaPercentual = Math.abs((melhorDistanciaAnterior - distanciaTotal) / melhorDistanciaAnterior);

        if (mudancaPercentual < limiteMudanca) {
            geracoesEstagnadas++;
        } else {
            geracoesEstagnadas = 0;
        }
        melhorDistanciaAnterior = distanciaTotal;

        melhorDistanciaAnterior = distanciaTotal;

        if (geracoesEstagnadas >= intervaloEstagnacao) {
            console.log("Solução encontrada com estagnação nas melhorias.");
            console.log("Melhor distância total alcançada:", distanciaTotal);
            break;
        }

        // if (distanciaTotal <= objetivo) {
        //     console.log("Solução encontrada")
        //     break
        // }

        // criar uma nova população
        const novaPopulacao = []

        while (novaPopulacao.length < tamanhoPopulacao) {
            const [individuo1, individuo2] = selecao(populacao)
            let filho = cruzamento(individuo1, individuo2)
            filho = mutacao(filho)
            novaPopulacao.push(filho)
        }

        populacao = novaPopulacao
    }
}

algoritmoGenetico()




// let cidadao = criarIndividuo(cidades)

// let distaciaIndividuo = calcularDistanciaTotal(cidadao)

// console.log(distaciaIndividuo)



// Função para criar uma população inicial
// function criarPopulacao(tamanho) {
//     const populacao = []
//     for (let i = 0; i < tamanho; i++) {
//         populacao.push(criarIndividuo(cidades))
//     }
//     return populacao
// }



// // Função de aptidão (fitness)
// function aptidao(individuo) {
//     let pontos = 0
//     for (let i = 0; i < objetivo.length; i++) {
//         if (individuo[i] === objetivo[i]) {
//             pontos++
//         }
//     }
//     return pontos
// }

// function selecao(populacao) {
//     const selecionados = []
//     populacao.forEach(individuo => {
//         const pontos = aptidao(individuo)
//         for (let i = 0; i < pontos; i++) {
//             selecionados.push(individuo)
//         }
//     });
//     return [escolhaAleatoria(selecionados), escolhaAleatoria(selecionados)]
// }

// function cruzamento(individuo1, individuo2) {
//     const pontoDeCorte = Math.floor(Math.random() * objetivo.length)
//     const filho = individuo1.slice(0, pontoDeCorte) + individuo2.slice(pontoDeCorte)
//     return filho
// }

// function mutacao(individuo) {
//     let individuoMutante = ""
//     for (let i = 0; i < individuo.length; i++) {
//         if (Math.random() < mutationRate) {
//             individuoMutante += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
//         } else {
//             individuoMutante += individuo[i]
//         }
//     }
//     return individuoMutante
// }

// function escolhaAleatoria(array) {
//     return array[Math.floor(Math.random() * array.length)]
// }

// function algoritmoGenetico() {
//     let populacao = criarPopulacao(tamanhoPopulacao)

//     for (let geracao = 0; geracao < geracoes; geracao++) {
//         populacao.sort((a, b) => aptidao(b) - aptidao(a))

//         console.log(`Geração atual: ${geracao}, melhor indivíduo: ${populacao[0]}`)

//         if (aptidao(populacao[0]) === objetivo.length) {
//             console.log("Solução encontrada")
//             break
//         }

//         // criar uma nova população
//         const novaPopulacao = []

//         while (novaPopulacao.length < tamanhoPopulacao) {
//             const [individuo1, individuo2] = selecao(populacao)
//             let filho = cruzamento(individuo1, individuo2)
//             filho = mutacao(filho)
//             novaPopulacao.push(filho)
//         }

//         populacao = novaPopulacao
//     }
// }

// algoritmoGenetico()
