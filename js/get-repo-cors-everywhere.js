var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        options.method + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      );
    };
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
  }
 function getRepositories(){
      doCORSRequest({
        method: this.id === 'post' ? 'POST' : 'GET',
        url: 'http://reonardo.000webhostapp.com/git/get-repo.php',
        data: ''
      }, function printResult(result) {
            result = result.replace('GET', '');
            result = result.replace('200', '');
            result = result.replace('OK', '');
            result = result.replace('http://reonardo.000webhostapp.com/git/get-repo.php', '');
            result = result.trim();
            repositories = result.split('|');
            $("body").append("<table>");
            fim = 1;
            document.getElementById('loading').style.display = 'none';
            for(var i = 0; i<repositories.length-1; i++){
             
               console.log(repositories[i].split('- ')[0]);
               if((repositories[i].split('- ')[0])!="reonardoleis.github.io "){
               $("table").append('<tr><td><div class="col s12 m4"><div class="icon-block"><h5 class="center">'+repositories[i].split('- ')[0]+'</h5><p class="light center">'+repositories[i].split('- ')[1]+'</p></div><p class="center"><a href="https://github.com/reonardoleis/'+repositories[i].split('- ')[0]+'">View repository</a></p></div></td></tr>');
              }
             
            }
            $("body").append("</table>");
      });
    
   }