const snakestart = [0,17,54,62,64,87,93,95,99]
const snakeend = [0,7,34,19,60,24,73,75,78]

const ladderstart = [0,4,9,20,28,40,51,63,71]
const ladderend = [0,14,31,38,84,59,67,81,91]


const player1 = {
    score : Number(document.getElementById("player1-score").innerHTML),
    player: "Human",
    playernumber : 1,
    playername: "Alice"
}
const player2 = {
    score : Number(document.getElementById("player2-score").innerHTML),
    player: "Robot",
    playernumber : 2,
    playername: "Jeel" 
}

let curplay = 0
let flag = 1

function findsnake(current) {
    for(let i=1;i<snakestart.length;i++) {
        if(current == snakestart[i]) {
            return i
        }
    }
}

function findladder(current) {
    for(let i=1;i<ladderstart.length;i++) {
        if(current == ladderstart[i]) {
            return i
		}
    }
}

function start(player) {
        if(player.player == "Human") {
            let random = Math.ceil(Math.random() * 6)
            document.getElementById("rolldice").setAttribute("src","images/"+random+".png")
            if(player.playernumber == 1) {
                document.getElementById("prev1").innerHTML = player.score
            } else {
                document.getElementById("prev2").innerHTML = player.score
            }
            let current = player.score + random    
            if(current == 100) {
                document.getElementById("declare").innerHTML = "Winner "+ player.playername
				document.getElementById("board").setAttribute("src","images/winner.png")
				player.score = current
				if(player.playernumber == 1) {
                    document.getElementById("player1-score").innerHTML = player.score
                } 
                if(player.playernumber == 2) {
                    document.getElementById("player2-score").innerHTML = player.score
                }
                flag = 0
            } else if(current > 100) {
            } else if(findsnake(current)) {
                let i = findsnake(current)
                player1.score = snakeend[i]
            } else if(findladder(current)) {
                let i = findladder(current)
                player.score = ladderend[i]
            } else {
                player.score = current
            }
            if(player.playernumber == 1) {
                document.getElementById("player1-score").innerHTML = player.score
            } else {
                document.getElementById("player2-score").innerHTML = player.score
            }
            if(flag == 1 && player2.player == "Robot") {
                setTimeout(() => {
                   let random = 0
                    random = Math.ceil(Math.random() * 6)
                    document.getElementById("rolldice").setAttribute("src","images/"+random+".png")
                    document.getElementById("prev2").innerHTML = player2.score
                    let current = player2.score + random
                    if(current == 100) {
                        document.getElementById("declare").innerHTML = "Winner "+ player2.playername
                        document.getElementById("board").setAttribute("src","images/winner.png")
                        player2.score = current
                        document.getElementById("player2-score").innerHTML = player2.score 
                        flag = 0
                    } else if(current > 100) {
                    } else if(findsnake(current)) {
                        let i = findsnake(current)
                        player2.score = snakeend[i]
                    } else if(findladder(current)) {
                        let i = findladder(current)
                        player2.score = ladderend[i]
                    } else {
                        player2.score = current
                    }
                    document.getElementById("player2-score").innerHTML = player2.score
                    document.getElementById("current2").setAttribute("src","")
                    document.getElementById("current1").setAttribute("src","images/rolldice.png")
                },2000)
            }
        }

}

function gameOn() {
    if(flag == 1) {
        if(curplay == 0) {
            start(player1)
            document.getElementById("current1").setAttribute("src","")
            document.getElementById("current2").setAttribute("src","images/rolldice.png")
            if(player2.player == "Human") {
                curplay = 1
            }
        } else {
            start(player2)
            document.getElementById("current2").setAttribute("src","")
            document.getElementById("current1").setAttribute("src","images/rolldice.png")
            curplay = 0
        }
    }
}

function playerChange() {
    if(player2.player == "Robot") {
        player2.player = "Human"
        document.getElementById("profile2").setAttribute("src","images/player.png")
    } else {
        player2.player = "Robot"
        document.getElementById("profile2").setAttribute("src","images/player2.png")
    }
}