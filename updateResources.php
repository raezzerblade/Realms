<?php
//UPDATE RESOURCES
if (isset($_GET['gameID']) && isset($_GET['player']) && isset($_GET['resource']) && isset($_GET['amount'])) {

    $gameID = $_GET['gameID'];
    $player = $_GET['player'];
    $resource = $_GET['resource'];
    $amount = $_GET['amount'];

    // Read the JSON data from the file using the correct file path
    $jsonFilePath = 'data/game_' . $gameID . '.json'; // Assuming 'data' is the folder where JSON files are stored
    $jsonData = file_get_contents($jsonFilePath);
    $gameData = json_decode($jsonData);

    // Put the variable in the box
        $current = $gameData->players->$player->resources->$resource;
        $gameData->players->$player->resources->$resource = $amount + $current;

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
