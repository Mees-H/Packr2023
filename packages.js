class Package {
    
    id;
    shape;
    drawsize;
    rotation;
    image;
    

    constructor(id, shape, rotation) {
        this.id = id;
        this.shape = shape;
        this.rotation = rotation;
        this.setImage();
    }

    setImage() {
        switch (this.shape) {
            case 1:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Tetromino_I_Horizontal.svg/150px-Tetromino_I_Horizontal.svg.png";
                this.drawsize = "package-drawsize-1";
                break;
            case 2:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tetromino_O_Single.svg/75px-Tetromino_O_Single.svg.png";
                this.drawsize = "package-drawsize-1";
                break;
            case 3:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Tetromino_T_Up.svg/113px-Tetromino_T_Up.svg.png";
                this.drawsize = "package-drawsize-3";
                break;
            case 4:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Tetromino_J_Up.svg/75px-Tetromino_J_Up.svg.png";
                this.drawsize = "package-drawsize-2";
                break;
            case 5:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Tetromino_L_Up.svg/75px-Tetromino_L_Up.svg.png";
                this.drawsize = "package-drawsize-2";
                break;
            case 6:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tetromino_S_Horizontal.svg/113px-Tetromino_S_Horizontal.svg.png";
                this.drawsize = "package-drawsize-3";
                break;
            case 7:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Tetromino_Z_Horizontal.svg/113px-Tetromino_Z_Horizontal.svg.png";
                this.drawsize = "package-drawsize-3";
                break;
        }
    }
    
    drawImage(height) {
        let tube = document.getElementById("conveyorbeltRow");

        let thisPackage = document.createElement("img"); 
        thisPackage.id = "package"+this.id;
        thisPackage.className = "package package"+this.shape+ " " + this.drawsize;
        thisPackage.style.top = height+"px";
        // package.className = "rotateimg180";
        thisPackage.src = this.image;
        
        this.dragImage(thisPackage);

        tube.appendChild(thisPackage);
    }
    
    dragImage(image) {
        let tetriomino = image;
        tetriomino.onmousedown = function(event) {

            let shiftX = event.clientX - tetriomino.getBoundingClientRect().left;
            let shiftY = event.clientY - tetriomino.getBoundingClientRect().top;

            
            function moveAt(pageX,pageY) {
                tetriomino.style.left = pageX - shiftX - 250 + "px";
                tetriomino.style.top = pageY - shiftY + "px";
            }
        
            let currentDroppable = null;

            function onMouseMove(event) {

                moveAt(event.pageX, event.pageY);

                let timeout = undefined;
                if(event.target.closest('.package') === null) {
                    timeout = setTimeout(function() {
                        document.removeEventListener("mousemove", onMouseMove)
                    }, 2000)
                }
                else {
                    clearTimeout(timeout);
                }

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
                let left = Math.round(tetriomino.style.left.slice(0, -2)/25)*25;
                tetriomino.style.left = left + "px";
                let top = Math.round(tetriomino.style.top.slice(0, -2)/25)*25;
                tetriomino.style.top = top + "px";

                document.removeEventListener("mousemove", onMouseMove);
                tetriomino.onmouseup = null;
            }

            function enterDroppable(elem) {
                elem.style.background = 'pink';
            }
          
              function leaveDroppable(elem) {
                elem.style.background = '';
            }
        
            tetriomino.ondragstart = function() {
                return false;
            }
        };
    }
}