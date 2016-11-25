// JavaScript source code
var news_element;
var YOUR_APP_KEY = "YOUR_APP_KEY";
var YOUR_CLIENT_KEY = "YOUR_CLIENT_KEY";
var ncmb;




function DocumentReadyStateInteractiveFunc(e) {
    ncmb = new NCMB(YOUR_APP_KEY, YOUR_CLIENT_KEY);
    news_element = document.getElementById('content');
    var newsClass = ncmb.DataStore("news");
    newsClass.fetchAll()
             .then(function (results) {
                 var data = [];
                 for (var i = 0; i < results.length; i++) {
                     var result = results[i];
                     news = document.createElement('p');
                     if(result.get("endday") != null){
                        news.textContent = result.get("content");
                        endday = new Date(result.get("endday"));
                        var time_str = new Date();
                        var diffday = parseInt(((endday - time_str)/86400000),10);

                        news.textContent = news.textContent + " あと" +diffday+"日";
                        news_element.appendChild(news);
                     }else{
                        news.textContent = result.get("content");
                        news_element.appendChild(news);
                     }
                 }
              });

    ncmb.File.download("mBaaS_image.png",'blob')
        .then(function(fileData){
            var img = document.createElement('img');
            var reader = new FileReader();
            news_element.appendChild(img);
            blobToDataURL(fileData,function(dataurl){
                img.src = dataurl;
            });

        })
        .catch(function(err){
            console.log(err);
        })

}


// Wait construct DOM
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", DocumentReadyStateInteractiveFunc);
}

//**blob to dataURL**
function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}
