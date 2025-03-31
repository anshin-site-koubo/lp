document.addEventListener("DOMContentLoaded", () => {
  // スクロール時のヘッダーの変化
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // モバイルメニューの制御
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");

      // メニューが開いているときはスクロールを無効化
      if (navLinks.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // メニューリンクをクリックしたらメニューを閉じる
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // メニュー外をクリックしたら閉じる
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        mobileMenuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // フォーム送信処理
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector(".submit-button");
      const originalText = submitButton.textContent;
      submitButton.textContent = "送信中...";
      submitButton.disabled = true;

      // フォームデータの収集
      const formData = {
        company: contactForm.querySelector("#company").value,
        name: contactForm.querySelector("#name").value,
        email: contactForm.querySelector("#email").value,
        message: contactForm.querySelector("#message").value,
      };

      try {
        // ここに実際のフォーム送信処理を実装
        // 例: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

        // 成功メッセージの表示（デモ用）
        alert(
          "お問い合わせありがとうございます。\n担当者より順次ご連絡させていただきます。"
        );
        contactForm.reset();
      } catch (error) {
        alert(
          "申し訳ありません。送信に失敗しました。\n時間をおいて再度お試しください。"
        );
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }

  // スクロールアニメーション
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // アニメーション後に監視を解除
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // アニメーション対象の要素を監視
  document
    .querySelectorAll(".service-card, .feature, .security-item, .hero-content")
    .forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.6s ease, transform 0.6s ease ${
        index * 0.1
      }s`;
      observer.observe(el);
    });

  // CSSクラスを追加
  const style = document.createElement("style");
  style.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // パーティクルエフェクト
  const createParticle = () => {
    const particle = document.createElement("div");
    particle.className = "particle";
    document.body.appendChild(particle);

    const size = Math.random() * 3 + 1;
    const destinationX = (Math.random() - 0.5) * 200;
    const destinationY = (Math.random() - 0.5) * 200;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.background = `rgba(66, 153, 225, ${Math.random() * 0.5})`;
    particle.style.borderRadius = "50%";
    particle.style.position = "fixed";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "0";
    particle.style.animation = `float ${
      Math.random() * 3 + 2
    }s ease-in-out infinite`;
    particle.style.transform = `translate(${destinationX}px, ${destinationY}px)`;

    setTimeout(() => {
      particle.remove();
    }, 5000);
  };

  // パーティクルを定期的に生成
  setInterval(createParticle, 300);
});
