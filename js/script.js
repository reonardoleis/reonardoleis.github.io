const footer = document.getElementById("footer");
let ticks = 0;
let commands = ["cd dev", "ls", "cd project", "code .", "git add .", "git commit -m 'first commit'", "git push origin master"];
let originalCommands = ["cd dev", "ls", "cd project", "code .", "git add .", "git commit -m 'first commit'", "git push origin master"];
let currentCommand = 0;
let isBusy = false;
let flip = false;
setInterval(() => {
    if (flip) {
        footer.innerHTML = footer.innerHTML.replaceAll('|', '');
    } else if (footer.innerHTML.indexOf('|') === -1) {
        footer.innerHTML += '|';
    }

    flip = !flip;
}, 500);

setInterval(() => {
    if ((ticks % 15 === 0 || ticks === 0) && !isBusy) {
        isBusy = true;
        footer.innerHTML = 'reonardoleis@pc ~ $&nbsp;';

        commands.splice(currentCommand, 1);
        currentCommand = Math.floor(Math.random() * commands.length);

        if (commands.length === 0) commands = [...originalCommands];



        let idx = 0;
        let interval = setInterval(() => {
            if (idx < commands[currentCommand].length) {
                footer.innerHTML += commands[currentCommand].charAt(idx);
                idx++;

                if (!flip) {
                    footer.innerHTML = footer.innerHTML.replaceAll('|', '');
                    footer.innerHTML += '|';
                } else {
                    footer.innerHTML = footer.innerHTML.replaceAll('|', '');
                }
            } else {
                isBusy = false;
                clearInterval(interval);
            }
        }, 25);

    }

    if (!isBusy) ticks++;
}, 3000);


let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let originalKonamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let pressedKeys = [];
let lastTime = 0;
const maxWaitTimeMs = 1000;
setInterval(() => {
    let now = +(new Date());
    if (now - lastTime > maxWaitTimeMs) {
        konamiCode = [...originalKonamiCode];
        pressedKeys = [];
    }
}, 100);

document.onkeyup = function (e) {
    console.log(e.keyCode);
    if (e.keyCode === konamiCode[0]) {
        lastTime = +(new Date());
        let [key] = konamiCode.splice(0, 1);
        pressedKeys.push(key);
    } else {
        konamiCode = [...originalKonamiCode];
        pressedKeys = [];
    }

    if (pressedKeys.length === originalKonamiCode.length) {
        animateRotateBody360();
    }
}

function animateRotateBody360() {
    let body = document.getElementsByTagName("body")[0];
    body.style.transform = "rotate(360deg)";
    body.style.transition = "transform 2s";
    setTimeout(() => {
        body.style.transform = "rotate(0deg)";
    }, 2000);
}