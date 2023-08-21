<?php
    //receive data
        $said = $_GET['said'];
    //extract data
        $json = file_get_contents('index.json');
        $index = json_decode($json); 
    //CLEAR CHAT
    if ($said == "reset") {
        //put data
        $index->chat->text = array("Welcome to Realms of Romulus!");
    }
    //REGULAR CHAT
    else {
    //put data
        $oldArray = $index->chat->text;
        array_push($oldArray, $said);
        $index->chat->text = $oldArray;
    }
    //record in data
        file_put_contents('index.json', json_encode($index));
?>