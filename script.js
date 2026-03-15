/**
 * PM Portfolio — Interactions & Animations
 * Aesthetic direction: Dark Editorial Brutalism
 */

document.addEventListener('DOMContentLoaded', () => {
    const greetingMessage = "Hi! I'm Roshan's portfolio assistant. Ask me anything about his work, projects, or background.";

    const animationOrder = [
        '.tile-photo',
        '.tile-companies',
        '.tile-roles',
        '.tile-name',
        '.tile-featured',
        '.tiles-row:nth-of-type(1) .tile-case:nth-child(1)',
        '.tiles-row:nth-of-type(1) .tile-case:nth-child(2)',
        '.tiles-row:nth-of-type(1) .tile-case:nth-child(3)',
        '.floating-btn',
    ];

    animationOrder.forEach((selector, index) => {
        const el = document.querySelector(selector);
        if (el) {
            setTimeout(() => el.classList.add('animate-in'), index * 65);
        }
    });

    const nameDisplay = document.querySelector('.name-display');
    if (nameDisplay) {
        setTimeout(() => nameDisplay.classList.add('name-wipe'), 220);
    }

    const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.tile').forEach((tile) => {
        if (!tile.classList.contains('animate-in')) observer.observe(tile);
    });

    const askBtn = document.getElementById('askBtn');
    const askBtnLabel = document.getElementById('askBtnLabel');
    const chatDrawer = document.getElementById('chatDrawer');
    const chatOverlay = document.getElementById('chatOverlay');
    const chatClose = document.getElementById('chatClose');
    const chatThread = document.getElementById('chatThread');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatSend = chatForm?.querySelector('.chat-send');

    const chatState = {
        isOpen: false,
        isLoading: false,
        messages: [
            { role: 'assistant', content: greetingMessage, persistent: false },
        ],
    };

    const buttonLabelSequence = [
        { text: '+ Ask me anything', hold: 3000 },
        { text: "What's your strongest project?", hold: 2000 },
        { text: '+ Ask me anything', hold: 1500 },
        { text: 'How fast do you ship?', hold: 2000 },
    ];

    const buttonLabelState = {
        currentIndex: 0,
        timeoutId: null,
        startedAt: 0,
        remaining: buttonLabelSequence[0].hold,
        isPaused: false,
        phase: 'visible',
        fullWidth: 0,
        circleWidth: 0,
        nextAction: null,
    };

    const scrollChatToBottom = () => {
        if (chatThread) {
            chatThread.scrollTop = chatThread.scrollHeight;
        }
    };

    const syncComposerState = () => {
        if (chatInput) {
            chatInput.disabled = chatState.isLoading;
        }
        if (chatSend) {
            chatSend.disabled = chatState.isLoading;
        }
    };

    const clearButtonLabelTimer = () => {
        if (buttonLabelState.timeoutId) {
            clearTimeout(buttonLabelState.timeoutId);
            buttonLabelState.timeoutId = null;
        }
    };

    const setButtonLabelPauseState = (paused) => {
        if (!askBtnLabel || buttonLabelState.isPaused === paused) return;

        buttonLabelState.isPaused = paused;

        if (paused) {
            clearButtonLabelTimer();
            askBtnLabel.classList.remove('is-exiting', 'is-entering');
            const elapsed = buttonLabelState.startedAt ? Date.now() - buttonLabelState.startedAt : 0;
            buttonLabelState.remaining = Math.max(0, buttonLabelState.remaining - elapsed);
            return;
        }

        scheduleButtonPhase(Math.max(0, buttonLabelState.remaining), buttonLabelState.nextAction);
    };

    const setButtonWidth = (width) => {
        if (askBtn) {
            askBtn.style.width = `${Math.round(width)}px`;
        }
    };

    const startVisiblePhase = (delay) => {
        buttonLabelState.phase = 'visible';
        buttonLabelState.remaining = delay;
        scheduleButtonPhase(delay, () => {
            if (!askBtnLabel || !askBtn) return;
            buttonLabelState.phase = 'collapse';
            askBtnLabel.classList.add('is-exiting');
            setButtonWidth(buttonLabelState.circleWidth);
            scheduleButtonPhase(300, startCirclePause);
        });
    };

    const startCirclePause = () => {
        if (!askBtnLabel) return;
        buttonLabelState.currentIndex = (buttonLabelState.currentIndex + 1) % buttonLabelSequence.length;
        askBtnLabel.textContent = buttonLabelSequence[buttonLabelState.currentIndex].text;
        askBtnLabel.classList.add('is-entering');
        buttonLabelState.phase = 'circle';
        scheduleButtonPhase(300, startExpandPhase);
    };

    const startExpandPhase = () => {
        if (!askBtnLabel || !askBtn) return;
        buttonLabelState.phase = 'expand';
        setButtonWidth(buttonLabelState.fullWidth);
        scheduleButtonPhase(300, startFadeInPhase);
    };

    const startFadeInPhase = () => {
        if (!askBtnLabel) return;
        buttonLabelState.phase = 'fade-in';
        askBtnLabel.classList.remove('is-exiting', 'is-entering');
        scheduleButtonPhase(200, () => {
            startVisiblePhase(buttonLabelSequence[buttonLabelState.currentIndex].hold);
        });
    };

    function scheduleButtonPhase(delay, onComplete) {
        if (!askBtnLabel || buttonLabelState.isPaused || chatState.isOpen) return;
        clearButtonLabelTimer();
        buttonLabelState.remaining = delay;
        buttonLabelState.startedAt = Date.now();
        buttonLabelState.nextAction = onComplete || null;
        buttonLabelState.timeoutId = window.setTimeout(() => {
            buttonLabelState.timeoutId = null;
            if (!buttonLabelState.isPaused && !chatState.isOpen) {
                onComplete?.();
            }
        }, delay);
    }

    const renderMessages = () => {
        if (!chatThread) return;

        chatThread.innerHTML = '';

        chatState.messages.forEach((message) => {
            const wrapper = document.createElement('div');
            wrapper.className = `chat-message ${message.role}`;

            if (message.role === 'assistant') {
                const avatar = document.createElement('span');
                avatar.className = 'chat-avatar';
                avatar.textContent = 'RK';
                wrapper.appendChild(avatar);
            }

            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble';
            bubble.textContent = message.content;
            wrapper.appendChild(bubble);
            chatThread.appendChild(wrapper);
        });

        if (chatState.isLoading) {
            const loadingWrapper = document.createElement('div');
            loadingWrapper.className = 'chat-message assistant';

            const avatar = document.createElement('span');
            avatar.className = 'chat-avatar';
            avatar.textContent = 'RK';
            loadingWrapper.appendChild(avatar);

            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble';

            const dots = document.createElement('div');
            dots.className = 'chat-loading';
            dots.innerHTML = '<span></span><span></span><span></span>';
            bubble.appendChild(dots);
            loadingWrapper.appendChild(bubble);
            chatThread.appendChild(loadingWrapper);
        }

        scrollChatToBottom();
        syncComposerState();
    };

    const openChat = () => {
        if (!chatDrawer || !chatOverlay) return;
        chatState.isOpen = true;
        setButtonLabelPauseState(true);
        chatOverlay.hidden = false;
        chatOverlay.classList.add('is-open');
        chatDrawer.classList.add('is-open');
        chatDrawer.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => {
            chatInput?.focus();
            scrollChatToBottom();
        });
    };

    const closeChat = () => {
        if (!chatDrawer || !chatOverlay) return;
        chatState.isOpen = false;
        chatOverlay.classList.remove('is-open');
        chatDrawer.classList.remove('is-open');
        chatDrawer.setAttribute('aria-hidden', 'true');
        setButtonLabelPauseState(false);
        setTimeout(() => {
            if (!chatState.isOpen) {
                chatOverlay.hidden = true;
            }
        }, 180);
    };

    const getConversationPayload = () => chatState.messages
        .filter((message) => message.persistent !== false)
        .map(({ role, content }) => ({ role, content }));

    const sendMessage = async (content) => {
        chatState.messages.push({ role: 'user', content, persistent: true });
        chatState.isLoading = true;
        renderMessages();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: getConversationPayload(),
                }),
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data.reply) {
                throw new Error(data.error || 'Chat failed');
            }

            chatState.messages.push({ role: 'assistant', content: data.reply, persistent: true });
        } catch (error) {
            chatState.messages.push({
                role: 'assistant',
                content: 'Something went wrong. Please try again.',
                persistent: true,
            });
        } finally {
            chatState.isLoading = false;
            renderMessages();
        }
    };

    askBtn?.addEventListener('click', openChat);
    askBtn?.addEventListener('mouseenter', () => {
        setButtonLabelPauseState(true);
    });
    askBtn?.addEventListener('mouseleave', () => {
        if (!chatState.isOpen) {
            setButtonLabelPauseState(false);
        }
    });
    chatClose?.addEventListener('click', closeChat);
    chatOverlay?.addEventListener('click', closeChat);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && chatState.isOpen) {
            closeChat();
        }
    });

    chatForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const rawValue = chatInput?.value || '';
        const content = rawValue.trim();

        if (!content || chatState.isLoading) {
            return;
        }

        chatInput.value = '';
        await sendMessage(content);
        chatInput.focus();
    });

    chatInput?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            chatForm?.requestSubmit();
        }
    });

    renderMessages();

    if (askBtn && askBtnLabel) {
        askBtnLabel.textContent = buttonLabelSequence[0].text;
        const buttonRect = askBtn.getBoundingClientRect();
        buttonLabelState.fullWidth = Math.ceil(buttonRect.width);
        buttonLabelState.circleWidth = Math.ceil(buttonRect.height);
        setButtonWidth(buttonLabelState.fullWidth);
        startVisiblePhase(buttonLabelSequence[0].hold);
    }

    const glow = document.getElementById('cursorGlow');
    if (glow && window.innerWidth > 1024) {
        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        const lerp = (a, b, t) => a + (b - a) * t;

        const animateGlow = () => {
            glowX = lerp(glowX, mouseX, 0.08);
            glowY = lerp(glowY, mouseY, 0.08);
            glow.style.left = `${glowX}px`;
            glow.style.top = `${glowY}px`;
            requestAnimationFrame(animateGlow);
        };

        animateGlow();

        let idleTimer;
        document.addEventListener('mousemove', () => {
            glow.style.opacity = '1';
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                glow.style.opacity = '0';
            }, 3000);
        });
    }

    const MAX_PULL = 5;

    document.querySelectorAll('.tile-interactive').forEach((tile) => {
        tile.addEventListener('mousemove', (event) => {
            const rect = tile.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = ((event.clientX - cx) / (rect.width / 2)) * MAX_PULL;
            const dy = ((event.clientY - cy) / (rect.height / 2)) * MAX_PULL;
            tile.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        tile.addEventListener('mouseleave', () => {
            tile.style.transform = '';
        });
    });

    document.querySelectorAll('.navbar-links a').forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') document.body.classList.add('keyboard-nav');
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
