// 导航栏相关功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// 汉堡菜单切换
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 点击导航链接时关闭菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 活动导航链接高亮
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavLink();

// 滚动时导航栏效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// 服务卡片交互
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// "立即咨询"按钮跳转到服务
document.querySelector('.btn-primary').addEventListener('click', () => {
    document.querySelector('#service').scrollIntoView({ behavior: 'smooth' });
});

// 联系表单提交
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // 验证表单
        if (!name.trim() || !phone.trim() || !message.trim()) {
            alert('请填写所有必填项');
            return;
        }
        
        // 简单的电话号码验证
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone) && phone.length < 10) {
            alert('请输入有效的电话号码');
            return;
        }
        
        // 模拟提交
        alert(`感谢 ${name} 的咨询！\n\n我们已收到您的信息，会在2小时内与您联系。\n热线电话：400-888-8888`);
        contactForm.reset();
    });
}

// 平滑滚动导航
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (!this.classList.contains('nav-link')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// 页面性能优化 - 惰性加载
if ('IntersectionObserver' in window) {
    const imageElements = document.querySelectorAll('.service-card, .about-placeholder');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                imageObserver.unobserve(entry.target);
            }
        });
    });
    
    imageElements.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
}

// 控制台欢迎信息
console.log('%c镜界学生近视防控镜 - 专业店铺官网', 'color: #1e40af; font-size: 16px; font-weight: bold;');
console.log('%c专业防控学生近视，让青少年拥有清晰明亮的世界', 'color: #6b7280; font-size: 14px;');
console.log('%c热线电话：400-888-8888 | 营业时间：9:00-21:00', 'color: #10b981; font-size: 13px;');
