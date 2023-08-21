<?php 
    ini_set("display_errors", 1);
    session_start(); 
    $gameID = $_SESSION["gameID"];
    $player = $_SESSION["player"];
    $username = $_SESSION["username"];

?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Realms of Romulus</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
        <script>
            var gameID = '<?php echo $_SESSION["gameID"]; ?>'
            var jsonGameID = "data/game_" + gameID + ".json";
            var username = '<?php echo $_SESSION["username"]; ?>'
            var player = '<?php echo $_SESSION["player"]; ?>'
        </script>
        <script src="scripts.js"></script>
        <link rel="stylesheet" href="styles.css">
        <style>
            <?php if ($player == "p1"): ?>
                .box {
                    background-color: rgba(0, 255, 255, 0.5); /* aqua with 25% opacity */
                }
            <?php endif; ?>
            <?php if ($player == "p2"): ?>
                .box {
                    background-color: rgba(255, 192, 203, 0.5); /* pink with 25% opacity */
                }
            <?php endif; ?>
            <?php if ($player == "p3"): ?>
                .box {
                    background-color: rgba(255, 255, 0, 0.5); /* yellow with 25% opacity */
                }
            <?php endif; ?>
            <?php if ($player == "p4"): ?>
                .box {
                    background-color: rgba(50, 205, 50, 0.5); /* limegreen with 25% opacity */
                }
            <?php endif; ?>
        </style>
    </head>

    <body>

        <h1>Realms of Romulus</h1>
        
        <div id="info" class="box">
            <span>
                Game ID: <?php echo $gameID; ?><br>
                Player: <?php echo $player; ?><br>
                Username: <?php echo $username; ?>
            </span>
        </div>
        
        <div class="pieces box">
            <img id="hoplite" class="p0 piece hoplite set" src="art/hoplitePiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="archer" class="p0 piece archer set" src="art/archerPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="cavalry" class="p0 piece cavalry set" src="art/cavalryPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="priest" class="p0 piece priest set" src="art/priestPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="villager" class="p0 piece villager set" src="art/peasantPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="king" class="p0 piece king set" src="art/kingPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="barbarian" class="p0 piece barbarian set" src="art/barbarianPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="village" class="p0 building village set" src="art/TownPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="castle" class="p0 building castle set" src="art/CastlePiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="library" class="p0 building library set" src="art/ObservatoryPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="temple" class="p0 building temple set" src="art/TemplePiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="market" class="p0 building market set" src="art/MarketPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="road" class="p0 building road set" src="art/roadPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
            <img id="wall" class="p0 building wall set" src="art/WallPiece.png" draggable="true" ondragstart="drag(event)" ondragend="endDrag(event)">
        </div>  

        <div id="resources" class="box">
            <div id="waterBox" class="RecCon water">
                <button onclick="updateResources(gameID, player, 'water', 1)">+</button><p>Water:&nbsp;</p><span id="water" class="RNum">0</span><button onclick="updateResources(gameID, player, 'water', -1)">-</button>
            </div>
            <div id="woodBox" class="RecCon wood">
                <button onclick="updateResources(gameID, player, 'wood', 1)">+</button><p>Wood:&nbsp;</p><span id="wood" class="RNum">0</span><button onclick="updateResources(gameID, player, 'wood', -1)">-</button>
            </div>
            <div id="foodBox" class="RecCon food">
                <button onclick="updateResources(gameID, player, 'food', 1)">+</button><p>Food:&nbsp;</p><span id="food" class="RNum">0</span><button onclick="updateResources(gameID, player, 'food', -1)">-</button>
            </div>
            <div id="ironBox" class="RecCon iron">
                <button onclick="updateResources(gameID, player, 'iron', 1)">+</button><p>Iron:&nbsp;</p><span id="iron" class="RNum">0</span><button onclick="updateResources(gameID, player, 'iron', -1)">-</button>
            </div>
            <div id="goldBox" class="RecCon gold">
                <button onclick="updateResources(gameID, player, 'gold', 1)">+</button><p>Gold:&nbsp;</p><span id="gold" class="RNum">0</span><button onclick="updateResources(gameID, player, 'gold', -1)">-</button>
            </div>
            <div id="collect">
                <button onclick="collectResources(gameID, player)">Collect</button>
            </div>
        </div>    

        <div id="display" class="box">
            Player 1: <span id="p1Here"></span> <br>
            Player 2: <span id="p2Here"></span> <br>
            Player 3: <span id="p3Here"></span> <br>
            Player 4: <span id="p4Here"></span>
        </div>

        <div id="chatBox" class="box">
            <div id="chatDisplay"></div>
            <textarea id="typeArea" placeholder="type here..."></textarea>
        </div>

        <div id="cardBox" class="box">
            <div id="cardDescription"></div>
            <div id="upgradeBox">
                <h4>Active Upgrades</h4>
                Player 1: <span id="p1Upgrade"></span> <br>
                Player 2: <span id="p2Upgrade"></span> <br>
                Player 3: <span id="p3Upgrade"></span> <br>
                Player 4: <span id="p4Upgrade"></span>
            </div>
            <div id="purchaseBox">
                <h4>Cards to Purchase</h4>
                <button id="castleCard" onclick="sendCardData(gameID, player, 'NA', 'castleBuy')">Buy a Castle Card</button>
                <button id="templeCard" onclick="sendCardData(gameID, player, 'NA', 'templeBuy')">Buy a Temple Card</button> <br>
                <button id="marketCard" onclick="sendCardData(gameID, player, 'NA', 'marketBuy')">Buy a Market Card</button>
                <button id="libraryCard" onclick="sendCardData(gameID, player, 'NA', 'libraryBuy')">Buy a Library Card</button>
            </div>
            <div id="handBox">
                <h4>Your Action Cards</h4>
                <div id="actionCardHand"></div>
                <h4>Your Upgrade Cards</h4>
                <div id="upgradeCardHand"></div>
            </div>
        </div>

        <div id="ruleBox" class="box">
            <h4>Rules</h4>
                <button onclick="ruleBox('start')">Start</button>
                <button onclick="ruleBox('turns')">Turns</button>
                <button onclick="ruleBox('purchasing')">Building</button>
                <button onclick="ruleBox('moving')">Moving</button>
                <button onclick="ruleBox('barbarians')">Barbarians & Losing</button>
                <div id="costUnit">
                    <h4>Unit Cost</h4>
                    Villager: 1 food 1 water <br>
                    Hoplite: 1 iron 1 water <br>
                    Archer: 1 iron 1 wood <br>
                    Cavalry: 1 iron 1 food <br>
                    Priest: 1 food 1 gold <br>
                    Barbarian: 2 gold to move <br>
                    Cards: 2 gold
                </div>
                <div id="costBuilding">
                    <h4>Building Cost</h4>
                    Village: 1 everything <br>
                    Market: 1 wood 4 food <br>
                    Temple: 1 wood 4 gold <br>
                    Library: 5 wood <br>
                    Castle: 1 wood 4 iron <br>
                    Wall: 3 wood <br>
                    Road: 1 wood 1 water <br>
                </div>
                <div id="rulePopBox" onclick="ruleBox('close')"></div>
        </div>

        <div id="board">
            <div class="column" id="col1">
                <div id="tile1" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                <div id="tile2" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                <div id="tile3" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile4" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile5" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
            </div>
            <div class="column" id="col2">
                <div id="tile6" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile7" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile8" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile9" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile10" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile11" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
            </div>
            <div class="column" id="col3">
                <div id="tile12" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile13" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile14" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile15" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile16" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile17" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile18" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
            </div>
            <div class="column" id="col4">
                <div id="tile19" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile20" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile21" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile22" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile23" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile24" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile25" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile26" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
            </div>
            <div class="column" id="col5">
                <div id="tile27" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile28" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile29" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile30" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile31" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile32" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile33" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile34" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile35" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
            </div>
            <div class="column" id="col6">
                <div id="tile36" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile37" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile38" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile39" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile40" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile41" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile42" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile43" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
            </div>
            <div class="column" id="col7">
                <div id="tile44" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile45" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile46" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile47" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile48" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile49" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile50" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
            </div>
            <div class="column" id="col8">
                <div id="tile51" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile52" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile53" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile54" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile55" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile56" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
            </div>
            <div class="column" id="col9">
                <div id="tile57" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile58" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile59" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile60" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
                <div id="tile61" class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="resetStyle(event)"></div>
            </div>
            <img id="NWship" class="ship" src="art/ship.png">
            <img id="NEship" class="ship" src="art/ship.png">
            <img id="SWship" class="ship" src="art/ship.png">
            <img id="SEship" class="ship" src="art/ship.png">
        </div>

        <?php 
            echo "<script>displayBoard();</script>";
        ?>
    </body>
</html>