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

// Informa ao usuário para ele pensar em uma das opções válidas
console.log("Pense em uma das opções abaixo para eu tentar adivinhar");
arrayDeRespostasPossiveis.forEach(resposta => {
    console.log(resposta);
});

// Motor de inferência
const readline = require('readline');

const resposta = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fazPergunta(pergunta) {
    return new Promise((resolve) => {
        resposta.question(pergunta, (resposta) => {
            resolve(resposta);
        })
    });
}

async function iniciarPerguntas(perguntas, indice = 0) {

    if (indice >= perguntas.length) {
        console.log("Você não escolheu uma de minhas opções né?");
        resposta.close();
        return;
    }

    let elemento = perguntas[indice];
    let respostaUsuario = await fazPergunta(elemento.pergunta + " SIM ou nao\n\n");
    console.clear();
    if (respostaUsuario === 'sim' || respostaUsuario === 'nao') {
        const proximoElemento = elemento.subElemento[respostaUsuario];

        if (typeof proximoElemento === 'string') {
            console.log("A resposta é: " + proximoElemento + "\n");
            resposta.close();
        } else if (proximoElemento) {
            iniciarPerguntas([proximoElemento]);
        } else {
            iniciarPerguntas(perguntas, indice + 1);
        }
    } else {
        console.log("Resposta inválida. Tente novamente.");
        iniciarPerguntas(perguntas, indice);
    }
}

iniciarPerguntas(perguntas);