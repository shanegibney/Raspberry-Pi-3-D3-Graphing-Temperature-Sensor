$.get("python/temperature.py", function(data, status){
    var newtext = document.createTextNode(data),
	htmlcode = document.getElementById("displaycode");
    htmlcode.appendChild(newtext);

});
