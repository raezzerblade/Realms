//STOP CACHE
$(document).ready(function() {
    $.ajaxSetup({ cache: false });
    });

//RANDOMIZE range, min max included
function randomizer(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//REFRESH CSS when new game is pressed
function refreshCSS() {
    let links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('rel') == 'stylesheet') {
            let href = links[i].getAttribute('href')
                                    .split('?')[0];
              
            let newHref = href + '?version=' 
                        + new Date().getMilliseconds();
              
            links[i].setAttribute('href', newHref);
        }
    }
}
//Tile Swap
var dragTile = false;
var oldTileSwap;
var newTileSwap;
var oldTileNum;
var newTileNum;
function tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum) {
    const url = `tileSwap.php?
        gameID=${encodeURIComponent(gameID)}&
        oldTileSwap=${encodeURIComponent(oldTileSwap)}&
        newTileSwap=${encodeURIComponent(newTileSwap)}&
        oldTileNum=${encodeURIComponent(oldTileNum)}&
        newTileNum=${encodeURIComponent(newTileNum)}`;

    fetch(url)
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData); // Handle the server's response here if needed
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

//MASTER UPDATE BOARD
function displayBoard() {
    
    $.getJSON(jsonGameID, function (gameBoard) {
        for (let a=61;a>0;a--) {

            var div = document.getElementById("tile"+a);
            div.innerHTML="";
            var i = "tile"+a;
            var idCounter = 1;
    
            //TILE TYPE
            if (gameBoard["tiles"][i].type == "volcano") {
                let img = document.createElement("img");
                img.src = "art/Volcano.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "horses") {
                let img = document.createElement("img");
                img.src = "art/HorseTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                        img.setAttribute("draggable", "true");
                        img.addEventListener('dragstart', function(ev) {
                            oldTileSwap = "horses";
                            oldTileNum = img.dataset.tileId;
                            dragTile = true;
                        });
                        img.addEventListener('dragend', function(ev) {
                            ev.target.style.opacity = '1';
                        });
                        img.addEventListener('dragover', function(ev) {
                            ev.preventDefault();
                        });
                        img.addEventListener('drop', function(ev) {
                            ev.preventDefault();
                            if (dragTile) {
                                newTileSwap = "horses";
                                newTileNum = img.dataset.tileId;
                                tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                                dragTile = false;
                            }
                            ev.target.style.opacity = '1';
                        });
                //Add image
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "village") {
                let img = document.createElement("img");
                img.src = "art/VillageTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                    img.setAttribute("draggable", "true");
                    img.addEventListener('dragstart', function(ev) {
                        oldTileSwap = "village";
                        oldTileNum = img.dataset.tileId;
                        dragTile = true;
                    });
                    img.addEventListener('dragend', function(ev) {
                        ev.target.style.opacity = '1';
                    });
                    img.addEventListener('dragover', function(ev) {
                        ev.preventDefault();
                    });
                    img.addEventListener('drop', function(ev) {
                        ev.preventDefault();
                        if (dragTile) {
                            newTileSwap = "village";
                            newTileNum = img.dataset.tileId;
                            tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                            dragTile = false;
                        }
                        ev.target.style.opacity = '1';
                    });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "camp") {
                let img = document.createElement("img");
                img.src = "art/CampTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                    img.setAttribute("draggable", "true");
                    img.addEventListener('dragstart', function(ev) {
                        oldTileSwap = "camp";
                        oldTileNum = img.dataset.tileId;
                        dragTile = true;
                    });
                    img.addEventListener('dragend', function(ev) {
                        ev.target.style.opacity = '1';
                    });
                    img.addEventListener('dragover', function(ev) {
                        ev.preventDefault();
                    });
                    img.addEventListener('drop', function(ev) {
                        ev.preventDefault();
                        if (dragTile) {
                            newTileSwap = "camp";
                            newTileNum = img.dataset.tileId;
                            tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                            dragTile = false;
                        }
                        ev.target.style.opacity = '1';
                    });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "holySite") {
                let img = document.createElement("img");
                img.src = "art/HolyTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                    img.setAttribute("draggable", "true");
                    img.addEventListener('dragstart', function(ev) {
                        oldTileSwap = "holySite";
                        oldTileNum = img.dataset.tileId;
                        dragTile = true;
                    });
                    img.addEventListener('dragend', function(ev) {
                        ev.target.style.opacity = '1';
                    });
                    img.addEventListener('dragover', function(ev) {
                        ev.preventDefault();
                    });
                    img.addEventListener('drop', function(ev) {
                        ev.preventDefault();
                        if (dragTile) {
                            newTileSwap = "holySite";
                            newTileNum = img.dataset.tileId;
                            tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                            dragTile = false;
                        }
                        ev.target.style.opacity = '1';
                    });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "mountain") {
                let img = document.createElement("img");
                img.src = "art/MountainTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                    img.setAttribute("draggable", "true");
                    img.addEventListener('dragstart', function(ev) {
                        oldTileSwap = "mountain";
                        oldTileNum = img.dataset.tileId;
                        dragTile = true;
                    });
                    img.addEventListener('dragend', function(ev) {
                        ev.target.style.opacity = '1';
                    });
                    img.addEventListener('dragover', function(ev) {
                        ev.preventDefault();
                    });
                    img.addEventListener('drop', function(ev) {
                        ev.preventDefault();
                        if (dragTile) {
                            newTileSwap = "mountain";
                            newTileNum = img.dataset.tileId;
                            tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                            dragTile = false;
                        }
                        ev.target.style.opacity = '1';
                    });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "iron") {
                let img = document.createElement("img");
                img.src = "art/IronTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                    img.setAttribute("draggable", "true");
                    img.addEventListener('dragstart', function(ev) {
                        oldTileSwap = "iron";
                        oldTileNum = img.dataset.tileId;
                        dragTile = true;
                    });
                    img.addEventListener('dragend', function(ev) {
                        ev.target.style.opacity = '1';
                    });
                    img.addEventListener('dragover', function(ev) {
                        ev.preventDefault();
                    });
                    img.addEventListener('drop', function(ev) {
                        ev.preventDefault();
                        if (dragTile) {
                            newTileSwap = "iron";
                            newTileNum = img.dataset.tileId;
                            tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                            dragTile = false;
                        }
                        ev.target.style.opacity = '1';
                    });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "gold") {
                let img = document.createElement("img");
                img.src = "art/GoldTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                    img.setAttribute("draggable", "true");
                    img.addEventListener('dragstart', function(ev) {
                        oldTileSwap = "gold";
                        oldTileNum = img.dataset.tileId;
                        dragTile = true;
                    });
                    img.addEventListener('dragend', function(ev) {
                        ev.target.style.opacity = '1';
                    });
                    img.addEventListener('dragover', function(ev) {
                        ev.preventDefault();
                    });
                    img.addEventListener('drop', function(ev) {
                        ev.preventDefault();
                        if (dragTile) {
                            newTileSwap = "gold";
                            newTileNum = img.dataset.tileId;
                            tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                            dragTile = false;
                        }
                        ev.target.style.opacity = '1';
                    });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "wood") {
                let img = document.createElement("img");
                img.src = "art/ForestTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                    img.setAttribute("draggable", "true");
                    img.addEventListener('dragstart', function(ev) {
                        oldTileSwap = "wood";
                        oldTileNum = img.dataset.tileId;
                        dragTile = true;
                    });
                    img.addEventListener('dragend', function(ev) {
                        ev.target.style.opacity = '1';
                    });
                    img.addEventListener('dragover', function(ev) {
                        ev.preventDefault();
                    });
                    img.addEventListener('drop', function(ev) {
                        ev.preventDefault();
                        if (dragTile) {
                            newTileSwap = "wood";
                            newTileNum = img.dataset.tileId;
                            tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                            dragTile = false;
                        }
                        ev.target.style.opacity = '1';
                    });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "food") {
                let img = document.createElement("img");
                img.src = "art/FoodTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                    img.setAttribute("draggable", "true");
                    img.addEventListener('dragstart', function(ev) {
                        oldTileSwap = "food";
                        oldTileNum = img.dataset.tileId;
                        dragTile = true;
                    });
                    img.addEventListener('dragend', function(ev) {
                        ev.target.style.opacity = '1';
                    });
                    img.addEventListener('dragover', function(ev) {
                        ev.preventDefault();
                    });
                    img.addEventListener('drop', function(ev) {
                        ev.preventDefault();
                        if (dragTile) {
                            newTileSwap = "food";
                            newTileNum = img.dataset.tileId;
                            tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                            dragTile = false;
                        }
                        ev.target.style.opacity = '1';
                    });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "water") {
                let img = document.createElement("img");
                img.src = "art/WaterTile.png";
                img.dataset.tileId = i;
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                    //Tile Swap
                    img.setAttribute("draggable", "true");
                    img.addEventListener('dragstart', function(ev) {
                        oldTileSwap = "water";
                        oldTileNum = img.dataset.tileId;
                        dragTile = true;
                    });
                    img.addEventListener('dragend', function(ev) {
                        ev.target.style.opacity = '1';
                    });
                    img.addEventListener('dragover', function(ev) {
                        ev.preventDefault();
                    });
                    img.addEventListener('drop', function(ev) {
                        ev.preventDefault();
                        if (dragTile) {
                            newTileSwap = "water";
                            newTileNum = img.dataset.tileId;
                            tileSwap(gameID, oldTileSwap, newTileSwap, oldTileNum, newTileNum);
                            dragTile = false;
                        }
                        ev.target.style.opacity = '1';
                    });
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].type == "ocean") {
                let img = document.createElement("img");
                img.src = "art/OceanTile.png";
                img.classList.add("tileType");
                img.addEventListener('dragleave', function(ev) {
                    ev.target.style.opacity = '1';
                });
                div.appendChild(img);
            }
            //TILE UNIT
            if (gameBoard["tiles"][i].unit == "hoplite") {
                let img = document.createElement("img");
                img.src = "art/hoplitePiece.png";
                img.classList.add("tileUnit");
                img.classList.add("piece");
                img.classList.add("pieceBoard");
                img.id = 'hoplite' + idCounter;
                idCounter++;
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
                img.draggable = true;
                img.addEventListener("dragstart", function(event) {
                    move(event);});
                img.addEventListener("dragend", function(event) {
                    endDrag(event);});

            }
            else if (gameBoard["tiles"][i].unit == "archer") {
                let img = document.createElement("img");
                img.src = "art/archerPiece.png";
                img.classList.add("tileUnit");
                img.classList.add("piece");
                img.classList.add("pieceBoard");
                img.id = 'archer' + idCounter;
                idCounter++;
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
                img.draggable = true;
                img.addEventListener("dragstart", function(event) {
                    move(event);});
                img.addEventListener("dragend", function(event) {
                    endDrag(event);});
            }
            else if (gameBoard["tiles"][i].unit == "cavalry") {
                let img = document.createElement("img");
                img.src = "art/cavalryPiece.png";
                img.classList.add("tileUnit");
                img.classList.add("piece");
                img.classList.add("pieceBoard");
                img.id = 'cavalry' + idCounter;
                idCounter++;
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
                img.draggable = true;
                img.addEventListener("dragstart", function(event) {
                    move(event);});
                img.addEventListener("dragend", function(event) {
                    endDrag(event);});
            }
            else if (gameBoard["tiles"][i].unit == "barbarian") {
                let img = document.createElement("img");
                img.src = "art/barbarianPiece.png";
                img.classList.add("tileUnit");
                img.classList.add("piece");
                img.classList.add("pieceBoard");
                img.classList.add("pBar");
                img.id = 'barbarian' + idCounter;
                idCounter++;
                div.appendChild(img);
                img.draggable = true;
                img.addEventListener("dragstart", function(event) {
                    move(event);});
                img.addEventListener("dragend", function(event) {
                    endDrag(event);});
            }
            else if (gameBoard["tiles"][i].unit == "priest") {
                let img = document.createElement("img");
                img.src = "art/priestPiece.png";
                img.classList.add("tileUnit");
                img.classList.add("piece");
                img.classList.add("pieceBoard");
                img.id = 'priest' + idCounter;
                idCounter++;
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
                img.draggable = true;
                img.addEventListener("dragstart", function(event) {
                    move(event);});
                img.addEventListener("dragend", function(event) {
                    endDrag(event);});
            }
            else if (gameBoard["tiles"][i].unit == "king") {
                let img = document.createElement("img");
                img.src = "art/kingPiece.png";
                img.classList.add("tileUnit");
                img.classList.add("piece");
                img.classList.add("pieceBoard");
                img.id = 'king' + idCounter;
                idCounter++;
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                    console.log('hi');
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
                img.draggable = true;
                img.addEventListener("dragstart", function(event) {
                    move(event);});
                img.addEventListener("dragend", function(event) {
                    endDrag(event);});
            }
            else if (gameBoard["tiles"][i].unit == "villager") {
                let img = document.createElement("img");
                img.src = "art/peasantPiece.png";
                img.classList.add("tileUnit");
                img.classList.add("piece");
                img.classList.add("pieceBoard");
                img.id = 'villager' + idCounter;
                idCounter++;
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
                img.draggable = true;
                img.addEventListener("dragstart", function(event) {
                    move(event);});
                img.addEventListener("dragend", function(event) {
                    endDrag(event);});
            }
            //TILE BUILDING
            if (gameBoard["tiles"][i].building == "castle") {
                let img = document.createElement("img");
                img.src = "art/CastlePiece.png";
                img.classList.add("tileBuilding");
                img.classList.add("building");
                img.classList.add("buildingBoard");
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
            }
            else if (gameBoard["tiles"][i].building == "market") {
                let img = document.createElement("img");
                img.src = "art/MarketPiece.png";
                img.classList.add("tileBuilding");
                img.classList.add("building");
                img.classList.add("buildingBoard");
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
            }
            else if (gameBoard["tiles"][i].building == "library") {
                let img = document.createElement("img");
                img.src = "art/ObservatoryPiece.png";
                img.classList.add("tileBuilding");
                img.classList.add("building");
                img.classList.add("buildingBoard");
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
            }
            else if (gameBoard["tiles"][i].building == "temple") {
                let img = document.createElement("img");
                img.src = "art/TemplePiece.png";
                img.classList.add("tileBuilding");
                img.classList.add("building");
                img.classList.add("buildingBoard");
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
            }
            else if (gameBoard["tiles"][i].building == "village") {
                let img = document.createElement("img");
                img.src = "art/TownPiece.png";
                img.classList.add("tileBuilding");
                img.classList.add("building");
                img.classList.add("buildingBoard");
                div.appendChild(img);
                if (gameBoard["tiles"][i].player == "p1") {
                    img.classList.add("p1");
                } else if (gameBoard["tiles"][i].player == "p2") {
                    img.classList.add("p2");
                } else if (gameBoard["tiles"][i].player == "p3") {
                    img.classList.add("p3");
                } else if (gameBoard["tiles"][i].player == "p4") {
                    img.classList.add("p4");
                } else if (gameBoard["tiles"][i].player == "NA") {
                    img.classList.add("p0");
                }
            }
            else if (gameBoard["tiles"][i].building == "road") {
                let img = document.createElement("img");
                img.src = "art/roadPiece.png";
                img.classList.add("tileBuilding");
                img.classList.add("building");
                img.classList.add("buildingBoard");
                img.classList.add("p0");
                div.appendChild(img);
            }
            else if (gameBoard["tiles"][i].building == "wall") {
                let img = document.createElement("img");
                img.src = "art/WallPiece.png";
                img.classList.add("tileBuilding");
                img.classList.add("building");
                img.classList.add("buildingBoard");
                img.classList.add("p0");
                div.appendChild(img);
            }
            //Resources
            document.getElementById("water").innerText = gameBoard['players'][player]['resources']['water'];
            document.getElementById("iron").innerText = gameBoard['players'][player]['resources']['iron'];
            document.getElementById("gold").innerText = gameBoard['players'][player]['resources']['gold'];
            document.getElementById("wood").innerText = gameBoard['players'][player]['resources']['wood'];
            document.getElementById("food").innerText = gameBoard['players'][player]['resources']['food'];
            //Chat
            displayChat();
            //Cards
            displayCards(player);
            //Usernames
            document.getElementById("p1Here").innerText = gameBoard['players']['p1']['username'];
            if (gameBoard && 
                gameBoard.players && 
                gameBoard.players.p2 && 
                gameBoard.players.p2.username !== undefined) {
                
                document.getElementById("p2Here").innerText = gameBoard.players.p2.username;
            }
            if (gameBoard && 
                gameBoard.players && 
                gameBoard.players.p3 && 
                gameBoard.players.p3.username !== undefined) {
                
                document.getElementById("p3Here").innerText = gameBoard.players.p3.username;
            }
            if (gameBoard && 
                gameBoard.players && 
                gameBoard.players.p4 && 
                gameBoard.players.p4.username !== undefined) {
                
                document.getElementById("p4Here").innerText = gameBoard.players.p4.username;
            }
        }
        //Save to check if the gameboard should be updated
        currentFile = gameBoard;
    });
    refreshCSS();
}

// PIECES
var clone;
var pieceId;
var colorCheck;
var playerMove;
var oldTile;
// Drag from unit area
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    pieceId = ev.target.id;  // Save the ID of the piece being dragged
    clone = ev.target.cloneNode(true);
    colorCheck = 0;
    oldTile = "NA";
}
//Drag from board
function move(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    pieceId = ev.target.id;  // ID of the piece being dragged
    clone = ev.target.cloneNode(true);
    tileID = ev.target.parentNode.id; // Tile dragged from
    oldTile = tileID; //save the tile as another variable to pass through
    deletePiece = "NA";
    playerPast = "NA";

    //Find the player that was just moved and pass that to the drop function
    colorCheck = window.getComputedStyle(ev.target).backgroundColor;
    if(colorCheck == "rgb(0, 255, 255)") {
        //p1 aqua
        playerMove = "p1";
    }
    else if(colorCheck == "rgb(255, 192, 203)") {
        //p2 pink
        playerMove = "p2";
    }
    else if(colorCheck == "rgb(255, 255, 0)") {
        //p3 yellow
        playerMove = "p3";
    }
    else if(colorCheck == "rgb(50, 205, 50)") {
        //p4 limegreen
        playerMove = "p4";
    }
}
//Allows pieces to drop
function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.querySelector('.tileType').style.opacity = '0.5';
}
//When piece is dropped
function drop(ev) {
    //if drag triggered
    if(colorCheck == 0) {
        ev.preventDefault();
        var tileType = ev.currentTarget.querySelector('.tileType');
        if(clone && tileType){
            var appendedClone = ev.currentTarget.appendChild(clone); //clone
            appendedClone.remove(); // remove the clone after it's appended
            clone = null;
            //write to JSON
            var tileID = ev.currentTarget.id;
            if (pieceId == 'barbarian') {
                updatePieces(gameID, tileID, pieceId, "NA", oldTile);
            } else {
                updatePieces(gameID, tileID, pieceId, player, oldTile);
            }
        }
    }
    //if moved triggered
    else {
        ev.preventDefault();
        var tileType = ev.currentTarget.querySelector('.tileType');
        if(clone && tileType){
            var appendedClone = ev.currentTarget.appendChild(clone); //clone
            appendedClone.remove(); // remove the clone after it's appended
            clone = null;
            //write to JSON
            var tileID = ev.currentTarget.id;
            updatePieces(gameID, tileID, pieceId, playerMove, oldTile);
        }
    }
}
// functions to handle the drag leave
function resetStyle(ev) {
    ev.target.style.opacity = '1';
    var child = ev.target.querySelector('.tileType');
    if (child) {
        child.style.opacity = '1';
    }
}
function endDrag(ev) {
    ev.target.style.opacity = '1';
        var tiles = document.querySelectorAll('.tileType');
        tiles.forEach(function(tile) {
            tile.style.opacity = '1';
        });
}
//write to JSON
function updatePieces(gameID, tile, piece, player, oldTile) {

    const url = `update.php?
        gameID=${encodeURIComponent(gameID)}&
        player=${encodeURIComponent(player)}&
        piece=${encodeURIComponent(piece)}&
        oldTile=${encodeURIComponent(oldTile)}&
        tile=${encodeURIComponent(tile)}`;

  fetch(url)
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData); // You can handle the response here if needed
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

//RULES
function ruleBox(task) {
    if (task == "close") {
        $("#rulePopBox").hide();
    } else if (task == "turns") {
        $("#rulePopBox").show();
        $("#rulePopBox").empty().text(
            `
            Turns…
            The last person who placed their realm structures starts their turn first
            On a turn you can only do one action. Actions include:
            
            - Collecting 1 resource from each tile a plebeian or market is on.
            - Purchasing a structure, unit, or city card.
            - Moving to a unit to an adjacent tile or swapping adjacent units.
            - Activating or switching library cards.
            - Destroying a structure with an archer (walls automatically destroyed)
            
            * Trading library cards with a player, or trading resources with a player/bank, can occur at any time. 
            * However, a market is needed to trade with the bank.
            * Playing city cards can happen at any time. Once played, cards are discarded. 
            * The only exception is library cards, which must be activated as an action and are never discarded.
            `
        );
    } else if (task == "start") {
        $("#rulePopBox").show();
        $("#rulePopBox").empty().text(
            `Goal…
            Win by doing any one of the following…
            
            1 - Move your king to the center (after a road is built upon it from your town)
            2 - Control all 4 ports tiles
            3 - If you're playing as barbarians, kill all kings
            
            Start…
            Place all your owned units and structures on your placard in the correct slot
            Take the following off the placard
            
            UNITS: 4 plebeians, 1 hoplite, and 1 king
            STRUCTURES: 1 village and 1 type of city
            
            City types:
            Library → Draw 3 Library cards.
                libraries allow you to buy library cards. But they also activate the specialty tile they are placed on.
                    Horses: Units starting on horses act as if completely unoccupied tiles are roads-—excluding mountains and Olympus.
                    Holy: Your empire is immune to conversions.
                    Camp: You may place a barbarain on a mountain for free or move a barbarian for free as an action.
                    Village: During collection you may collect any card for free.
            Castle → Pick a cavalry or archer, and castle card.
                Castles allow you to buy castle cards, archers, and cavalry. But they can only be taken by barbarians.
            Market → Pick a market card.
                Markets allow you to buy market cards and trade with the bank at a 2:1 ratio. But they also act as a villager.
            Temple → Pick a priest and a temple card.
                Temples allow you to build temple cards and priests. But they also prevent on/adjacent enemy conversions.
            
            Pick someone to place their entire realm, then go clockwise.
            Rules for the INITIAL placing
            
            - The town and city must be adjacent
            - Units must be on or adjacent to your owned structures
            - Only one unit per tile, with the exception of kings
            - Do not place anything on the center mound, port tiles, or mountain tiles
            - 2 tiles must separate your buildings from other player buildings
            
            After everyone has placed, shift units around until everyone agrees to start.
            Everyone collects 2 resources for each tile a plebeian is on.
            Whoever placed last decides who goes 1st and whether to do clockwise or not
            `
        );
    } else if (task == "purchasing") {
        $("#rulePopBox").show();
        $("#rulePopBox").empty().text(
            `
            CARDS: Action and Library cards can be purchased at any time with the associated city.

            UNITS: Units can be purchased with resources and placed on or adjacent to your owned structures.

            BUILDINGS: Buildings can be purchased with resources and placed adjacent to your owned structures.
            * ROADS & Walls do not count as owned structures.
            * However, buildings can be placed adjacent to roads connected to your empire's buildings. Units cannot.
            * Units and buildings, aside from roads, cannot be placed on Olympus or Mountains.
            `
        );
    } else if (task == "moving") {
        $("#rulePopBox").show();
        $("#rulePopBox").empty().text(
            `
            Moving…

            - Any unit can move one adjacent tile as an action.
            - Most units cannot be moved onto tiles with a wall built on it. Archers are the exception but they destroy the wall in the process.
            - Units cannot move onto mountains or the Olympus without a road built there.
            
            ROADS: Roads provide the following bonuses:
            - They allow unit access to mountain and Olympus tiles
            - Once on a road network, units can travel anywhere on the road network as an action so long as there are no interruptions by units or enemy structures. The unit stops right before the interruption.
            - Friendly structures count as roads but friendly units count as interruptions.
            - Roads can be destroyed by any unit as an action. However, if a unit destroys the road on a mountain or Olympus, they perish.
            
            PORTS: Port tiles teleport the unit to the opposite port as an action

            ATTACKING: Moving onto an enemy tile is considered an attack.
            - If your unit is able to move onto an enemy structure, you take that structure for yourself. If you already own the type of city that you are taking, then it gets downgraded to a town.
            - Each type of unit defeats, or is defeated by, another type of unit. Units of the same type will both be defeated.
            
            Military Units
            - Hoplites will always defeat cavalry.
            - Cavalry will always defeat archers.
            - Archers will always defeat hoplites.
            - Barbarians beat archers, lose to cavalry, and are equal to hoplites.
            
            Non Military Units
            - Priests cannot attack and are weak to military units if attacked. Instead, they convert adjacent units by luring them to their tile and sacrificing themselves. Priests cannot convert priests, barbarians, or kings.
            - Plebeians cannot attack and are weak to military units if attacked. Instead, they gather resources or sacrifice themselves to build a town.
            - Kings cannot attack and are weak to military units if attacked.
            `
        );
    } else if (task == "barbarians") {
        $("#rulePopBox").show();
        $("#rulePopBox").empty().text(
            `
            Losing your King / Barbarians…

            If your unit kills a king, you take all their resources and cards. Buildings of that player remain but all their units are replaced with barbarians. The defeated player plays as barbarians for the rest of the game. 

            Down with monarchy! BARBARIANS WIN when all kings have been killed.
            
            Actions barbarians can take are:
            - moving an existing barbarian piece
            - placing a new barbarian on an empty camp or mountain tile
            - buying an action card (using action cards can happen at any time)
            - Barbarians do not collect resources, capture buildings, build units, or build buildings.
            
            Movement: Barbarians are not limited by Olympus or mountains.
            * Barbarians can use ports
            * If two players are playing as barbarians, they cannot move the same piece twice in one round or move a piece built that round.
            * If a barbarian kills a piece, they take 1 gold from that player. If the player has no gold, they must give them something or sacrifice a piece.
            
            Kings: If a barbarian kills a king, they take all the gold and the rest of the resources return to the bank. All units of that realm are replaced with barbarians and that player joins the barbarian team—effectively giving the barbarians two actions per round.
            
            Bribing: Players can bribe barbarians.
            * 2 gold will move a barbarian piece as an action.
            * 2 gold will undo a barbarian move right after it happens—any player (including barbarians) can do this at any time.
            * If no player is currently playing as barbarians, the gold is held for a future barbarian player in a separate pile
            `
        );
    }
}

//RESOURCES
//plus and minus
function updateResources(gameID, player, resource, amount) {

    const url = `updateResources.php?gameID=${encodeURIComponent(gameID)}&player=${encodeURIComponent(player)}&resource=${encodeURIComponent(resource)}&amount=${encodeURIComponent(amount)}`;

    fetch(url)
        .then(response => response.json())
        .then(responseData => {
        console.log(responseData); // You can handle the response here if needed
        })
        .catch(error => {
        console.error('Error:', error);
        });

}
//auto collect
function collectResources(gameID, player) {
    
    const url = `collectResources.php?gameID=${encodeURIComponent(gameID)}&player=${encodeURIComponent(player)}`;
    fetch(url)
        .then(response => response.json())
        .then(responseData => {
        console.log(responseData); // You can handle the response here if needed
        })
        .catch(error => {
        console.error('Error:', error);
        });
}

//CHAT
let totalChat = "hi";
let chatLines = 0;
//show chat
function displayChat() {
    $.getJSON(jsonGameID, function(game){
        //find size of chat object
        size = game.chat.line;
        //tile variables
        if (size > chatLines) {
            let playerNumber = game.chat.text[chatLines + 1][0];
            let playerName = game.chat.text[chatLines + 1][1];
            let playerChat = game.chat.text[chatLines + 1][2];
            let x = document.getElementById("chatDisplay");
            x.appendChild(document.createTextNode(playerNumber + " - " + playerName + " : " + playerChat));
            x.appendChild(document.createElement("br"));
            chatLines++;
            console.log(document.getElementById("chatDisplay").scrollHeight);
            $("#chatDisplay").scrollTop(document.getElementById("chatDisplay").scrollHeight);
        }
    });
}
//chat listener
$(document).ready(function(){
    $("#typeArea").keypress(function(e){
        if (e.which == 13) {
            let text = this.value;
            $.get(
                "chat.php", 
                { gameID:gameID, player:player, said:text, name:username },   
                function(){
                    $("#typeArea").val("");
                }
            );
        }
    })
})

//CARDS
//card data
const cardList = {

    coercion: 'Coercion: Each player must give you 2 resources of their choosing', 
    theft: 'Theft: Steal 6 resources from an enemy player',
    sabotage: 'Sabotage: Skip a player turn',
    taxes: 'Taxes: Collect 1 gold from the bank for each unit owned',
    heist: 'Heist: Steal 2 cards from a player of your choice',
    forcedDeal: 'Forced Deal: Swap all resource cards with another player',
    depression: 'Depression: Everyone must return all resources to the bank',
    monopoly: 'Monopoly: Steal all of 1 type of resource from each player',
    interest: 'Interest: Place a resource on this card and passively receive 5x the value from the bank next turn',
    deal: 'Deal: Trade any resources in your hand with the bank at a 1:1 ratio',
    mercenary: 'Mercenary: Place 2 free hoplites on any of your owned or adjacently owned tiles',
    serfdom: 'Serfdom: Collect from all your villagers and markets',

    tithe: 'Tithe: Receive the benefits of an enemy action card instead of them',
    conscription: 'Conscription: Move all barbarians up to one time after playing this card',
    propoganda: 'Propoganda: Convert an enemy building directly next to your priest',
    doctrine: 'Doctrine: Convert any enemy unit next to your priest excluding kings and barbarians',
    campaign: 'Campaign: Teleport one frinedly unit to an unoccupied tile, excluding the volcano',
    goldenAge: 'Golden Age: Change any and all buildings or units in your realm',
    greatWall: 'Great Wall: Build 5 consecutive walls for free anywhere',
    confusion: 'Confusion: Switch an enemy unit with any unit on the map, excluding kings or units adjacent to kings',
    terraform: 'Terraform: Swap any tiles on the map up to 4 times',
    colonize: 'Colonize: Build a town on any unoccupied tile, excluding mountains or the volcano',
    indoctrination: 'Indoctrination: Move one enemy unit from each player, excluding kings or units adjacent to kings',
    insurgency: 'Insurgency: Place 2 barbarians on any unoccupied tiles, excluding tiles adjacent to kings',

    taunt: 'Taunt: Make an enemy unit move in any direction after playing this card',
    pompeii: 'Pompeii: All units and structures on or adjacent to the volcano are destroyed',
    pestilence: 'Pestilence: All units on or adjacent to each port perish',
    famine: 'Famine: The greater half of each player peasant population will perish',
    retreat: 'Retreat: Move any of your units back to unoccupied tiles on or adjacent to your owned structures',
    bloodMoney: 'Blood Money: Pay 4 gold to destroy any unit, excluding a king. This can be done multiple times',
    charge: 'Charge: Move one of your military units',
    flank: 'Flank: Destroy an enemy unit adjacent to 2 of your military units',
    parry: 'Parry: Anyone who just tried attacking you loses their unit instead',
    block: 'Block: Undo any attack on you',
    deflect: 'Deflect: Redirect an attack on your unit to an adjacent tile',
    pincer: 'Pincer: Destroy an enemy unit on a tile in between your military units',

    surplus: 'Surplus: Food can be traded at a 1:1 ratio',
    guerilla: 'Guerilla: As an action, a friendly peasant may be converted to a hoplite for free',
    inquistion: 'Inquisition: Priests can destroy priests and peasants by moving onto their tile',
    volley: 'Volley: Archers can now do ranged attacks, but cavalry are immune and archers still cancel out',
    conviction: 'Conviction: Immune to priest conversions',
    haste: 'Haste: Non military units move twice as fast',
    espionage: 'Espionage: Look at any enemy cards at any time',
    siphon: 'Siphon: Benefit from all active upgrade cards from other players',
    seafarer: 'Seafarer: Water, without a structure, is now impassible to everyone except you. Units on water drown',
    scouts: 'Scouts: Hoplites are neutral to your cavalry',
    puppetState: 'Puppet State: Control barbarians as an action for free',
    cannibalism: 'Cannibalism: Each unit you kill turns into 2 food and each unit you lose turns into 1 food',
    militia: 'Militia: Peasants act as hoplites if attacked',
    cover: 'Cover: Your hoplites are now neutral to archers',
    cavalry: 'Cavalry: Cavlary now go twice as far',
    climbing: 'Climbing: You can pass through mountains without roads, excluding the volcano',
    loot: 'Loot: 1 Player must give you 1 resource at the start of your turn. This responsibilty rotates each turn',
    innovation: 'Innovation: Gain 1 card during each collection'

};
//update card data
function sendCardData(gameID, player, card, action) {
    
    const url = `cards.php?gameID=${encodeURIComponent(gameID)}&player=${encodeURIComponent(player)}&card=${encodeURIComponent(card)}&action=${encodeURIComponent(action)}`;

    fetch(url)
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData); // You can handle the response here if needed
    })
    .catch(error => {
        console.error('Error:', error);
    });

}
//display cards
function displayCards(player) {
    $.getJSON(jsonGameID, function(game){
        
    // Purchased Cards
        var actionCards = game.players[player].cards.action;
        var upgradeCards = game.players[player].cards.upgrade;
        
        if (actionCards !== undefined) {
            var actionCardHand = $("#actionCardHand");
            actionCardHand.empty(); // Clear previous content
            actionCards.forEach(function(card) {
            //CLICK
                var button = $("<button>").text(card);
                button.on("click", function() {
                    //alert('You clicked the card: ' + card);
                    let cardText = cardList[card];
                    sendCardData(gameID, player, card, "action");
                    $("#cardDescription").hide();
                });               
                actionCardHand.append(button);
            });
        }
        
    // Upgrade Cards
        if(upgradeCards !== undefined) {
            var upgradeCardHand = $("#upgradeCardHand");
            upgradeCardHand.empty(); // Clear previous content
            upgradeCards.forEach(function(card) {
            //CLICK
            var button = $("<button>").text(card);
            button.on("click", function() {
                //alert('You clicked the card: ' + card);
                let cardText = cardList[card];
                    sendCardData(gameID, player, card, "upgrade");
                    $("#cardDescription").hide();
            });               
            upgradeCardHand.append(button);
        });
        }
    
    // Active Upgrade Cards
        for(let i = 1; i <= 4; i++) {
            let activeUpgrade = game.players["p" + i].cards.activeUpgrade;
            let activeUpgradeText = cardList[activeUpgrade];
            $("#p" + i + "Upgrade").text(activeUpgradeText);
        }
    
    });
}
//hover card pop-up
$(document).ready(function() {
    $("#actionCardHand").on('mouseenter', 'button', function() {
        let cardName = $(this).text();
        let cardText = cardList[cardName];
        
        $("#cardDescription").text(cardText).show();
    });
    
    $("#actionCardHand").on('mouseleave', 'button', function() {
        // Hide the div with id cardDescription
        $("#cardDescription").hide();
    });

    $("#upgradeCardHand").on('mouseenter', 'button', function() {
        let cardName = $(this).text();
        let cardText = cardList[cardName];
        
        $("#cardDescription").text(cardText).show();
    });
    
    $("#upgradeCardHand").on('mouseleave', 'button', function() {
        // Hide the div with id cardDescription
        $("#cardDescription").hide();
    });
});

//CHECK CHANGE BOARD & UPDATE
var currentFile = {};
function checkFiles () {
    $.getJSON(jsonGameID, function (gameBoard) {

        if (JSON.stringify(currentFile) == JSON.stringify(gameBoard)) {
        }

        else {
            displayBoard();
            currentFile = gameBoard;
        }
    });
}
setInterval(checkFiles, 250);