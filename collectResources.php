<?php
if (isset($_GET['gameID']) && isset($_GET['player'])) {

    $gameID = $_GET['gameID'];
    $player = $_GET['player'];

    $jsonFilePath = 'data/game_' . $gameID . '.json';
    $jsonData = file_get_contents($jsonFilePath);
    $gameData = json_decode($jsonData);

    $gold = $gameData->players->$player->resources->gold;
    $iron = $gameData->players->$player->resources->iron;
    $wood = $gameData->players->$player->resources->wood;
    $water = $gameData->players->$player->resources->water;
    $food = $gameData->players->$player->resources->food;

    foreach ($gameData->tiles as $tile) {
        if (
            ($tile->unit == 'villager' && $tile->player == $player) ||
            ($tile->building == "market" && $tile->player == $player)
            ) {
            switch ($tile->type) {
                case 'gold': $gold++; break;
                case 'iron': $iron++; break;
                case 'wood': $wood++; break;
                case 'water': $water++; break;
                case 'food': $food++; break;
            }
        }
    }

    $gameData->players->$player->resources->gold = $gold;
    $gameData->players->$player->resources->iron = $iron;
    $gameData->players->$player->resources->wood = $wood;
    $gameData->players->$player->resources->water = $water;
    $gameData->players->$player->resources->food = $food;

    file_put_contents($jsonFilePath, json_encode($gameData));
    echo json_encode(['status' => 'success', 'message' => 'JSON file updated successfully']);

} else {
    echo json_encode(['status' => 'error', 'message' => 'Required variables not provided']);
}
?>
