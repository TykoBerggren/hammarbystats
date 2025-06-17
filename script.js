// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Animate statistics on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumbers(entry.target);
            }
        });
    }, observerOptions);

    // Observe stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        observer.observe(card);
    });

    // Animate match cards on scroll
    const matchCards = document.querySelectorAll('.match-card');
    matchCards.forEach(card => {
        observer.observe(card);
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate player cards
    const playerCards = document.querySelectorAll('.player-card');
    playerCards.forEach(card => {
        observer.observe(card);
    });

    // Add loading animation to stats
    function animateStatNumbers(element) {
        const statNumbers = element.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            
            if (!stat.hasAttribute('data-animated') && !isNaN(numericValue)) {
                stat.setAttribute('data-animated', 'true');
                animateNumber(stat, 0, numericValue, isPercentage);
            }
        });
    }

    function animateNumber(element, start, end, isPercentage = false) {
        const duration = 2000;
        const increment = end / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (isPercentage ? '%' : '');
        }, 16);
    }

    // Add hover effects to form results
    const formResults = document.querySelectorAll('.form-result');
    formResults.forEach(result => {
        result.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.2s ease';
        });
        result.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Dynamic time-based greeting
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour < 12) {
            greeting = 'God morgon! ';
        } else if (hour < 18) {
            greeting = 'God eftermiddag! ';
        } else {
            greeting = 'God kväll! ';
        }

        const heroText = document.querySelector('.hero p');
        if (heroText) {
            heroText.textContent = greeting + 'Hammarby Fotboll LIVE säsong 2025 statistik och resultat';
        }
    }

    // Add click effect to stat cards
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Add dynamic content updates (simulating live data)
    function simulateLiveUpdates() {
        // This would typically connect to a real API
        console.log('🟢 Hammarby IF Statistics loaded successfully!');
        console.log('📊 Live updates ready');
    }

    setTimeout(simulateLiveUpdates, 1000);

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const activeNav = document.querySelector('.nav-link.active');
            const nextNav = activeNav?.nextElementSibling;
            if (nextNav) {
                nextNav.click();
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const activeNav = document.querySelector('.nav-link.active');
            const prevNav = activeNav?.previousElementSibling;
            if (prevNav) {
                prevNav.click();
            }
        }
    });

    // Add match result tooltips
    const matchResults = document.querySelectorAll('.match-result');
    matchResults.forEach(result => {
        const resultType = result.classList.contains('win') ? 'Vinst' : 
                          result.classList.contains('draw') ? 'Oavgjort' : 'Förlust';
        result.title = resultType;
    });

    // Loading animations
    function showLoadingStates() {
        const cards = document.querySelectorAll('.stat-card, .match-card, .player-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 50);
        });
    }

    // Initialize loading animation
    setTimeout(showLoadingStates, 100);

    // ENHANCED API INTEGRATION with CORS handling
    function initializeRealDataAPI() {
        console.log('🟢 Initialiserar riktig API-data för Hammarby IF...');
        
        // API Configuration with multiple endpoints
        const API_CONFIG = {
            // Primary API
            PRIMARY: {
                BASE_URL: 'https://api.football-data.org/v4',
                API_KEY: '7c446517de684bc291a014304a3b1a24',
                HEADERS: {
                    'X-Auth-Token': '7c446517de684bc291a014304a3b1a24',
                    'Content-Type': 'application/json'
                }
            },
            // CORS Proxy fallback
            PROXY: {
                BASE_URL: 'https://api.allorigins.win/get?url=',
                FOOTBALL_API: 'https://api.football-data.org/v4'
            },
            // Alternative APIs
            ALTERNATIVE: {
                // Using a different approach with SportMonks or similar
                BASE_URL: 'https://jsonplaceholder.typicode.com', // Placeholder for demo
            },
            
            HAMMARBY_ID: 1059,
            ALLSVENSKAN_ID: 2025
        };

        // Mock data for fallback when APIs fail
        const MOCK_DATA = {
            hammarby: {
                position: 2,
                goalsFor: 8,
                goalsAgainst: 3,
                playedGames: 4,
                won: 3,
                draw: 1,
                lost: 0,
                points: 10,
                goalDifference: 5
            },
            matches: [
                {
                    utcDate: '2025-01-15T15:00:00Z',
                    homeTeam: { name: 'Sirius' },
                    awayTeam: { name: 'Hammarby IF' },
                    score: { fullTime: { home: 0, away: 3 }, winner: 'AWAY_TEAM' }
                },
                {
                    utcDate: '2025-01-08T18:00:00Z',
                    homeTeam: { name: 'Hammarby IF' },
                    awayTeam: { name: 'Kalmar FF' },
                    score: { fullTime: { home: 2, away: 0 }, winner: 'HOME_TEAM' }
                },
                {
                    utcDate: '2025-01-01T16:00:00Z',
                    homeTeam: { name: 'Hammarby IF' },
                    awayTeam: { name: 'IFK Göteborg' },
                    score: { fullTime: { home: 1, away: 1 }, winner: 'DRAW' }
                }
            ],
            scorers: [
                { player: { name: 'Nahir Besara' }, goals: 3, assists: 2, team: { name: 'Hammarby IF' } },
                { player: { name: 'Jusef Erabi' }, goals: 2, assists: 1, team: { name: 'Hammarby IF' } },
                { player: { name: 'Viktor Đukanović' }, goals: 3, assists: 1, team: { name: 'Hammarby IF' } },
                { player: { name: 'Logan' }, goals: 1, assists: 3, team: { name: 'Hammarby IF' } }
            ]
        };

        // Enhanced fetch with multiple fallback strategies
        async function fetchWithFallback(url, options = {}) {
            const attempts = [
                // Method 1: Direct API call
                () => fetch(url, options),
                
                // Method 2: CORS Proxy
                () => fetch(`${API_CONFIG.PROXY.BASE_URL}${encodeURIComponent(url)}`, {
                    method: 'GET'
                }).then(response => response.json()).then(data => ({
                    ok: true,
                    json: () => Promise.resolve(JSON.parse(data.contents))
                })),
                
                // Method 3: Alternative proxy
                () => fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
                    ...options,
                    headers: {
                        ...options.headers,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
            ];

            for (let i = 0; i < attempts.length; i++) {
                try {
                    console.log(`🔄 Försök ${i + 1}: Hämtar data...`);
                    const response = await attempts[i]();
                    
                    if (response.ok) {
                        console.log(`✅ Lyckades med metod ${i + 1}`);
                        return response;
                    }
                } catch (error) {
                    console.log(`❌ Metod ${i + 1} misslyckades:`, error.message);
                    if (i === attempts.length - 1) {
                        throw error;
                    }
                }
            }
        }

        // API Functions with enhanced error handling
        async function fetchHammarbySeason() {
            try {
                console.log('📊 Hämtar Hammarby säsongsdata...');
                
                const url = `${API_CONFIG.PRIMARY.BASE_URL}/teams/${API_CONFIG.HAMMARBY_ID}`;
                const response = await fetchWithFallback(url, {
                    headers: API_CONFIG.PRIMARY.HEADERS
                });

                const teamData = await response.json();
                console.log('✅ Hammarby data hämtad:', teamData);
                return teamData;
                
            } catch (error) {
                console.error('❌ Fel vid hämtning av Hammarby data:', error);
                return null;
            }
        }

        async function fetchAllsvenskanStandings() {
            try {
                console.log('📈 Hämtar Allsvenskan tabellställning...');
                
                const url = `${API_CONFIG.PRIMARY.BASE_URL}/competitions/${API_CONFIG.ALLSVENSKAN_ID}/standings`;
                const response = await fetchWithFallback(url, {
                    headers: API_CONFIG.PRIMARY.HEADERS
                });

                const standingsData = await response.json();
                console.log('✅ Tabelldata hämtad:', standingsData);
                return standingsData;
                
            } catch (error) {
                console.error('❌ Fel vid hämtning av tabelldata:', error);
                return null;
            }
        }

        async function fetchHammarbyleMatches() {
            try {
                console.log('⚽ Hämtar Hammarby matcher...');
                
                const url = `${API_CONFIG.PRIMARY.BASE_URL}/teams/${API_CONFIG.HAMMARBY_ID}/matches?status=FINISHED&limit=10`;
                const response = await fetchWithFallback(url, {
                    headers: API_CONFIG.PRIMARY.HEADERS
                });

                const matchesData = await response.json();
                console.log('✅ Matchdata hämtad:', matchesData);
                return matchesData;
                
            } catch (error) {
                console.error('❌ Fel vid hämtning av matchdata:', error);
                return null;
            }
        }

        async function fetchTopScorers() {
            try {
                console.log('👥 Hämtar målskyteliga...');
                
                const url = `${API_CONFIG.PRIMARY.BASE_URL}/competitions/${API_CONFIG.ALLSVENSKAN_ID}/scorers`;
                const response = await fetchWithFallback(url, {
                    headers: API_CONFIG.PRIMARY.HEADERS
                });

                const scorersData = await response.json();
                console.log('✅ Målskyttedata hämtad:', scorersData);
                return scorersData;
                
            } catch (error) {
                console.error('❌ Fel vid hämtning av målskyttedata:', error);
                return null;
            }
        }

        // Update DOM with real or mock data
        function updateStatistics(teamData, standingsData, matchesData, scorersData, useMockData = false) {
            console.log('🔄 Uppdaterar webbsidan med data...');

            if (useMockData) {
                console.log('📝 Använder mock-data på grund av API-problem');
                updateWithMockData();
                showUpdateIndicator('MOCK DATA LADDAD (CORS-problem)');
                return;
            }

            if (standingsData && standingsData.standings) {
                const hammarbyle = standingsData.standings[0].table.find(team => 
                    team.team.name.toLowerCase().includes('hammarby')
                );

                if (hammarbyle) {
                    updateMainStats(hammarbyle);
                    updateDetailedStats(hammarbyle);
                    console.log('✅ Tabellstatistik uppdaterad');
                }
            }

            if (matchesData && matchesData.matches) {
                updateMatchesDisplay(matchesData.matches.slice(0, 3));
            }

            if (scorersData && scorersData.scorers) {
                updatePlayersDisplay(scorersData.scorers);
            }

            showUpdateIndicator('REAL DATA UPPDATERAD');
        }

        function updateWithMockData() {
            // Update main statistics with mock data
            updateMainStats(MOCK_DATA.hammarby);
            updateDetailedStats(MOCK_DATA.hammarby);
            updateMatchesDisplay(MOCK_DATA.matches);
            updatePlayersDisplay(MOCK_DATA.scorers);
        }

        function updateMainStats(data) {
            const statNumbers = document.querySelectorAll('.stat-number');
            if (statNumbers[0]) statNumbers[0].textContent = data.position;
            if (statNumbers[1]) statNumbers[1].textContent = data.goalsFor;
            if (statNumbers[2]) statNumbers[2].textContent = data.goalsAgainst;
            if (statNumbers[3]) statNumbers[3].textContent = Math.round((data.won / data.playedGames) * 100) + '%';
        }

        function updateDetailedStats(data) {
            const statRows = document.querySelectorAll('.stat-row span:last-child');
            if (statRows[0]) statRows[0].textContent = data.playedGames;
            if (statRows[1]) statRows[1].textContent = data.won;
            if (statRows[2]) statRows[2].textContent = data.draw;
            if (statRows[3]) statRows[3].textContent = data.lost;
            if (statRows[4]) statRows[4].textContent = data.points;
            if (statRows[5]) statRows[5].textContent = data.goalDifference > 0 ? '+' + data.goalDifference : data.goalDifference;
        }

        function updateMatchesDisplay(matches) {
            const matchCards = document.querySelectorAll('.match-card');
            
            matches.forEach((match, index) => {
                if (matchCards[index]) {
                    const card = matchCards[index];
                    const isHomeGame = match.homeTeam.name.toLowerCase().includes('hammarby');
                    
                    // Update match date
                    const dateElement = card.querySelector('.match-date');
                    if (dateElement) {
                        const matchDate = new Date(match.utcDate);
                        dateElement.textContent = matchDate.toLocaleDateString('sv-SE', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        });
                    }

                    // Update team names and scores
                    const homeTeamName = card.querySelector('.team.home .team-name');
                    const awayTeamName = card.querySelector('.team.away .team-name');
                    const homeScore = card.querySelector('.team.home .score');
                    const awayScore = card.querySelector('.team.away .score');

                    if (homeTeamName) homeTeamName.textContent = match.homeTeam.name;
                    if (awayTeamName) awayTeamName.textContent = match.awayTeam.name;
                    if (homeScore) homeScore.textContent = match.score.fullTime.home;
                    if (awayScore) awayScore.textContent = match.score.fullTime.away;

                    // Update result indicator
                    const resultElement = card.querySelector('.match-result');
                    if (resultElement && match.score.winner) {
                        let result, className;
                        
                        if (match.score.winner === 'DRAW') {
                            result = 'O';
                            className = 'draw';
                        } else if ((isHomeGame && match.score.winner === 'HOME_TEAM') || 
                                 (!isHomeGame && match.score.winner === 'AWAY_TEAM')) {
                            result = 'V';
                            className = 'win';
                        } else {
                            result = 'F';
                            className = 'loss';
                        }

                        resultElement.textContent = result;
                        resultElement.className = `match-result ${className}`;
                    }
                }
            });

            console.log('✅ Matchresultat uppdaterade');
        }

        function updatePlayersDisplay(scorers) {
            // Filter Hammarby players or use mock data
            const hammarbyleScorers = scorers.filter ? 
                scorers.filter(scorer => scorer.team.name.toLowerCase().includes('hammarby')).slice(0, 3) :
                scorers.slice(0, 3);

            const playerCards = document.querySelectorAll('.player-card');
            
            hammarbyleScorers.forEach((scorer, index) => {
                if (playerCards[index]) {
                    const card = playerCards[index];
                    
                    // Update player name
                    const nameElement = card.querySelector('h3');
                    if (nameElement) {
                        nameElement.textContent = scorer.player.name;
                    }

                    // Update goals
                    const goalsElement = card.querySelector('.goals');
                    if (goalsElement) {
                        goalsElement.textContent = `${scorer.goals} mål`;
                    }

                    // Update assists
                    const assistsElement = card.querySelector('.assists');
                    if (assistsElement) {
                        assistsElement.textContent = `${scorer.assists || 0} assist`;
                    }
                }
            });

            console.log('✅ Spelarstatistik uppdaterad');
        }

        function showUpdateIndicator(message = 'LIVE DATA UPPDATERAD') {
            let indicator = document.querySelector('.live-indicator');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.className = 'live-indicator';
                indicator.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #00A859, #4AC982);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-weight: bold;
                    font-size: 0.9rem;
                    z-index: 1000;
                    box-shadow: 0 4px 15px rgba(0, 168, 89, 0.3);
                    animation: slideIn 0.5s ease;
                `;
                document.body.appendChild(indicator);

                // Add animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }

            indicator.textContent = `🟢 ${message}`;
            
            // Flash effect
            indicator.style.animation = 'none';
            setTimeout(() => {
                indicator.style.animation = 'slideIn 0.5s ease';
            }, 10);
        }

        function showCORSInstructions() {
            const modal = document.createElement('div');
            modal.className = 'cors-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>🚫 CORS-problem upptäckt</h3>
                    <p>API:et kan inte nås direkt från din webbläsare på grund av CORS-restriktioner.</p>
                    
                    <h4>🔧 Lösningar:</h4>
                    <div class="solution">
                        <h5>1. Starta en lokal server:</h5>
                        <code>python -m http.server 8000</code>
                        <p>Sedan gå till: <strong>http://localhost:8000</strong></p>
                    </div>
                    
                    <div class="solution">
                        <h5>2. Använd VS Code Live Server:</h5>
                        <p>Installera "Live Server" extension och högerklicka på index.html → "Open with Live Server"</p>
                    </div>
                    
                    <div class="solution">
                        <h5>3. Använd mock-data tills vidare:</h5>
                        <p>Appen visar nu simulated realistisk Hammarby-data istället.</p>
                    </div>
                    
                    <p><strong>Mock-data inkluderar:</strong><br>
                    ✅ Realistisk tabellposition (2:a plats)<br>
                    ✅ Aktuella målstatistik (8-3 målskillnad)<br>
                    ✅ Senaste matchresultat<br>
                    ✅ Målskyttar: Besara, Erabi, Đukanović</p>
                    
                    <button onclick="this.parentElement.parentElement.remove()">Förstått - Fortsätt med mock-data</button>
                </div>
            `;
            
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            `;

            const content = modal.querySelector('.modal-content');
            content.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 600px;
                margin: 1rem;
                text-align: left;
                max-height: 80vh;
                overflow-y: auto;
            `;

            const solutions = modal.querySelectorAll('.solution');
            solutions.forEach(solution => {
                solution.style.cssText = `
                    background: #f5f5f5;
                    padding: 1rem;
                    margin: 1rem 0;
                    border-radius: 5px;
                    border-left: 4px solid #00A859;
                `;
            });

            modal.querySelector('code').style.cssText = `
                background: #333;
                color: #0f0;
                padding: 5px 10px;
                border-radius: 3px;
                font-family: monospace;
                display: block;
                margin: 0.5rem 0;
            `;

            modal.querySelector('button').style.cssText = `
                background: #00A859;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 1rem;
                font-weight: bold;
                width: 100%;
            `;

            document.body.appendChild(modal);
        }

        // Main initialization function
        async function loadRealData() {
            try {
                console.log('🚀 Startar hämtning av riktig Hammarby data...');
                showUpdateIndicator('LADDAR RIKTIG DATA...');

                // Try to fetch real data
                const [teamData, standingsData, matchesData, scorersData] = await Promise.all([
                    fetchHammarbySeason(),
                    fetchAllsvenskanStandings(),
                    fetchHammarbyleMatches(),
                    fetchTopScorers()
                ]);

                if (teamData || standingsData || matchesData || scorersData) {
                    updateStatistics(teamData, standingsData, matchesData, scorersData, false);
                    console.log('🎉 Riktig data laddad framgångsrikt!');
                } else {
                    throw new Error('Ingen data kunde hämtas från API:et');
                }

            } catch (error) {
                console.error('❌ Fel vid laddning av riktig data:', error);
                console.log('🔄 Växlar till mock-data...');
                
                // Use mock data as fallback
                updateStatistics(null, null, null, null, true);
                
                // Show CORS instructions after a delay
                setTimeout(() => {
                    showCORSInstructions();
                }, 1000);
            }
        }

        // Auto-refresh every 5 minutes
        function startAutoRefresh() {
            setInterval(() => {
                console.log('🔄 Auto-uppdatering av data...');
                loadRealData();
            }, 300000); // 5 minutes
        }

        // Initial load
        setTimeout(() => {
            loadRealData();
            startAutoRefresh();
        }, 2000);

        // Manual refresh button
        const refreshButton = document.createElement('button');
        refreshButton.textContent = '🔄 Uppdatera Data';
        refreshButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #00A859;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;
        refreshButton.onclick = loadRealData;
        document.body.appendChild(refreshButton);
    }

    // Initialize real data integration
    initializeRealDataAPI();
    
    // Update greeting
    updateGreeting();
}); 