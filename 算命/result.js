document.addEventListener('DOMContentLoaded', function() {
    const fortuneDataString = sessionStorage.getItem('tarotFortune');
    const spreadContainer = document.getElementById('spread-container');
    const resultGreeting = document.getElementById('result-greeting');

    if (fortuneDataString) {
        const fortuneData = JSON.parse(fortuneDataString);
        
        spreadContainer.classList.remove('three-card-spread', 'five-card-spread');

        if (fortuneData.spreadType === 'three-card') {
            resultGreeting.textContent = `尊敬的 ${fortuneData.name}，你的三牌阵揭示了：`;
            spreadContainer.innerHTML = '';
            spreadContainer.classList.add('three-card-spread');
            fortuneData.cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('tarot-card');
                cardElement.innerHTML = `
                    <p class="tarot-card-name">${card.position}</p>
                    <img src="${card.image}" alt="${card.name}">
                    <p class="tarot-card-title">${card.name}</p>
                    <p class="tarot-card-detail">${card.detail}</p>
                `;
                spreadContainer.appendChild(cardElement);
            });
        } else if (fortuneData.spreadType === 'five-card') {
            resultGreeting.textContent = `尊敬的 ${fortuneData.name}，你的五牌阵揭示了：`;
            spreadContainer.innerHTML = '';
            spreadContainer.classList.add('five-card-spread');

            const cardPositions = [
                'center',
                'top',
                'bottom',
                'left',
                'right'
            ];

            fortuneData.cards.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('tarot-card');
                cardElement.classList.add(cardPositions[index]);
                cardElement.innerHTML = `
                    <p class="tarot-card-name">${card.position}</p>
                    <img src="${card.image}" alt="${card.name}">
                    <p class="tarot-card-title">${card.name}</p>
                    <p class="tarot-card-detail">${card.detail}</p>
                `;
                spreadContainer.appendChild(cardElement);
            });
        }
    } else {
        resultGreeting.textContent = "未找到占卜结果，请返回上一页重新占卜。";
        spreadContainer.innerHTML = '';
    }
});