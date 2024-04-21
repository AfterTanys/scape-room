const container = document.getElementById("simon-container");

const cells = document.getElementsByClassName("simon-tile");

cells[0].style.backgroundColor = "green";
cells[1].style.backgroundColor = "red";
cells[2].style.backgroundColor = "yellow";
cells[3].style.backgroundColor = "blue";

cells[4].innerHTML="<-";

cells[8].innerHTML=`<img src="../resources/runes/all-hive-runes_sigil_01.png" alt="pito1" class="simon-rune">`;
cells[9].innerHTML=`<img src="../resources/runes/all-hive-runes_sigil_02.png" alt="pito1" class="simon-rune">`;
cells[10].innerHTML=`<img src="../resources/runes/all-hive-runes_sigil_03.png" alt="pito1" class="simon-rune">`;
cells[11].innerHTML=`<img src="../resources/runes/all-hive-runes_sigil_04.png" alt="pito1" class="simon-rune">`;

