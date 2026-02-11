;(function () {
  const sidebar = document.getElementById('sidebar')
  const menuBtn = document.getElementById('menuBtn')
  const overlay = document.getElementById('overlay')
  const modalOverlay = document.getElementById('modalOverlay')
  const openModalBtn = document.getElementById('openModalBtn')
  const closeModalBtn = document.getElementById('closeModalBtn')
  const createBtn = document.getElementById('createBtn')
  const modalInput = document.getElementById('modalInput')

  function closeSidebar() {
    sidebar.classList.remove('open')
    overlay.style.display = 'none'
    overlay.setAttribute('aria-hidden', 'true')
  }
  function openSidebar() {
    sidebar.classList.add('open')
    overlay.style.display = 'block'
    overlay.setAttribute('aria-hidden', 'false')
  }

  menuBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) closeSidebar()
    else openSidebar()
  })
  overlay.addEventListener('click', () => {
    closeSidebar()
    closeModal()
  })

  // Tabs (sidebar nav + bottom tabs)
  function switchTo(tab) {
    document.querySelectorAll('main.content section').forEach((s) => (s.style.display = 'none'))
    const el = document.getElementById('tab-' + tab)
    if (el) el.style.display = 'block'
    document
      .querySelectorAll('.nav-item')
      .forEach((n) => n.classList.toggle('active', n.dataset.tab === tab))
    document
      .querySelectorAll('.tab-btn')
      .forEach((t) => t.classList.toggle('active', t.dataset.tab === tab))
  }
  document.querySelectorAll('.nav-item').forEach((it) => {
    it.addEventListener('click', () => {
      if (it.dataset.tab) switchTo(it.dataset.tab)
      if (window.innerWidth <= 900) closeSidebar()
    })
  })
  document
    .querySelectorAll('.tab-btn')
    .forEach((t) => t.addEventListener('click', () => switchTo(t.dataset.tab)))

  // Modal
  function openModal() {
    modalOverlay.style.display = 'flex'
    modalOverlay.setAttribute('aria-hidden', 'false')
    modalInput.focus()
  }
  function closeModal() {
    modalOverlay.style.display = 'none'
    modalOverlay.setAttribute('aria-hidden', 'true')
  }
  openModalBtn.addEventListener('click', openModal)
  closeModalBtn.addEventListener('click', closeModal)
  createBtn.addEventListener('click', () => {
    const v = modalInput.value.trim()
    if (v) {
      alert('Created: ' + v)
      modalInput.value = ''
      closeModal()
    } else {
      modalInput.focus()
    }
  })

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal()
      closeSidebar()
    }
  })

  // Sample action triggers a small visual confirmation
  document.getElementById('sampleAction').addEventListener('click', () => {
    const el = document.querySelector('.brand .logo')
    el.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }],
      { duration: 450 }
    )
  })

  // Close modal by clicking outside dialog
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal()
  })

  // --- Social app: feed, reels, inbox ---
  // Sample action triggers a small visual confirmation
  document.getElementById('sampleAction').addEventListener('click', () => {
    const el = document.querySelector('.brand .logo')
    el.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }],
      { duration: 450 }
    )
  })

  // Sample posts
  const samplePosts = [
    { id: 'p1', user: 'Alice', text: 'Good morning! Loving ChazUp ✨', likes: 12 },
    { id: 'p2', user: 'Bob', text: 'Check out this cool place I visited.', likes: 34 },
    { id: 'p3', user: 'Carol', text: 'New project launched today 🚀', likes: 4 },
  ]

  function escapeHtml(s) {
    return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  function loadPosts() {
    return samplePosts
    //return JSON.parse(localStorage.getItem('chaz_posts') || 'null') || samplePosts
  }

  function renderFeed() {
    const feed = document.getElementById('feed')
    feed.innerHTML = ''
    const posts = loadPosts()
    posts
      .slice()
      .reverse()
      .forEach((p) => {
        const card = document.createElement('div')
        card.style.padding = '12px'
        card.style.borderRadius = '10px'
        card.style.background = 'linear-gradient(180deg,#fff,#fbfbff)'
        card.style.boxShadow = 'var(--shadow)'
        card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:700">${escapeHtml(p.user)}</div><div style="color:var(--muted);font-size:12px">just now</div></div><div style="margin-top:8px">${escapeHtml(p.text)}</div><div style="margin-top:10px;display:flex;gap:8px;align-items:center"><button data-id="${p.id}" class="likeBtn" style="background:transparent;border:0;padding:6px;border-radius:8px;cursor:pointer">❤️ ${p.likes}</button><button class="commentBtn" style="background:transparent;border:0;padding:6px;cursor:pointer">💬 Comment</button></div>`
        feed.appendChild(card)
      })
    document.querySelectorAll('.likeBtn').forEach((b) => {
      b.addEventListener('click', () => {
        const id = b.dataset.id
        const postsLocal = JSON.parse(localStorage.getItem('chaz_posts') || 'null') || samplePosts
        const post = postsLocal.find((x) => x.id === id)
        if (post) {
          post.likes++
          localStorage.setItem('chaz_posts', JSON.stringify(postsLocal))
          renderFeed()
        }
      })
    })
  }

  // Composer button opens modal for new post
  document.getElementById('composeBtn').addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'New Post'
    modalInput.value = ''
    openModal()
  })
  createBtn.addEventListener('click', () => {
    const v = modalInput.value.trim()
    if (v) {
      const postsLocal = JSON.parse(localStorage.getItem('chaz_posts') || 'null') || samplePosts
      postsLocal.push({ id: 'p' + Date.now(), user: 'You', text: v, likes: 0 })
      localStorage.setItem('chaz_posts', JSON.stringify(postsLocal))
      closeModal()
      renderFeed()
    } else modalInput.focus()
  })

  // Reels
  const sampleReels = [
    { id: 'r1', user: 'Dani', title: 'Sunset vibes', color: '#ff6b6b' },
    { id: 'r2', user: 'Eva', title: 'Cooking short', color: '#4d96ff' },
    { id: 'r3', user: 'Finn', title: 'Street music', color: '#b983ff' },
  ]
  function renderReels() {
    const area = document.getElementById('reels')
    area.innerHTML = ''
    sampleReels.forEach((r, idx) => {
      const card = document.createElement('div')
      card.style.position = 'absolute'
      card.style.inset = '0'
      card.style.display = 'flex'
      card.style.alignItems = 'center'
      card.style.justifyContent = 'center'
      card.style.flexDirection = 'column'
      card.style.transition = 'transform .4s ease, opacity .4s ease'
      card.style.background = r.color
      card.style.width = '100%'
      card.style.height = '100%'
      card.style.color = 'white'
      card.innerHTML = `<div style="font-weight:700;font-size:20px">${escapeHtml(r.user)}</div><div style="margin-top:8px">${escapeHtml(r.title)}</div>`
      card.dataset.index = idx
      card.style.transform = `translateY(${idx * 100}%)`
      area.appendChild(card)
    })
    startReels()
  }

  let currentReel = 0,
    reelsTimer = null
  function startReels() {
    clearInterval(reelsTimer)
    const area = document.getElementById('reels')
    reelsTimer = setInterval(() => {
      const cards = area.children
      Array.from(cards).forEach((c, i) => {
        const pos = i - currentReel
        c.style.transform = `translateY(${pos * 100}%)`
        c.style.opacity = pos === 0 ? '1' : '0.6'
      })
      currentReel = (currentReel + 1) % area.children.length
    }, 2600)
  }

  // Inbox / chat
  const convs = [
    {
      id: 'c1',
      name: 'Jamie',
      last: 'You: Nice!',
      messages: [
        { from: 'Jamie', text: 'Hey, up for coffee?' },
        { from: 'You', text: 'Sure!' },
      ],
    },
    {
      id: 'c2',
      name: 'Morgan',
      last: 'Sent a photo',
      messages: [{ from: 'Morgan', text: 'Look at this!' }],
    },
  ]
  function renderConversations() {
    const el = document.getElementById('conversations')
    el.innerHTML = ''
    convs.forEach((c) => {
      const item = document.createElement('div')
      item.style.padding = '8px'
      item.style.borderRadius = '8px'
      item.style.cursor = 'pointer'
      item.style.marginBottom = '6px'
      item.style.display = 'flex'
      item.style.justifyContent = 'space-between'
      item.innerHTML = `<div><div style="font-weight:700">${escapeHtml(c.name)}</div><div style="color:var(--muted);font-size:12px">${escapeHtml(c.last)}</div></div>`
      item.addEventListener('click', () => openConversation(c.id))
      el.appendChild(item)
    })
  }

  let activeConv = null
  function openConversation(id) {
    activeConv = convs.find((x) => x.id === id)
    document.getElementById('chatHeader').textContent = activeConv.name
    renderMessages()
  }
  function renderMessages() {
    const mEl = document.getElementById('messages')
    mEl.innerHTML = ''
    if (!activeConv) return
    activeConv.messages.forEach((m) => {
      const div = document.createElement('div')
      div.style.marginBottom = '8px'
      div.style.maxWidth = '70%'
      div.style.padding = '8px'
      div.style.borderRadius = '8px'
      if (m.from === 'You') {
        div.style.marginLeft = 'auto'
        div.style.background = '#e9f5ff'
      } else {
        div.style.background = '#f3f4f6'
      }
      div.textContent = m.text
      mEl.appendChild(div)
    })
    mEl.scrollTop = mEl.scrollHeight
  }
  document.getElementById('sendMsg').addEventListener('click', () => {
    const t = document.getElementById('chatInput').value.trim()
    if (!t || !activeConv) return
    activeConv.messages.push({ from: 'You', text: t })
    document.getElementById('chatInput').value = ''
    renderMessages()
  })

  // Initialize social features
  renderFeed()
  renderReels()
  renderConversations()

  // Start on home
  switchTo('home')
})()
