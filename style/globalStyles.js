
// Typography tokens (for headings, subheadings, body, paragraph, etc.)
export const typography = {
  heading:
    "font-bold text-blue-900 text-center mb-4 text-2xl sm:text-3xl md:text-3xl lg:text-4xl leading-tight",
  subheading:
    "font-semibold text-gray-700 text-xl sm:text-xl md:text-2xl leading-snug",
  body: "text-gray-600 text-base sm:text-base md:text-lg leading-relaxed",
  paragraph:
    "text-gray-600 text-base py-4 sm:text-base md:text-lg leading-relaxed", 
  caption: "text-gray-500 text-sm sm:text-sm md:text-base leading-snug",
  small: "text-gray-500 text-xs sm:text-sm md:text-sm leading-snug",
};

// Card styles (for product cards, user profiles, content previews, etc.)

export const card = {
  cardsWrapper:
    "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3",

  cardWrapper:
    "group rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg",

  imageWrapper:
    "flex h-56 items-center justify-center rounded-t-xl bg-gray-50 p-4",

  image:
    "max-h-full object-contain transition-transform duration-300 group-hover:scale-105",

  content: "p-5 space-y-3",

  title: "text-lg font-semibold text-gray-900",

  description: "text-sm text-gray-600 line-clamp-3",

  priceRatingContainer: "flex items-center justify-between pt-2",

  price: "text-xl font-bold text-gray-900",

  rating: "text-sm text-yellow-500",

  stockCategoryContainer: "flex items-center justify-between text-sm pt-2",

  stock: {
    inStock: "font-medium text-green-600",
    outOfStock: "font-medium text-red-500",
  },

  category: "rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700",
};


// Tailwind CSS color/style variants for buttons, badges, alerts, etc.
export const variants = {
  
  primary:
  "bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] focus:ring-[#1DA1F2] rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-sm cursor-pointer",

    secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-sm cursor-pointer",
  success:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-sm cursor-pointer",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-sm cursor-pointer",
  warning:
    "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-sm cursor-pointer",
  info: "bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-400 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-sm cursor-pointer",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-none cursor-pointer",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 rounded-lg px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-sm cursor-pointer",
  addToCart:
    "bg-orange-400 text-white hover:bg-orange-600 hover:text-black focus:ring-orange-400 rounded-lg px-2 py-1 sm:px-2 sm:py-1 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-md cursor-pointer",
  viewDetails:
    "bg-white text-sky-600 border border-sky-500 hover:bg-sky-50 hover:text-red-700 focus:ring-sky-400 rounded-lg px-2 py-1 sm:px-2 sm:py-1 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-sm cursor-pointer",

  removeFromCart:
    "bg-red-500 text-white hover:bg-red-600 hover:text-black focus:ring-red-400 rounded-lg px-2 py-1 sm:px-2 sm:py-1 text-sm sm:text-base transition-colors duration-200 ease-in-out shadow-md cursor-pointer",
};



// Sizes usable across components (buttons, inputs, badges, etc.)
export const sizes = {
  xs: "px-2 py-1 text-xs sm:px-2 sm:py-1.5 md:px-2 md:py-2",
  sm: "px-2 py-1 text-sm sm:px-2 sm:py-1.5 md:px-2 md:py-2",
  md: "px-2 py-1 text-base sm:px-2 sm:py-2.5 md:px-2 md:py-3",
  lg: "px-2 py-1 text-lg sm:px-2 sm:py-3 md:px-2 md:py-3.5",
  xl: "px-3 py-2 text-xl sm:px-3 sm:py-4 md:px-3 md:py-4.5",
  "2xl": "px-3 py-4 text-2xl sm:px-3 sm:py-5 md:px-3 md:py-6",
};


// Fully responsive and scalable for different screen sizes
export const spacing = {
  none: "p-0 m-0",
  xs: "p-1 m-1 sm:p-2 sm:m-2",
  sm: "p-2 m-2 sm:p-3 sm:m-3",
  md: "p-4 m-4 sm:p-5 sm:m-5",
  lg: "p-6 m-6 sm:p-7 sm:m-7",
  xl: "p-8 m-8 sm:p-9 sm:m-9",
  "2xl": "p-10 m-10 sm:p-12 sm:m-12",
};

// Standardized border styles for consistency across the UI
export const borders = {
  none: "border-0",

  // Neutral borders
  light: "border border-gray-200",
  default: "border border-gray-300",
  dark: "border border-gray-400",

  // Accent borders (brand colors)
  primary: "border border-blue-500",
  secondary: "border border-gray-500",
  success: "border border-green-500",
  danger: "border border-red-500",
  warning: "border border-yellow-500",
  info: "border border-sky-500",

  // Hover / focus variants
  hoverPrimary:
    "border border-gray-300 hover:border-blue-500 focus:border-blue-600",
  hoverDanger:
    "border border-gray-300 hover:border-red-500 focus:border-red-600",

  // Styled borders
  dashed: "border-2 border-dashed border-gray-400",
  dotted: "border-2 border-dotted border-gray-400",
  double: "border-4 border-double border-gray-500",

  // Card / container-friendly
  subtle: "border border-gray-200 shadow-sm",
  elevated: "border border-gray-300 shadow-md",

  top: "border-t border-gray-300 mt-4 pt-4",
  bottom: "border-b border-gray-300 mt-4 pt-4",
  left: "border-l border-gray-300 mt-4 pt-4",
  right: "border-r border-gray-300 mt-4 pt-4",
};

// Standardized border-radius tokens for consistent UI design
export const radii = {
  none: "rounded-none",
  sm: "rounded-sm sm:rounded-md",
  // Small elements: subtle rounding, slightly larger on bigger screens for better touch targets

  md: "rounded-md sm:rounded-lg",
  // Medium elements: cards, small modals, input fields, buttons

  lg: "rounded-lg sm:rounded-xl",
  // Large elements: modals, dropdowns, larger card containers

  xl: "rounded-xl sm:rounded-2xl",
  // Extra-large elements: hero sections, prominent containers

  full: "rounded-full",
  // Circular elements: avatars, badges, profile images, pills
};

// Shadows
export const shadows = {
  none: "shadow-none",
  sm: "shadow sm:shadow-md", // subtle on small screens, slightly stronger on larger screens
  md: "shadow-md sm:shadow-lg", // medium depth for cards and dropdowns
  lg: "shadow-lg sm:shadow-xl", // prominent shadows for modals or popovers
  xl: "shadow-xl sm:shadow-2xl", // strong shadows for overlays or hero components
  "2xl": "shadow-2xl sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]", // optional extra-large, fully custom
};

// Standardized z-index levels for UI layers (modals, dropdowns, tooltips, notifications, etc.)
export const zIndex = {
  base: "z-0", // default page content
  dropdown: "z-50", // dropdown menus
  tooltip: "z-60", // tooltips above dropdowns
  modal: "z-70", // modals above everything else
  popover: "z-80", // popovers or context menus
  toast: "z-90", // notifications/toasts
  overlay: "z-100", // full-screen overlays or dimming layers
};





// Page-level section container (global for all pages)
export const pageSection = {
  base:
    "w-full mx-auto " + // center and take full width
    "px-4 py-6 " + // mobile (smallest screens)
    "max-w-screen-2xl " + // limit max width on very large screens
    "sm:px-4 sm:py-6 " + // small tablets
    "md:px-8 md:py-12 " + // tablets / small laptops
    "lg:px-12 lg:py-16 " + // laptops
    "xl:px-16 xl:py-20 " + // desktops
    "2xl:px-24 2xl:py-24 " + // large screens
    "max-w-screen-2xl", // keeps content from being too stretched
};