class Package {
    
    id;
    shape;
    drawsize;
    queue;
    image;
    color;
    

    constructor(id, shape, queue) {
        this.id = id;
        this.shape = shape;
        this.queue = queue;
        this.setImage();
    }

    setImage() {
        switch (this.shape) {
            case 1:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Tetromino_I_Horizontal.svg/150px-Tetromino_I_Horizontal.svg.png";
                this.drawsize = "package-drawsize-1";
                this.color = "lightblue";
                break;
            case 2:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tetromino_O_Single.svg/75px-Tetromino_O_Single.svg.png";
                this.drawsize = "package-drawsize-1";
                this.color = "yellow";
                break;
            case 3:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Tetromino_T_Up.svg/113px-Tetromino_T_Up.svg.png";
                this.drawsize = "package-drawsize-3";
                this.color = "pink";
                break;
            case 4:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Tetromino_J_Up.svg/75px-Tetromino_J_Up.svg.png";
                this.drawsize = "package-drawsize-2";
                this.color = "blue";
                break;
            case 5:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Tetromino_L_Up.svg/75px-Tetromino_L_Up.svg.png";
                this.drawsize = "package-drawsize-2";
                this.color = "orange";
                break;
            case 6:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tetromino_S_Horizontal.svg/113px-Tetromino_S_Horizontal.svg.png";
                this.drawsize = "package-drawsize-3";
                this.color = "lightgreen";
                break;
            case 7:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Tetromino_Z_Horizontal.svg/113px-Tetromino_Z_Horizontal.svg.png";
                this.drawsize = "package-drawsize-3";
                this.color = "red";
                break;
        }
    }
    
    drawImage(height, conveyorbeltNumber) {
        let tube = document.getElementById("conveyorbeltRow"+conveyorbeltNumber);

        let thisPackage = document.createElement("img"); 
        thisPackage.id = "package"+this.id;
        thisPackage.className = "package package"+this.shape+ " " + this.drawsize;
        thisPackage.style.top = height+"px";
        thisPackage.src = this.image;
        
        this.dragImage(thisPackage, this);

        tube.appendChild(thisPackage);
    }
    
    dragImage(image, object) {
        let tetriomino = image;

        //this.shape bepaalt de vorm

        tetriomino.onmousedown = function(event) {

            let shiftX = event.clientX - tetriomino.getBoundingClientRect().left;
            let shiftY = 0;
            if (tetriomino.classList.contains("package-drawsize-2")) {
                shiftY = event.clientY - tetriomino.getBoundingClientRect().top - 25;
            }
            else {
                shiftY = event.clientY - tetriomino.getBoundingClientRect().top;
            }

            function moveAt(pageX,pageY) {
                tetriomino.style.left = pageX - shiftX - 250 + "px";
                tetriomino.style.top = pageY - shiftY + "px";
            }
        
            let currentDroppable = null;

            function onMouseMove(event) {

                moveAt(event.pageX, event.pageY);

                checkOverlaps(tetriomino);

                tetriomino.hidden = true;
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                tetriomino.hidden = false;

                if (!elemBelow) return;

                let droppableBelow = elemBelow.closest('.droppable');

                if (currentDroppable != droppableBelow) {
                    
                    if (currentDroppable) {
                   
                    leaveDroppable(currentDroppable);
                    }
                    currentDroppable = droppableBelow;
                    if (currentDroppable) {

                    enterDroppable(currentDroppable);
                    }
                }
            }
        
            document.addEventListener("mousemove", onMouseMove);
        
            tetriomino.onmouseup = function() {

                let occupied = false;
                let counter = 0;
                let grids = document.getElementsByClassName('griditem');
                Array.from(grids).forEach(element => { 
                    if(element.classList.contains("occupied") && element.classList.contains("checked")) {
                        occupied = true;
                    }
                    if (element.classList.contains("checked")) {
                        counter++;
                    }
                });

                if (occupied || counter < 4) {
                    alert("not valid")
                    let queue = object.queue;
                    queue.addPackageToQueue(object);
                    this.remove();
                    return;
                }
                
                if(currentDroppable != null) {
                    
                    let Xvar = 0;
                    let Yvar = 0;

                    if (shiftX > 25 && shiftX <= 50) {
                        Xvar = 1;
                    }

                    else if (shiftX > 50 && shiftX <= 75) {
                        Xvar = 2;
                    }

                    if (shiftY > 25 && shiftY <= 50) {
                        Yvar = 1;
                    }

                    else if (shiftY > 50 && shiftY <= 75) {
                        Yvar = 2;
                    }

                    tetriomino.style.left = Xvar*-25 + "px";
                    tetriomino.style.top = Yvar*-25 + "px";

                    currentDroppable.appendChild(tetriomino);

                    let grids = document.getElementsByClassName('griditem');
                    Array.from(grids).forEach(element => { 
                        if(element.classList.contains("checked")) {
                            element.classList.remove("checked");
                            element.classList.add("occupied");
                            element.style.backgroundColor = object.color;
                        }
                    });
                    tetriomino.style.position = "relative";

                    tetriomino.classList.add("avoid-clicks");
                }

                document.removeEventListener("mousemove", onMouseMove);
                tetriomino.onmouseup = null;
                
            }


            function enterDroppable(elem) {
                //
            }
          
            function leaveDroppable(elem) {
                //
            }

            function checkOverlaps(tetriomino) {
                let grids = document.getElementsByClassName('griditem');
                Array.from(grids).forEach(element => { 
                    let rect1 = tetriomino.getBoundingClientRect();
                    let rect2 = element.getBoundingClientRect();
                    if (rect1.right < rect2.left + 12.5|| 
                        rect1.left > rect2.right - 12.5|| 
                        rect1.bottom < rect2.top + 12.5|| 
                        rect1.top > rect2.bottom - 12.5) {

                        element.classList.remove("checked");
                        element.style.backgroundColor = "white";
                    }
                    else {
                        element.classList.add("checked");
                        element.style.backgroundColor = "pink";
                    }
                    
                });
            }

            tetriomino.ondragstart = function() {
                return false;
            }
        };
    }
}