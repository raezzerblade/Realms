<?php 
    //START SESSION
        session_start();
        error_reporting(E_ALL);
        ini_set("display_errors", 1);
?>

<!doctype html>
<html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, post-check=0, pre-check=0" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <title>Realms of Romulus</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <script src="index.js"></script>
        <link rel="stylesheet" href="index.css">
    </head>

    <body>

        <h1>Realms of Romulus</h1>

        <div id="formBox" class="box">

            <p>Host or Join a game</p>
            
            <!--HOST FORM-->
                <form action = "index.php" method="post">
                    <label for="hostInput">Host a Game</label>
                    <input id="hostInput" type="text" name="hostUsername" class="inputText" placeholder="username">
                    <input type="submit" value="Host" id="hostSubmit">
                </form>

            <!--GUEST FORM-->
                <form action = "index.php" method="post">
                    <label for="guestInput">Join a Game</label>
                    <input id="guestInput" type="text" name="guestUsername" class="inputText" placeholder="username">
                    <input type="number" name="gameID" class="inputText" placeholder="game ID">
                    <input type="submit" value="Join" id="joinSubmit">
                </form>
        </div>

        <?php 
            //DEFINE MASTER ARRAY
                $game = array(
                    'players'   => array(),
                    'playerCount'=> 1,
                    'tiles'     => array(),
                    'chat'      => array(),
                    'turn'      => 0,
                    'ID'        => 0
                );

            //DEFINE TILES
                for ($x = 61; $x > 0; $x--) {
                    $game['tiles']['tile'.$x] = array (
                        'type'=> 'ocean', 
                        'player'=>'NA',
                        'unit'=>'NA',
                        'building'=>'NA');
                }
                
            //DEFINE CHAT
                $game['chat']['text'] = array (
                    0 => array ('ID', 'Realm Lord', 'Welcome to Realms!', 0)
                );
                $game['chat']['line'] = 0;

            //DEFINE FUNCTIONS

                function findPlayers($string, $gameID) {
                    //search json
                        $json = file_get_contents('games/game_'.$gameID.'.json');
                        $game = json_decode($json);
                        //get object vars only gets the keys
                        //count can only count keys
                        $playerNumber = count(get_object_vars($game->players)) + 1; 
                        return $string.$playerNumber;
                } 

            //RECEIVE HOST ----------------------------------------------------------------
                if (isset($_POST['hostUsername'])) {
                //DECLARE variables
                    $username = $_POST['hostUsername'];
                    $gameID = rand(10000,99999);
                    $game['ID'] = $gameID; 
                    $turn = 1;
                    $player = "p1";
                    $resources = array (
                        'gold'  => 0,
                        'iron'  => 0,
                        'wood'  => 0,
                        'food'  => 0,
                        'water'  => 0
                    );
                    $cards = array (
                        'action' => array (),
                        'upgrade' => array (),
                        'activeUpgrade' => "NA",
                        'upgradeCount' => 0
                    );
                //SET variables
                    $game['players'][$player] = array (
                        'username'      => $username, 
                        'playerNumber'  => $player,
                        'resources'     => $resources,
                        'cards'         => $cards
                    );
                //Session Variables        
                    $_SESSION["gameID"] = $gameID;
                    $_SESSION["username"] = $username;
                    $_SESSION["player"] = $player;  
                //Randomize Tiles
                    $itemQuantities = [
                        'gold' => 9,
                        'iron' => 9,
                        'wood' => 9,
                        'food' => 9,
                        'water' => 9,
                        'mountain' => 8,
                        'horses' => 2,
                        'holySite' => 2,
                        'camp' => 2,
                        'village' => 2,
                    ];
                    // Initialize an empty array to store all items
                    $allItems = [];
                    // Use array_fill and loop to populate the $allItems array
                    foreach ($itemQuantities as $itemType => $quantity) {
                        $items = array_fill(0, $quantity, $itemType);
                        $allItems = array_merge($allItems, $items);
                    }
                    // Randomly shuffle the items
                    shuffle($allItems);
                    // Display the shuffled items along with their indices
                    foreach ($allItems as $index => $item) {

                        $index = $index +1;
                        if ($index == 31) {
                            $game['tiles']['tile'.$index]['type'] = "volcano";
                        } else if ($item == 'gold') {
                            $game['tiles']['tile'.$index]['type'] = "gold";
                        } else if ($item == 'wood') {
                            $game['tiles']['tile'.$index]['type'] = "wood";
                        } else if ($item == 'food') {
                            $game['tiles']['tile'.$index]['type'] = "food";
                        } else if ($item == 'water') {
                            $game['tiles']['tile'.$index]['type'] = "water";
                        } else if ($item == 'iron') {
                            $game['tiles']['tile'.$index]['type'] = "iron";
                        } else if ($item == 'mountain') {
                            $game['tiles']['tile'.$index]['type'] = "mountain";
                        } else if ($item == 'horses') {
                            $game['tiles']['tile'.$index]['type'] = "horses";
                        } else if ($item == 'village') {
                            $game['tiles']['tile'.$index]['type'] = "village";
                        } else if ($item == 'holySite') {
                            $game['tiles']['tile'.$index]['type'] = "holySite";
                        } else if ($item == 'camp') {
                            $game['tiles']['tile'.$index]['type'] = "camp";
                        }

                    }               
                
                //WRITE JSON
                    file_put_contents('data/game_'.$gameID.'.json', json_encode($game));
                    print "<script>window.location.replace('main.php')</script>";
                }
            //RECEIVE GUEST ----------------------------------------------------------------
                if (isset($_POST['guestUsername'], $_POST['gameID'])) {
                //DECLARE variables
                    $username = $_POST['guestUsername'];
                    $gameID = $_POST['gameID'];
                    $game['ID'] = $gameID; 
                    $resources = array (
                        'gold'  => 0,
                        'iron'  => 0,
                        'wood'  => 0,
                        'food'  => 0,
                        'water'  => 0
                    );
                    $cards = array (
                        'action' => array (),
                        'upgrade' => array (),
                        'activeUpgrade' => "NA",
                        'upgradeCount' => 0
                    );                    
                //EXTRACT JSON
                    $json = file_get_contents('data/game_'.$gameID.'.json');
                    $game = json_decode($json); 
                //Update Game
                    $playerCount = $game->playerCount + 1;
                    $game->playerCount = $playerCount;
                    $player = 'p'.$playerCount;
                    $game->players->$player = (object) [
                        'username'      => $username, 
                        'playerNumber'  => $player,
                        'resources'     => $resources,
                        'cards'         => $cards
                    ];
                //WRITE JSON
                    file_put_contents('data/game_'.$gameID.'.json', json_encode($game));
                //START SESSION    
                    $_SESSION["gameID"] = $gameID;
                    $_SESSION["username"] = $username;
                    $_SESSION["player"] = $player;
                //SEND TO GAME WINDOW       
                    print "<script>window.location.replace('main.php')</script>";
                }

        ?>

    <!--CHAT-->
    <div id="chatBox" class="box">
        <div id="textBox"></div>
        <div id="typeBox">
            <textarea id="typeArea" placeholder='type here'></textarea>
            <button id='clearChat'>Clear Chat</button>
        </div>
    </div>

    </body>
</html>