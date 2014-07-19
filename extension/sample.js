
function callOnClick(info, tab) {

  selectionText = info.selectionText;
  if(!selectionText) {
    return;
  }
  chrome.storage.local.get( function (data) {
    data[selectionText] = 1;
    if (navigator.onLine) {
      var string = JSON.stringify(data);
     // alert(string);
      var x = new XMLHttpRequest();
      x.open('POST','http://198.206.15.145:3004/hello',true);
      x.setRequestHeader('Content-type','application/json; charset=utf-8');

      x.onreadystatechange = function(){
          if (x.readyState != 4) return;
          if (x.status != 200 ) {
              chrome.storage.local.set(data);
              return;
          }
          chrome.storage.local.clear();   
      }
      console.log(string);
      x.send(string);

    }
    else {
      chrome.storage.local.set(data);
    }
  });
  console.log("info: " +   info.selectionText);
  console.log("tab: " + JSON.stringify(tab));
}

var id = chrome.contextMenus.create({"title": "Mark as root", "contexts":["selection"],
                                       "onclick": callOnClick});


