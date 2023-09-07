const footer = document.getElementById("footer");
let ticks = 0;
let commands = ["cd dev", "ls", "cd project", "code .", "git add .", "git commit -m 'first commit'", "git push origin master"];
let currentCommand = 0;
let isBusy = 0;

setInterval(() => {
    let currentText = footer.innerHTML;

    if (currentText[currentText.length - 1] === "|") {
        currentText = currentText.slice(0, -1);
    } else {
        currentText += "|";
    }

    footer.innerHTML = currentText;

    if (ticks % 5 === 0 && !isBusy) {
        isBusy = true;
        footer.innerHTML = footer.innerText.replace(commands[currentCommand], '');


        currentCommand = Math.floor(Math.random() * commands.length);
        
        footer.innerHTML = footer.innerText.replace('|', '');

        let idx = 0;
        let interval = setInterval(() => {
            if (idx < commands[currentCommand].length) {
                footer.innerHTML += commands[currentCommand].charAt(idx);
                idx++;
            } else {
                isBusy = false;
                clearInterval(interval);
            }
        }, 25);


        ticks = 0;
    } 

    if (!isBusy) ticks++;
}, 1500);