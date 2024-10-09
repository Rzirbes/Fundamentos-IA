const perguntas = [
    {
        pergunta: "\nÉ Homem?",
        subElemento: {
            sim: {
                pergunta: "Ele é surfista?",
                subElemento: {
                    sim: "Gabriel Medina",
                    nao: {
                        pergunta: "Ele é jogador?",
                        subElemento: {
                            sim: "Neymar",
                            nao: "Ayrton Senna"
                        }
                    }
                }
            }
        },
    },
    {
        pergunta: "É Mulher?",
        subElemento: {
            sim: {
                pergunta: "Ela é modelo?",
                subElemento: {
                    sim: "Gisele Bündchen",
                    nao: {
                        pergunta: "Ela é atriz?",
                        subElemento: {
                            sim: "Margot Robbie",
                            nao: "Beyoncé"
                        }
                    }
                }
            }
        },
    },
    {
        pergunta: "É Personagem animado?",
        subElemento: {
            sim: {
                pergunta: "Ele é do Dragon Ball?",
                subElemento: {
                    sim: "Goku",
                    nao: {
                        pergunta: "Ele é do Naruto?",
                        subElemento: {
                            sim: "Naruto",
                            nao: "Sonic"
                        }
                    }
                }
            }
        },
    },
    {
        pergunta: "É um animal?",
        subElemento: {
            sim: {
                pergunta: "Ele é o melhor amigo do homem?",
                subElemento: {
                    sim: "Cachorro",
                    nao: {
                        pergunta: "Ele vive no mar?",
                        subElemento: {
                            sim: "Golfinho",
                            nao: {
                                pergunta: "Ele vive na fazenda?",
                                subElemento: {
                                    sim: "Vaca",
                                    nao: "Leão"
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    {
        pergunta: "É um super-herói?",
        subElemento: {
            sim: {
                pergunta: "Ele usa capa?",
                subElemento: {
                    sim: {
                        pergunta: "Ele é da DC?",
                        subElemento: {
                            sim: "Superman",
                            nao: "Doutor Estranho"
                        }
                    },
                    nao: {
                        pergunta: "Ele é da Marvel?",
                        subElemento: {
                            sim: "Homem-Aranha",
                            nao: "Batman"
                        }
                    }
                }
            }
        },
    },
    {
        pergunta: "É um cantor?",
        subElemento: {
            sim: {
                pergunta: "Ele canta pop?",
                subElemento: {
                    sim: "Justin Bieber",
                    nao: {
                        pergunta: "Ele canta sertanejo?",
                        subElemento: {
                            sim: "Gusttavo Lima",
                            nao: "Frank Sinatra"
                        }
                    }
                }
            }
        },
    },
];


arrayDeRespostasPossiveis = [
    ["Neymar", "Airton Senna", "Gisele Bündchen",],
    ["Margot Robbie", "Goku", "Naruto",],
    ["Cachorro", "Vaca", 'Gusttavo Lima'],
    ["Frank Sinatra", "Justin Bieber"],
    ["Homem-Aranha", "Batman", "Superman"],
    ["Doutor Estranho", "Leão", "Golfinho"],
    ["Sonic", "Beyoncé", "Gabriel Medina",]
];

//Informa ao usuário para ele pensar em uma das opções válidas
console.log("Pense em uma das opções abaixo para eu tentar adivinhar");
arrayDeRespostasPossiveis.forEach(resposta => {
    console.log(resposta);
});

const { resolve } = require('path');
//motor de inferencia
const readline = require('readline');

const respostaInterface = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

async function fazPergunta(pergunta) {
    return new Promise((resolve) => {
        respostaInterface.question(pergunta, (resposta) => {
            resolve(resposta);
        })
    })
}

async function processaNodo(nodo) {
    if (typeof nodo === 'string') {
        console.log("A resposta é " + nodo)
        return true
    } else if (typeof nodo === 'object' && nodo.pergunta) {
        let resposta = await fazPergunta(nodo.pergunta + " (Digite 1 para SIM ou 2 para NÃO \n)")

        if (resposta == 1 && nodo.subElemento && nodo.subElemento.sim) {
            return await processaNodo(nodo.subElemento.sim)
        } else if (resposta == 2 && nodo.subElemento && nodo.subElemento.nao) {
            return await processaNodo(nodo.subElemento.nao)
        } else {
            return false //nenhuma resposta encontrada
        }
    }
}

async function iniciarPerguntas(perguntas) {
    

    for (const pergunta of perguntas) {
        let resposta = await processaNodo(pergunta);
        if (resposta) {
            break
        }
    }
    respostaInterface.close()

}

iniciarPerguntas(perguntas);