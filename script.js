
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
        
        // Configuração da palavra secreta (você pode mudar aqui)
        const SECRET_WORD = "Eu te amo"; // Mude para a palavra que você quiser

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
                // Palavra correta!
                scratchInput.classList.add('success-flash');
                
                setTimeout(() => {
                    // Esconde a mensagem de bloqueio
                    lockedMessage.classList.add('hidden');
                    
                    setTimeout(() => {
                        // Mostra o vídeo
                        finalVideo.classList.add('revealed');
                        conclusionVideo.play();
                        
                        // Scroll suave até o vídeo
                        finalVideo.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 600);
                }, 300);

            } else {
                // Palavra incorreta
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
