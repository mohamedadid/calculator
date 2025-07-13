// Create animated particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size
                const size = Math.random() * 20 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation delay and duration
                const delay = Math.random() * 5;
                const duration = 15 + Math.random() * 20;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Initialize particles
        createParticles();
        
        // Category navigation
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Filter calculators by category
                const category = button.getAttribute('data-category');
                document.querySelectorAll('.calculator-card').forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Toggle second number field for scientific calculator
        document.getElementById('sciOperation').addEventListener('change', function() {
            const num2Group = document.getElementById('sciNum2Group');
            if (this.value === 'power') {
                num2Group.style.display = 'block';
            } else {
                num2Group.style.display = 'none';
            }
        });

        // Initialize scientific calculator on page load
        document.addEventListener('DOMContentLoaded', function() {
            const sciOperation = document.getElementById('sciOperation');
            const num2Group = document.getElementById('sciNum2Group');
            if (sciOperation.value === 'power') {
                num2Group.style.display = 'block';
            } else {
                num2Group.style.display = 'none';
            }
        });

        // Basic Calculator - FIXED
        function calculateBasic() {
            const num1 = parseFloat(document.getElementById('num1').value) || 0;
            const num2 = parseFloat(document.getElementById('num2').value) || 0;
            const operation = document.getElementById('operation').value;
            
            let result;
            switch(operation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        showToast("Cannot divide by zero", "error");
                        return;
                    }
                    result = num1 / num2;
                    break;
                case 'modulo':
                    result = num1 % num2;
                    break;
                default:
                    result = "Invalid operation";
            }
            
            document.getElementById('basicResultValue').textContent = result;
            document.getElementById('basicResult').style.display = 'block';
            document.getElementById('basicResult').classList.add('show');
        }

        // Scientific Calculator - FIXED
        function calculateScientific() {
            const num1 = parseFloat(document.getElementById('sciNum1').value) || 0;
            const num2 = parseFloat(document.getElementById('sciNum2').value) || 0;
            const operation = document.getElementById('sciOperation').value;
            
            let result;
            switch(operation) {
                case 'square':
                    result = num1 * num1;
                    break;
                case 'sqrt':
                    if (num1 < 0) {
                        showToast("Cannot calculate square root of a negative number", "error");
                        return;
                    }
                    result = Math.sqrt(num1);
                    break;
                case 'power':
                    result = Math.pow(num1, num2);
                    break;
                case 'log':
                    if (num1 <= 0) {
                        showToast("Logarithm is only defined for positive numbers", "error");
                        return;
                    }
                    result = Math.log10(num1);
                    break;
                case 'sin':
                    result = Math.sin(num1 * Math.PI / 180);
                    break;
                case 'cos':
                    result = Math.cos(num1 * Math.PI / 180);
                    break;
                case 'tan':
                    result = Math.tan(num1 * Math.PI / 180);
                    break;
                default:
                    result = "Invalid operation";
            }
            
            // Round to 4 decimal places
            result = Math.round(result * 10000) / 10000;
            
            document.getElementById('scientificResultValue').textContent = result;
            document.getElementById('scientificResult').style.display = 'block';
            document.getElementById('scientificResult').classList.add('show');
        }

        // Financial Calculator (Loan) - FIXED
        function calculateLoan() {
            const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
            const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
            const loanTerm = parseFloat(document.getElementById('loanTerm').value) || 0;
            
            // Calculate monthly payment
            const monthlyRate = interestRate / 100 / 12;
            const payments = loanTerm * 12;
            
            // P * (r(1+r)^n) / ((1+r)^n - 1)
            const x = Math.pow(1 + monthlyRate, payments);
            const monthlyPayment = (loanAmount * monthlyRate * x) / (x - 1);
            
            const totalPayment = monthlyPayment * payments;
            const totalInterest = totalPayment - loanAmount;
            
            document.getElementById('loanResultValue').textContent = '$' + monthlyPayment.toFixed(2);
            document.getElementById('totalInterest').textContent = '$' + totalInterest.toFixed(2);
            document.getElementById('totalPayment').textContent = '$' + totalPayment.toFixed(2);
            document.getElementById('loanResult').style.display = 'block';
            document.getElementById('loanResult').classList.add('show');
        }

        // Tax Calculator - FIXED
        function calculateTax() {
            const income = parseFloat(document.getElementById('income').value) || 0;
            const deductions = parseFloat(document.getElementById('deductions').value) || 0;
            const filingStatus = document.getElementById('filingStatus').value;
            
            const taxableIncome = income - deductions;
            let taxRate, taxOwed;
            
            // Simplified tax brackets (for demonstration)
            if (taxableIncome <= 10000) {
                taxRate = 0.10;
            } else if (taxableIncome <= 40000) {
                taxRate = 0.12;
            } else if (taxableIncome <= 85000) {
                taxRate = 0.22;
            } else if (taxableIncome <= 163000) {
                taxRate = 0.24;
            } else {
                taxRate = 0.32;
            }
            
            taxOwed = taxableIncome * taxRate;
            
            document.getElementById('taxableIncome').textContent = '$' + taxableIncome.toFixed(2);
            document.getElementById('taxRate').textContent = (taxRate * 100).toFixed(0) + '%';
            document.getElementById('taxOwed').textContent = '$' + taxOwed.toFixed(2);
            document.getElementById('taxResult').style.display = 'block';
            document.getElementById('taxResult').classList.add('show');
        }

        // Health Calculator (BMI) - FIXED
        function calculateBMI() {
            const unitSystem = document.querySelector('input[name="unitSystem"]:checked').value;
            const weight = parseFloat(document.getElementById('weight').value) || 0;
            const height = parseFloat(document.getElementById('height').value) || 0;
            
            if (weight <= 0 || height <= 0) {
                showToast("Please enter valid weight and height values", "error");
                return;
            }
            
            let bmi;
            if (unitSystem === 'metric') {
                // BMI = weight(kg) / height(m)^2
                bmi = weight / Math.pow(height / 100, 2);
            } else {
                // BMI = (weight(lbs) / height(in)^2) * 703
                bmi = (weight / Math.pow(height, 2)) * 703;
            }
            
            // Determine BMI category
            let category, color;
            if (bmi < 18.5) {
                category = "Underweight";
                color = "var(--warning)";
            } else if (bmi < 25) {
                category = "Normal weight";
                color = "var(--success)";
            } else if (bmi < 30) {
                category = "Overweight";
                color = "var(--warning)";
            } else {
                category = "Obese";
                color = "var(--danger)";
            }
            
            document.getElementById('bmiValue').textContent = bmi.toFixed(1);
            document.getElementById('bmiCategory').textContent = category;
            document.getElementById('bmiCategory').style.color = color;
            document.getElementById('bmiResult').style.display = 'block';
            document.getElementById('bmiResult').classList.add('show');
        }

        // Currency Converter - FIXED
        function convertCurrency() {
            const amount = parseFloat(document.getElementById('amount').value) || 0;
            const fromCurrency = document.getElementById('fromCurrency').value;
            const toCurrency = document.getElementById('toCurrency').value;
            
            // Mock exchange rates (in a real app, you'd fetch from an API)
            const rates = {
                USD: { EUR: 0.93, GBP: 0.79, JPY: 144.50, CAD: 1.36 },
                EUR: { USD: 1.07, GBP: 0.85, JPY: 155.00, CAD: 1.46 },
                GBP: { USD: 1.27, EUR: 1.18, JPY: 183.00, CAD: 1.72 },
                JPY: { USD: 0.0069, EUR: 0.0064, GBP: 0.0055, CAD: 0.0094 },
                CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 106.50 }
            };
            
            const rate = rates[fromCurrency][toCurrency];
            const convertedAmount = amount * rate;
            
            let symbol;
            switch(toCurrency) {
                case 'USD': symbol = '$'; break;
                case 'EUR': symbol = '€'; break;
                case 'GBP': symbol = '£'; break;
                case 'JPY': symbol = '¥'; break;
                default: symbol = '$';
            }
            
            document.getElementById('convertedAmount').textContent = 
                symbol + convertedAmount.toFixed(2);
                
            document.getElementById('exchangeRate').textContent = 
                `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
                
            document.getElementById('currencyResult').style.display = 'block';
            document.getElementById('currencyResult').classList.add('show');
        }

        // Save result function
        function saveResult(calculatorType) {
            showToast(`Result saved for ${calculatorType} calculator!`, "success");
            // Add to history
            const historyList = document.getElementById('historyList');
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            
            let content = '';
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            
            switch(calculatorType) {
                case 'basic':
                    const basicResult = document.getElementById('basicResultValue').textContent;
                    content = `<strong>Arithmetic Calculator</strong><br>Result: ${basicResult}<br><small>${timeString}</small>`;
                    break;
                case 'scientific':
                    const sciResult = document.getElementById('scientificResultValue').textContent;
                    content = `<strong>Scientific Calculator</strong><br>Result: ${sciResult}<br><small>${timeString}</small>`;
                    break;
                case 'financial':
                    const loanResult = document.getElementById('loanResultValue').textContent;
                    content = `<strong>Loan Calculator</strong><br>Monthly Payment: ${loanResult}<br><small>${timeString}</small>`;
                    break;
                case 'tax':
                    const taxResult = document.getElementById('taxOwed').textContent;
                    content = `<strong>Tax Calculator</strong><br>Tax Owed: ${taxResult}<br><small>${timeString}</small>`;
                    break;
                case 'health':
                    const bmiResult = document.getElementById('bmiValue').textContent;
                    content = `<strong>BMI Calculator</strong><br>BMI: ${bmiResult}<br><small>${timeString}</small>`;
                    break;
                case 'currency':
                    const currencyResult = document.getElementById('convertedAmount').textContent;
                    content = `<strong>Currency Converter</strong><br>Result: ${currencyResult}<br><small>${timeString}</small>`;
                    break;
                default:
                    content = `Calculation saved<br><small>${timeString}</small>`;
            }
            
            historyItem.innerHTML = content;
            historyList.insertBefore(historyItem, historyList.firstChild);
        }

        // Share result function
        function shareResult(calculatorType) {
            if (navigator.share) {
                navigator.share({
                    title: `My ${calculatorType} calculation result`,
                    text: `Check out my calculation result from NexusCalc!`,
                    url: window.location.href
                })
                .catch(error => console.log('Error sharing:', error));
            } else {
                showToast("Sharing is not supported in your browser. Copy the URL manually.", "info");
            }
        }
        
        // Show toast notification
        function showToast(message, type) {
            const toast = document.createElement('div');
            toast.classList.add('toast');
            toast.textContent = message;
            
            if (type === "error") {
                toast.style.borderLeftColor = "var(--danger)";
            } else if (type === "success") {
                toast.style.borderLeftColor = "var(--success)";
            } else if (type === "info") {
                toast.style.borderLeftColor = "var(--secondary)";
            }
            
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 500);
            }, 3000);
        }
        
        // History and Settings functionality
        document.getElementById('historyBtn').addEventListener('click', () => {
            document.getElementById('historyPanel').classList.add('active');
        });
        
        document.getElementById('closeHistory').addEventListener('click', () => {
            document.getElementById('historyPanel').classList.remove('active');
        });
        
        document.getElementById('settingsBtn').addEventListener('click', () => {
            document.getElementById('settingsPanel').classList.add('active');
        });
        
        document.getElementById('closeSettings').addEventListener('click', () => {
            document.getElementById('settingsPanel').classList.remove('active');
        });
        
        // Theme selector
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
                
                const theme = this.getAttribute('data-theme');
                if (theme === "sunset") {
                    document.documentElement.style.setProperty('--primary', '#ff2d75');
                    document.documentElement.style.setProperty('--secondary', '#ff8c00');
                } else if (theme === "forest") {
                    document.documentElement.style.setProperty('--primary', '#00b09b');
                    document.documentElement.style.setProperty('--secondary', '#96c93d');
                } else if (theme === "ocean") {
                    document.documentElement.style.setProperty('--primary', '#4b6cb7');
                    document.documentElement.style.setProperty('--secondary', '#182848');
                } else {
                    document.documentElement.style.setProperty('--primary', '#8a2be2');
                    document.documentElement.style.setProperty('--secondary', '#00c6ff');
                }
            });
        });





        