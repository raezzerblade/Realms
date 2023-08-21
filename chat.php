<?php
ini_set("display_errors", 1);
header("Content-type:text/plain");
//Chat
    //receive data
        $gameID = $_GET['gameID'];
        $player = $_GET['player'];
        $said = $_GET['said'];
        $username = $_GET['name'];
    //grab json
        $json = file_get_contents('data/game_'.$gameID.'.json');
        $game = json_decode($json); 
    //create a new line
        $oldLine = $game->chat->line;
        $newLine = $oldLine + 1;
        $game->chat->line = $newLine;
    //record to array
        $game->chat->text[$newLine][0] = $player;
        $game->chat->text[$newLine][1] = $username;
        $game->chat->text[$newLine][2] = $said;
    //write json
        file_put_contents('data/game_'.$gameID.'.json', json_encode($game));
?>