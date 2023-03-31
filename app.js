const screen = document.getElementById("screen");
const pacman = document.createElement("div");
const SW = 600;
const SH = 400;
const PS = 40;
const AW = 15;
const AH = 10;

const area = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
];

const walls = [];

for (let y = 0; y < AH; y++) {
    for (let x = 0; x < AW; x++) {
        if (area[y][x] == 1) {
            let wall = document.createElement("div");
            wall.classList.add("piece", "wall");
            screen.append(wall);
            move(wall, x * PS, y * PS);
            walls.push({ x: x * PS, y: y * PS });
        }
        if (area[y][x] == 2) {
            let apple = document.createElement("div");
            apple.classList.add("piece", "apple");
            screen.append(apple);
            move(apple, x * PS, y * PS);
        }
    }
}

pacman.classList.add("piece", "pacman");
screen.append(pacman);

function move(obj, x, y) {
    obj.style.left = x + "px";
    obj.style.top = y + "px";
}

var bx = 0, by = 0;

document.onkeydown = (e) => {
    let ox = bx;
    let oy = by;

    if (e.key == "ArrowUp") {
        by -= 5;
        if (by < 0) by = 0;
    }

    if (e.key == "ArrowDown") {
        by += 5;
        if (by > (SH - PS)) by = SH - PS;
    }

    if (e.key == "ArrowLeft") {
        bx -= 5;
        if (bx < 0) bx = 0;
        pacman.style.transform = "scale(-1)";
    }

    if (e.key == "ArrowRight") {
        bx += 5;
        if (bx > (SW - PS)) bx = SW - PS;
        pacman.style.transform = "scale(1)";
    }

    for (wall of walls) {
        if (bx < wall.x + PS &&
            bx + PS > wall.x &&
            by < wall.y + PS &&
            PS + by > wall.y) {
            bx = ox;
            by = oy;
            break;
        }
    }

    move(pacman, bx, by);
}