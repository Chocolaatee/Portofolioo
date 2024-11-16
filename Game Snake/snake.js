const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ukuran dan kecepatan permainan
const box = 20;
let speed = 200;

// Inisialisasi ular
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Inisialisasi arah
let direction;
document.addEventListener("keydown", changeDirection);

// Inisialisasi makanan
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// Skor awal
let score = 0;

// Menggambar objek pada canvas
function draw() {
    // Gambar latar belakang
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gambar ular
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#00FF00" : "#FFFFFF";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Gambar makanan
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(food.x, food.y, box, box);

    // Posisi kepala ular
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Arah ular
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // Jika ular makan makanan
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        // Hapus ekor
        snake.pop();
    }

    // Tambahkan elemen baru di kepala ular
    let newHead = { x: snakeX, y: snakeY };

    // Cek tabrakan dengan tembok atau tubuh sendiri
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Skor Anda: " + score);
    }

    snake.unshift(newHead);

    // Tampilkan skor
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

// Deteksi tabrakan
function collision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            return true;
        }
    }
    return false;
}

// Ubah arah berdasarkan input keyboard
function changeDirection(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

// Jalankan permainan setiap interval waktu tertentu
let game = setInterval(draw, speed);
