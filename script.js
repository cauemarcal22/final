function toggleLetter(card) {
    card.classList.toggle('expanded');
    const readMore = card.querySelector('.read-more');
    
    if (card.classList.contains('expanded')) {
        readMore.textContent = '← Fechar carta';
    } else {
        readMore.textContent = 'Ler carta completa →';
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Controle de música
const musicBtn = document.getElementById('musicBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.querySelector('.music-text').textContent = 'Tocar Música';
    } else {
        backgroundMusic.play();
        musicBtn.classList.add('playing');
        musicBtn.querySelector('.music-text').textContent = 'Pausar Música';
    }
    isPlaying = !isPlaying;
});

// Configuração da palavra secreta
const SECRET_WORD = "Eu te amo";

const scratchInput = document.getElementById('scratchInput');
const revealBtn = document.getElementById('revealBtn');
const lockedMessage = document.getElementById('lockedMessage');
const finalVideo = document.getElementById('finalVideo');
const conclusionVideo = document.getElementById('conclusionVideo');

function normalizeString(str) {
    return str.toLowerCase().trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function revealContent() {
    const userInput = normalizeString(scratchInput.value);
    const secretWord = normalizeString(SECRET_WORD);

    if (userInput === secretWord) {
        scratchInput.classList.add('success-flash');
        
        setTimeout(() => {
            lockedMessage.classList.add('hidden');
            
            setTimeout(() => {
                finalVideo.classList.add('revealed');
                conclusionVideo.play();
                
                finalVideo.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 600);
        }, 300);

    } else {
        scratchInput.classList.add('shake');
        lockedMessage.classList.add('shake');
        scratchInput.value = '';
        scratchInput.placeholder = 'Tente novamente...';
        
        setTimeout(() => {
            scratchInput.classList.remove('shake');
            lockedMessage.classList.remove('shake');
            scratchInput.placeholder = 'Digite a palavra secreta...';
        }, 500);
    }
}

revealBtn.addEventListener('click', revealContent);

scratchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        revealContent();
    }
});
