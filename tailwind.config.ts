
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          "100": "#f2f2fd",
          "150": "#e0e1fa",
          "200": "#ced0f8",
          "250": "#bcbff5",
          "300": "#abaef2",
          "350": "#999df0",
          "400": "#878ced",
          "450": "#757bea",
          "500": "#636AE8",
          "550": "#4850e4",
          "600": "#2c35e0",
          "650": "#1f27cd",
          "700": "#1b22b1",
          "750": "#161d96",
          "800": "#12177a",
          "850": "#0e125e",
          "900": "#0a0d42",
          DEFAULT: "#636AE8",
          foreground: "#FFFFFF"
        },
        secondary: {
          "100": "#fdf1f5",
          "150": "#fbe0e8",
          "200": "#f8cedb",
          "250": "#f5bcce",
          "300": "#f3aac1",
          "350": "#f098b4",
          "400": "#ee86a7",
          "450": "#eb759a",
          "500": "#E8618C",
          "550": "#e44578",
          "600": "#e02862",
          "650": "#c91d53",
          "700": "#ac1947",
          "750": "#8e143b",
          "800": "#71102f",
          "850": "#530c22",
          "900": "#360816",
          DEFAULT: "#E8618C",
          foreground: "#FFFFFF"
        },
        danger: {
          "100": "#fdf2f2",
          "150": "#f9dbdc",
          "200": "#f5c4c6",
          "250": "#f1adaf",
          "300": "#ed9699",
          "350": "#e97f83",
          "400": "#e5696d",
          "450": "#e25256",
          "500": "#de3b40",
          "550": "#d9252b",
          "600": "#c12126",
          "650": "#aa1d22",
          "700": "#93191d",
          "750": "#7b1518",
          "800": "#641114",
          "850": "#4d0d0f",
          "900": "#36090b",
          DEFAULT: "#de3b40",
          foreground: "#FFFFFF"
        },
        success: {
          "100": "#eefdf3",
          "150": "#d3f9e0",
          "200": "#b8f5cd",
          "250": "#9df2b9",
          "300": "#82eea6",
          "350": "#67ea93",
          "400": "#4ce77f",
          "450": "#31e36c",
          "500": "#1dd75b",
          "550": "#1ac052",
          "600": "#17a948",
          "650": "#14923e",
          "700": "#117b34",
          "750": "#0e642a",
          "800": "#0a4d20",
          "850": "#073517",
          "900": "#041e0d",
          DEFAULT: "#1dd75b",
          foreground: "#FFFFFF"
        },
        warning: {
          "100": "#fef9ee",
          "150": "#fcf0d7",
          "200": "#fae7c0",
          "250": "#f8dea9",
          "300": "#f6d491",
          "350": "#f4cb7a",
          "400": "#f2c263",
          "450": "#f0b94b",
          "500": "#efb034",
          "550": "#eca517",
          "600": "#d29211",
          "650": "#b57e0f",
          "700": "#98690c",
          "750": "#7a550a",
          "800": "#5d4108",
          "850": "#402c05",
          "900": "#221803",
          DEFAULT: "#efb034",
          foreground: "#FFFFFF"
        },
        info: {
          "100": "#f1f8fd",
          "150": "#daecfa",
          "200": "#c3e1f8",
          "250": "#acd5f5",
          "300": "#94c9f2",
          "350": "#7dbeef",
          "400": "#66b2ec",
          "450": "#4fa6e9",
          "500": "#379ae6",
          "550": "#1d8de3",
          "600": "#197dca",
          "650": "#166db0",
          "700": "#125d95",
          "750": "#0f4c7b",
          "800": "#0c3c61",
          "850": "#092c47",
          "900": "#061c2d",
          DEFAULT: "#379ae6",
          foreground: "#FFFFFF"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
      },
      fontSize: {
        "t1": ["0.6875rem", "1.125rem"],
        "t2": ["0.75rem", "1.25rem"],
        "t3": ["0.875rem", "1.375rem"],
        "t4": ["1rem", "1.625rem"],
        "t5": ["1.125rem", "1.75rem"],
        "t6": ["1.25rem", "1.875rem"],
        "t7": ["1.5rem", "2.25rem"],
        "t8": ["2rem", "3rem"],
        "t9": ["2.5rem", "3.5rem"],
        "t10": ["3rem", "4.25rem"],
        "t10-1": ["4rem", "5.25rem"],
        "t10-2": ["5rem", "6.5rem"],
        "t11": ["6.25rem", "8.125rem"],
        "t12": ["12.5rem", "15rem"],
        "t13": ["18.75rem", "22.5rem"],
        "t14": ["31.25rem", "37.5rem"]
      },
      spacing: {
        "s0": "0.125rem",
        "s1": "0.25rem",
        "s2": "0.375rem",
        "s3": "0.5rem",
        "s4": "0.75rem",
        "s5": "1rem",
        "s6": "1.25rem",
        "s7": "1.5rem",
        "s8": "1.75rem",
        "s9": "2rem",
        "s10": "2.25rem",
        "s11": "2.5rem",
        "s12": "2.75rem",
        "s13": "3rem",
        "s14": "3.5rem",
        "s15": "4rem",
        "s16": "6rem",
        "s17": "8rem",
        "s18": "12rem",
        "s19": "16rem",
        "s20": "24rem"
      },
      fontFamily: {
        heading: ["Archivo", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "xs": "0.125rem",
        "s": "0.25rem",
        "m": "0.375rem",
        "l": "0.625rem",
        "xl": "1rem",
        "100-percent": "100%"
      },
      boxShadow: {
        "xs": "0px 0px 1px rgba(23, 26, 31, 0.07), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        "s": "0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        "m": "0px 4px 9px rgba(23, 26, 31, 0.11), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        "l": "0px 8px 17px rgba(23, 26, 31, 0.15), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        "xl": "0px 17px 35px rgba(23, 26, 31, 0.24), 0px 0px 2px rgba(23, 26, 31, 0.12)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
