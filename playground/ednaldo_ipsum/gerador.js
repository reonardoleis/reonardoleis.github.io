var ednaldos = `I have God, he is a God
Good, I'm man, I'm man
Gosto de liberdade e felicidade
Não quero a guerra
Cada vez mais quero a paz

God is good, he is a God
Só Deus é bom em quem podemos confiar
Pois ele é a verdade
E a vida para todos que acreditam nele

I have God, he is a God
Good tenho que em qualquer lugar
Falar de Deus no limite
Sem parar e glorificar

I'm man, I'm man
God is good, I have God
É bom confiar em Deus de verdade
God is good, viva a liberdade

What is the brother?
What is the brother?
Uma fraternidade
Vamos procurar viver em igualdade

What is the brother?
What is the brother?
Vamos brilhar como um diamante
Em uma geração marcante

What is the brother?
What is the brother?
É aquele que faz a caridade
Em serviço da bondade

What is the brother?
What is the brother?
Vamos mudar esse sistema
De vida que fraco está
Não podemos assim continuar

What is the brother ?
What is the brother?
Uma fraternidade
Vamos procurar viver em igualdade

What is the brother?
What is the brother?
Vamos brilhar como um diamante
Em uma geração marcante

What is the brother?
What is the brother?
É aquele que faz a caridade
Em serviço da bondade

What is the brother?
What is the brother?
Vamos mudar esse sistema
De vida que fraco está
Não podemos assim continuar

Você não vale nada
Você vale tudo
Você topa qualquer parada
Pois você quer ser tudo
E não é de nada

Jogue somente para ganhar, e não para perder
A vida é assim, cheia de dificuldades
Fale o que quiser

Você não vale nada
Você vale tudo
Você não topa qualquer parada
Pois você quer ser nada
E é de tudo

Vale nada, vale tudo
Vale o que quiser
Não jogue para perder
Você não é de tudo
E não é de nada
E topa qualquer parada

tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris a diam maecenas sed enim ut sem viverra aliquet eget sit amet tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus`;

function ednaldoIpsum (palavras, frases) {
    palavras = palavras.toLowerCase().split(' ');
    for (let i = 0; i < palavras.length; i++) {
        palavras[i] = palavras[i].replace(/\?/g, "").replace(/\./g, "").replace(/\,/g, "").replace(/ /g, "");
    }
    let saida = '';
    for (let i = 0; i < frases; i++) {
        let saida_temp = '';
        let num_palavras = Math.floor(Math.random() * 15) + 5;
        for (let j = 0; j < num_palavras; j++) {
            let randomElement =     palavras[Math.floor(Math.random() * palavras.length)];
            saida_temp += randomElement + " ";
        }
        saida_temp = saida_temp.charAt(0).toUpperCase() + saida_temp.substring(1, saida_temp.length);
        saida += saida_temp.substring(0, saida_temp.length - 1) + ". ";
    }
    return saida.replace(/\n/g, " ");
}

function gera() {
    let frases = document.getElementById('frases').value;
    let texto = ednaldoIpsum(ednaldos, parseInt(frases));
    document.getElementById('saida').innerText = texto;
}


var angulo = 0;
function giraImage() {
    document.getElementsByTagName('img')[0].style.transform = `rotate(${angulo}deg)`;;
    angulo++;
    setTimeout(() => {giraImage()}, 100);
}
giraImage();