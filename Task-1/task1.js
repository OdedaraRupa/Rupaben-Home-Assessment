(function () {
  // Create overlay
  let overlay = document.createElement("div");
  overlay.id = "contact-overlay";
  document.body.appendChild(overlay);

  // Create new contact section
  let section = document.createElement("section");
  section.id = "contact-section";
  section.innerHTML = `
    <h1>Hello conversion!</h1>
    <p>Click on button below to contact us.</p>
    <div class="contact-btn-wrapper">
       <div class="btn-wrap">
        <div class="blackbox"></div>
        <div class="subbox2" ></div>
        <div class="subbox"></div>
        <div class="blackbox2"></div>
        <button id="contact-btn">Click Here</button>
        </div>
    </div>
   
  `;
  overlay.appendChild(section);

  let contactSection = document.createElement("div");
  contactSection.id = "contactModal";
  contactSection.innerHTML = `
   <div id="customModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>

        <!-- Progress Bar -->
        <div class="custom-progress-container">
        <!-- Step 1: User Information -->
        <div class="custom-step done">
          <div class="circle">
          <svg viewBox="0 0 24 24" class="icon">
          <path fill="#5475cd" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 0a1 1 0 0 1 1 1h-2a1 1 0 0 1 1-1zm0 16c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
          </svg>
          <svg viewBox="0 0 24 24" class="checkmark" >
          <path fill="white" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          </div>
          <p>User Information</p>
        </div>

        <div class="line"></div>

        <!-- Step 2: Inquiry -->
        <div class="custom-step active">
        <div class="circle">
        <svg viewBox="0 0 24 24" class="icon">
        <path fill="#5475cd" d="M20 2H4a2 2 0 0 0-2 2v20l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
        </svg>
        <svg viewBox="0 0 24 24" class="checkmark" >
        <path fill="white" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        </div>
        <p>Inquiry</p>
        </div>

        <div class="line"></div>

        <!-- Step 3: Complete -->
        <div class="custom-step">
        <div class="circle">
        <svg viewBox="0 0 24 24" class="icon">
        <path fill="#5475cd" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0-2h13V6H6.42l-.6-2H1v2h3l3.6 7.59-1.35 2.44C5.16 17.37 6.48 19 8 19h12v-2H8.42c-.14 0-.25-.11-.25-.25L8.7 16H19v-2H7v2z"/>
        </svg>
        <svg viewBox="0 0 24 24" class="checkmark" >
        <path fill="white" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        </div>
        <p>Complete</p>
        </div>
        </div>


        <!-- Step 1 -->
        
        <form id="multiStepForm" method="POST" action="https://forms-eu1.hsforms.com/submissions/v3/public/submit/formsnext/multipart/9358319/e259701f-aa68-4328-8ebf-013c47468869" >
          <div class="form-step active">
            <label>First Name <input type="text" id="firstName" required></label>
            <label>Last Name <input type="text" id="lastName" required></label>
            <label>Email <input type="email" id="email" required></label>
            <button type="button" class="nextBtn">Next</button>
          </div>  

          <!-- Step 2 -->
          <div class="form-step">
            <label>How can we help you?<br>
              <textarea id="message" required></textarea>
            </label>

           <label class="checkbox-wrap" >
               <input type="checkbox" id="agreeterms" required> <span>I agree to terms</span>
           </label>

              
          
            <button type="button" class="prevBtn">Back</button>
            <button type="submit" class="nextBtn">Submit</button>
          </div>

          <!-- Step 3 -->
          <div class="form-step">
            <h3>Thank you!</h3>
            <p>Your message has been submitted.</p>
            <button type="button" class="closeBtn">Close</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(contactSection);

  const modal = document.getElementById("customModal");
  const openBtn = document.getElementById("contact-btn");
  const closeBtn = modal.querySelector(".close");
  const closeBtnStep3 = modal.querySelector(".closeBtn");
  openBtn.onclick = () => modal.classList.add("open");
  closeBtn.onclick = () => modal.classList.remove("open");
  closeBtnStep3.onclick = () => modal.classList.remove("open");

  window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("open");
  };

  const form = document.getElementById("multiStepForm");
  const formSteps = form.querySelectorAll(".form-step");
  const progressSteps = modal.querySelectorAll(".progress-step");
  const progressFill = modal.querySelector(".progress-fill");

  let currentStep = 0;
  function updateFormSteps() {
    formSteps.forEach((step, i) =>
      step.classList.toggle("active", i === currentStep)
    );

    // Custom progress UI
    const customSteps = modal.querySelectorAll(".custom-step");
    customSteps.forEach((step, i) => {
      step.classList.remove("done", "active");
      if (i < currentStep) {
        step.classList.add("done");
      } else if (i === currentStep) {
        step.classList.add("active");
      }
    });
  }
  function goToStep(stepIndex) {
    const steps = document.querySelectorAll(".custom-step");

    steps.forEach((s, i) => {
      s.classList.remove("active", "done");
      if (i < stepIndex) {
        s.classList.add("done");
      } else if (i === stepIndex) {
        s.classList.add("active");
      }
    });
  }
  form.addEventListener("click", (e) => {
    if (e.target.classList.contains("nextBtn")) {
      if (currentStep === 0) {
        const f = form.querySelector("#firstName").value.trim();
        const l = form.querySelector("#lastName").value.trim();
        const em = form.querySelector("#email").value.trim();
        if (!f || !l || !em) return alert("Please complete all fields");
      }
      if (currentStep === 1) {
        const msg = form.querySelector("#message").value.trim();
        const terms = form.querySelector("#agreeterms").checked;
        if (!msg || !terms)
          return alert("Please complete all fields and accept terms");
      }
      if (currentStep < formSteps.length - 1) {
        currentStep++;
        updateFormSteps();
        goToStep(currentStep);
      }
    }

    if (e.target.classList.contains("prevBtn")) {
      if (currentStep > 0) {
        currentStep--;
        updateFormSteps();
        goToStep(currentStep);
      }
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentStep = 2;
    updateFormSteps();
    goToStep(currentStep);
  });

  updateFormSteps();
})();
