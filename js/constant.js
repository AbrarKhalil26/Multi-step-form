// Store All Data
export let allData = {};

// Menu -------------------------->
export const menu = [
  { title: "Your Info", subtitle: "Step 1" },
  { title: "Select Plan", subtitle: "Step 2" },
  { title: "Add-ons", subtitle: "Step 3" },
  { title: "Summary", subtitle: "Step 4" },
];

// Info Form --------------------->
export const regexForm = {
  name: {
    regex: /^[a-zA-Z\s]{3,15}$/,
    message: "Name must be 3–15 letters only.",
  },
  email: {
    regex: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
    message: "Please enter a valid email address.",
  },
  phone: {
    regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    message: "Please enter a valid phone number.",
  },
};

export const inputData = [
  {
    id: "name",
    title: "Name",
    placeholder: "e.g. Stephen king",
  },
  {
    id: "email",
    title: "Email Address",
    placeholder: "e.g. stephenking@lorem.com",
  },
  {
    id: "phone",
    title: "Phone Number",
    placeholder: "e.g. +1234567890",
  },
];

// planData -------------------------->
export const planData = [
  { title: "Arcade", price: 9, icon: "../assets/images/icon-arcade.svg" },
  { title: "Advanced", price: 12, icon: "../assets/images/icon-advanced.svg" },
  { title: "Pro", price: 15, icon: "../assets/images/icon-pro.svg" },
];

// Pick add-ons ------------------->
export const pickData = [
  {
    title: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    title: "Customizable Profile",
    description: "Custom theme on your profile",
    price: 2,
  },
];
