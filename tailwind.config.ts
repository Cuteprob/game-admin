import type { Config } from "tailwindcss";

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
          'gradient-game': 'radial-gradient(at 100% 0%, hsla(265,40%,90%,0.2) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(265,60%,85%,0.2) 0px, transparent 50%)',
        },
  			borderRadius: {
  				lg: 'var(--radius)',
  				md: 'calc(var(--radius) - 2px)',
  				sm: 'calc(var(--radius) - 4px)'
  			},
  			colors: {
  				background: 'hsl(var(--background))',
  				foreground: 'hsl(var(--foreground))',
  				card: {
  					DEFAULT: 'hsl(var(--card))',
  					foreground: 'hsl(var(--card-foreground))'
  				},
  				popover: {
  					DEFAULT: 'hsl(var(--popover))',
  					foreground: 'hsl(var(--popover-foreground))'
  				},
  				primary: {
  					DEFAULT: 'hsl(var(--primary))',
  					foreground: 'hsl(var(--primary-foreground))'
  				},
  				secondary: {
  					DEFAULT: 'hsl(var(--secondary))',
  					foreground: 'hsl(var(--secondary-foreground))'
  				},
  				muted: {
  					DEFAULT: 'hsl(var(--muted))',
  					foreground: 'hsl(var(--muted-foreground))'
  				},
  				accent: {
  					DEFAULT: 'hsl(var(--accent))',
  					foreground: 'hsl(var(--accent-foreground))'
  				},
  				destructive: {
  					DEFAULT: 'hsl(var(--destructive))',
  					foreground: 'hsl(var(--destructive-foreground))'
  				},
  				border: 'hsl(var(--border))',
  				input: 'hsl(var(--input))',
  				ring: 'hsl(var(--ring))',
  				chart: {
  					'1': 'hsl(var(--chart-1))',
  					'2': 'hsl(var(--chart-2))',
  					'3': 'hsl(var(--chart-3))',
  					'4': 'hsl(var(--chart-4))',
  					'5': 'hsl(var(--chart-5))'
  				},
  				text: {
  					primary: 'hsl(var(--text-primary))',
  					secondary: 'hsl(var(--text-secondary))'
  				}
  		},
  		boxShadow: {
          'game': '0 4px 20px -8px hsla(265,60%,40%,0.2)',
          'game-hover': '0 8px 30px -8px hsla(265,60%,40%,0.3)',
        },
  		fontFamily: {
  			heading: ['var(--font-space-grotesk)', 'sans-serif'],
  			body: ['var(--font-inter)', 'sans-serif'],
  			mono: ['var(--font-jetbrains-mono)', 'monospace'],
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
