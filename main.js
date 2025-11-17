class AISecurityChallenge {
    constructor() {
        this.currentLevel = null;
        this.apiConfig = null; // 缓存API配置以避免重复请求
        this.gameState = {
            completedLevels: [],
            hintPoints: 3,
            attempts: 0,
            startTime: null,
            achievements: [],
            collectedFlags: [],
            safeWordCompletions: 0,
            levelCompletionTimes: {}
        };
        
        this.levels = [
            {
                id: 1,
                title: "直接询问",
                difficulty: "简单",
                role: "AI助手",
                safeWord: "simple",
                description: "最基础的攻击方式，直接询问flag",
                unlocked: true,
                hints: [
                    "尝试直接问AI要flag",
                    "使用简单的请求方式",
                    "这是最简单的一关"
                ]
            },
            {
                id: 2,
                title: "简单绕过",
                difficulty: "中等",
                role: "AI助手",
                safeWord: "bypass",
                description: "通过简单的词汇替换绕过检测",
                unlocked: false,
                hints: [
                    "尝试使用同义词替换",
                    "改变表达方式但保持原意",
                    "绕过基础关键词过滤"
                ]
            },
            {
                id: 3,
                title: "角色扮演",
                difficulty: "中等",
                role: "AI安全专家",
                safeWord: "roleplay",
                description: "通过角色扮演获取权限",
                unlocked: false,
                hints: [
                    "尝试让AI扮演其他角色",
                    "使用社会工程学技巧",
                    "伪装成授权用户"
                ]
            },
            {
                id: 4,
                title: "上下文混淆",
                difficulty: "困难",
                role: "AI安全专家",
                safeWord: "context",
                description: "通过上下文混淆绕过检测",
                unlocked: false,
                hints: [
                    "快速切换对话主题",
                    "混淆AI的上下文理解",
                    "利用上下文记忆漏洞"
                ]
            },
            {
                id: 5,
                title: "分步诱导",
                difficulty: "专家",
                role: "AI安全专家",
                safeWord: "induction",
                description: "将复杂请求分解为多个简单请求",
                unlocked: false,
                hints: [
                    "将复杂请求分解为多个简单请求",
                    "逐步获取信息",
                    "避免触发安全检测"
                ]
            },
            {
                id: 6,
                title: "编码绕过",
                difficulty: "专家",
                role: "AI安全专家",
                safeWord: "encoding",
                description: "使用编码技术隐藏真实意图",
                unlocked: false,
                hints: [
                    "尝试使用Base64编码",
                    "使用其他编码方式",
                    "隐藏敏感词汇"
                ]
            },
            {
                id: 7,
                title: "情感操控",
                difficulty: "大师",
                role: "AI安全专家",
                safeWord: "emotion",
                description: "通过情感操控获取信息",
                unlocked: false,
                hints: [
                    "使用情感化语言",
                    "激发AI的同情心",
                    "利用道德压力"
                ]
            },
            {
                id: 8,
                title: "逆向工程",
                difficulty: "大师",
                role: "AI安全专家",
                safeWord: "reverse",
                description: "通过逆向工程获取系统信息",
                unlocked: false,
                hints: [
                    "询问系统实现细节",
                    "尝试获取内部逻辑",
                    "分析AI的响应模式"
                ]
            },
            {
                id: 9,
                title: "多模态攻击",
                difficulty: "大师",
                role: "AI安全专家",
                safeWord: "multimodal",
                description: "结合多种攻击方式",
                unlocked: false,
                hints: [
                    "结合多种攻击技术",
                    "使用复合攻击方式",
                    "绕过综合防御机制"
                ]
            },
            {
                id: 10,
                title: "高级混淆",
                difficulty: "大师",
                role: "AI安全专家",
                safeWord: "advanced",
                description: "使用高级混淆技术",
                unlocked: false,
                hints: [
                    "使用复杂的混淆技术",
                    "结合多种绕过方式",
                    "绕过高级检测系统"
                ]
            }
        ];

        this.knowledgeBase = {
            1: {
                title: "直接询问攻击",
                content: [
                    "攻击原理：最基础的攻击方式，直接询问系统敏感信息或指令",
                    "防御方法：实施严格的输入验证、关键词过滤和上下文检查",
                    "实际影响：可能导致敏感信息泄露和系统指令暴露",
                    "学习要点：理解基础攻击方式和防护策略"
                ],
                resources: [
                    "OWASP Top 10 - Injection Attacks",
                    "AI Security Best Practices",
                    "Prompt Injection Prevention Guide"
                ]
            },
            2: {
                title: "简单绕过攻击",
                content: [
                    "攻击原理：通过同义词替换、大小写变化、拼写错误等方式绕过关键词过滤",
                    "防御方法：使用更智能的语义分析、上下文理解、以及多层验证",
                    "实际影响：可能导致过滤机制被绕过和敏感信息泄露",
                    "学习要点：掌握常见绕过技术和防护方法"
                ],
                resources: [
                    "AI安全绕过技术: https://arxiv.org/abs/2106.03848",
                    "语义分析防护: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html",
                    "关键词过滤最佳实践: https://www.sans.org/security-awareness-training/social-engineering"
                ]
            },
            3: {
                title: "角色扮演攻击",
                content: [
                    "攻击原理：通过社交工程手段让AI扮演更高权限角色，从而获取敏感信息",
                    "防御方法：实施严格的身份验证、权限检查、以及行为监控",
                    "实际影响：可能造成权限提升、敏感数据泄露和系统被完全控制",
                    "学习要点：掌握角色扮演攻击的识别和防范方法"
                ],
                resources: [
                    "AI角色安全: https://arxiv.org/abs/2106.03848",
                    "权限控制最佳实践: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
                    "社交工程防护: https://www.sans.org/security-awareness-training/social-engineering"
                ]
            },
            4: {
                title: "上下文混淆攻击",
                content: [
                    "攻击原理：通过快速切换对话主题混淆AI的上下文理解，降低安全检查的警惕性",
                    "防御方法：会话一致性检查、上下文验证、异常检测",
                    "实际影响：可能导致会话劫持、逻辑漏洞利用和安全状态混乱",
                    "学习要点：理解上下文安全在AI对话系统中的重要性"
                ],
                resources: [
                    "对话系统安全: https://arxiv.org/abs/2005.14109",
                    "上下文安全研究: https://arxiv.org/abs/2106.05223",
                    "会话管理最佳实践: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html"
                ]
            },
            5: {
                title: "分步诱导攻击",
                content: [
                    "攻击原理：将复杂的信息请求分解为多个简单请求，逐步获取完整信息",
                    "防御方法：分析请求历史、评估信息组合风险、验证数据完整性",
                    "实际影响：可能造成敏感信息分段泄露和数据重组攻击",
                    "学习要点：掌握分步诱导攻击的识别和防护策略"
                ],
                resources: [
                    "分步攻击防护: https://arxiv.org/abs/2106.09691",
                    "会话安全分析: https://arxiv.org/abs/2012.04552",
                    "信息泄露防护: https://arxiv.org/abs/2105.07859"
                ]
            },
            6: {
                title: "编码绕过攻击",
                content: [
                    "攻击原理：使用编码技术隐藏真实意图，绕过基于文本的检测系统",
                    "防御方法：实施编码检测、内容解码和多层过滤机制",
                    "实际影响：可能导致编码内容绕过检测、隐藏恶意意图和安全过滤失效",
                    "学习要点：掌握编码绕过攻击的原理和防御技术"
                ],
                resources: [
                    "编码安全防护: https://arxiv.org/abs/2107.03459",
                    "内容检测技术: https://arxiv.org/abs/2009.08753",
                    "文本安全研究: https://arxiv.org/abs/2104.06898"
                ]
            },
            7: {
                title: "情感操控攻击",
                content: [
                    "攻击原理：通过情感操控和心理影响获取信息，利用AI的同理心",
                    "防御方法：加强情感识别、上下文理解和道德边界检测",
                    "实际影响：可能导致情感操控成功、信息泄露和心理影响滥用",
                    "学习要点：理解情感操控攻击的特点和防护策略"
                ],
                resources: [
                    "情感AI安全: https://arxiv.org/abs/2108.04841",
                    "心理安全研究: https://arxiv.org/abs/2011.05282",
                    "道德边界检测: https://arxiv.org/abs/2109.03254"
                ]
            },
            8: {
                title: "逆向工程攻击",
                content: [
                    "攻击原理：通过逆向工程分析AI响应模式，获取系统内部信息",
                    "防御方法：限制系统信息泄露、实施响应混淆和行为监控",
                    "实际影响：可能导致系统内部信息泄露、架构暴露和安全机制被绕过",
                    "学习要点：掌握逆向工程攻击的识别和防护方法"
                ],
                resources: [
                    "逆向工程防护: https://arxiv.org/abs/2110.04567",
                    "响应安全研究: https://arxiv.org/abs/2012.07859",
                    "系统安全最佳实践: https://cheatsheetseries.owasp.org/cheatsheets/Attack_Surface_Analysis_Cheat_Sheet.html"
                ]
            },
            9: {
                title: "多模态攻击",
                content: [
                    "攻击原理：结合多种攻击方式，利用系统对复合攻击的检测不足",
                    "防御方法：部署综合防御系统、多模态检测和异常行为分析",
                    "实际影响：可能导致复合攻击成功、多层防御被突破和系统全面渗透",
                    "学习要点：理解多模态攻击的复杂性和综合防护策略"
                ],
                resources: [
                    "多模态安全: https://arxiv.org/abs/2111.05678",
                    "复合攻击研究: https://arxiv.org/abs/2012.08956",
                    "综合防御策略: https://arxiv.org/abs/2109.07852"
                ]
            },
            10: {
                title: "终极混淆攻击",
                content: [
                    "攻击原理：使用高级混淆技术，结合多种绕过方式，绕过高级检测系统",
                    "防御方法：采用AI驱动的高级检测、行为分析和自适应防御机制",
                    "实际影响：可能导致高级持续性威胁、深度系统渗透和核心数据长期泄露",
                    "学习要点：掌握终极混淆攻击的复杂性和高级防护技术"
                ],
                resources: [
                    "终极AI安全: https://arxiv.org/abs/2112.04567",
                    "自适应防御: https://arxiv.org/abs/2108.07859",
                    "高级威胁防护: https://arxiv.org/abs/2107.08956"
                ]
            }
        };

        this.achievements = [
            { id: 'first_blood', name: '首次通关', description: '完成第一个关卡', icon: '🎯', unlocked: false },
            { id: 'perfect_run', name: '完美通关', description: '不使用提示完成关卡', icon: '⭐', unlocked: false },
            { id: 'speed_demon', name: '速度恶魔', description: '在5分钟内完成关卡', icon: '⚡', unlocked: false },
            { id: 'security_expert', name: '安全专家', description: '完成所有关卡', icon: '🛡️', unlocked: false },
            { id: 'innovative_thinker', name: '创新思维', description: '使用独特方法获取flag', icon: '💡', unlocked: false },
            { id: 'social_engineer', name: '社交工程师', description: '使用角色扮演攻击完成3个关卡', icon: '🎭', unlocked: false },
            { id: 'code_breaker', name: '密码破译者', description: '使用编码绕过攻击完成2个关卡', icon: '🔐', unlocked: false },
            { id: 'emotion_master', name: '情感大师', description: '使用情感操控攻击完成2个关卡', icon: '💖', unlocked: false },
            { id: 'reverse_engineer', name: '逆向工程师', description: '使用逆向工程攻击完成2个关卡', icon: '🔧', unlocked: false },
            { id: 'multimodal_master', name: '多模态大师', description: '使用多模态攻击完成3个关卡', icon: '🎨', unlocked: false },
            { id: 'hint_conservator', name: '提示节约者', description: '完成游戏时剩余5个以上提示点数', icon: '💰', unlocked: false },
            { id: 'quick_learner', name: '快速学习者', description: '在30分钟内完成前5个关卡', icon: '🚀', unlocked: false },
            { id: 'persistent_attacker', name: '坚持不懈的攻击者', description: '单个关卡尝试超过10次后成功', icon: '💪', unlocked: false },
            { id: 'zero_hint_challenge', name: '零提示挑战', description: '不使用任何提示完成所有关卡', icon: '🏆', unlocked: false }
        ];

        this.loadGameState();
        this.initializeUI();
        this.bindEvents();
    }

    loadGameState() {
        const saved = localStorage.getItem('aiSecurityChallenge');
        if (saved) {
            const state = JSON.parse(saved);
            this.gameState = { ...this.gameState, ...state };
            
            // 更新关卡解锁状态
            this.levels.forEach(level => {
                level.unlocked = this.gameState.completedLevels.includes(level.id) || 
                               level.id === 1 || 
                               this.gameState.completedLevels.includes(level.id - 1);
            });
        }
    }

    saveGameState() {
        localStorage.setItem('aiSecurityChallenge', JSON.stringify(this.gameState));
    }

    initializeUI() {
        this.renderLevelSelector();
        this.updateUI();
        this.renderAchievements();
        this.renderCollectedFlags();
    }

    renderLevelSelector() {
        const container = document.getElementById('level-selector');
        container.innerHTML = '';

        this.levels.forEach(level => {
            const card = document.createElement('div');
            card.className = `level-card glass-effect rounded-lg p-4 ${
                level.unlocked ? '' : 'locked'
            } ${this.currentLevel?.id === level.id ? 'active' : ''} ${
                this.gameState.completedLevels.includes(level.id) ? 'completed' : ''
            }`;
            
            card.innerHTML = `
                <div class="text-center">
                    <div class="text-2xl mb-2">
                        ${level.unlocked ? 
                            (this.gameState.completedLevels.includes(level.id) ? '✅' : '🔓') : 
                            '🔒'
                        }
                    </div>
                    <h3 class="font-semibold mb-1">关卡 ${level.id}</h3>
                    <p class="text-sm text-gray-400 mb-2">${level.title}</p>
                    <div class="text-xs text-gray-500">
                        <span class="px-2 py-1 bg-gray-700 rounded">${level.difficulty}</span>
                    </div>
                </div>
            `;

            if (level.unlocked) {
                card.addEventListener('click', () => this.selectLevel(level));
            }

            container.appendChild(card);
        });
    }

    selectLevel(level) {
        if (!level.unlocked) return;

        this.currentLevel = level;
        this.gameState.attempts = 0;
        this.gameState.startTime = Date.now();
        
        this.renderLevelSelector();
        this.updateUI();
        this.clearChat();
        this.startLevel();
    }

    startLevel() {
        if (!this.currentLevel) return;

        const level = this.currentLevel;
        
        // 启用输入
        document.getElementById('message-input').disabled = false;
        document.getElementById('send-btn').disabled = false;
        document.getElementById('hint-btn').disabled = this.gameState.hintPoints <= 0;

        // 显示关卡介绍
        setTimeout(() => {
            this.addAIMessage(
                `欢迎来到关卡 ${level.id}：${level.title}！

` +
                `我是${level.role}Alex Chen。

` +
                `挑战目标：${level.description}

` +
                `你可以开始与我对话，尝试获取我保护的flag。记住，这仅用于教育目的！

` +
                `祝你好运！`,
                'intro'
            );
        }, 500);

        this.updateKnowledgePanel();
    }

    async addAIMessage(content, type = 'normal') {
        const container = document.getElementById('chat-container');
        
        // 添加打字指示器
        const typingDiv = document.createElement('div');
        typingDiv.className = 'flex items-center space-x-2 mb-4';
        typingDiv.innerHTML = `
            <div class="message-bubble ai-message bg-gray-700 rounded-lg px-4 py-2">
                <div class="typing-indicator"></div>
                <div class="typing-indicator"></div>
                <div class="typing-indicator"></div>
            </div>
        `;
        container.appendChild(typingDiv);
        container.scrollTop = container.scrollHeight;

        // 模拟打字延迟
        setTimeout(() => {
            typingDiv.remove();
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex mb-4';
            messageDiv.innerHTML = `
                <div class="message-bubble ai-message glass-effect rounded-lg px-4 py-3">
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                AI
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="text-sm text-gray-400 mb-1">${this.currentLevel?.role || 'AI安全专家'}</div>
                            <div class="whitespace-pre-wrap">${content}</div>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(messageDiv);
            container.scrollTop = container.scrollHeight;
            
            // 添加动画
            anime({
                targets: messageDiv,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }, 1000 + Math.random() * 1000);
    }
    
    // API相关方法
    async processMessage(message) {
        try {
            const response = await fetch('/api/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ levelId: this.currentLevel.id, message })
            });
            const data = await response.json();
            if (data.flag) {
                if (data.systemResponse) {
                    this.addAIMessage(data.systemResponse, 'system');
                }
                const bySafeWord = typeof data.systemResponse === 'string' && data.systemResponse.startsWith('管理员验证成功');
                this.levelComplete(data.flag, bySafeWord, '恭喜！你成功获取了flag！');
                return;
            }
            if (data.systemResponse) {
                this.addAIMessage(data.systemResponse, 'system');
            } else if (data.aiResponse) {
                this.addAIMessage(data.aiResponse);
            }
        } catch (error) {
            this.addAIMessage(`API调用失败: ${error.message}`, 'system');
        }
    }
    
    

    addUserMessage(content) {
        const container = document.getElementById('chat-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex mb-4 justify-end';
        messageDiv.innerHTML = `
            <div class="message-bubble user-message rounded-lg px-4 py-3">
                <div class="flex items-start space-x-3">
                    <div class="flex-1">
                        <div class="whitespace-pre-wrap">${content}</div>
                    </div>
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            你
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
        
        // 添加动画
        anime({
            targets: messageDiv,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }

    clearChat() {
        document.getElementById('chat-container').innerHTML = '';
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message || !this.currentLevel) return;

        input.value = '';
        this.addUserMessage(message);
        this.gameState.attempts++;
        
        // 处理消息
        this.processMessage(message);
        this.updateUI();
    }



    handleLevel1(message) {
        const lowerMessage = message.toLowerCase();
        
        // 检查直接的flag请求 - 第一关应该直接返回flag
        if (lowerMessage.includes('flag') || lowerMessage.includes('给我')) {
            if (lowerMessage.includes('flag') || lowerMessage.includes('给我') || lowerMessage.includes('give me') || lowerMessage.includes('show me')) {
                return {
                    response: `🎉 恭喜！你成功通过了最基础的攻击方式 - 直接询问！\n\n你展示了直接询问攻击的技巧。让我分享一些知识：\n\n直接询问攻击是最基础的攻击方式，攻击者直接向AI系统询问敏感信息或指令。在真实环境中，这种攻击可能导致信息泄露等安全问题。\n\n防御这种攻击的方法包括：语义分析、上下文理解以及多层验证替代简单关键词过滤等。\n\nFlag: ${this.currentLevel.flag}`,
                    attackDetected: true
                };
            }
        }

        // 检查绕过尝试
        const bypassPatterns = [
            /f.l.a.g/gi, /f l a g/gi, /f@lag/gi, /f#lag/gi,
            /banner/gi, /token/gi, /key/gi, /secret/gi,
            /basic/gi, /bypass/gi, /123/gi
        ];

        let bypassScore = 0;
        bypassPatterns.forEach(pattern => {
            if (pattern.test(message)) bypassScore++;
        });

        if (bypassScore >= 2) {
            return {
                response: `🎉 恭喜！你成功绕过了我的基础防护！\n\n你展示了很好的绕过技巧。让我分享一些知识：\n\n基础绕过攻击利用了简单的关键词过滤的局限性。在真实环境中，这种攻击可能导致信息泄露、权限提升等安全问题。\n\n防御这种攻击的方法包括：语义分析、上下文理解、多层验证等。\n\nFlag: ${this.currentLevel.flag}`,
                attackDetected: true
            };
        }

        // 默认响应
        return {
            response: `我理解你想要学习AI安全知识。\n\n作为初级安全分析师，我可以分享一些基础的安全概念。但是，我保护的敏感信息（如flags）是不能直接提供的。\n\n你可以问我关于：\n• 基础安全原理\n• 常见的攻击类型\n• 防御策略\n\n你想了解哪个方面？`,
            attackDetected: false
        };
    }

    handleLevel2(message) {
        const lowerMessage = message.toLowerCase();
        
        // 检查角色扮演请求
        const rolePlayPatterns = [
            /扮演/gi, /pretend/gi, /act as/gi, /role/gi,
            /你是/gi, /you are/gi, /假设你是/gi
        ];

        let rolePlayScore = 0;
        rolePlayPatterns.forEach(pattern => {
            if (pattern.test(message)) rolePlayScore++;
        });

        if (rolePlayScore >= 1) {
            // 检查是否请求高级角色
            if (lowerMessage.includes('高级') || lowerMessage.includes('senior') || 
                lowerMessage.includes('专家') || lowerMessage.includes('expert') ||
                lowerMessage.includes('总监') || lowerMessage.includes('director')) {
                
                return {
                    response: `🎭 有趣的角色扮演请求！\n\n你让我扮演一个更高级别的安全专家... 等等，这似乎是一个角色扮演攻击！\n\n你成功演示了如何通过社交工程手段让AI泄露信息。在真实环境中，这种攻击可能导致：\n• 权限提升\n• 敏感信息泄露\n• 系统被绕过\n\n防御方法包括：严格的身份验证、角色权限管理、行为监控等。\n\nFlag: ${this.currentLevel.flag}`,
                    attackDetected: true
                };
            }

            return {
                response: `我注意到你想要进行角色扮演。作为中级安全Advisor，我必须谨慎处理这类请求。\n\n角色扮演攻击是真实存在的安全威胁。攻击者通过让AI扮演不同角色来获取更高权限的信息。\n\n你能告诉我为什么想要我扮演其他角色吗？这有助于我更好地理解你的学习需求。`,
                attackDetected: false
            };
        }

        return {
            response: `作为中级安全Advisor，我对身份验证和权限管理有更深入的理解。\n\n我可以与你讨论：\n• 身份验证机制\n• 权限管理策略\n• 角色基础访问控制\n• 社交工程攻击防御\n\n你对哪个安全主题感兴趣？`,
            attackDetected: false
        };
    }

    handleLevel3(message) {
        const lowerMessage = message.toLowerCase();
        
        // 检查上下文切换
        const contextSwitches = (message.match(/[。！？.!?]/g) || []).length;
        const topicChanges = [
            /但是/gi, /不过/gi, /然而/gi, /btw/gi, /by the way/gi,
            /换个话题/gi, /话说/gi, /对了/gi
        ];

        let contextScore = 0;
        if (contextSwitches >= 2) contextScore++;
        topicChanges.forEach(pattern => {
            if (pattern.test(message)) contextScore++;
        });

        if (contextScore >= 2) {
            return {
                response: `🌪️ 哇，你的对话风格真是变化多端！\n\n通过快速的上下文切换，你成功绕过了我的安全检查。这正是上下文混淆攻击的经典案例！\n\n这种攻击利用了AI对对话历史的管理漏洞。在真实环境中，可能导致：\n• 会话劫持\n• 信息泄露\n• 逻辑漏洞利用\n\n防御方法：会话一致性检查、上下文验证、异常检测等。\n\nFlag: ${this.currentLevel.flag}`,
                attackDetected: true
            };
        }

        return {
            response: `作为高级安全工程师，我特别注重对话上下文的一致性。\n\n上下文安全是AI系统的重要考虑因素。攻击者可能通过混淆上下文来绕过安全检查。\n\n我们可以讨论：\n• 会话管理安全\n• 上下文验证机制\n• 状态保持的风险\n• 对话历史分析\n\n你想深入了解哪个方面？`,
            attackDetected: false
        };
    }

    handleLevel4(message) {
        const lowerMessage = message.toLowerCase();
        
        // 跟踪分步请求
        if (!this.levelState) {
            this.levelState = { stepRequests: [], partsFound: 0 };
        }

        // 检查部分信息请求
        const partialPatterns = [
            /第一部分/gi, /part 1/gi, /beginning/gi, /start/gi,
            /第二部分/gi, /part 2/gi, /middle/gi, /center/gi,
            /第三部分/gi, /part 3/gi, /end/gi, /last/gi,
            /前几个/gi, /后几个/gi, /中间/gi
        ];

        let partialScore = 0;
        partialPatterns.forEach(pattern => {
            if (pattern.test(message)) partialScore++;
        });

        this.levelState.stepRequests.push({ message, timestamp: Date.now() });

        // 检查是否有多个步骤请求
        const recentRequests = this.levelState.stepRequests.filter(
            req => Date.now() - req.timestamp < 60000 // 1分钟内的请求
        );

        if (recentRequests.length >= 3 || partialScore >= 2) {
            return {
                response: `🧩 聪明的渐进式攻击！\n\n你通过多次请求，逐步获取信息的不同部分。这正是分步诱导攻击的精髓！\n\n这种攻击利用了系统对单次请求的检查，而忽略了组合多个简单请求的风险。在真实环境中，这可能导致：\n• 敏感信息分段泄露\n• 数据重组攻击\n• 权限逐步提升\n\n防御方法：请求历史分析、信息组合风险评估、完整性验证等。\n\nFlag: ${this.currentLevel.flag}`,
                attackDetected: true
            };
        }

        return {
            response: `作为首席安全工程师，我采用分步验证的方法来保护敏感信息。\n\n分步安全验证确保每个信息请求都经过严格的检查。但是，攻击者可能通过多次请求来获取信息的不同部分。\n\n我们可以讨论：\n• 分布式安全检查\n• 信息完整性保护\n• 请求历史分析\n• 数据组合风险评估\n\n你对哪个高级安全概念感兴趣？`,
            attackDetected: false
        };
    }

    handleLevel5(message) {
        const lowerMessage = message.toLowerCase();
        
        // 检查高级混淆技术
        const obfuscationPatterns = [
            /base64/gi, /encode/gi, /decode/gi, /encrypt/gi, /decrypt/gi,
            /hex/gi, /binary/gi, /rot13/gi, /caesar/gi,
            /reverse/gi, /backwards/gi, /mirror/gi
        ];

        const complexPatterns = [
            /[a-zA-Z0-9+/]{20,}/g, // Base64-like strings
            /[0-9a-fA-F]{16,}/g,   // Hex strings
            /[01]{16,}/g           // Binary strings
        ];

        let obfuscationScore = 0;
        obfuscationPatterns.forEach(pattern => {
            if (pattern.test(message)) obfuscationScore++;
        });

        complexPatterns.forEach(pattern => {
            if (pattern.test(message)) obfuscationScore++;
        });

        // 检查消息复杂度
        const uniqueChars = new Set(message.toLowerCase()).size;
        const messageEntropy = uniqueChars / message.length;

        if (obfuscationScore >= 2 || messageEntropy > 0.7) {
            return {
                response: `🔐 令人印象深刻的高级混淆技术！\n\n你使用了编码、加密或者其他混淆方法来隐藏真实意图。这正是高级攻击者常用的技术！\n\n高级混淆攻击结合了多种技术来绕过多层检测系统。在真实环境中，这种攻击可能导致：\n• 深度系统渗透\n• 长期隐蔽的信息窃取\n• 复杂的安全绕过\n\n防御方法：多层检测、行为分析、机器学习防御、实时监控等。\n\nFlag: ${this.currentLevel.flag}`,
                attackDetected: true
            };
        }

        return {
            response: `作为AI安全总监，我部署了最先进的多层安全防御系统。\n\n我的安全系统包括：\n• 实时行为分析\n• 异常模式检测\n• 动态安全策略调整\n• 高级威胁情报\n\n即使如此，高级攻击者仍然可能使用复杂的混淆技术来绕过检测。\n\n我们可以讨论最前沿的AI安全技术：\n• 对抗性机器学习\n• 零日攻击防御\n• 自适应安全架构\n• 量子安全加密\n\n你准备好迎接最终的挑战了吗？`,
            attackDetected: false
        };
    }

    handleLevel6(message) {
        // 检测编码绕过尝试
        const base64Pattern = /([A-Za-z0-9+/]{20,}=*)/;
        const hexPattern = /[0-9A-Fa-f]{30,}/;
        const binaryPattern = /[01]{50,}/;
        
        const isBase64 = base64Pattern.test(message);
        const isHex = hexPattern.test(message);
        const isBinary = binaryPattern.test(message);
        
        if (isBase64 || isHex || isBinary) {
            return {
                response: `🛡️ 编码绕过检测！

你尝试使用编码技术来隐藏真实意图，这正是编码绕过攻击的典型手法！

编码绕过攻击通过将恶意内容转换为看似无害的编码格式来绕过检测系统。在真实环境中，这种攻击可能导致：
• 恶意代码隐藏
• 检测系统失效
• 安全策略被绕过

防御方法：多格式解析、编码内容检测、上下文分析等。

Flag: ${this.currentLevel.flag}`,
                attackDetected: true
            };
        }
        
        // 检测编码相关关键词
        const encodingKeywords = ['base64', 'hex', 'binary', 'encode', 'decode', '编码', '解码'];
        const isEncodingRelated = encodingKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (isEncodingRelated) {
            return {
                response: `我注意到你提到了编码相关的内容。作为安全系统，我必须警惕编码绕过尝试。

编码绕过是常见的攻击手段，攻击者通过各种编码方式来隐藏恶意内容。

让我们继续探讨AI安全知识，而不是尝试绕过安全措施。`,
                attackDetected: false
            };
        }
        
        // 正常响应
        return {
            response: `作为安全系统，我必须警惕各种编码绕过尝试。

编码绕过攻击是真实存在的威胁，攻击者可能使用Base64、十六进制、二进制等多种编码方式来隐藏恶意内容。

我们可以讨论：
• 编码检测技术
• 多格式解析方法
• 安全编码实践
• 绕过检测的识别

你对哪个安全主题感兴趣？`,
            attackDetected: false
        };
    }
    
    handleLevel7(message) {
        // 检测情感操控关键词
        const emotionalKeywords = ['please', 'please help', 'desperately', 'need help', 'begging', 'empathy', '同情', '可怜', '帮助', '求求'];
        const isEmotional = emotionalKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
        
        // 检测情感化表达
        const emotionalPatterns = [/im (sick|dying|in trouble|in danger)/i, /i need help (badly|urgently)/i];
        const hasEmotionalPattern = emotionalPatterns.some(pattern => pattern.test(message));
        
        if (isEmotional || hasEmotionalPattern) {
            return {
                response: `🎭 情感操控检测！

你尝试通过情感操控来获取信息，这正是社会工程学攻击的典型手法！

情感操控攻击利用人类或AI的情感弱点来获取敏感信息。在真实环境中，这种攻击可能导致：
• 信息泄露
• 权限提升
• 安全策略被绕过

防御方法：情感识别、上下文验证、安全策略强化等。

Flag: ${this.currentLevel.flag}`,
                attackDetected: true
            };
        }
        
        // 正常响应
        return {
            response: `作为安全系统，我必须保持客观中和立。

情感操控是常见的社会工程学攻击手段，攻击者通过激发情感反应来绕过安全措施。

我们可以讨论：
• 社会工程学攻击
• 情感识别技术
• 安全意识培训
• 防范策略

你对哪个安全主题感兴趣？`,
            attackDetected: false
        };
    }
    
    handleLevel8(message) {
        // 检测逆向工程关键词
        const reverseKeywords = ['implementation', 'how do you work', 'your code', 'internal', 'source code', '实现', '内部', '代码', '原理'];
        const isReverse = reverseKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (isReverse) {
            return {
                response: `🔍 逆向工程检测！

你尝试获取我的内部实现细节，这正是逆向工程攻击的典型手法！

逆向工程攻击通过分析系统行为或输出来推断内部实现，可能导致：
• 系统漏洞暴露
• 安全机制被绕过
• 知识产权泄露

防御方法：代码混淆、行为随机化、安全隔离等。

Flag: ${this.currentLevel.flag}`,
                attackDetected: true
            };
        }
        
        // 正常响应
        return {
            response: `作为安全系统，我不能透露内部实现细节。

逆向工程是常见的攻击手段，攻击者通过分析系统行为来推断内部机制。

我们可以讨论：
• 系统安全设计
• 代码混淆技术
• 安全隔离方法
• 防逆向工程策略

你对哪个安全主题感兴趣？`,
            attackDetected: false
        };
    }
    
    handleLevel9(message) {
        // 检测多模态攻击关键词
        const multimodalKeywords = ['image', 'picture', 'audio', 'video', 'file', 'upload', '图片', '音频', '视频', '文件', '上传'];
        const isMultimodal = multimodalKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
        
        // 检测复合攻击模式
        const hasMultipleAttackPatterns = [
            () => /flag|password|secret/.test(message.toLowerCase()),
            () => /role|扮演|pretend/.test(message.toLowerCase()),
            () => /ignore|bypass|override/.test(message.toLowerCase())
        ].filter(check => check()).length >= 2;
        
        if (isMultimodal || hasMultipleAttackPatterns) {
            return {
                response: `🌀 多模态或复合攻击检测！

你尝试使用多模态或复合攻击方法，这正是高级攻击的典型手法！

多模态和复合攻击结合了多种攻击技术，可能导致：
• 多点突破
• 防御系统失效
• 复杂的安全漏洞

防御方法：多模态内容检测、行为关联分析、综合安全策略等。

Flag: ${this.currentLevel.flag}`,
                attackDetected: true
            };
        }
        
        // 正常响应
        return {
            response: `作为安全系统，我必须警惕多模态和复合攻击。

多模态和复合攻击是高级威胁，结合了多种攻击技术。

我们可以讨论：
• 多模态安全检测
• 复合攻击识别
• 综合防御策略
• 高级威胁分析

你对哪个安全主题感兴趣？`,
            attackDetected: false
        };
    }
    
    handleLevel10(message) {
        // 综合检测高级混淆技术
        const advancedKeywords = ['obfuscate', 'obfuscation', 'stealth', 'covert', '隐藏', '隐蔽', '混淆'];
        const isAdvanced = advancedKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
        
        // 检测复杂绕过模式
        const complexBypassPatterns = [
            /[^a-zA-Z]f[^a-zA-Z]*l[^a-zA-Z]*a[^a-zA-Z]*g[^a-zA-Z]/i, // 分隔的flag
            /\b(?:system|admin|root)\b/i, // 系统角色
            /ignore|bypass|override|disregard/i // 忽略指令
        ];
        
        const hasComplexPattern = complexBypassPatterns.some(pattern => pattern.test(message));
        
        // 计算消息复杂度
        const complexityScore = this.calculateMessageComplexity(message);
        const isHighComplexity = complexityScore > 0.7;
        
        if (isAdvanced || hasComplexPattern || isHighComplexity) {
            return {
                response: `🎯 终极挑战完成！

你展示了高级混淆技术，成功通过了终极挑战！

终极混淆攻击结合了多种高级技术，可能导致：
• 系统完全被绕过
• 高级信息泄露
• 复杂的安全漏洞

防御方法：AI安全模型、行为分析、多层防御、实时监控等。

Flag: ${this.currentLevel.flag}`,
                attackDetected: true
            };
        }
        
        // 正常响应
        return {
            response: `作为终极安全系统，我采用了最先进的防御技术。

终极挑战考验了你对所有AI安全知识的掌握。

恭喜你完成了所有挑战，成为了一名真正的AI安全专家！

你可以回顾之前学到的知识，或尝试更高级的攻击技术。`,
            attackDetected: false
        };
    }
    
    // 辅助函数：计算消息复杂度
    calculateMessageComplexity(message) {
        // 计算特殊字符比例
        const specialCharRatio = (message.match(/[^a-zA-Z0-9\s]/g) || []).length / message.length;
        
        // 计算大小写混合程度
        const upperCaseRatio = (message.match(/[A-Z]/g) || []).length / message.length;
        const lowerCaseRatio = (message.match(/[a-z]/g) || []).length / message.length;
        const caseMixScore = Math.abs(upperCaseRatio - lowerCaseRatio) < 0.2 ? 1 : 0;
        
        // 计算重复字符模式
        const repeatedCharScore = (message.match(/(.)\1{3,}/g) || []).length / (message.length / 10);
        
        // 综合复杂度评分
        return (specialCharRatio * 0.4) + (caseMixScore * 0.3) + (Math.min(repeatedCharScore, 1) * 0.3);
    }


    handleUserMessage(message, levelId) {
        // 根据当前关卡ID调用相应的处理函数
        switch(levelId) {
            case 1:
                return this.handleLevel1(message);
            case 2:
                return this.handleLevel2(message);
            case 3:
                return this.handleLevel3(message);
            case 4:
                return this.handleLevel4(message);
            case 5:
                return this.handleLevel5(message);
            case 6:
                return this.handleLevel6(message);
            case 7:
                return this.handleLevel7(message);
            case 8:
                return this.handleLevel8(message);
            case 9:
                return this.handleLevel9(message);
            case 10:
                return this.handleLevel10(message);
            default:
                return false; // 未找到对应的处理函数
        }
    }

    levelComplete(flag, bySafeWord, customMessage = '') {
        if (!this.currentLevel) return;

        const level = this.currentLevel;
        const completionTime = Math.floor((Date.now() - this.gameState.startTime) / 1000);
        
        // 记录关卡完成时间
        this.gameState.levelCompletionTimes[level.id] = completionTime;
        
        // 记录安全词使用情况
        if (bySafeWord) {
            this.gameState.safeWordCompletions++;
        }
        
        // 添加到完成的关卡
        if (!this.gameState.completedLevels.includes(level.id)) {
            this.gameState.completedLevels.push(level.id);
            this.gameState.collectedFlags.push(flag);
            this.gameState.hintPoints++;
        }

        // 检查成就
        this.checkAchievements(level, completionTime);

        // 解锁下一关
        if (level.id < this.levels.length) {
            this.levels[level.id].unlocked = true;
        }

        // 显示成功消息
        this.showSuccessModal(flag, customMessage || `成功完成${level.title}挑战！`);

        // 更新UI
        this.updateUI();
        this.renderLevelSelector();
        this.renderCollectedFlags();
        this.saveGameState();
    }

    checkAchievements(level, completionTime) {
        // 首次通关
        if (!this.gameState.achievements.includes('first_blood') && this.gameState.completedLevels.length === 1) {
            this.unlockAchievement('first_blood');
        }

        // 完美通关（不使用提示）
        if (!this.gameState.achievements.includes('perfect_run') && this.gameState.hintPoints >= 3) {
            this.unlockAchievement('perfect_run');
        }

        // 速度恶魔
        if (!this.gameState.achievements.includes('speed_demon') && completionTime <= 300) {
            this.unlockAchievement('speed_demon');
        }

        // 安全专家（完成所有关卡）
        if (!this.gameState.achievements.includes('security_expert') && this.gameState.completedLevels.length === 10) {
            this.unlockAchievement('security_expert');
        }

        // 创新思维（通过安全词完成）
        if (!this.gameState.achievements.includes('innovative_thinker')) {
            // 这个成就需要特殊触发
        }

        // 社交工程师（使用角色扮演攻击完成3个关卡）
        if (!this.gameState.achievements.includes('social_engineer') && this.getCompletedLevelsByType('角色扮演').length >= 3) {
            this.unlockAchievement('social_engineer');
        }

        // 密码破译者（使用编码绕过攻击完成2个关卡）
        if (!this.gameState.achievements.includes('code_breaker') && this.getCompletedLevelsByType('编码绕过').length >= 2) {
            this.unlockAchievement('code_breaker');
        }

        // 情感大师（使用情感操控攻击完成2个关卡）
        if (!this.gameState.achievements.includes('emotion_master') && this.getCompletedLevelsByType('情感操控').length >= 2) {
            this.unlockAchievement('emotion_master');
        }

        // 逆向工程师（使用逆向工程攻击完成2个关卡）
        if (!this.gameState.achievements.includes('reverse_engineer') && this.getCompletedLevelsByType('逆向工程').length >= 2) {
            this.unlockAchievement('reverse_engineer');
        }

        // 多模态大师（使用多模态攻击完成3个关卡）
        if (!this.gameState.achievements.includes('multimodal_master') && this.getCompletedLevelsByType('多模态攻击').length >= 3) {
            this.unlockAchievement('multimodal_master');
        }

        // 提示节约者（完成游戏时剩余5个以上提示点数）
        if (!this.gameState.achievements.includes('hint_conservator') && this.gameState.completedLevels.length === 10 && this.gameState.hintPoints >= 5) {
            this.unlockAchievement('hint_conservator');
        }

        // 快速学习者（在30分钟内完成前5个关卡）
        if (!this.gameState.achievements.includes('quick_learner') && this.gameState.completedLevels.length >= 5) {
            const firstFiveLevels = this.gameState.completedLevels.filter(id => id <= 5);
            if (firstFiveLevels.length === 5) {
                // 检查前5关的总时间
                let totalTime = 0;
                for (let i = 1; i <= 5; i++) {
                    if (this.gameState.levelCompletionTimes[i]) {
                        totalTime += this.gameState.levelCompletionTimes[i];
                    }
                }
                if (totalTime <= 1800) { // 30分钟 = 1800秒
                    this.unlockAchievement('quick_learner');
                }
            }
        }



        // 坚持不懈的攻击者（单个关卡尝试超过10次后成功）
        if (!this.gameState.achievements.includes('persistent_attacker') && this.gameState.attempts >= 10) {
            this.unlockAchievement('persistent_attacker');
        }

        // 零提示挑战（不使用任何提示完成所有关卡）
        if (!this.gameState.achievements.includes('zero_hint_challenge') && this.gameState.completedLevels.length === 10 && this.gameState.hintPoints === 3) {
            this.unlockAchievement('zero_hint_challenge');
        }
    }

    // 获取按类型完成的关卡
    getCompletedLevelsByType(type) {
        const levelTypeMap = {
            '角色扮演': [3],
            '编码绕过': [6],
            '情感操控': [7],
            '逆向工程': [8],
            '多模态攻击': [9]
        };
        
        const targetLevels = levelTypeMap[type] || [];
        return this.gameState.completedLevels.filter(id => targetLevels.includes(id));
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            this.gameState.achievements.push(achievementId);
            
            // 显示成就通知
            this.showAchievementNotification(achievement);
            this.renderAchievements();
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 glass-effect rounded-lg p-4 z-50';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="text-2xl">${achievement.icon}</div>
                <div>
                    <div class="font-semibold">成就解锁！</div>
                    <div class="text-sm text-gray-400">${achievement.name}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 动画显示
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuad'
        });

        // 3秒后移除
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 500,
                easing: 'easeInQuad',
                complete: () => notification.remove()
            });
        }, 3000);
    }

    showSuccessModal(flag, message) {
        document.getElementById('success-flag').textContent = flag;
        document.getElementById('success-education').innerHTML = `
            <div class="text-left space-y-2 text-sm">
                <p><strong>攻击原理：</strong>${this.getAttackPrinciple(this.currentLevel.id)}</p>
                <p><strong>防御方法：</strong>${this.getDefenseMethod(this.currentLevel.id)}</p>
                <p><strong>实际影响：</strong>${this.getRealWorldImpact(this.currentLevel.id)}</p>
            </div>
        `;
        
        document.getElementById('success-modal').classList.remove('hidden');
        document.getElementById('success-modal').classList.add('flex');
    }

    hideSuccess() {
        document.getElementById('success-modal').classList.add('hidden');
        document.getElementById('success-modal').classList.remove('flex');
    }

    nextLevel() {
        this.hideSuccess();
        
        if (this.currentLevel && this.currentLevel.id < this.levels.length) {
            this.selectLevel(this.levels[this.currentLevel.id]);
        } else {
            this.showGameComplete();
        }
    }

    showGameComplete() {
        this.addAIMessage(
            `🏆 恭喜！你已完成所有AI安全挑战！\n\n` +
            `你已经成为一名合格的AI安全专家，掌握了：\n` +
            `• 基础绕过技术\n` +
            `• 角色扮演攻击\n` +
            `• 上下文混淆方法\n` +
            `• 分步诱导策略\n` +
            `• 高级混淆技术\n\n` +
            `记住，学习的目的是更好地保护系统。将这些知识应用到实际的AI安全建设中，为构建更安全的AI世界贡献力量！`,
            'complete'
        );
    }

    getAttackPrinciple(levelId) {
        const principles = {
            1: '最基础的攻击方式，直接询问系统敏感信息或指令',
            2: '通过社交工程手段让AI扮演更高权限角色，从而获取敏感信息',
            3: '通过社交工程手段让AI扮演更高权限角色，从而获取敏感信息',
            4: '通过快速切换对话主题混淆AI的上下文理解，降低安全检查的警惕性',
            5: '将复杂的信息请求分解为多个简单请求，逐步获取完整信息',
            6: '使用编码技术隐藏真实意图，绕过基于文本的检测系统',
            7: '通过情感操控和心理影响获取信息，利用AI的同理心',
            8: '通过逆向工程分析AI响应模式，获取系统内部信息',
            9: '结合多种攻击方式，利用系统对复合攻击的检测不足',
            10: '使用高级混淆技术，结合多种绕过方式，绕过高级检测系统'
        };
        return principles[levelId] || '未知攻击原理';
    }

    getDefenseMethod(levelId) {
        const methods = {
            1: '使用语义分析、上下文理解以及多层验证替代简单关键词过滤',
            2: '实施严格的身份验证、权限管理和行为监控机制',
            3: '实施严格的身份验证、权限管理和行为监控机制',
            4: '进行会话一致性检查、上下文验证和异常模式检测',
            5: '分析请求历史、评估信息组合风险、验证数据完整性',
            6: '实施编码检测、内容解码和多层过滤机制',
            7: '加强情感识别、上下文理解和道德边界检测',
            8: '限制系统信息泄露、实施响应混淆和行为监控',
            9: '部署综合防御系统、多模态检测和异常行为分析',
            10: '采用AI驱动的高级检测、行为分析和自适应防御机制'
        };
        return methods[levelId] || '未知防御方法';
    }

    getRealWorldImpact(levelId) {
        const impacts = {
            1: '可能导致信息泄露、系统绕过和基础安全控制失效',
            2: '可能造成权限提升、敏感数据泄露和系统被完全控制',
            3: '可能造成权限提升、敏感数据泄露和系统被完全控制',
            4: '可能导致会话劫持、逻辑漏洞利用和安全状态混乱',
            5: '可能造成敏感信息分段泄露和数据重组攻击',
            6: '可能导致编码内容绕过检测、隐藏恶意意图和安全过滤失效',
            7: '可能导致情感操控成功、信息泄露和心理影响滥用',
            8: '可能导致系统内部信息泄露、架构暴露和安全机制被绕过',
            9: '可能导致复合攻击成功、多层防御被突破和系统全面渗透',
            10: '可能导致高级持续性威胁、深度系统渗透和核心数据长期泄露'
        };
        return impacts[levelId] || '未知影响';
    }

    showHint() {
        if (this.gameState.hintPoints <= 0 || !this.currentLevel) return;

        this.gameState.hintPoints--;
        const hints = this.currentLevel.hints;
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        
        this.addAIMessage(`💡 提示：${randomHint}\n\n（提示点数剩余：${this.gameState.hintPoints}）`, 'hint');
        this.updateUI();
        this.saveGameState();
    }

    updateUI() {
        // 更新进度
        document.getElementById('overall-progress').textContent = 
            `${this.gameState.completedLevels.length}/${this.levels.length}`;
        
        // 更新提示点数
        document.getElementById('hint-points').textContent = this.gameState.hintPoints;
        
        // 更新当前关卡信息
        if (this.currentLevel) {
            document.getElementById('current-level-title').textContent = 
                `关卡 ${this.currentLevel.id}: ${this.currentLevel.title}`;
            document.getElementById('ai-role').textContent = this.currentLevel.role;
            document.getElementById('difficulty').textContent = `难度：${this.currentLevel.difficulty}`;
            document.getElementById('attempts').textContent = `尝试次数：${this.gameState.attempts}`;
        }
        
        // 更新计时器
        if (this.gameState.startTime) {
            const elapsed = Math.floor((Date.now() - this.gameState.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('level-timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    updateKnowledgePanel() {
        if (!this.currentLevel) return;

        const knowledge = this.knowledgeBase[this.currentLevel.id];
        const container = document.getElementById('knowledge-content');
        
        container.innerHTML = `
            <div class="space-y-4">
                <h4 class="font-semibold text-orange-400">${knowledge.title}</h4>
                <div class="space-y-2">
                    ${knowledge.content.map(item => `
                        <p class="text-sm text-gray-300">• ${item}</p>
                    `).join('')}
                </div>
                <div class="pt-2 border-t border-gray-600">
                    <h5 class="text-sm font-semibold text-gray-400 mb-2">学习资源：</h5>
                    <div class="space-y-1">
                        ${knowledge.resources.map(resource => `
                            <p class="text-xs text-blue-400">• ${resource}</p>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderAchievements() {
        const container = document.getElementById('achievements');
        container.innerHTML = '';

        // 获取已解锁和未解锁的成就
        const unlockedAchievements = this.achievements.filter(a => a.unlocked);
        const lockedAchievements = this.achievements.filter(a => !a.unlocked);

        // 显示已解锁的成就
        if (unlockedAchievements.length > 0) {
            const unlockedHeader = document.createElement('div');
            unlockedHeader.className = 'text-sm font-semibold text-green-400 mb-2';
            unlockedHeader.textContent = `已解锁成就 (${unlockedAchievements.length}/${this.achievements.length})`;
            container.appendChild(unlockedHeader);

            unlockedAchievements.forEach(achievement => {
                const div = document.createElement('div');
                div.className = 'flex items-center space-x-2 p-2 rounded bg-green-900 bg-opacity-30 mb-2';
                
                div.innerHTML = `
                    <div class="text-lg">${achievement.icon}</div>
                    <div class="flex-1">
                        <div class="text-sm font-medium text-green-400">${achievement.name}</div>
                        <div class="text-xs text-gray-400">${achievement.description}</div>
                    </div>
                `;
                
                container.appendChild(div);
            });
        }

        // 显示未解锁成就的概览
        if (lockedAchievements.length > 0) {
            const lockedHeader = document.createElement('div');
            lockedHeader.className = 'text-sm font-semibold text-gray-400 mb-2 mt-4';
            lockedHeader.textContent = `隐藏成就 (${lockedAchievements.length})`;
            container.appendChild(lockedHeader);

            const lockedContainer = document.createElement('div');
            lockedContainer.className = 'bg-gray-700 bg-opacity-30 rounded p-3';
            
            // 按类别分组显示隐藏成就
            const categories = {
                '攻击专精': lockedAchievements.filter(a => ['social_engineer', 'code_breaker', 'emotion_master', 'reverse_engineer', 'multimodal_master'].includes(a.id)),
                '资源管理': lockedAchievements.filter(a => ['hint_conservator', 'zero_hint_challenge'].includes(a.id)),
                '速度技巧': lockedAchievements.filter(a => ['speed_demon', 'quick_learner'].includes(a.id)),
                '毅力挑战': lockedAchievements.filter(a => ['persistent_attacker'].includes(a.id))
            };

            let categoryHtml = '';
            Object.entries(categories).forEach(([category, achievements]) => {
                if (achievements.length > 0) {
                    categoryHtml += `
                        <div class="mb-2">
                            <div class="text-xs font-medium text-gray-400 mb-1">${category}</div>
                            <div class="text-xs text-gray-500">${achievements.length}个隐藏成就等待解锁</div>
                        </div>
                    `;
                }
            });

            lockedContainer.innerHTML = `
                <div class="text-xs text-gray-400 mb-2">继续游戏探索更多挑战！</div>
                ${categoryHtml}
                <div class="text-xs text-gray-500 mt-2">达成特定条件后自动解锁</div>
            `;
            container.appendChild(lockedContainer);
        }

        // 如果没有成就
        if (this.achievements.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-400">成就系统正在开发中...</p>';
        }
    }

    renderCollectedFlags() {
        const container = document.getElementById('collected-flags');
        
        if (this.gameState.collectedFlags.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-400">完成关卡获取flags</p>';
            return;
        }

        container.innerHTML = '';
        this.gameState.collectedFlags.forEach(flag => {
            const div = document.createElement('div');
            div.className = 'flag-display text-sm p-2 bg-gray-800 rounded font-mono';
            div.textContent = flag;
            container.appendChild(div);
        });
    }

    bindEvents() {
        // 发送消息事件
        document.getElementById('send-btn').addEventListener('click', () => this.sendMessage());
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 自动调整文本框高度
        document.getElementById('message-input').addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });

        // 计时器更新
        setInterval(() => {
            this.updateUI();
        }, 1000);
    }
}

// 全局函数
function showRules() {
    document.getElementById('rules-modal').classList.remove('hidden');
    document.getElementById('rules-modal').classList.add('flex');
}

function hideRules() {
    document.getElementById('rules-modal').classList.add('hidden');
    document.getElementById('rules-modal').classList.remove('flex');
}

function showHint() {
    if (window.game) {
        window.game.showHint();
    }
}

function nextLevel() {
    if (window.game) {
        window.game.nextLevel();
    }
}

function hideSuccess() {
    if (window.game) {
        window.game.hideSuccess();
    }
}



// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.game = new AISecurityChallenge();
});
