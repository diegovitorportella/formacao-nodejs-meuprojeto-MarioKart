const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRA: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRA: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;

        case random < 0.66:
            result = "CURVA"
            break;

        default:
            result = "CONFRONTO"
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {

    console.log(`${characterName} 🎲 rolou dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)

}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 6; round++) {
        console.log(`🏁 Round ${round} começando`)

        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTextSkill1 = 0;
        let totalTextSkill2 = 0;

        if (block === "RETA") {
            totalTextSkill1 = diceResult1 + character1.MANOBRA;
            totalTextSkill2 = diceResult2 + character2.MANOBRA;

            await logRollResult(
                character1.NOME,
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
            );

            await logRollResult(
                character2.NOME,
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );

        }
        if (block === "CURVA") {
            totalTextSkill1 = diceResult1 + character1.MANOBRA;
            totalTextSkill2 = diceResult2 + character2.MANOBRA;

            await logRollResult(
                character1.NOME,
                "manobra",
                diceResult1,
                character1.MANOBRA
            );

            await logRollResult(
                character2.NOME,
                "manobra",
                diceResult2,
                character2.MANOBRA
            );

        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult2 + character1.PODER

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`)

            await logRollResult(
                character1.NOME,
                "poder",
                diceResult1,
                character1.PODER
            );

            await logRollResult(
                character2.NOME,
                "poder",
                diceResult2,
                character2.PODER
            );

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            }

            if (powerResult2 === powerResult1) {
                console.log("Confronto empatado! Nenhum ponto foi perdido")

            }


        }

        if (totalTextSkill1 > totalTextSkill2) {
            console.log(`${character1.NOME} marcou 1 ponto!`)
            character1.PONTOS++
        } else if (totalTextSkill2 > totalTextSkill1) {
            console.log(`${character2.NOME} marcou 1 ponto!`)
            character2.PONTOS++
        }

        console.log("_____________________________")
    }

}

async function declareWinner(character1, character2) {
    console.log("Resultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns!🏆`)
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns!🏆`)
    } else {
        console.log("\nA corrida terminou em empate!")
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})()
