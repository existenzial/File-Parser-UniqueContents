function readFileAndCountDupes(evt) {
  var file = evt.target.files[0];
  if (file) {
    var reader = new FileReader();

    reader.onload = function(e) {

      var contents = e.target.result;
      var ct = reader.result;
      var words = ct.split(' ');

      var list = document.getElementById("results");
      list.innerHTML = ""; //clear HTML before new file read

      //obj to store vals & numOccurences
      var countMap = {};
      //iterate through file words
      for(var i = 0; i < words.length - 1; i++){
        var word = words[i];
        //map each word to its numOfOccurences
        if(!countMap[word]){
          countMap[word] = 0;
          countMap[word]++;
        } else {
          countMap[word]++;
        }
      } //end of for
      //save reference to the de-duped keys
      var keys = Object.keys(countMap);
      //sort keys in alphabetized order
      keys.sort();

      //append each sorted key and numOfOccurences as an <li>
      for(var j = 0; j < keys.length; j++){

        if(countMap.hasOwnProperty(keys[j])){

          var li = document.createElement("li");
          var liText = document.createTextNode(keys[j] + " " + countMap[keys[j]]);
          li.appendChild(liText);
          list.appendChild(li);

        } //end of if

      } //end of for

    } //end of reader.onload
    //Parse the uploaded in file as text
    reader.readAsText(file);
  } else {
    list.appendChild(document.createTextNode("Unable to load or parse file"));
  }
}

document.getElementById('fileinput').addEventListener('change', readFileAndCountDupes, false);
