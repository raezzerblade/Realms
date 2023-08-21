<?php
//Error Reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Initialize a default response
$response = [
    'status' => 'error',
    'message' => 'Invalid data or action'
];

if (isset($_GET['gameID']) && isset($_GET['player']) && isset($_GET['card']) && isset($_GET['action']) ) {

    $gameID = $_GET['gameID'];
    $player = $_GET['player'];
    $card = $_GET['card'];
    $action = $_GET['action'];

    // Read the JSON data from the file using the correct file path
    $jsonFilePath = 'data/game_' . $gameID . '.json'; // Assuming 'data' is the folder where JSON files are stored
    $jsonData = file_get_contents($jsonFilePath);
    $gameData = json_decode($jsonData);

    $templeCards = array(
        "insurgency", "indoctrination", "colonize", "terraform", 
        "confusion", "greatWall", "goldenAge", "campaign", 
        "doctrine", "propoganda", "conscription", "tithe"
    );
    $marketCards = array(
        "serfdom", "mercenary", "deal", "interest", 
        "monopoly", "depression", "forcedDeal", "heist", 
        "taxes", "sabotage", "theft", "coercion"
    );
    $castleCards = array(
        "pincer", "deflect", "block", "parry", 
        "flank", "charge", "bloodMoney", "retreat", 
        "famine", "pestilence", "pompeii", "taunt"
    );
    $libraryCards = array(
        "loot", "climbing", "swarm", 
        "militia", "cannibalism", "puppetState", 
        "seafarer", "siphon", "espionage", 
        "conviction", "volley", "inquisition", 
        "surplus", "innovation", "cover", 
        "scouts", "haste", "guerilla"
    );
    $allCards = array(
        'coercion' => 'Coercion: Each player must give you 2 resources of their choosing',
        'theft' => 'Theft: Steal 6 resources from an enemy player',
        'sabotage' => 'Sabotage: Skip a player turn',
        'taxes' => 'Taxes: Collect 1 gold from the bank for each unit owned',
        'heist' => 'Heist: Steal 2 cards from a player of your choice',
        'forcedDeal' => 'Forced Deal: Swap all resource cards with another player',
        'depression' => 'Depression: Everyone must return all resources to the bank',
        'monopoly' => 'Monopoly: Steal all of 1 type of resource from each player',
        'interest' => 'Interest: Place a resource on this card and passively receive 5x the value from the bank next turn',
        'deal' => 'Deal: Trade any resources in your hand with the bank at a 1:1 ratio',
        'mercenary' => 'Mercenary: Place 2 free hoplites on any of your owned or adjacently owned tiles',
        'serfdom' => 'Serfdom: Collect from all your villagers and markets',
        'tithe' => 'Tithe: Receive the benefits of an enemy action card instead of them',
        'conscription' => 'Conscription: Move all barbarians up to one time after playing this card',
        'propoganda' => 'Propoganda: Convert an enemy building directly next to your priest',
        'doctrine' => 'Doctrine: Convert any enemy unit next to your priest excluding kings and barbarians',
        'campaign' => 'Campaign: Teleport one frinedly unit to an unoccupied tile, excluding the volcano',
        'goldenAge' => 'Golden Age: Change any and all buildings or units in your realm',
        'greatWall' => 'Great Wall: Build 5 consecutive walls for free anywhere',
        'confusion' => 'Confusion: Switch an enemy unit with any unit on the map, excluding kings or units adjacent to kings',
        'terraform' => 'Terraform: Swap any tiles on the map up to 4 times',
        'colonize' => 'Colonize: Build a town on any unoccupied tile, excluding mountains or the volcano',
        'indoctrination' => 'Indoctrination: Move one enemy unit from each player, excluding kings or units adjacent to kings',
        'insurgency' => 'Insurgency: Place 2 barbarians on any unoccupied tiles, excluding tiles adjacent to kings',
        'taunt' => 'Taunt: Make an enemy unit move in any direction after playing this card',
        'pompeii' => 'Pompeii: All units and structures on or adjacent to the volcano are destroyed',
        'pestilence' => 'Pestilence: All units on or adjacent to each port perish',
        'famine' => 'Famine: The greater half of each player peasant population will perish',
        'retreat' => 'Retreat: Move any of your units back to unoccupied tiles on or adjacent to your owned structures',
        'bloodMoney' => 'Blood Money: Pay 4 gold to destroy any unit, excluding a king. This can be done multiple times',
        'charge' => 'Charge: Move one of your military units',
        'flank' => 'Flank: Destroy an enemy unit adjacent to 2 of your military units',
        'parry' => 'Parry: Anyone who just tried attacking you loses their unit instead',
        'block' => 'Block: Undo any attack on you',
        'deflect' => 'Deflect: Redirect an attack on your unit to an adjacent tile',
        'pincer' => 'Pincer: Destroy an enemy unit on a tile in between your military units',
        'surplus' => 'Surplus: Food can be traded at a 1:1 ratio',
        'guerilla' => 'Guerilla: As an action, a friendly peasant may be converted to a hoplite for free',
        'inquisition' => 'Inquisition: Priests can destroy priests and peasants by moving onto their tile',
        'volley' => 'Volley: Archers can now do ranged attacks, but cavalry are immune and archers still cancel out',
        'conviction' => 'Conviction: Immune to priest conversions',
        'haste' => 'Haste: Non military units move twice as fast',
        'espionage' => 'Espionage: Look at any enemy cards at any time',
        'siphon' => 'Siphon: Benefit from all active upgrade cards from other players',
        'seafarer' => 'Seafarer: Water, without a structure, is now impassible to everyone except you. Units on water drown',
        'scouts' => 'Scouts: Hoplites are neutral to your cavalry',
        'puppetState' => 'Puppet State: Control barbarians as an action for free',
        'cannibalism' => 'Cannibalism: Each unit you kill turns into 2 food and each unit you lose turns into 1 food',
        'militia' => 'Militia: Peasants act as hoplites if attacked',
        'cover' => 'Cover: Your hoplites are now neutral to archers',
        'cavalry' => 'Cavalry: Cavlary now go twice as far',
        'climbing' => 'Climbing: You can pass through mountains without roads, excluding the volcano',
        'loot' => 'Loot: 1 Player must give you 1 resource at the start of your turn. This responsibilty rotates each turn',
        'innovation' => 'Innovation: Gain 1 card during each collection'
    );

    $actionCards = $gameData->players->$player->cards->action;
    $upgradeCards = $gameData->players->$player->cards->upgrade;
    $activeUpgrade = $gameData->players->$player->cards->activeUpgrade;

    $username = $gameData->players->$player->username;

    if ($action == "templeBuy") {
        $card = $templeCards[array_rand($templeCards)];
        $actionCards[] = $card;
        $gameData->players->$player->cards->action = $actionCards;

    } else if ($action == "marketBuy") {
        $card = $marketCards[array_rand($marketCards)];
        $actionCards[] = $card;
        $gameData->players->$player->cards->action = $actionCards;

    } else if ($action == "castleBuy") {
        $card = $castleCards[array_rand($castleCards)];
        $actionCards[] = $card;
        $gameData->players->$player->cards->action = $actionCards;

    } else if ($action == "libraryBuy") {
        $card = $libraryCards[array_rand($libraryCards)];
        $upgradeCards[] = $card;
        $gameData->players->$player->cards->upgrade = $upgradeCards;

    } else if ($action == "action") {
        // Find the index of the card to be removed
        $index = array_search($card, $actionCards);
        // Remove the card from the array
        if ($index !== false) {
            unset($actionCards[$index]);
        }
        // Re-index the array after removing the card
        $actionCards = array_values($actionCards);
        // Update the player's cards in the game data
        $gameData->players->$player->cards->action = $actionCards;
        //CHAT MESSAGE
            //create a new line
                $oldLine = $gameData->chat->line;
                $newLine = $oldLine + 1;
                $gameData->chat->line = $newLine;
                $said = $allCards[$card];
            //record to array
                $gameData->chat->text[$newLine][0] = $player;
                $gameData->chat->text[$newLine][1] = $username;
                $gameData->chat->text[$newLine][2] = $said;

    } else if ($action == "upgrade") {

        // Find the card, remove it, reindex it, and update the file.
        $index = array_search($card, $upgradeCards);
        if ($index !== false) {
            unset($upgradeCards[$index]);
        }
        $upgradeCards = array_values($upgradeCards);
        $gameData->players->$player->cards->upgrade = $upgradeCards;

        // Add to active upgrade
        if ($activeUpgrade == "NA") {
            $gameData->players->$player->cards->activeUpgrade = $card;
        } else {
            //Deal with old card first
            $oldCard = $gameData->players->$player->cards->activeUpgrade;
            $upgradeCards = $gameData->players->$player->cards->upgrade;
            $upgradeCards[] = $oldCard;
            $gameData->players->$player->cards->upgrade = $upgradeCards;
            //Add new card
            $gameData->players->$player->cards->activeUpgrade = $card;
        }
    }

    file_put_contents($jsonFilePath, json_encode($gameData));
    // If the operations are successful, you can update the response accordingly:
    $response['status'] = 'success';
    $response['message'] = 'Data processed successfully';
}

// Send JSON response back
header('Content-Type: application/json');
echo json_encode($response); 

?>