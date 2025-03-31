document.addEventListener("DOMContentLoaded", () => {
  // モバイルメニューの制御
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // メニューリンクをクリックしたらメニューを閉じる
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
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
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // アニメーション対象の要素を監視
  document
    .querySelectorAll(".service-card, .feature, .security-item")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
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
});
