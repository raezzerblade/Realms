//INTERVAL
$(document).ready(function(){
    setInterval(function(){ 
        displayChat();
     }, 500);
  });
//DISPLAY CHAT
function displayChat() {
    $.getJSON("index.json", function(index){
        //find size of chat object
            size = index.chat.text.length;
            chat = index.chat.text;

            if (size > chatLines) {
                textBox = document.getElementById("textBox");
                textBox.appendChild(document.createTextNode(chat[chatLines]));
                textBox.appendChild(document.createElement("br"));
                $("#textBox").scrollTop(document.getElementById("chatBox").scrollHeight);
                chatLines++;
            }
    });
}
//TYPE CHAT
$(document).ready(function(){
    chatLines = 0;
    $("#typeArea").keypress(function(e){
        if (e.which == 13) {
            e.preventDefault();
            let text = this.value;
            $.get(
                "indexChat.php", 
                { said:text },   
                function(){
                    $("#typeArea").val("");
                }
                );
            
        }
    });
})
//CLEAR CHAT
$(document).ready(function(){
    $("#clearChat").click(function(){
        chatLines = 0;
        $.get(
            "indexChat.php", 
            { said:"reset" },   
            function(){
                $("#typeArea").val("");
                $("#textBox").empty();
            }
        ); 
    });
})
//CACHE
$(document).ready(function() {
    $.ajaxSetup({ cache: false });
    });