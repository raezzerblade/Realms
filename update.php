<?php
function kingDeath($game, $player) {
    if(isset($game->tiles)) {
        foreach ($game->tiles as $tile) {
            if($tile->player == $player && $tile->unit != "NA") {
                $tile->player = "NA";
                $tile->unit = "barbarian";
            }
        }
    }
}

//UPDATE BUILDINGS AND UNITS
if (isset($_GET['gameID']) && isset($_GET['player']) && isset($_GET['piece']) && isset($_GET['tile']) && isset($_GET['oldTile'])) {

    $gameID = $_GET['gameID'];
    $player = $_GET['player'];
    $piece = $_GET['piece'];
    $piece = preg_replace('/\d+$/', '', $piece); //gets rid of numbers after the piece variable
    $tile = $_GET['tile'];
    $oldTile = $_GET['oldTile'];

    // Read the JSON data from the file using the correct file path
    $jsonFilePath = 'data/game_' . $gameID . '.json'; // Assuming 'data' is the folder where JSON files are stored
    $jsonData = file_get_contents($jsonFilePath);
    $gameData = json_decode($jsonData);
    $defender = $gameData->tiles->$tile->unit; //defending unit
    $building = $gameData->tiles->$tile->building; //does it need a preg replaced too?
    $defendingPlayer = $gameData->tiles->$tile->player; //defending player
    $tileType = $gameData->tiles->$tile->type;

    // Put the variable in the box
    if (in_array($piece, array('village', 'market', 'library', 'castle', 'temple', 'road', 'wall'))) {
        //Cannot build on mountains if not a road
        if (
            ($tileType == "mountain" && $piece != "road") ||
            ($tileType == "volcano" && $piece != "road")
        ) {
            return;
        } else {
            $gameData->tiles->$tile->building = $piece;
            if ($player != 'NA') {
                $gameData->tiles->$tile->player = $player;
            }
        }
    } else if (in_array($piece, array('villager', 'king', 'hoplite', 'archer', 'cavalry', 'priest', 'barbarian'))) {
        
        //archer wall
        if ($piece == "archer" && $building == "wall") {
            $gameData->tiles->$tile->unit = $piece;
            $gameData->tiles->$tile->building = "NA";
            $gameData->tiles->$oldTile->unit = "NA";
            if ($player != 'NA') {
                $gameData->tiles->$tile->player = $player;
            }
        }
        //barbarian castle
        else if ($piece == "barbarian" && $building == "castle") {
            $gameData->tiles->$tile->unit = $piece;
            $gameData->tiles->$tile->building = "NA";
            $gameData->tiles->$oldTile->unit = "NA";
            $gameData->tiles->$tile->player = "NA";
            if ($defender == "king") {
                kingDeath($gameData, $defendingPlayer);
            }
        }
        //Switching
        else if (
            ($player == $defendingPlayer && $piece != "barbarian" && $defender != "barbarian")
        ) {
            $gameData->tiles->$tile->unit = $piece;
            $gameData->tiles->$oldTile->unit = $defender;
        }
        //anything castle/wall
        else if (
            ($building == "castle" && $player != $defendingPlayer) || 
            ($building == "wall" && $player != $defendingPlayer)
        ) {
            $gameData->tiles->$oldTile->unit = "NA";
            if ($piece == "king") {
                kingDeath($gameData, $player);
            }
        }
        //Dying on Mountains/Volcano
        else if (
            ($tileType == "mountain" && $building != "road" && $piece != "barbarian")||
            ($tileType == "volcano" && $building != "road" && $piece != "barbarian")
        ) {
            $gameData->tiles->$oldTile->unit = "NA";
            if ($piece == "king") {
                kingDeath($gameData, $player);
            }
        }
        //moving
        else if ($defender == "NA") {
            $gameData->tiles->$tile->unit = $piece;
            $gameData->tiles->$oldTile->unit = "NA";
            if ($player != 'NA') {
                $gameData->tiles->$tile->player = $player;
            }
        } 
        //tie
        else if (
            ($defender == $piece && $defender != "king" && $piece != 'king') || 
            ($defender == 'barbarian' && $piece == "hoplite") || 
            ($defender == "hoplite" && $piece == "barbarian") 
        ){
            $gameData->tiles->$tile->unit = "NA";
            $gameData->tiles->$oldTile->unit = "NA";
        } 
        //convert
        else if ($piece == 'priest') {
            $gameData->tiles->$tile->unit = "NA";
            $gameData->tiles->$oldTile->unit = $defender;
            $gameData->tiles->$oldTile->player = $player;
            if ($defender == "king") {
                kingDeath($gameData, $defendingPlayer);
            }
        } 
        //take
        else if (
            ($piece == "hoplite" && $defender == "cavalry") ||
            ($piece == "archer" && $defender == "hoplite") ||
            ($piece == "cavalry" && $defender == "archer") ||
            ($piece == "cavalry" && $defender == "barbarian") ||

            ($defender == 'king' && in_array($piece, array('hoplite', 'archer', 'cavalry'))) || 
            ($defender == 'villager' && in_array($piece, array('hoplite', 'archer', 'cavalry'))) || 
            ($defender == 'priest' && in_array($piece, array('hoplite', 'archer', 'cavalry')))
        ) {
                $gameData->tiles->$tile->unit = $piece;
                $gameData->tiles->$oldTile->unit = "NA";
                if ($player != 'NA') {
                    $gameData->tiles->$tile->player = $player;
                }
                if ($defender == "king") {
                    kingDeath($gameData, $defendingPlayer);
                }
        }
        else if (
            ($piece == "barbarian" && $defender == "archer") ||
            ($piece == "barbarian" && $defender == "king") ||
            ($piece == "barbarian" && $defender == "villager") ||
            ($piece == "barbarian" && $defender == "priest")
        ) {
            $gameData->tiles->$tile->unit = $piece;
            $gameData->tiles->$oldTile->unit = "NA";
            if ($defender == "king") {
                kingDeath($gameData, $defendingPlayer);
            }
        }
        //don't allow
        else if (
            ($piece == "villager" && in_array($defender, array('villager', 'king', 'priest'))) ||
            ($piece == "king" && in_array($defender, array('villager', 'king', 'priest')))
        ) {
            return;
        }
        //lose  
        else {
            $gameData->tiles->$oldTile->unit = "NA";
            if($piece == "king") {
                kingDeath($gameData, $player);
            }
        } 
        
    } else if ($piece == 'NA') {
        $gameData->tiles->$tile->unit = $piece; 
    } else {
        $gameData->tiles->$tile->unit = $piece;
        if ($player != 'NA') {
            $gameData->tiles->$tile->player = $player;
        } 
    
    } 
    
    // Write the modified JSON back to the file
    file_put_contents($jsonFilePath, json_encode($gameData));

    // Send a response indicating the update was successful (optional)
    $response = array('status' => 'success', 'message' => 'JSON file updated successfully');
    echo json_encode($response);

} else {
    // If any of the required variables are not provided, send an error response (optional)
    $response = array('status' => 'error', 'message' => 'Required variables not provided');
    echo json_encode($response);
}
?>
