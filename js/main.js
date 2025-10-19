import {
  menu,
  regexForm,
  planData,
  pickData,
  inputData,
  allData,
} from "./constant.js";
import {
  thanksContent,
  renderMenu,
  renderContent,
  toastContent,
} from "./ui.js";

export let isMonthly = true;
export let currentPage = 1;

const state = {
  isMonthly,
  currentPage,
  allData,
  planData,
  pickData,
  inputData,
  menu,
  regexForm,
};

function refreshRender() {
  isMonthly = state.isMonthly;
  currentPage = state.currentPage;
  renderMenu(state);
  renderContent(state);
}

function success() {
  toastContent();
  state.currentPage += 1;
  refreshRender();
}

(() => {
  // if(!state.allData.plan){

  // }
  refreshRender();
})();
// -----------------------------
// Step 1: Your Info
// -----------------------------

$(document).on("input", ".infoForm input", function (e) {
  const id = $(this).attr("id");
  state.allData[id] = e.target.value;
  $(`[data-error=${id}]`).addClass("hidden");
});

$(document).on("submit", ".infoForm", function (e) {
  e.preventDefault();
  let valid = true;

  $(this)
    .find("input")
    .each(function () {
      const input = $(this);
      const id = input.attr("id");
      const value = input.val().trim();
      const errorEl = $(`[data-error='${id}']`);
      const rule = state.regexForm[id];

      if (!value) {
        valid = false;
        errorEl.text("This field is required").removeClass("hidden");
        input.css({ "border-color": "red" });
        return;
      }

      if (rule && !rule.regex.test(value)) {
        valid = false;
        errorEl.text(rule.message).removeClass("hidden");
        input.css({ "border-color": "red" });
        return;
      }

      input.css({ "border-color": "#d1d5dc" });
      errorEl.addClass("hidden");
      allData[id] = value;
    });

  if (valid) {
    success();
  } else {
    console.log("❌ Please fill all fields");
  }
});

// -----------------------------
// Step 2: Select your plan
// -----------------------------
$(document).on("click", ".plan-item", function () {
  const chosen = $(this).find("h3").text().trim();
  const itemData = state.planData.find((p) => p.title === chosen);
  if (!itemData) return;
  const price = state.isMonthly ? itemData.price : itemData.price * 10;

  state.allData.plan = chosen || "Arcade";
  state.allData.price = price;
  state.allData.duration = state.isMonthly ? "Monthly" : "Yearly";

  $(".plan-item").removeClass("active-plan");
  $(this).addClass("active-plan");
  $(this).find(".price span").text(price);
});

$(document).on("change", "#switch-component-on", function () {
  const newIsMonthly = !this.checked;
  if (newIsMonthly === state.isMonthly) return;
  state.isMonthly = newIsMonthly;
  const curItem = state.planData.find((p) => p.title === state.allData.plan);
  if (curItem) {
    allData.price = state.isMonthly ? curItem.price : curItem.price * 10;
    allData.duration = state.isMonthly ? "Monthly" : "Yearly";
  }
  refreshRender();

  $(".plan-item").each(function () {
    const title = $(this).find("h3").text().trim();
    const itemData = state.planData.find((p) => p.title === title);
    const newPrice = state.isMonthly ? itemData.price : itemData.price * 10;
    $(this).find(".price span").text(newPrice);
    if (title === state.allData.plan) {
      $(".plan-item").removeClass("active-plan");
      $(this).addClass("active-plan");
    }
  });
});

$(document).on("click", ".main-btn-plan", function () {
  if (!state.allData.plan) {
    state.allData.plan = "Arcade";
    state.allData.price = state.isMonthly
      ? state.planData.price
      : state.planData.price * 10;
    state.allData.duration = state.isMonthly ? "Monthly" : "Yearly";
  }
  success();
});

// -----------------------------
// Step 3: Pick add-ons
// -----------------------------

$(document).on("click", ".pick-item", function () {
  const input = $(this).find('input[type="checkbox"]');
  const isChecked = !input.prop("checked");
  input.prop("checked", isChecked);
  if (isChecked) {
    $(this)
      .addClass("border-purple-600 bg-blue-100")
      .removeClass("border-gray-300 bg-white");
  } else {
    $(this)
      .addClass("border-gray-300 bg-white")
      .removeClass("border-purple-600 bg-blue-100");
  }
});

$(document).on("click", ".main-btn-pick", function () {
  const selectedAddons = [];
  let sumPick = 0;

  $(".pick-item").each(function () {
    const $el = $(this);
    const $input = $el.find('input[type="checkbox"]');
    if ($input.prop("checked")) {
      const title = $el.find("h3").text().trim();
      const description = $el.find("p").text().trim();
      const price = $el.find(".price").text().trim();
      selectedAddons.push({ title, description, price });
      sumPick += parseInt(price.split("/")[0].replace("$", ""));
    }
  });
  state.allData.totalPrice = state.allData.price + sumPick;
  state.allData.addons = selectedAddons;
  success();
});

// -----------------------------
// Step 4: Summary
// -----------------------------
$(document).on("click", ".edit", function () {
  state.currentPage = 2;
  refreshRender();
});

$(document).on("click", ".go-back", function () {
  state.currentPage = Math.max(1, state.currentPage - 1);
  refreshRender();
});

$(document).on("click", ".main-btn-final", function () {
  toastContent();
  $(".main").html(thanksContent);
});
