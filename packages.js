class Package {
    
    shape;
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
            case 2:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tetromino_O_Single.svg/75px-Tetromino_O_Single.svg.png";
            case 3:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Tetromino_T_Up.svg/113px-Tetromino_T_Up.svg.png";
            case 4:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Tetromino_J_Up.svg/75px-Tetromino_J_Up.svg.png";
            case 5:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Tetromino_L_Up.svg/75px-Tetromino_L_Up.svg.png";
            case 6:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tetromino_S_Horizontal.svg/113px-Tetromino_S_Horizontal.svg.png";
            case 7:
                this.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Tetromino_Z_Horizontal.svg/113px-Tetromino_Z_Horizontal.svg.png";
        }
    }
    
    drawImage() {
        var id = null;
        var tube = document.getElementById("conveyorbeltRow");

        let thisPackage = document.createElement("img"); 
        thisPackage.id = "package"+this.id;
        thisPackage.className = "package packageanimation";
        // package.className = "rotateimg180";
        thisPackage.src = this.image;
        
        this.dragImage(thisPackage);

        tube.appendChild(thisPackage);
        // var pos = 0;
        // clearInterval(id);
        // id = setInterval(frame, 10);
        // function frame() {
        //     if (pos == 50) {
        //     clearInterval(id);
        //     } else {
        //     pos++;
        //     thisPackage.style.top = pos + 'px'; 
        //     thisPackage.style.left = pos + 'px'; 
        //     }
        // }
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
        
            moveAt(event.pageX, event.pageY);
        
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
        
            document.addEventListener("mousemove", onMouseMove);
        
            tetriomino.onmouseup = function() {
                document.removeEventListener("mousemove", onMouseMove);
                tetriomino.onmouseup = null;
            }
        
            tetriomino.ondragstart = function() {
                return false;
            }
        };
    }
}