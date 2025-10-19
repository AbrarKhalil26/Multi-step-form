function mainBtn(bgColor, colorHover, title, className, state) {
  return state.currentPage > 1
    ? `<div class="bg-white flex justify-between items-center fixed right-0 bottom-0 md:static w-full p-4 md:pb-0 md:pr-0 md:mt-8">
      <span class="go-back text-gray-400 cursor-pointer">Go Back</span>  
      <div class="${className} w-fit">
        <button type="submit" class="${bgColor} ${colorHover} duration-300 text-white py-2 px-5 rounded-lg">${title}</button>
      </div>
    </div>`
    : `
    <div class="${className} bg-white flex justify-end fixed right-0 bottom-0 md:static w-full p-4 md:pb-0 md:pr-0 md:mt-8">
      <button type="submit" class="${bgColor} ${colorHover} duration-300 text-white py-2 px-5 rounded-lg">${title}</button>
    </div>
      `;
}

export function toastContent() {
  return Toastify({
    text: "Form submitted successfully!",
    duration: 1000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "green",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

export function renderMenu(state) {
  const { menu, currentPage } = state;
  $(".menu").empty();
  menu.forEach((item, index) => {
    const active = index + 1 === currentPage ? "active-menu" : "";
    const blackBox = `
    <li class="item-menu flex items-center gap-4 font-semibold ${active}">
      <div class="circle border-1 border-white w-10 h-10 rounded-full flex justify-center items-center text-white">${
        index + 1
      }</div>
      <div class="uppercase hidden md:block">
        <p class="text-blue-300 text-sm">${item.subtitle}</p>
        <p class="text-white">${item.title}</p>
      </div>
    </li>
  `;
    $(".menu").append(blackBox);
  });
}

export function renderContent(state) {
  const { currentPage } = state;
  switch (currentPage) {
    case 1:
      $(".main").html(infoContent(state));
      break;
    case 2:
      $(".main").html(planContent(state));
      break;
    case 3:
      $(".main").html(pickContent(state));
      break;
    case 4:
      $(".main").html(finishContent(state));
      break;
    default:
      $(".main").html(infoContent(state));
  }
}

export function infoContent(state) {
  return `
    <h2 class="text-2xl mb-2">Personal info</h2>
    <p>Please provide your name, email address, and phone number.</p>
    <form class="infoForm mt-5">
      ${state.inputData
        .map(
          (item) => `
          <div class="item-input flex flex-col my-4">
            <div class="flex justify-between items-center">
              <label for="${item.id}">${item.title}</label>
              <span data-error="${item.id}" class="hidden text-sm"></span>
            </div>
            <input type="text" id="${item.id}" placeholder="${item.placeholder}">
          </div>
        `
        )
        .join("")}
      ${mainBtn(
        "bg-blue-950",
        "hover:bg-blue-900",
        "Next Step",
        "main-btn",
        state
      )}
    </form>
  `;
}

export function planContent(state) {
  const { isMonthly, planData } = state;
  return `
    <h2 class="text-2xl mb-2">Select your plan</h2>
    <p>You have the option of monthly or yearly billing.</p>
    <div class="my-5 grid md:grid-cols-3 gap-3">
      ${planData
        .map((item, idx) => {
          return `
          <div key=${idx} class="cursor-pointer plan-item flex md:flex-col gap-3 md:gap-10 items-center md:items-start border border-gray-300 hover:border-purple-600 duration-300 bg-white rounded-lg px-5 py-4 ${
            item.title === "Arcade" && "active-plan"
          }">
            <img src="${item.icon}" alt="${item.title}"/>
            <div>
              <h3 class="capitalize">${item.title}</h3>
              <p class="price">$<span>${item.price}</span>/${
            isMonthly ? "mo" : "yr"
          }
              </p>
              ${
                !isMonthly
                  ? `<p class="mt-1.5 text-blue-950 text-[12px] font-medium">2 months free</p>`
                  : ""
              }
            </div>
          </div>`;
        })
        .join("")}
    </div>
    <div class="flex items-center justify-center gap-2 bg-blue-100 py-3 rounded-lg">
      <label for="switch-component-on" class="${
        isMonthly ? "text-blue-950" : "text-gray-400"
      } text-sm cursor-pointer">Monthly</label>
      <div class="relative inline-block w-12 h-6">
        <input id="switch-component-on" type="checkbox" ${
          !isMonthly ? "checked" : ""
        } class="peer appearance-none w-12 h-6 bg-blue-950 rounded-full cursor-pointer transition-colors duration-300" />
        <label for="switch-component-on" class=" absolute top-1 left-1 w-4 h-4 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-300 cursor-pointer">
        </label>
      </div>
      <label for="switch-component-on" class="${
        !isMonthly ? "text-blue-950" : "text-gray-400"
      } text-sm cursor-pointer">Yearly</label>
    </div>
    ${mainBtn(
      "bg-blue-950",
      "hover:bg-blue-900",
      "Next Step",
      "main-btn-plan",
      state
    )}
    </div>
  `;
}

export function pickContent(state) {
  const { isMonthly, pickData } = state;
  return `
    <h2 class="text-2xl mb-2">Pick add-ons</h2>
    <p>Add-ons help enhance gaming experience.</p>
    <div class="grid gap-3 my-5">
      ${pickData
        .map(
          (item, idx) =>
            `
        <div data-idx="${idx}" class="pick-item cursor-pointer border-2 border-gray-300 rounded-lg p-5 flex gap-5 items-center">
          <div class="inline-flex items-center">
            <label class="flex items-center cursor-pointer relative">
              <input type="checkbox"id="check-${idx}" data-idx="${idx}" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-purple-600 checked:border-purple-600" id="check1" />
              <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              </span>
            </label>
          </div>
          <div>
            <h3 class="capitalize">${item.title}</h3>
            <p>${item.description}</p>
          </div>
          <span class="price text-purple-600 text-sm ml-auto">
            +$${isMonthly ? item.price : item.price * 10}/${
              isMonthly ? "mo" : "yr"
            }
          </span>
        </div>
        `
        )
        .join("")}
    </div>
    ${mainBtn(
      "bg-blue-950",
      "hover:bg-blue-900",
      "Next Step",
      "main-btn-pick",
      state
    )}
  `;
}

export function finishContent(state) {
  const { isMonthly, allData } = state;
  return `
    <h2 class="text-2xl mb-2">Finishing up</h2>
    <p>Double-check everything looks OK before confirming.</p>
    <div class="bg-blue-100 rounded-lg p-4 ">
      <div class="flex justify-between items-center border-b border-b-gray-300 pb-3">
        <div>
          <h3 class="text-blue-950 text-sm">${allData.plan || plan[0].title} (${
    isMonthly ? "Monthly" : "Yearly"
  })</h3>
          <p class="edit cursor-pointer underline hover:text-blue-600 duration-300">Change</p>  
        </div>
        <span class="text-blue-950 text-sm font-medium">$${
          allData.price || plan[0].price
        }/${isMonthly ? "mo" : "yr"}</span>

      </div>
      <div class="pt-3">
        ${allData.addons
          .map(
            (item) =>
              `
          <div class="flex justify-between text-sm py-1">
            <h3 class="text-gray-400 font-normal">${item.title}</h3>
            <span class="text-blue-950">${item.price}</span>
          </div>
          `
          )
          .join("")}
      </div>
    </div>
    <div class="flex justify-between px-4 pt-5">
      <p>Total (per ${isMonthly ? "month" : "year"})</p>
      <span class="text-purple-600 font-semibold text-sm">$${
        allData.totalPrice
      }/${isMonthly ? "mo" : "yr"}</span>
    </div>
    ${mainBtn(
      "bg-purple-600",
      "hover:bg-purple-600/70",
      "Confirm",
      "main-btn-final",
      state
    )}
  `;
}

export const thanksContent = `
  <div class="text-center flex flex-col justify-center py-10">
    <img src="../assets/images/icon-thank-you.svg" alt="thank you" class="w-15 mx-auto mb-3"/>
    <h2 class="text-2xl mb-2">Thank you!</h2>
    <p class="sm:w-4/5 mx-auto md:text-[16px]">Thanks for confirming your subscription! We hope you have fun
    using our platform. If you ever need support, please feel free to email us
    at support@loremgaming.com.</p>
  </div>
`;
