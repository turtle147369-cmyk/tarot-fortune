document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    const fortuneBtn = document.getElementById('fortune-btn');
    const formCard = document.getElementById('form-card');
    const resultCard = document.getElementById('result-card');

    // 填充年份下拉菜单
    const currentYear = new Date().getFullYear();
    for (let i = 1950; i <= currentYear; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + ' 年';
        yearSelect.appendChild(option);
    }
    yearSelect.value = 2000;

    // 填充月份下拉菜单
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + ' 月';
        monthSelect.appendChild(option);
    }
    monthSelect.value = 1;

    // 更新天数
    function updateDays() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const daysInMonth = new Date(year, month, 0).getDate();
        daySelect.innerHTML = ''; // 清空旧天数
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' 日';
            daySelect.appendChild(option);
        }
    }
    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);
    updateDays(); // 初始填充天数

    // 塔罗牌数据
    const majorArcana = [
        { name: '愚者', title: 'The Fool', image: 'images/the_fool.png', details: '象征新的开始、自由、纯真和冒险。它代表着一种无拘无束的精神，准备好踏上一段未知的旅程。' },
        { name: '魔术师', title: 'The Magician', image: 'images/the_magician.png', details: '代表力量、技巧、专注和创造力。你拥有实现目标所需的所有工具，现在是时候将想法变为现实了。' },
        { name: '女祭司', title: 'The High Priestess', image: 'images/the_high_priestess.png', details: '象征直觉、潜意识、神秘和内在智慧。这张牌提醒你倾听内心的声音，相信你的直觉。' },
        { name: '皇后', title: 'The Empress', image: 'images/the_empress.png', details: '代表丰收、生育、母性、自然和美丽。它预示着创造力正在蓬勃发展，是时候享受生活中的美好事物了。' },
        { name: '皇帝', title: 'The Emperor', image: 'images/the_emperor.png', details: '象征权威、结构、秩序和领导力。它表明你需要在一个领域建立稳固的基础和规则。' },
        { name: '教皇', title: 'The Hierophant', image: 'images/the_hierophant.png', details: '代表传统、信仰、价值观和指导。它可能意味着你需要寻求导师的建议，或遵循既定的道路。' },
        { name: '恋人', title: 'The Lovers', image: 'images/the_lovers.png', details: '象征选择、爱、关系和价值取向。你正面临一个重要的决定，它将影响你的人际关系和未来方向。' },
        { name: '战车', title: 'The Chariot', image: 'images/the_chariot.png', details: '代表意志力、决心、胜利和控制。它鼓励你勇往直前，克服障碍，坚定地追求成功。' },
        { name: '力量', title: 'Strength', image: 'images/strength.png', details: '象征勇气、同情心、内在力量和对本能的驾驭。这张牌提醒你，真正的力量源于内心的平静与温柔。' },
        { name: '隐士', title: 'The Hermit', image: 'images/the_hermit.png', details: '代表内省、孤独、寻求真理和自我发现。现在是时候退一步思考，寻找内在的智慧了。' },
        { name: '命运之轮', title: 'Wheel of Fortune', image: 'images/wheel_of_fortune.png', details: '象征循环、命运、转折和好运。生活正发生不可预测的变化，把握机会，迎接新的开始。' },
        { name: '正义', title: 'Justice', image: 'images/justice.png', details: '代表公平、真理、因果和法律。它提醒你行为要公正，并承担相应的责任。' },
        { name: '倒吊人', title: 'The Hanged Man', image: 'images/the_hanged_man.png', details: '象征新的视角、牺牲、放下和暂停。你需要放弃旧的思维模式，从不同的角度看问题。' },
        { name: '死神', title: 'Death', image: 'images/death.png', details: '代表结束、转变、重生和释放。虽然名字吓人，但它预示着一个旧的阶段即将结束，新的开始即将到来。' },
        { name: '节制', title: 'Temperance', image: 'images/temperance.png', details: '象征平衡、中庸、和谐和耐心。它提醒你将对立的力量融合在一起，保持平和的心态。' },
        { name: '魔鬼', title: 'The Devil', image: 'images/the_devil.png', details: '代表诱惑、束缚、物质主义和阴影面。它暗示你可能被某种执念或不良习惯所束缚，需要勇气去面对和挣脱。' },
        { name: '高塔', title: 'The Tower', image: 'images/the_tower.png', details: '象征突然的改变、混乱、颠覆和启示。虽然过程痛苦，但它会摧毁不稳固的根基，为真正的成长腾出空间。' },
        { name: '星星', title: 'The Star', image: 'images/the_star.png', details: '代表希望、灵感、宁静和更新。它为你带来希望和清晰的指引，提醒你相信未来。' },
        { name: '月亮', title: 'The Moon', image: 'images/the_moon.png', details: '象征幻觉、潜意识、不安和直觉。它提醒你提防欺骗，并相信你的直觉来穿越不确定的时期。' },
        { name: '太阳', title: 'The Sun', image: 'images/the_sun.png', details: '代表成功、喜悦、活力和光明。这是塔罗牌中最积极的牌之一，预示着一切都将顺利。' },
        { name: '审判', title: 'Judgement', image: 'images/judgement.png', details: '象征重生、审视、召唤和觉醒。你正在接受自己过去的行动，并准备好进入人生的新阶段。' },
        { name: '世界', title: 'The World', image: 'images/the_world.png', details: '代表完成、成就、整合和圆满。它预示着一段旅程的成功结束，你已经实现了你的目标。' }
    ];

    function getRandomCards(num) {
        // 随机化算法，对于小数组来说是够用的
        const shuffled = [...majorArcana].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    fortuneBtn.addEventListener('click', () => {
        const spreadType = document.getElementById('spread-select').value;
        let selectedCards = [];

        if (spreadType === 'three-card') {
            selectedCards = getRandomCards(3).map((card, index) => {
                const positions = ['过去 (Past)', '现在 (Present)', '未来 (Future)'];
                return {
                    ...card,
                    position: positions[index]
                };
            });
        } else if (spreadType === 'five-card') {
            selectedCards = getRandomCards(5).map((card, index) => {
                const positions = ['现状与目标', '挑战与机遇', '内在力量', '未来发展', '最终结果'];
                return {
                    ...card,
                    position: positions[index]
                };
            });
        }

        displayResult(spreadType, selectedCards);
    });

    function displayResult(spreadType, cards) {
        const spreadContainer = resultCard.querySelector('.spread-container');
        spreadContainer.innerHTML = '';

        if (spreadType === 'three-card') {
            spreadContainer.className = 'spread-container three-card-spread';
        } else if (spreadType === 'five-card') {
            spreadContainer.className = 'spread-container five-card-spread';
        }

        cards.forEach((card, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'tarot-card';
            
            if (spreadType === 'three-card') {
                const positions = ['past-card', 'present-card', 'future-card'];
                cardDiv.classList.add(positions[index]);
            } else if (spreadType === 'five-card') {
                const positions = ['top', 'left', 'center', 'right', 'bottom'];
                cardDiv.classList.add(positions[index]);
            }

            cardDiv.innerHTML = `
                <span class="card-position-name">${card.position}</span>
                <img class="card-img" src="${card.image}" alt="${card.name}">
                <div class="card-hover-info">
                    <h3 class="tarot-card-name">${card.name}</h3>
                    <h4 class="tarot-card-title">${card.title}</h4>
                    <p class="tarot-card-detail">${card.details}</p>
                </div>
            `;
            spreadContainer.appendChild(cardDiv);

            // 移动端点击显示/隐藏悬浮信息
            cardDiv.addEventListener('touchstart', (event) => {
                // 阻止事件冒泡到父元素，防止多次触发
                event.stopPropagation();
                // 切换 'active' 类
                cardDiv.classList.toggle('active');
            });
        });
        
        // 增加点击空白处隐藏悬浮信息的监听器
        document.body.addEventListener('touchstart', (event) => {
            // 检查点击的元素是否在 .tarot-card 内部
            if (!event.target.closest('.tarot-card')) {
                // 如果不是，则移除所有牌的 'active' 类
                document.querySelectorAll('.tarot-card').forEach(card => {
                    card.classList.remove('active');
                });
            }
        });

        formCard.classList.add('result-hidden');
        resultCard.classList.remove('result-hidden');
    }
    
    window.restart = function() {
        formCard.classList.remove('result-hidden');
        resultCard.classList.add('result-hidden');
        // 重置日期和天数
        yearSelect.value = 2000;
        monthSelect.value = 1;
        updateDays();
    };
});