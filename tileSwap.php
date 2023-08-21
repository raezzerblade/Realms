<?php
    if (
        isset($_GET['gameID']) &&
        isset($_GET['oldTileSwap']) &&
        isset($_GET['newTileSwap']) &&
        isset($_GET['oldTileNum']) &&
        isset($_GET['newTileNum'])
    ) {
        $gameID = $_GET['gameID'];
        $oldTileSwap = $_GET['oldTileSwap'];
        $newTileSwap = $_GET['newTileSwap'];
        $oldTileNum = $_GET['oldTileNum'];
        $newTileNum = $_GET['newTileNum'];

        $jsonFilePath = 'data/game_' . $gameID . '.json'; // Assuming 'data' is the folder where JSON files are stored
        $jsonData = file_get_contents($jsonFilePath);
        $gameData = json_decode($jsonData);

        $gameData->tiles->$oldTileNum->type = $newTileSwap;
        $gameData->tiles->$newTileNum->type = $oldTileSwap;

        file_put_contents($jsonFilePath, json_encode($gameData));

        echo json_encode(["status" => "success", "message" => "Data updated successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incomplete data provided!"]);
    }
?>
