
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Nuflow custom colors
				nuflow: {
					moss: '#23301A',      // Verde musgo profundo
					sand: '#F9F7F2',      // Areia clara / off-white
					lime: '#B8C671',      // Verde limão queimado
					charcoal: '#1A1A1A',  // Cinza carvão
					mineral: '#BAB5AB',   // Cinza mineral
                    neon: '#11f55c',      // Verde neon
                    carbon: '#282626',    // Cinza carvão atualizado
                    green: '#497052',     // Verde adicional
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Montserrat', 'sans-serif'],
				mono: ['DM Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
                'scroll-down': {
                    '0%': { transform: 'translateY(0)', opacity: '1' },
                    '50%': { transform: 'translateY(6px)', opacity: '0.5' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                    '100%': { transform: 'translateY(0px)' }
                },
                'logo-pulse': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                    '50%': { transform: 'scale(1.05)', opacity: '0.8' }
                },
                'pulse-gentle': {
                    '0%, 100%': { opacity: '0.1', transform: 'scale(1)' },
                    '50%': { opacity: '0.2', transform: 'scale(1.1)' }
                },
                'fade-in-delayed': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '60%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'float-slow': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                    '100%': { transform: 'translateY(0px)' }
                },
                'float-reverse': {
                    '0%': { transform: 'translateY(-10px)' },
                    '50%': { transform: 'translateY(10px)' },
                    '100%': { transform: 'translateY(-10px)' }
                },
                'dot-bounce-1': {
                    '0%, 80%, 100%': { transform: 'scale(0.8)', opacity: '0.5' },
                    '40%': { transform: 'scale(1)', opacity: '1' }
                },
                'dot-bounce-2': {
                    '0%, 80%, 100%': { transform: 'scale(0.8)', opacity: '0.5' },
                    '40%': { transform: 'scale(1)', opacity: '1' }
                },
                'dot-bounce-3': {
                    '0%, 80%, 100%': { transform: 'scale(0.8)', opacity: '0.5' },
                    '40%': { transform: 'scale(1)', opacity: '1' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
                'scroll-down': 'scroll-down 1.5s infinite',
                'float': 'float 6s ease-in-out infinite',
                'logo-pulse': 'logo-pulse 3s ease-in-out infinite',
                'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
                'fade-in-delayed': 'fade-in-delayed 1.2s ease-out forwards',
                'float-slow': 'float-slow 8s ease-in-out infinite',
                'float-reverse': 'float-reverse 6s ease-in-out infinite',
                'dot-bounce-1': 'dot-bounce-1 1.4s infinite ease-in-out',
                'dot-bounce-2': 'dot-bounce-2 1.4s infinite ease-in-out 0.2s',
                'dot-bounce-3': 'dot-bounce-3 1.4s infinite ease-in-out 0.4s'
			},
			scale: {
				'98': '0.98',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
