function readFileAndCountDupes(evt) {
  var file = evt.target.files[0];
  if (file) {
    var reader = new FileReader();

    reader.onload = function(e) {

      var contents = e.target.result;
      /* TEST EXAMPLE
         ------------

        test.txt = ba cc aa bb ba bb cc cc;

        countMap = {
            ba: 2,
            cc: 3,
            aa: 1,
            bb: 2
        };

        keys = Object.keys(countMap) => [ba, cc, aa, bb];
        sortedkeys = keys.sort(function(a,b){
          if(countMap[a] > countMap[b]){
            return 1;
          }
          if(countMap[a] === countMap[b]){
            return 0;
          }
        });

        expectedOutput
        --------------
            cc: 3
            ba: 2
            bb: 2
            aa: 1

      */
      var ct = reader.result;
      var words = ct.split(' ');
      console.log("The words in the file are " + words);
      var list = document.getElementById("results");
      list.innerHTML = ""; //clear HTML before new file read

      //obj to store vals & numOccurences
      var countMap = {};
      //iterate through file words
      for(var i = 0; i < words.length; i++){
        var word = words[i];
        //map each word to its numOfOccurences
        if(!countMap[word]){
          countMap[word] = 0;
          countMap[word]++;
        } else if(countMap[word]){
          countMap[word]++;
        }
      } //end of for(i)
      console.log("This is countMap " + JSON.stringify(countMap));
      //save reference to the de-duped keys
      var keys = Object.keys(countMap);
      // console.log("This is keys BEFORE weighted ", keys);
      //sort keys by:
      //  1st Weight - numOfOccurences
      //  2nd Weight - alphabetize if numOfOccurences is Equal(=)
      keys.sort(function(a, b){
        //sort by greater numOfOccurences
        if(countMap[a] > countMap[b]){ return -1; }
        if(countMap[a] < countMap[b]){ return 1; }
        //else values are equal and sort alphabetically / normally
      });
      // console.log("This is keys AFTER weighted ", keys);
      for(var j = 0; j < keys.length; j++){
        if(countMap.hasOwnProperty(keys[j])){
          //append each sorted key and numOfOccurences as an <li>
          var li = document.createElement("li");
          var liText = document.createTextNode(keys[j] + " " + countMap[keys[j]]);
          li.appendChild(liText);
          list.appendChild(li);
        } //end of if
      } //end of for

    } //end of reader.onload
    //Parse the uploaded input file as text
    reader.readAsText(file);
  } else {
    list.appendChild(document.createTextNode("Unable to load or parse file"));
  }
}

document.getElementById('fileinput').addEventListener('change', readFileAndCountDupes, false);
