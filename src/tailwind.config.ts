import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{html,js,ts,vue}',
        './pages/**/*.{html,js,ts,vue}',
        './layouts/**/*.{html,js,ts,vue}'
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'footer-row': '46% 28% 26%',
                'auto-fit': 'repeat(auto-fit, minmax(100px, 1fr))'
            },
            backgroundImage: {
                '404': 'linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, rgba(239, 240, 245, 0.00) 0.01%, #EFF0F5 100%);',
                '404-sm': 'linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, rgba(239, 240, 245, 0.00) 0.01%, #EFF0F5 54.8%);',
                'gradient-brand': 'linear-gradient(90deg, #EFF0F5 0.24%, #DDE1F2 100.45%);',
                'gradient-blue': 'linear-gradient(279deg, #6F8DDC 5.09%, #4666B8 107.1%);',
                'gradient-dark-blue': 'linear-gradient(270deg, #4E6CBC 0%, #5E7AC4 100%);',
                'animation-text-card-blue': 'linear-gradient(279deg, #5E7AC4 5.09%, #5E7AC4 107.1%);',
                'gradient-light-blue': 'linear-gradient(90deg, #CDD4F6 0.24%, #B1BEFF 100.45%);'
            },
            flex: {
                '4': '1 0 calc(25% - 24px)',
                '3': '1 0 calc(33% - 24px)',
                '2': '1 0 calc(50% - 24px)'
            },
            colors: {
                gray: {
                    800: '#4E4E4E',
                    500: '#8B8F9C',
                    300: '#ABABAC',
                    250: '#c7c7c8',
                    220: '#DEE1E9',
                    200: '#E5E7F2',
                    100: '#E6E8EE',
                    80: '#E5E8E0',
                    60: '#f6f7fa',
                    50: '#EFF0F5'
                },
                blue: {
                    DEFAULT: '#2959E9',
                    600: '#253978',
                    550: '#304379',
                    530: '#3954A4',
                    520: '#405FAE',
                    510: '#5873BA',
                    500: '#5E7AC4',
                    400: '#5A97F1',
                    300: '#8BA0DC',
                    200: '#869DDC',
                    180: '#8999C7',
                    50: '#EAEBF5'
                },
                red: {
                    500: '#ED5151',
                    200: '#FFE7E7'
                },
                black: {
                    DEFAULT: '#171718',
                    500: '#171718'
                },
                white: '#FFF'
            },
            spacing: {
                '5.5': '1.375rem',
                '4.5': '1.125rem',
                '15': '3.75rem',
                '18': '4.625rem'
            },
            borderRadius: {
             '4xl': '1.875rem',
             '4.5xl': '2rem',
             '2.5xl': '1.25rem',
             '1.5xl': '0.875rem'
            },
            boxShadow: {
                'icon': '0px 4px 25px rgba(43, 87, 208, 0.18);',
                'card': '0px 2px 20px 0px rgba(43, 87, 208, 0.25)',
                'card-text': '0px 4px 20px 0px rgba(8, 23, 62, 0.31);'
            },
            fontSize: {
                '4.5xl': '2.75rem',
                '3.5xl': '2rem',
                '1.5xl': '1.375rem'
            },
            lineHeight: {
                '5.5': '1.375rem',
                '6.5': '1.625rem',
                '11': '2.75rem',
                '13': '3.25rem'
            },
            gap: {
                '12': '2.375rem'
            },
            screens: {
                xl: { max: '1400px' },
                lg: { max: '1280px' },
                md: { max: '1000px' },
                sm: { max: '750px' },
                xs: { max: '500px' },
                'a-xs': { min: '501px' },
                'a-sm': { min: '751px' },
                'a-md': { min: '1001px' },
                'a-lg': { min: '1281px' },
                'a-xl': { min: '1401px' },
                'a-2xl': { min: '1430px' }
            }
        },
        fontFamily: {
            golos: ['Golos', ...defaultTheme.fontFamily.sans],
            roboto: ['Roboto Slab', ...defaultTheme.fontFamily.sans],
            mono: ['GolosMono', ...defaultTheme.fontFamily.mono]
        }
    },
    plugins: []
}

