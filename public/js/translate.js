const translateme = mymessage => {
   
    var datainp = messageFormInput.value
    //source_lan and res_lan are pasred from location.search by the QS library in chat.js

    const inputlink =
      "http://localhost:5000/translated?source_lan=" +
      source_lan +
      "&res_lan=" +
      res_lan +
      "&inputstring=" +
      datainp;
    console.log(inputlink);
  
    fetch(inputlink).then(res => {
      res.json().then(data => {
        console.log(data);
        console.log(data.translatedText);
        const input = document.getElementById("input");
        messageFormInput.value = data.translatedText;
       
      });
    });
};
  