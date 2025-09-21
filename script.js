document.addEventListener('DOMContentLoaded', function() {
    const fortuneBtn = document.getElementById('fortune-btn');
    const nameInput = document.getElementById('name');
    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    const resultCard = document.getElementById('result');
    const tarotCardImage = document.getElementById('tarot-card-image');
    const cardNameDisplay = document.getElementById('card-name');
    const resultTitle = document.getElementById('result-title');
    const resultDetail = document.getElementById('result-detail');
    const resultAdvice = document.getElementById('result-advice');

    // 动态生成年份选项
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + ' 年';
        yearSelect.appendChild(option);
    }
    yearSelect.value = 2000;

    // 动态生成月份选项
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + ' 月';
        monthSelect.appendChild(option);
    }

    // 动态生成天数选项
    function updateDays() {
        const selectedYear = parseInt(yearSelect.value);
        const selectedMonth = parseInt(monthSelect.value);
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        
        daySelect.innerHTML = '';
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i + ' 日';
            daySelect.appendChild(option);
        }
    }

    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);
    
    updateDays();

    // --- 塔罗牌库 (保持不变) ---
    const tarotDeck = [
        { name: "愚者 (The Fool)", image: "images/the_fool.png", title: "开启全新旅程，无畏探索", detail: "愚者牌象征着新的开始、纯真和对未知的开放。你的周运预示着一次全新的冒险或重要转变的到来。放下过去的束缚，以一颗开放和好奇的心去探索未知，你会发现意想不到的机遇。", advice: "建议：保持轻松乐观的心态，但也要留意脚下的路，不要过于鲁莽。相信直觉，大胆前行。" },
        { name: "魔术师 (The Magician)", image: "images/the_magician.png", title: "掌握力量，创造奇迹", detail: "魔术师牌代表着强大的意志力、创造力和将想法变为现实的能力。本周你拥有达成目标所需的所有工具和资源。是时候展现你的才华，将计划付诸实践，你将看到显著的成果。", advice: "建议：相信自己的能力，主动出击。运用你的智慧和沟通技巧，把愿景变为现实。避免优柔寡断。" },
        { name: "女祭司 (The High Priestess)", image: "images/the_high_priestess.png", title: "直觉指引，洞察深层智慧", detail: "女祭司象征着直觉、潜意识和隐藏的智慧。本周你需要向内探索，倾听内心的声音。不要急于行动，而是通过冥想、反思来获取深层次的洞察力。答案往往藏在平静之中。", advice: "建议：相信你的直觉，放慢节奏，多花时间独处。关注梦境和内心的感受，它们可能带来重要信息。" },
        { name: "女皇 (The Empress)", image: "images/the_empress.png", title: "丰盛滋养，创意涌现", detail: "女皇牌代表着丰饶、创造力、母性和自然。你的周运充满生机和滋养，适合发展创意项目、享受大自然或与家人共度时光。你将感受到生活的美好和丰盛，收获爱与成长。", advice: "建议：拥抱自然，关爱自己和他人。发挥你的创造力，享受生活带来的美好。关注身心健康。" },
        { name: "皇帝 (The Emperor)", image: "images/the_emperor.png", title: "建立秩序，掌控局面", detail: "皇帝牌象征着权威、结构、秩序和领导力。本周你需要在某个领域建立起稳固的基础和规则。你将拥有强大的掌控力，适合制定计划、承担责任，并以坚定的意志推动事务发展。", advice: "建议：发挥你的领导才能，有条不紊地执行计划。建立清晰的界限和规则，但也要注意不要过于独断。" },
        { name: "教皇 (The Hierophant)", image: "images/the_hierophant.png", title: "寻求智慧，遵循传统", detail: "教皇牌代表着传统、教导、信仰和精神导师。本周你可能会寻求或获得来自权威或传统机构的指导。适合学习、遵守规则、或在精神层面上有所成长。寻求智者的建议会很有益。", advice: "建议：尊重传统和既定规则，寻求导师的指引。是时候深入学习或加入某个团体，获得精神上的支持。" },
        { name: "恋人 (The Lovers)", image: "images/the_lovers.png", title: "面临选择，建立关系", detail: "恋人牌象征着选择、和谐、关系和价值观。本周你可能会面临一个重要的选择，这不仅关乎爱情，也可能涉及人际关系、职业方向或个人价值观。做出符合你内心真实渴望的决定至关重要。", advice: "建议：倾听内心的声音，权衡利弊。在关系中注重沟通和理解。勇敢做出选择并承担责任。" },
        { name: "战车 (The Chariot)", image: "images/the_chariot.png", title: "坚定前行，克服障碍", detail: "战车牌代表着胜利、决心和自我控制。本周你将充满动力，以坚定的意志朝着目标前进。尽管前路可能充满挑战，但只要你能驾驭好内心的矛盾，保持专注，胜利必将属于你。", advice: "建议：设定清晰的目标，集中精力。克服内心的冲突和外界的干扰，勇敢地向前冲。保持自信。" },
        { name: "力量 (Strength)", image: "images/strength.png", title: "内心柔韧，驯服本能", detail: "力量牌象征着内在的力量、勇气、耐心和对原始本能的驯服。本周你被呼唤去展现内心的柔韧和毅力，而不是强硬的对抗。用爱和理解去面对挑战，你将发现巨大的内在潜能。", advice: "建议：以温柔而坚定的方式应对挑战。控制你的冲动和愤怒，用耐心和同情心解决问题。相信内在的力量。" },
        { name: "隐士 (The Hermit)", image: "images/the_hermit.png", title: "独自反思，寻求真理", detail: "隐士牌代表着内省、独处、寻求真理和智慧。本周你可能需要退回到自己的内心世界，进行深度的反思和冥想。远离喧嚣，你将找到内在的指引和答案，获得更清晰的自我认知。", advice: "建议：给自己留出独处的时间，进行自我反思。寻求内在的智慧，而不是外界的干扰。学习和成长。" },
        { name: "命运之轮 (Wheel of Fortune)", image: "images/wheel_of_fortune.png", title: "命运转折，把握机遇", detail: "命运之轮象征着命运的转折、变化和新的循环。本周你可能会经历一些意想不到的事件，带来好运或新的机会。抓住这些机遇，顺势而为，你的生活将迎来积极的转变。", advice: "建议：保持开放的心态，拥抱变化。留意身边出现的机遇，并果断抓住。相信命运的安排。" },
        { name: "正义 (Justice)", image: "images/justice.png", title: "平衡公正，承担责任", detail: "正义牌代表着公平、平衡、真理和因果报应。本周你可能需要面对一个需要做出公正判断的局面，或者为你之前的行为承担后果。保持客观，诚实面对问题，你将得到公正的结果。", advice: "建议：保持公正和诚实，对自己的行为负责。在做决策时，权衡利弊，追求平衡。法律事务可能需要关注。" },
        { name: "倒吊人 (The Hanged Man)", image: "images/the_hanged_man.png", title: "暂停牺牲，寻求新视角", detail: "倒吊人象征着暂停、牺牲和从不同角度看问题。本周你可能需要暂时放下某些事情，甚至做出一些牺牲，才能获得更清晰的视野和更深刻的理解。这是一种主动的停滞，为了更好的前进。", advice: "建议：不要急于行动，主动暂停和反思。从不同的角度审视问题，也许会发现意想不到的解决方案。放手一些不必要的执念。" },
        { name: "死亡 (Death)", image: "images/death.png", title: "终结旧我，迎来重生", detail: "死亡牌并非预示真正的死亡，而是象征着结束、转变和重生的强大力量。本周你将告别过去，旧的模式、关系或生活方式可能会终结，为新的开始腾出空间。拥抱变化，迎接新生。", advice: "建议：接受并放手那些不再为你服务的旧事物。不要害怕改变，它将带来必要的重生。这是一个转折点。" },
        { name: "节制 (Temperance)", image: "images/temperance.png", title: "平衡和谐，耐心整合", detail: "节制牌代表着平衡、耐心、融合和中庸之道。本周你需要找到不同事物之间的和谐点，避免极端。通过耐心和自制，你可以将对立的元素融合在一起，创造出更好的结果。", advice: "建议：保持耐心，寻求平衡。在各种关系和决策中，寻找中间地带，促进合作和理解。避免冲动。" },
        { name: "恶魔 (The Devil)", image: "images/the_devil.png", title: "打破束缚，面对阴影", detail: "恶魔牌象征着诱惑、沉迷、物质主义和被限制。本周你可能需要审视那些让你感到受困的欲望或模式。它提醒你，真正的束缚往往来自内心。是时候打破幻象，重获自由。", advice: "建议：正视你的恐惧和欲望，它们并非不可战胜。审视你是否被物质、依赖或不健康的习惯所困。主动寻求解放。" },
        { name: "高塔 (The Tower)", image: "images/the_tower.png", title: "突变打破，重建根基", detail: "高塔牌代表着突如其来的剧变、旧秩序的崩溃和觉醒。本周你可能会经历一次震撼性的事件，颠覆你原有的认知或结构。虽然过程痛苦，但这正是打破虚假，重建更坚固基础的机会。", advice: "建议：接受突变是必要的。虽然会有冲击，但这为真正的解放和重建提供了机会。放下控制欲，迎接全新的开始。" },
        { name: "星星 (The Star)", image: "images/the_star.png", title: "希望降临，灵感治愈", detail: "星星牌象征着希望、灵感、治愈和对未来的信心。在经历挑战之后，你将感受到宇宙的慷慨和指引。本周是恢复身心平衡、重拾希望、并从宇宙中获取灵感的绝佳时机。", advice: "建议：相信未来的美好，保持乐观。跟随你的灵感，用积极的态度去实现梦想。这是一个治愈和更新的时期。" },
        { name: "月亮 (The Moon)", image: "images/the_moon.png", title: "迷雾重重，直觉指引", detail: "月亮牌代表着潜意识、幻象、不确定性和直觉。本周你可能感到迷茫或不安，周围环境充满模糊不清的元素。不要被表象迷惑，而是相信你的直觉，探索内心深处的真相。", advice: "建议：相信你的直觉，不要被恐惧或幻觉所困扰。避免在不清醒的情况下做重要决定。多加休息，关注梦境。" },
        { name: "太阳 (The Sun)", image: "images/the_sun.png", title: "光明普照，喜悦成功", detail: "太阳牌是塔罗牌中最积极的牌之一，象征着光明、喜悦、成功和活力。本周你将感受到生命的光辉，充满乐观和自信。你的努力将得到回报，享受成功和幸福的时刻。", advice: "建议：尽情享受生活带来的喜悦和成功。分享你的快乐，散发你的光芒。这是一个充满活力和成就的时期。" },
        { name: "审判 (Judgement)", image: "images/judgement.png", title: "觉醒审视，完成召唤", detail: "审判牌代表着觉醒、反思、自我评估和重要的决定。本周你可能会回顾过去的经历，对自己的行为和人生方向进行深刻反思。这是你回应内心召唤，做出重要人生判断的时刻。", advice: "建议：诚实地审视自己的过去，从中学习。准备好做出重要的决定或改变。倾听内心的召唤，完成你的使命。" },
        { name: "世界 (The World)", image: "images/the_world.png", title: "圆满完成，达到高峰", detail: "世界牌是塔罗牌的终结，象征着完整、成就、圆满和庆祝。你已经完成了生命中的一个重要周期，达到了一个高峰。本周你将感受到巨大的满足感和成就感，享受成功的果实。", advice: "建议：庆祝你的成就，享受圆满的时刻。为下一个新的开始做好准备。这是一个完成和达成的时期。" }
    ];

    // 基于用户生日生成一个唯一的索引
    function getTarotCardIndex(year, month, day) {
        // 使用一个简单的哈希算法：(年 + 月 + 日) 的总和对塔罗牌总数取余数
        const seed = parseInt(year) + parseInt(month) + parseInt(day);
        return seed % tarotDeck.length;
    }

    fortuneBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const year = yearSelect.value;
        const month = monthSelect.value;
        const day = daySelect.value;

        if (name === "" || !year || !month || !day) {
            alert("请完整输入你的姓名和生日，星辰才能为你指引方向。");
            return;
        }
        
        // 1. 获取占卜结果 (基于生日哈希)
        const chosenCardIndex = getTarotCardIndex(year, month, day);
        const chosenCard = tarotDeck[chosenCardIndex];

        // 2. 准备结果数据
        const fortuneData = {
            name: name === "" ? "你" : name,
            cardName: chosenCard.name,
            cardImage: chosenCard.image,
            title: chosenCard.title,
            detail: chosenCard.detail,
            advice: chosenCard.advice
        };

        // 3. 将数据存储在 sessionStorage
        sessionStorage.setItem('tarotFortune', JSON.stringify(fortuneData));

        // 4. 跳转到结果页面
        window.location.href = `result.html`;
    });
});