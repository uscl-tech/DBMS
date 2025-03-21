
        // Base URL for API
        const API_URL = 'http://localhost:3000';
        
        // DOM Elements
        const addAvengerForm = document.getElementById('addAvengerForm');
        const postStatus = document.getElementById('postStatus');
        const getAllAvengersBtn = document.getElementById('getAllAvengers');
        const getByIdBtn = document.getElementById('getById');
        const idInput = document.getElementById('idInput');
        const fetchByIdBtn = document.getElementById('fetchById');
        const getStatus = document.getElementById('getStatus');
        const avengersList = document.getElementById('avengersList');
        
        // Add Avenger Form Submission
        addAvengerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                power: document.getElementById('power').value,
                team: document.getElementById('team').value
            };
            
            try {
                const response = await fetch(`${API_URL}/avengers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showStatus(postStatus, 'Avenger added successfully!', true);
                    addAvengerForm.reset();
                } else {
                    showStatus(postStatus, `Error: ${data.error}`, false);
                }
            } catch (error) {
                showStatus(postStatus, `Network error: ${error.message}`, false);
            }
        });
        
        // Get All Avengers
        getAllAvengersBtn.addEventListener('click', async () => {
            idInput.style.display = 'none';
            await fetchAvengers();
        });
        
        // Show Get By ID Input
        getByIdBtn.addEventListener('click', () => {
            idInput.style.display = 'block';
        });
        
        // Fetch Avenger by ID
        fetchByIdBtn.addEventListener('click', async () => {
            const id = document.getElementById('avengerId').value;
            
            if (!id) {
                showStatus(getStatus, 'Please enter an ID', false);
                return;
            }
            
            await fetchAvengerById(id);
        });
        
        // Fetch All Avengers
        async function fetchAvengers() {
            try {
                const response = await fetch(`${API_URL}/avengers`);
                const data = await response.json();
                
                if (response.ok) {
                    displayAvengers(data);
                    showStatus(getStatus, 'Avengers retrieved successfully!', true);
                } else {
                    showStatus(getStatus, `Error: ${data.error}`, false);
                }
            } catch (error) {
                showStatus(getStatus, `Network error: ${error.message}`, false);
            }
        }
        
        // Fetch Avenger by ID
        async function fetchAvengerById(id) {
            try {
                const response = await fetch(`${API_URL}/avengers/${id}`);
                const data = await response.json();
                
                if (response.ok) {
                    displayAvengers([data]);
                    showStatus(getStatus, 'Avenger retrieved successfully!', true);
                } else {
                    showStatus(getStatus, `Error: ${data.error}`, false);
                }
            } catch (error) {
                showStatus(getStatus, `Network error: ${error.message}`, false);
            }
        }
        
        // Display Avengers
        function displayAvengers(avengers) {
            avengersList.innerHTML = '';
            
            if (avengers.length === 0) {
                avengersList.innerHTML = '<p>No avengers found.</p>';
                return;
            }
            
            avengers.forEach(avenger => {
                const avengerCard = document.createElement('div');
                avengerCard.className = 'avenger-card';
                avengerCard.innerHTML = `
                    <h3>${avenger.name}</h3>
                    <p><strong>ID:</strong> ${avenger.id}</p>
                    <p><strong>Power:</strong> ${avenger.power}</p>
                    <p><strong>Team:</strong> ${avenger.team}</p>
                `;
                avengersList.appendChild(avengerCard);
            });
        }
        
        // Show Status Message
        function showStatus(element, message, isSuccess) {
            element.textContent = message;
            element.className = `status ${isSuccess ? 'success' : 'error'}`;
            element.style.display = 'block';
            
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
    