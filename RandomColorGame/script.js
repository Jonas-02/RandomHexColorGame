var i = 0;

$(function() {

    $(document).ready(function game() {
        createRandomColor();

        $(".colorfield").click(function() {
            // Checkt hintergrundfarbe der gedrückten div
            var clickedColor = $(this).css("background-color");

            // Transformiert rgb in Hexcode
            var hexClickedColor = rgbToHex(clickedColor);

            // Korrekte Farbe als Hexcode
            var targetColor = $(this).data("target-color");

            // Checkt ob Korrekte Farbe = Hintergrundfarbe des gedrückten divs
            if (hexClickedColor === targetColor) {
                // wenn ja addieren
                add();
            } else {
                //wenn nein subtrahieren
                subtract();
            }

            actualizeScore();
            createRandomColor();
        });
    });

    function add() {
        i++;
    }

    function subtract() {
        i -= 2;
    }

    function createRandomColor() {
        // Generiere 3 Variablen von 1-3 mit unterschiedlichen Values
        var num1, num2, num3;
        num1 = Math.floor(Math.random() * 3) + 1;
        do {
            num2 = Math.floor(Math.random() * 3) + 1;
        } while (num2 === num1);
        do {
            num3 = Math.floor(Math.random() * 3) + 1;
        } while (num3 === num1 || num3 === num2);

        // Generiere 3 verschiedene Hexcodes
        var randomColor1 = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
        var randomColor2 = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
        var randomColor3 = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    
        // Schreibt Hexcode in die h1
        $("#hexcode").text("#"+ randomColor1);
    
        // Gebe den verschiedenen Divs die Hintergrundfarbe mit der Zufallszahl
        $("#colorfield" + num1).css("background-color", "#"+ randomColor1).data("target-color", "#" + randomColor1);
        $("#colorfield" + num2).css("background-color", "#"+ randomColor2).data("target-color", "#" + randomColor1);
        $("#colorfield" + num3).css("background-color", "#"+ randomColor3).data("target-color", "#" + randomColor1); 
    }

    function rgbToHex(rgb) {
        // Extrahiert R, G & B werte 
        var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        // Konvertiert die Werte in Hexcode
        var hexCode = "#" +
            ("0" + parseInt(match[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(match[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(match[3], 10).toString(16)).slice(-2);

        return hexCode;
    }

    // Aktualisiert Score
    function actualizeScore() {
        document.getElementById("punktezaehler").innerHTML = i;

        // Auf 20 = gewonnen 
        if (i > 19.5){
            document.getElementById("punktezaehler").innerHTML = "Sie haben gewonnen!";
            $('#winModal').modal('show');
            game();
        }
        // Auf 0 = verloren
        else if (i < 0.5){
            document.getElementById("punktezaehler").innerHTML = "Sie haben verloren!";
            $('#loseModal').modal('show');
            game();
        }
        else{
            return;
        }
    }
});